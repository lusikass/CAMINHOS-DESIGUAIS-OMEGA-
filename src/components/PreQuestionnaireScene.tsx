import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface PreQuestionnaireSceneProps {
  onSave: (q: { p1: string; p2: string; p3: string }) => void;
}

export default function PreQuestionnaireScene({ onSave }: PreQuestionnaireSceneProps) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!p1 || !p2 || !p3) {
      setError('Por favor, responda todas as perguntas para avançar na pesquisa.');
      return;
    }
    setError('');
    onSave({ p1, p2, p3 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fdfaf4] border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#1e1e1e] flex flex-col gap-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
          Levantamento Prévio
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none text-black uppercase">
        Sua visão inicial sobre a <span className="text-[#2c5f8a]">meritocracia</span>
      </h2>

      <div className="flex flex-col gap-5 my-2">
        {/* Question 1 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base text-black flex items-start gap-3">
            <span className="text-4xl font-black text-[#e8b84b] leading-none select-none">1</span>
            <span>O sucesso na carreira depende principalmente de esforço individual?</span>
          </label>
          <div className="relative">
            <select
              value={p1}
              onChange={e => setP1(e.target.value)}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-bold text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition"
            >
              <option value="">— Selecione uma alternativa —</option>
              <option value="Sim, totalmente">Sim, depende exclusivamente de esforço</option>
              <option value="Parcialmente">Parcialmente (esforço e circunstâncias)</option>
              <option value="Não, depende de outros fatores">Não, depende principalmente de privilégios</option>
            </select>
          </div>
        </div>

        {/* Question 2 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base text-black flex items-start gap-3">
            <span className="text-4xl font-black text-[#c0392b] leading-none select-none">2</span>
            <span>O sistema educacional atual oferece oportunidades iguais a todos?</span>
          </label>
          <div className="relative">
            <select
              value={p2}
              onChange={e => setP2(e.target.value)}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-bold text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition"
            >
              <option value="">— Selecione uma alternativa —</option>
              <option value="Sim, é justo">Sim, o sistema é meritocrático e justo</option>
              <option value="Parcialmente justo">Parcialmente justo, mas com falhas</option>
              <option value="Não, é desigual">Não, é desigual e excludente</option>
            </select>
          </div>
        </div>

        {/* Question 3 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base text-black flex items-start gap-3">
            <span className="text-4xl font-black text-[#2c5f8a] leading-none select-none">3</span>
            <span>Qual é a sua opinião sobre políticas de cotas nas universidades?</span>
          </label>
          <div className="relative">
            <select
              value={p3}
              onChange={e => setP3(e.target.value)}
              className="w-full border-2 border-black p-3 bg-[#f4f1ea] font-bold text-sm outline-none focus:border-[#2c5f8a] focus:bg-white transition"
            >
              <option value="">— Selecione uma alternativa —</option>
              <option value="Totalmente a favor">Totalmente a favor (fundamental para reparação)</option>
              <option value="Neutro / sem opinião">Neutro / Sem opinião formada</option>
              <option value="Totalmente contra">Totalmente contra (deveria focar apenas no mérito)</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <p className="bg-red-50 border border-red-500 text-red-700 text-xs font-bold uppercase p-3 tracking-wide">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="flex items-center justify-center gap-2 bg-[#1e1e1e] text-white border-4 border-black font-black uppercase text-sm tracking-widest py-3.5 hover:bg-[#c0392b] transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 transition cursor-pointer"
      >
        Iniciar Trajetória <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
