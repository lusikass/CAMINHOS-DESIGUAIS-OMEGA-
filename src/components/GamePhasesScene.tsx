import { useState } from 'react';
import { Phase, Choice, StatModifier } from '../types';
import { Sparkles, BookOpen } from 'lucide-react';

interface GamePhasesSceneProps {
  phaseIndex: number;
  totalPhases: number;
  currentPhase: Phase;
  stats: { c: number; e: number; r: number };
  onChoicePicked: (choice: Choice, consequence: string | null) => void;
  aiActive: boolean;
  apiKey: string;
  aiModel: string;
  originName: string;
}

export default function GamePhasesScene({
  phaseIndex,
  totalPhases,
  currentPhase,
  stats,
  onChoicePicked,
  aiActive,
  apiKey,
  aiModel,
  originName,
}: GamePhasesSceneProps) {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [loadingAIConsequence, setLoadingAIConsequence] = useState(false);
  const [consequenceText, setConsequenceText] = useState<string | null>(null);

  const handleSelect = async (choice: Choice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    setLoadingAIConsequence(aiActive);

    let finalConsequence: string | null = null;
    if (aiActive && apiKey) {
      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: aiModel || 'deepseek-v4-flash',
            max_tokens: 100,
            messages: [
              {
                role: 'system',
                content: `Você é o narrador do experimento sociológico "Caminhos Desiguais". Escreva UMA frase curta e impactante (máx 22 palavras, em português) descrevendo a consequência direta da escolha do jogador. Tom: jornalístico, direto, sem julgamento moral. Responda APENAS com a frase, sem aspas, sem JSON.`,
              },
              {
                role: 'user',
                content: `Origem: ${originName}. Fase: ${currentPhase.tag}. Escolha: "${choice.n}". Stats após: Conhecimento=${stats.c}, Exaustão=${stats.e}, Apoio Social=${stats.r}.`,
              },
            ],
            stream: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          finalConsequence = data.choices?.[0]?.message?.content?.trim() || null;
          setConsequenceText(finalConsequence);
        }
      } catch (err) {
        console.error('Failed to generate consequence:', err);
      } finally {
        setLoadingAIConsequence(false);
      }
    }

    // Delay before shifting to next phase
    setTimeout(() => {
      onChoicePicked(choice, finalConsequence);
      setSelectedChoice(null);
      setConsequenceText(null);
    }, aiActive ? 3200 : 1800);
  };

  const getDeltaString = (m: StatModifier) => {
    return Object.entries(m)
      .map(([k, v]) => {
        const label = k === 'c' ? 'Conhecimento' : k === 'e' ? 'Exaustão' : 'Apoio Social';
        return `${label}: ${v > 0 ? '+' : ''}${v}`;
      })
      .join(' · ');
  };

  const progress = Math.round(((phaseIndex + 1) / totalPhases) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#fdfaf4] border-4 border-black p-5 md:p-8 shadow-[8px_8px_0px_#1e1e1e] flex flex-col gap-6 animate-fadeIn">
      {/* Progress Track */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-mono font-bold tracking-wider text-[#6b6560] uppercase">
          <span>Fase {phaseIndex + 1} de {totalPhases}</span>
          <span>Progresso: {progress}%</span>
        </div>
        <div className="w-full h-3 border-2 border-black bg-[#c8bfb0] p-0.5 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4 border-b md:border-b-0 md:border-r border-black pb-6 md:pb-0 md:pr-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#c0392b]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6b6560]">
              {currentPhase.tag}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black uppercase text-black leading-none tracking-tight border-l-4 border-[#c0392b] pl-3">
            {currentPhase.title}
          </h3>

          <p className="font-sans font-medium text-sm text-neutral-800 leading-relaxed bg-white border-2 border-black p-3.5 my-1">
            {currentPhase.desc}
          </p>

          <div className="bg-[#1e1e1e] border-2 border-black p-3 text-white flex flex-col gap-2 relative mt-1 select-text">
            <span className="absolute top-[-10px] left-3 bg-[#e8b84b] text-black border border-black font-mono font-black text-[9px] px-2 py-0.5 uppercase tracking-wider">
              Fato de Pesquisa
            </span>
            <p className="font-sans italic font-medium text-xs text-neutral-300 flex items-start gap-2 pt-1 leading-relaxed">
              <BookOpen className="w-4 h-4 text-[#e8b84b] flex-shrink-0 mt-0.5" />
              {currentPhase.fact}
            </p>
          </div>
        </div>

        {/* Choices Grid */}
        <div className="flex flex-col justify-center gap-3">
          {currentPhase.choices.map((ch, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isPicked = selectedChoice?.n === ch.n;

            return (
              <button
                key={idx}
                disabled={selectedChoice !== null}
                onClick={() => handleSelect(ch)}
                className={`flex items-stretch border-2 border-black font-sans bg-white transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#c0392b] active:translate-y-0 text-left select-none overflow-hidden cursor-pointer ${
                  isPicked
                    ? 'bg-black text-white border-black shadow-[4px_4px_0_#c0392b] cursor-default'
                    : 'hover:bg-[#fdfaf4]'
                } ${selectedChoice !== null && !isPicked ? 'opacity-40 hover:translate-y-0 hover:shadow-none' : ''}`}
              >
                <span className={`flex items-center justify-center font-black text-sm w-12 border-r border-black font-mono transition select-none flex-shrink-0 ${
                  isPicked ? 'bg-[#c0392b] text-white' : 'bg-[#f4f1ea] text-neutral-600'
                }`}>
                  {letter}
                </span>

                <span className="flex flex-col justify-center p-3 gap-1 flex-1">
                  <span className="font-bold text-sm leading-tight">{ch.n}</span>
                  <span className={`font-mono text-[9px] tracking-wider uppercase font-bold text-neutral-500 ${
                    isPicked ? 'text-neutral-400' : ''
                  }`}>
                    {getDeltaString(ch.m)}
                  </span>
                </span>
              </button>
            );
          })}

          {/* AI Generation State */}
          {loadingAIConsequence && (
            <div className="flex items-center gap-3 border border-black bg-white p-3 font-mono text-xs text-black font-bold uppercase animate-pulse mt-2">
              <Sparkles className="w-4 h-4 text-[#2c5f8a] flex-shrink-0 animate-spin" />
              Gerando consequência imediata pela IA...
            </div>
          )}

          {consequenceText && (
            <div className="bg-[#2c5f8a] border-2 border-black p-3.5 text-white animate-fadeIn font-sans font-medium text-xs leading-relaxed italic select-text">
              <span className="font-mono text-[9px] tracking-wider font-bold uppercase text-blue-200 block mb-1">
                IA • Consequência
              </span>
              {consequenceText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
