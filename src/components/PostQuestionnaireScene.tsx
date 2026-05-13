import { useState } from 'react';
import { ArrowRight, Award, Sparkles } from 'lucide-react';

interface PostQuestionnaireSceneProps {
  finalStats: { c: number; e: number; r: number };
  course: { name: string; desc: string };
  originName: string;
  verdict: string;
  onFinish: (q: { p1: string; p2: string; p3: string; p4: string }) => void;
}

export default function PostQuestionnaireScene({
  finalStats,
  course,
  originName,
  verdict,
  onFinish,
}: PostQuestionnaireSceneProps) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [p4, setP4] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!p1 || !p2) {
      setError('Por favor, responda as duas primeiras perguntas para salvar o teste.');
      return;
    }
    setError('');
    onFinish({ p1, p2, p3, p4 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fadeIn">
      {/* Visual Verdict / Final Course poster */}
      <div className="bg-[#1e1e1e] text-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0px_#c0392b] flex flex-col gap-4 relative overflow-hidden select-text">
        <div className="absolute right-[-30px] top-[-30px] w-48 h-48 border-[20px] border-[#c0392b] border-dashed rounded-full opacity-10 select-none pointer-events-none" />

        <span className="font-mono text-xs font-bold tracking-widest text-[#e8b84b] uppercase select-none flex items-center gap-2">
          <Award className="w-4 h-4 text-[#e8b84b]" /> Resultado da Trajetória
        </span>

        <p className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-wider select-none">
          Origem do participante: {originName}
        </p>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-white uppercase mt-1">
          {course.name}
        </h2>

        <p className="font-sans font-medium text-sm md:text-base text-neutral-200 leading-relaxed max-w-2xl mt-1">
          {course.desc}
        </p>

        {/* Stats summary trio */}
        <div className="grid grid-cols-3 gap-2 border border-white/20 bg-black p-3 mt-4">
          <div className="flex flex-col items-center justify-center border-r border-white/10">
            <span className="font-black text-2xl md:text-4xl text-[#7fb3d4] leading-none">
              {finalStats.c}
            </span>
            <span className="font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
              Conhecimento
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-r border-white/10">
            <span className="font-black text-2xl md:text-4xl text-[#c0392b] leading-none">
              {finalStats.e}
            </span>
            <span className="font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
              Exaustão Estrutural
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="font-black text-2xl md:text-4xl text-[#e8b84b] leading-none">
              {finalStats.r}
            </span>
            <span className="font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
              Apoio Social
            </span>
          </div>
        </div>
      </div>

      {/* Narrative sociological verdict */}
      <div className="bg-[#fdfaf4] border-4 border-black p-6 md:p-8 flex flex-col gap-3 shadow-[8px_8px_0px_#1e1e1e] select-text">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[#6b6560] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c0392b]" /> Veredito da Trajetória (IA)
        </span>
        <p className="font-sans font-medium text-sm text-black leading-relaxed italic">
          {verdict || 'Análise da IA não pôde ser gerada nesta sessão. Use a chave para uma experiência personalizada.'}
        </p>
      </div>

      {/* Survey for the participant */}
      <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#1e1e1e] flex flex-col gap-6">
        <h3 className="text-2xl font-black uppercase text-black tracking-tight border-b-2 border-black pb-2">
          Sua Avaliação da Experiência
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-black font-sans leading-snug">
              1. Você acredita ter tido as mesmas oportunidades que outros participantes nesta trajetória?
            </label>
            <select
              value={p1}
              onChange={e => setP1(e.target.value)}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-bold text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition"
            >
              <option value="">— Selecione uma alternativa —</option>
              <option value="Sim, totalmente">Sim, totalmente</option>
              <option value="Parcialmente">Parcialmente (depende da origem)</option>
              <option value="Não, de forma alguma">Não, de forma alguma</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-black font-sans leading-snug">
              2. O resultado final refletiu apenas suas escolhas individuais ou a estrutura social pesou mais?
            </label>
            <select
              value={p2}
              onChange={e => setP2(e.target.value)}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-bold text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition"
            >
              <option value="">— Selecione uma alternativa —</option>
              <option value="Apenas escolhas individuais">Refletiu exclusivamente escolhas individuais</option>
              <option value="A estrutura social pesou mais">A estrutura social e ponto de partida pesaram mais</option>
              <option value="Ambos pesaram igualmente">Ambos pesaram igualmente</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="font-bold text-sm text-black font-sans leading-snug">
              3. O que mais impactou sua trajetória nesta simulação? (Em poucas palavras)
            </label>
            <textarea
              value={p3}
              onChange={e => setP3(e.target.value)}
              placeholder="Descreva o principal fator motivador ou desafiador..."
              rows={2}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-sans font-medium text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-sm text-black font-sans leading-snug">
              4. Como você se sentiu durante a experiência? (Sua percepção emocional)
            </label>
            <textarea
              value={p4}
              onChange={e => setP4(e.target.value)}
              placeholder="Exemplo: frustrado, motivado, pressionado, privilegiado..."
              rows={2}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-sans font-medium text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="bg-red-50 border border-red-500 text-red-700 text-xs font-bold uppercase p-3">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-[#1e1e1e] text-white border-4 border-black font-black uppercase text-sm tracking-widest py-3.5 hover:bg-[#c0392b] transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 transition cursor-pointer"
        >
          Enviar e Finalizar <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
