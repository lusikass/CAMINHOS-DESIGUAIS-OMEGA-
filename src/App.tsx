import { useState, useEffect } from 'react';
import { STATIC, COURSE_DATA, PROBABILITIES } from './data';
import { Trial, PreQuestionnaire, Choice, Phase } from './types';
import AdminPortal from './components/AdminPortal';
import ConsentScene from './components/ConsentScene';
import PreQuestionnaireScene from './components/PreQuestionnaireScene';
import IdentityScene from './components/IdentityScene';
import RouletteScene from './components/RouletteScene';
import GamePhasesScene from './components/GamePhasesScene';
import SisuSuspenseScene from './components/SisuSuspenseScene';
import PostQuestionnaireScene from './components/PostQuestionnaireScene';
import ThanksScene from './components/ThanksScene';
import { generateAIPhase, generateAIVerdict } from './ai';
import { Sparkles, BarChart2 } from 'lucide-react';

type Scene = 'consent' | 'pre' | 'identity' | 'roulette' | 'game' | 'suspense' | 'post' | 'thanks';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('bauhaus_api_key') || 'sk-c4e750727adc4defbdda3a77eaf4b0ae');
  const [aiModel, setAiModel] = useState<string>(() => localStorage.getItem('bauhaus_ai_model') || 'deepseek-v4-flash');
  const [trials, setTrials] = useState<Trial[]>(() => {
    try { return JSON.parse(localStorage.getItem('bauhaus_trials') || '[]'); }
    catch { return []; }
  });

  const [activeScene, setActiveScene] = useState<Scene>('consent');
  const [adminOpen, setAdminOpen] = useState(false);

  const [trialId] = useState<string>(() => `PART_${Date.now()}_${Math.floor(Math.random() * 1000)}`);
  const [preData, setPreData] = useState<PreQuestionnaire>({ p1: '', p2: '', p3: '' });

  // Identidade do jogador (escolhida pelo próprio)
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [comorbidity, setComorbidity] = useState('');

  // Classe social (sorteada)
  const [selectedPath, setSelectedPath] = useState('');

  const [stats, setStats] = useState({ c: 0, e: 0, r: 0 });
  const [phases, setPhases] = useState<Phase[]>([]);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [choiceHistory, setChoiceHistory] = useState<any[]>([]);
  const [finalVerdict, setFinalVerdict] = useState('');
  const [course, setCourse] = useState({ name: '', desc: '' });
  const [startTime] = useState<number>(() => Date.now());

  // Salva identidade escolhida pelo jogador e vai para a roleta
  const handleIdentityConfirm = (gen: string, rc: string, com: string) => {
    setGender(gen);
    setRace(rc);
    setComorbidity(com);
    setActiveScene('roulette');
  };

  // Recebe a classe sorteada e inicializa a trajetória
  const handlePathReveal = async (key: string) => {
    const origin = STATIC[key];
    setSelectedPath(key);

    // Aplica modificadores baseados na identidade escolhida pelo jogador
    const baseStats = { ...origin.stats };

    // Modificadores de Gênero
    if (gender === 'Mulher Cisgênero') { baseStats.e += 8; }
    if (gender === 'Mulher Transgênero') { baseStats.e += 20; baseStats.c -= 8; baseStats.r -= 10; }
    if (gender === 'Homem Transgênero') { baseStats.e += 18; baseStats.c -= 5; baseStats.r -= 8; }
    if (gender === 'Não-binário') { baseStats.e += 15; baseStats.c -= 5; baseStats.r -= 8; }
    if (gender === 'Gênero Fluido') { baseStats.e += 15; baseStats.r -= 6; }
    if (gender === 'Agênero') { baseStats.e += 12; baseStats.r -= 5; }
    if (gender === 'Bigênero') { baseStats.e += 12; baseStats.r -= 5; }
    if (gender === 'Pangênero') { baseStats.e += 12; baseStats.r -= 5; }

    // Modificadores de Raça
    if (race === 'Branco') { baseStats.c += 5; baseStats.r += 5; }
    if (race === 'Pardo') { baseStats.c -= 3; baseStats.e += 5; baseStats.r -= 3; }
    if (race === 'Preto') { baseStats.c -= 8; baseStats.e += 12; baseStats.r -= 8; }
    if (race === 'Indígena') { baseStats.c -= 10; baseStats.e += 10; baseStats.r -= 10; }
    if (race === 'Amarelo') { baseStats.c -= 2; baseStats.e += 3; }

    // Modificadores de Comorbidade
    if (comorbidity === 'Deficiência Visual') { baseStats.e += 18; baseStats.c -= 5; baseStats.r -= 5; }
    if (comorbidity === 'Deficiência Auditiva') { baseStats.e += 16; baseStats.c -= 5; baseStats.r -= 5; }
    if (comorbidity === 'Deficiência Física') { baseStats.e += 14; baseStats.c -= 5; baseStats.r -= 5; }
    if (comorbidity === 'TDAH') { baseStats.e += 18; baseStats.c -= 8; }
    if (comorbidity === 'TEA (Autismo)') { baseStats.e += 20; baseStats.c -= 8; baseStats.r -= 10; }
    if (comorbidity === 'Transtorno de Ansiedade') { baseStats.e += 15; baseStats.c -= 5; }
    if (comorbidity === 'Depressão') { baseStats.e += 18; baseStats.c -= 8; baseStats.r -= 5; }
    if (comorbidity === 'Transtorno Bipolar') { baseStats.e += 20; baseStats.c -= 8; baseStats.r -= 8; }
    if (comorbidity === 'Doença Crônica (ex: diabetes, lúpus)') { baseStats.e += 16; baseStats.c -= 5; }

    // Clamp 0-100
    baseStats.c = Math.min(Math.max(Math.round(baseStats.c), 0), 100);
    baseStats.e = Math.min(Math.max(Math.round(baseStats.e), 0), 100);
    baseStats.r = Math.min(Math.max(Math.round(baseStats.r), 0), 100);

    setStats(baseStats);
    setPhaseIndex(0);
    setChoiceHistory([]);

    if (apiKey && apiKey.trim().length > 0) {
      const aiPhase = await generateAIPhase(apiKey, aiModel, origin.name, key, 0, origin.phases.length, baseStats, []);
      if (aiPhase) {
        const updated = [...origin.phases];
        updated[0] = aiPhase;
        setPhases(updated);
      } else {
        setPhases(origin.phases);
      }
    } else {
      setPhases(origin.phases);
    }

    setActiveScene('game');
  };

  const handleChoicePicked = async (choice: Choice, consequence: string | null) => {
    const nextIdx = phaseIndex + 1;
    const currentOrigin = STATIC[selectedPath];

    const updatedHistory = [
      ...choiceHistory,
      { phase: phaseIndex, choice: choice.n, delta: choice.m, tag: phases[phaseIndex]?.tag || 'Etapa', consequence }
    ];
    setChoiceHistory(updatedHistory);

    const newStats = {
      c: Math.min(Math.max(Math.round(stats.c + (choice.m.c || 0)), 0), 100),
      e: Math.min(Math.max(Math.round(stats.e + (choice.m.e || 0)), 0), 100),
      r: Math.min(Math.max(Math.round(stats.r + (choice.m.r || 0)), 0), 100),
    };
    setStats(newStats);

    if (nextIdx >= currentOrigin.phases.length) {
      setActiveScene('suspense');
      return;
    }

    if (apiKey && apiKey.trim().length > 0) {
      const aiPhase = await generateAIPhase(
        apiKey, aiModel, currentOrigin.name, selectedPath,
        nextIdx, currentOrigin.phases.length, newStats, updatedHistory
      );
      if (aiPhase) {
        const updated = [...phases];
        updated[nextIdx] = aiPhase;
        setPhases(updated);
      }
    }

    setPhaseIndex(nextIdx);
  };

  const handleSisuProcess = async () => {
    const courseProbabilities = PROBABILITIES[selectedPath] || PROBABILITIES.C;
    const total = Object.values(courseProbabilities).reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    let finalCourseKey = Object.keys(courseProbabilities)[Object.keys(courseProbabilities).length - 1];

    for (const [opt, w] of Object.entries(courseProbabilities)) {
      rand -= w;
      if (rand <= 0) { finalCourseKey = opt; break; }
    }

    const matchedCourse = {
      name: finalCourseKey,
      desc: COURSE_DATA[finalCourseKey] || 'Curso conquistado pelo candidato após avaliação de nota de corte.'
    };
    setCourse(matchedCourse);

    if (apiKey && apiKey.trim().length > 0) {
      const aiVerdict = await generateAIVerdict(apiKey, aiModel, STATIC[selectedPath]?.name || 'Origem Diversa', choiceHistory, stats);
      setFinalVerdict(aiVerdict || 'Seu histórico ilustra como estrutura social e identidade moldam os resultados.');
    } else {
      const profileDesc = [
        gender !== 'Prefiro não informar' ? `gênero ${gender}` : '',
        race !== 'Prefiro não informar' ? `raça ${race}` : '',
        comorbidity !== 'Nenhuma' && comorbidity !== 'Prefiro não informar' ? `com ${comorbidity}` : '',
      ].filter(Boolean).join(', ');

      setFinalVerdict(
        `Trajetória concluída. Como uma pessoa ${profileDesc || 'com sua identidade'} da origem "${STATIC[selectedPath]?.name}", ` +
        `suas escolhas foram moldadas tanto pela sua identidade quanto pelo seu ponto de partida socioeconômico. ` +
        `Conhecimento ${stats.c}/100, Exaustão ${stats.e}/100 e Apoio Social ${stats.r}/100 refletem essa combinação.`
      );
    }

    setActiveScene('post');
  };

  const handleFinishExperiment = (post: any) => {
    const currentOrigin = STATIC[selectedPath];
    const durationInSeconds = Math.floor((Date.now() - startTime) / 1000);

    const fullTrial: Trial = {
      id: trialId,
      timestamp: new Date().toISOString(),
      pre: preData,
      post,
      game: {
        path: currentOrigin?.name || 'Origem Desconhecida',
        pathKey: selectedPath,
        gender,
        race,
        comorbidity,
        aiMode: !!(apiKey && apiKey.trim().length > 0),
        choices: choiceHistory,
        finalStats: stats,
        course,
        verdict: finalVerdict
      },
      duration: durationInSeconds
    };

    const updatedTrials = [...trials, fullTrial];
    setTrials(updatedTrials);
    localStorage.setItem('bauhaus_trials', JSON.stringify(updatedTrials));
    setActiveScene('thanks');
  };

  useEffect(() => {
    localStorage.setItem('bauhaus_trials', JSON.stringify(trials));
  }, [trials]);

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-black font-sans flex flex-col justify-between pb-4 select-none">
      <div className="h-2 bg-gradient-to-r from-[#c0392b] via-[#e8b84b] to-[#2c5f8a] border-b border-black pointer-events-none" />

      {/* HUD de stats */}
      {selectedPath && (activeScene === 'game' || activeScene === 'post') && (
        <div className="bg-[#1e1e1e] border-b-2 border-black sticky top-0 z-40 px-4 md:px-8 py-3 flex flex-col md:flex-row justify-between items-stretch gap-3 md:items-center text-white">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#e8b84b] uppercase leading-none">
              Trajetória Ativa
            </span>
            <span className="font-bold text-sm md:text-base uppercase tracking-tight mt-0.5">
              {STATIC[selectedPath]?.name}
            </span>
            {/* Tags de identidade no HUD */}
            <div className="flex flex-wrap gap-1 mt-1">
              {gender && gender !== 'Prefiro não informar' && (
                <span className="bg-[#c0392b] text-white font-bold text-[8px] uppercase px-1.5 py-0.5 border border-white/20">
                  {gender}
                </span>
              )}
              {race && race !== 'Prefiro não informar' && (
                <span className="bg-[#2c5f8a] text-white font-bold text-[8px] uppercase px-1.5 py-0.5 border border-white/20">
                  {race}
                </span>
              )}
              {comorbidity && comorbidity !== 'Nenhuma' && comorbidity !== 'Prefiro não informar' && (
                <span className="bg-neutral-700 text-white font-bold text-[8px] uppercase px-1.5 py-0.5 border border-white/20">
                  {comorbidity}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 flex-1 max-w-xl md:justify-end">
            <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
              <div className="flex justify-between text-[10px] font-mono tracking-wider font-bold uppercase">
                <span className="text-[#7fb3d4]">Conhecimento</span>
                <span>{stats.c}/100</span>
              </div>
              <div className="w-full h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-[#7fb3d4] transition-all duration-500" style={{ width: `${stats.c}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
              <div className="flex justify-between text-[10px] font-mono tracking-wider font-bold uppercase">
                <span className="text-[#c0392b]">Exaustão</span>
                <span>{stats.e}/100</span>
              </div>
              <div className="w-full h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-[#c0392b] transition-all duration-500" style={{ width: `${stats.e}%` }} />
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[110px]">
              <div className="flex justify-between text-[10px] font-mono tracking-wider font-bold uppercase">
                <span className="text-[#e8b84b]">Apoio Social</span>
                <span>{stats.r}/100</span>
              </div>
              <div className="w-full h-2 bg-white/20 overflow-hidden">
                <div className="h-full bg-[#e8b84b] transition-all duration-500" style={{ width: `${stats.r}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="max-w-6xl w-full mx-auto px-4 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-black pb-4 select-text">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-black uppercase">
            Caminhos <span className="text-[#c0392b]">Desiguais</span>
          </h1>
          <p className="font-mono text-xs font-bold tracking-wider text-[#6b6560] uppercase mt-1">
            Lab. Comportamento Social & Mobilidade • v13.0
          </p>
          <div className="inline-flex items-center gap-2 bg-black text-[#e8b84b] border border-[#e8b84b] font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1 mt-2.5 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            IA DeepSeek: {apiKey ? 'Ativa' : 'Inativa (Modo Estático)'}
          </div>
        </div>

        <button
          onClick={() => setAdminOpen(true)}
          className="flex items-center gap-2 font-mono font-bold text-[11px] bg-black text-white hover:bg-[#2c5f8a] border-2 border-black px-4 py-2 uppercase tracking-wider transition cursor-pointer"
        >
          <BarChart2 className="w-4 h-4" /> Admin / Dados da Pesquisa
        </button>
      </header>

      {/* Main */}
      <main className="max-w-6xl w-full mx-auto px-4 py-6 md:py-10 flex flex-col flex-1">

        {activeScene === 'consent' && (
          <ConsentScene
            onAccept={() => setActiveScene('pre')}
            onReject={() => window.location.reload()}
            onOpenAdmin={() => setAdminOpen(true)}
            aiActive={!!apiKey}
          />
        )}

        {activeScene === 'pre' && (
          <PreQuestionnaireScene
            onSave={(data) => { setPreData(data); setActiveScene('identity'); }}
          />
        )}

        {/* NOVA CENA: Seleção de Identidade */}
        {activeScene === 'identity' && (
          <IdentityScene
            onConfirm={handleIdentityConfirm}
          />
        )}

        {/* ROLETA: apenas para classe social */}
        {activeScene === 'roulette' && (
          <RouletteScene
            gender={gender}
            race={race}
            comorbidity={comorbidity}
            onSpinEnd={(key: string) => { handlePathReveal(key); }}
          />
        )}

        {activeScene === 'game' && phases[phaseIndex] && (
          <GamePhasesScene
            phaseIndex={phaseIndex}
            totalPhases={phases.length}
            currentPhase={phases[phaseIndex]}
            stats={stats}
            originName={STATIC[selectedPath]?.name || ''}
            onChoicePicked={handleChoicePicked}
            aiActive={!!(apiKey && apiKey.trim().length > 0)}
            apiKey={apiKey}
            aiModel={aiModel}
          />
        )}

        {activeScene === 'suspense' && (
          <SisuSuspenseScene onComplete={handleSisuProcess} />
        )}

        {activeScene === 'post' && (
          <PostQuestionnaireScene
            finalStats={stats}
            course={course}
            originName={STATIC[selectedPath]?.name || ''}
            verdict={finalVerdict}
            onFinish={handleFinishExperiment}
          />
        )}

        {activeScene === 'thanks' && (
          <ThanksScene
            trialId={trialId}
            onRestart={() => window.location.reload()}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto px-4 border-t border-[#c8bfb0] pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[#6b6560] tracking-wider uppercase">
        <span>ID: <strong className="text-black">{trialId}</strong></span>
        <span>Motor IA: <strong className="text-black">{apiKey ? 'DeepSeek Ativo' : 'Modo Estático'}</strong></span>
      </footer>

      {adminOpen && (
        <AdminPortal
          apiKey={apiKey}
          setApiKey={setApiKey}
          aiModel={aiModel}
          setAiModel={setAiModel}
          trials={trials}
          setTrials={setTrials}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}
