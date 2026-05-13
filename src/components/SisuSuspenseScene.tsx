import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SisuSuspenseSceneProps {
  onComplete: () => void;
}

export default function SisuSuspenseScene({ onComplete }: SisuSuspenseSceneProps) {
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'Enviando suas escolhas e histórico social para o Sisu...',
    'Cruzando dados do INEP com o ponto de partida do jogador...',
    'Calculando notas ponderadas de Redação, Linguagens, Humanas e Exatas...',
    'Computando bonificação de cotas / ampla concorrência...',
    'Gerando o resultado do processo seletivo da universidade pública...'
  ];

  useEffect(() => {
    if (logIndex < logs.length) {
      const timer = setTimeout(() => {
        setLogIndex(logIndex + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [logIndex, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fdfaf4] border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_#1e1e1e] flex flex-col items-center justify-center text-center gap-6 animate-fadeIn min-h-[380px]">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
        SISU — Sistema de Seleção Unificada
      </p>

      {/* Animation Geo Bar */}
      <div className="flex gap-1.5 items-end h-16 my-2 select-none">
        <div className="w-3 bg-black h-8 animate-pulse duration-1000" />
        <div className="w-3 bg-[#c0392b] h-12 animate-pulse duration-700 delay-100" />
        <div className="w-3 bg-black h-16 animate-pulse duration-1200 delay-200" />
        <div className="w-3 bg-[#2c5f8a] h-10 animate-pulse duration-800 delay-300" />
        <div className="w-3 bg-black h-6 animate-pulse duration-1500 delay-400" />
        <div className="w-3 bg-[#e8b84b] h-14 animate-pulse duration-1100 delay-500" />
      </div>

      <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none text-black uppercase">
        Processando nota<br />de corte e vagas...
      </h2>

      <div className="flex flex-col gap-3 font-mono text-xs font-bold text-[#6b6560] tracking-wider uppercase h-10 mt-2">
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-black" />
          {logs[logIndex] || 'Análise sociológica concluída.'}
        </span>
      </div>
    </div>
  );
}
