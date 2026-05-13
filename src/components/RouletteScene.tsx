import { useEffect, useState } from 'react';
import { ArrowRight, Shuffle } from 'lucide-react';

interface RouletteSceneProps {
  gender: string;
  race: string;
  comorbidity: string;
  onSpinEnd: (pathKey: string) => void;
}

export default function RouletteScene({ gender, race, comorbidity, onSpinEnd }: RouletteSceneProps) {
  const [spinning, setSpinning] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [revealReady, setRevealReady] = useState(false);

  const options = [
    { k: 'A', name: 'Elite Herdeira', color: 'text-[#2c5f8a]', desc: 'Origem privilegiada de alta renda e conexões sociais sólidas.' },
    { k: 'B', name: 'Classe Média Alta', color: 'text-[#2c5f8a]', desc: 'Boa infraestrutura educacional e apoio familiar constante.' },
    { k: 'C', name: 'Base Vulnerável', color: 'text-[#c0392b]', desc: 'Recursos escassos, trabalho juvenil precoce e desafios constantes.' },
    { k: 'D', name: 'Classe Média Baixa', color: 'text-[#e8b84b]', desc: 'Sustento moderado, conciliação entre estudos e apoio familiar.' },
    { k: 'E', name: 'Classe Baixa Extrema', color: 'text-[#c0392b]', desc: 'Barreiras severas de sobrevivência, baixa infraestrutura escolar.' }
  ];

  useEffect(() => {
    // Weighted draw: C e D têm maior probabilidade (refletindo realidade brasileira)
    const keys = ['A', 'B', 'C', 'D', 'E'];
    const weights = [10, 20, 35, 25, 10];

    const pickWeighted = () => {
      const total = weights.reduce((a, b) => a + b, 0);
      let rand = Math.random() * total;
      for (let i = 0; i < keys.length; i++) {
        rand -= weights[i];
        if (rand <= 0) return keys[i];
      }
      return keys[keys.length - 1];
    };

    setSelectedKey(pickWeighted());

    const timeout = setTimeout(() => {
      setSpinning(false);
      setRevealReady(true);
    }, 3200);

    return () => clearTimeout(timeout);
  }, []);

  const currentOption = options.find(o => o.k === selectedKey) || options[0];

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fdfaf4] border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#1e1e1e] flex flex-col items-center text-center gap-6 animate-fadeIn min-h-[420px]">

      {/* Identidade confirmada (resumo) */}
      <div className="w-full bg-[#1e1e1e] border-2 border-black p-3 grid grid-cols-3 gap-2 text-left">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-[#e8b84b] uppercase tracking-wider">Gênero</span>
          <span className="font-bold text-xs text-white uppercase leading-tight">{gender}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-[#e8b84b] uppercase tracking-wider">Raça</span>
          <span className="font-bold text-xs text-white uppercase leading-tight">{race}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-[#e8b84b] uppercase tracking-wider">Comorbidade</span>
          <span className="font-bold text-xs text-white uppercase leading-tight">{comorbidity}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
          Sorteio de Classe Social
        </p>
        <p className="text-sm font-sans font-medium text-black max-w-md leading-relaxed">
          A sua origem socioeconômica é o único fator que será determinado pelo acaso — assim como na vida real.
        </p>
      </div>

      {/* Roleta animada */}
      <div className="relative w-40 h-40 flex items-center justify-center select-none">
        {spinning ? (
          <>
            <div className="absolute inset-0 border-8 border-black border-t-[#c0392b] border-r-[#e8b84b] border-b-[#2c5f8a] rounded-full animate-spin" />
            <div className="absolute inset-4 border-4 border-black border-dashed rounded-full animate-ping opacity-40" />
            <Shuffle className="w-10 h-10 text-black animate-pulse" />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full border-8 border-black bg-white rounded-full text-5xl font-black text-black select-none animate-bounce">
            {selectedKey}
          </div>
        )}
      </div>

      {/* Reveal */}
      {revealReady && (
        <div className="flex flex-col items-center gap-4 animate-scaleUp w-full">
          <div className="flex flex-col items-center border-2 border-black p-4 bg-white w-full shadow-[4px_4px_0_#1e1e1e]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6b6560]">
              Sua Origem Socioeconômica:
            </span>
            <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mt-1 ${currentOption.color}`}>
              {currentOption.name}
            </h3>
            <p className="text-xs font-sans font-bold text-neutral-600 max-w-md mt-2 leading-normal">
              {currentOption.desc}
            </p>

            {/* Combinação completa */}
            <div className="mt-3 pt-3 border-t border-black/20 w-full">
              <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider text-center mb-2">
                Sua identidade completa para esta trajetória:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-[#c0392b] text-white font-bold text-[10px] uppercase px-2 py-1 border border-black">
                  {gender}
                </span>
                <span className="bg-[#2c5f8a] text-white font-bold text-[10px] uppercase px-2 py-1 border border-black">
                  {race}
                </span>
                <span className="bg-black text-white font-bold text-[10px] uppercase px-2 py-1 border border-black">
                  {comorbidity}
                </span>
                <span className={`text-white font-bold text-[10px] uppercase px-2 py-1 border border-black ${
                  selectedKey === 'A' || selectedKey === 'B' ? 'bg-[#2c5f8a]' : 'bg-[#c0392b]'
                }`}>
                  {currentOption.name}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSpinEnd(selectedKey)}
            className="flex items-center justify-center gap-2 bg-black text-white border-4 border-black font-black uppercase text-sm tracking-widest px-8 py-3.5 hover:bg-[#c0392b] transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 transition cursor-pointer mt-1"
          >
            Iniciar Trajetória <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
