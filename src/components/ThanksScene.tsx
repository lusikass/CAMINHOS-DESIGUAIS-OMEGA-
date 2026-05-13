import { CheckCircle, RefreshCcw } from 'lucide-react';

interface ThanksSceneProps {
  trialId: string;
  onRestart: () => void;
}

export default function ThanksScene({ trialId, onRestart }: ThanksSceneProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-[#fdfaf4] border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_#1e1e1e] flex flex-col items-center justify-center text-center gap-6 animate-fadeIn select-text">
      <div className="w-16 h-16 bg-[#c0392b] border-4 border-black flex items-center justify-center text-[#e8b84b] select-none">
        <CheckCircle className="w-8 h-8" />
      </div>

      <div className="flex flex-col items-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
          Participação Registrada
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-black uppercase mt-2">
          Obrigado pela<br /><span className="text-[#c0392b]">sua</span> contribuição.
        </h2>
      </div>

      <p className="font-sans font-medium text-sm text-neutral-700 leading-relaxed max-w-sm">
        Seus dados de pesquisa foram computados de forma anônima e transparente. Os resultados agregados serão utilizados para análises em nossa Semana Acadêmica.
      </p>

      <div className="bg-black text-[#e8b84b] border-2 border-black font-mono font-bold text-xs px-5 py-2.5 uppercase tracking-widest my-2 select-all">
        ID de Registro: {trialId}
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 bg-[#f4f1ea] text-black border-4 border-black font-black uppercase text-sm tracking-widest px-8 py-3.5 hover:bg-black hover:text-white transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 transition cursor-pointer"
      >
        <RefreshCcw className="w-5 h-5" /> Iniciar Novo Teste
      </button>
    </div>
  );
}
