import { ArrowRight, Flame } from 'lucide-react';

interface ConsentSceneProps {
  onAccept: () => void;
  onReject: () => void;
  onOpenAdmin: () => void;
  aiActive: boolean;
}

export default function ConsentScene({ onAccept, onReject, onOpenAdmin, aiActive }: ConsentSceneProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fdfaf4] border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#1e1e1e] flex flex-col gap-6 animate-fadeIn">
      {/* Visual Stripes */}
      <div className="flex h-3 border border-black overflow-hidden">
        <div className="flex-1 bg-[#c0392b]" />
        <div className="flex-1 bg-[#e8b84b]" />
        <div className="flex-1 bg-[#2c5f8a]" />
        <div className="flex-1 bg-black" />
      </div>

      <div className="flex justify-between items-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
          Termo de Participação
        </p>
        <button
          onClick={onOpenAdmin}
          className="px-3 py-1 font-mono text-[10px] font-bold bg-[#f4f1ea] border-2 border-black uppercase text-black hover:bg-black hover:text-white transition cursor-pointer"
        >
          {aiActive ? 'IA Ativa (Configurar)' : 'Modo Estático (Configurar)'}
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-black uppercase select-none">
        Você está prestes a atravessar <span className="text-[#c0392b]">7 fases</span> da vida.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-black bg-[#f4f1ea] p-4 my-2">
        <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-black/20 pb-3 md:pb-0 md:pr-4">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#6b6560] uppercase">
            Objetivo
          </span>
          <p className="text-sm font-sans font-medium text-black leading-relaxed">
            Investigar o impacto da desigualdade estrutural no acesso ao ensino superior brasileiro.
          </p>
        </div>

        <div className="flex flex-col gap-1 md:pl-2">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#6b6560] uppercase">
            A Experiência
          </span>
          <p className="text-sm font-sans font-medium text-black leading-relaxed">
            Tomará decisões cruciais ao longo de uma trajetória gerada dinamicamente até o ENEM / Sisu.
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-black/20 pt-3 md:pr-4">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#6b6560] uppercase">
            Privacidade
          </span>
          <p className="text-sm font-sans font-medium text-black leading-relaxed">
            Coleta 100% anônima e transparente. Nenhum dado pessoal identificável é solicitado.
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-black/20 pt-3 md:pl-2">
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#6b6560] uppercase">
            Importância
          </span>
          <p className="text-sm font-sans font-medium text-black leading-relaxed">
            Os dados gerados apoiarão a formulação de pesquisas sobre mobilidade social na universidade.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-[#fdfaf4] p-3 border border-dashed border-black/40 text-xs leading-relaxed text-[#6b6560]">
        <Flame className="w-4 h-4 text-[#c0392b] flex-shrink-0 mt-0.5" />
        <p>
          Ao clicar em Aceito Participar, você consente formalmente com o uso anônimo dos dados agregados para fins de pesquisa acadêmica, conforme os preceitos da LGPD.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onAccept}
          className="sm:col-span-2 flex items-center justify-center gap-2 bg-[#e8b84b] text-black border-4 border-black font-black uppercase text-sm tracking-widest py-3.5 hover:bg-[#1e1e1e] hover:text-white hover:border-[#1e1e1e] transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 active:shadow-none transition duration-150 cursor-pointer"
        >
          Aceito Participar <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={onReject}
          className="flex items-center justify-center gap-2 bg-white text-black border-4 border-black font-black uppercase text-sm tracking-widest py-3.5 hover:bg-[#c0392b] hover:text-white hover:border-[#c0392b] transition cursor-pointer"
        >
          Não aceito
        </button>
      </div>
    </div>
  );
}
