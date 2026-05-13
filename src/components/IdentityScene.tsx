import { useState } from 'react';
import { ArrowRight, User, Sparkles, ShieldAlert } from 'lucide-react';

interface IdentitySceneProps {
  onConfirm: (gender: string, race: string, comorbidity: string) => void;
}

const GENDERS = [
  'Homem Cisgênero',
  'Mulher Cisgênero',
  'Homem Transgênero',
  'Mulher Transgênero',
  'Não-binário',
  'Gênero Fluido',
  'Agênero',
  'Bigênero',
  'Pangênero',
  'Prefiro não informar',
];

const RACES = [
  'Branco',
  'Pardo',
  'Preto',
  'Indígena',
  'Amarelo',
  'Prefiro não informar',
];

const COMORBIDITIES = [
  'Nenhuma',
  'Deficiência Visual',
  'Deficiência Auditiva',
  'Deficiência Física',
  'TDAH',
  'TEA (Autismo)',
  'Transtorno de Ansiedade',
  'Depressão',
  'Transtorno Bipolar',
  'Doença Crônica (ex: diabetes, lúpus)',
  'Prefiro não informar',
];

export default function IdentityScene({ onConfirm }: IdentitySceneProps) {
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [comorbidity, setComorbidity] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!gender || !race || !comorbidity) {
      setError('Por favor, preencha todas as opções para continuar.');
      return;
    }
    setError('');
    onConfirm(gender, race, comorbidity);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fdfaf4] border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_#1e1e1e] flex flex-col gap-6 animate-fadeIn">

      {/* Header */}
      <div className="flex h-2 border border-black overflow-hidden">
        <div className="flex-1 bg-[#c0392b]" />
        <div className="flex-1 bg-[#e8b84b]" />
        <div className="flex-1 bg-[#2c5f8a]" />
        <div className="flex-1 bg-black" />
      </div>

      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#6b6560]">
          Identificação do Participante
        </p>
        <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none text-black uppercase mt-2">
          Quem é <span className="text-[#c0392b]">você</span>?
        </h2>
        <p className="text-sm font-sans font-medium text-neutral-600 leading-relaxed mt-2">
          Suas características vão moldar os desafios que você enfrentará na trajetória. Responda com honestidade — suas respostas são anônimas e servem apenas para personalizar a experiência.
        </p>
      </div>

      {/* Separação visual */}
      <div className="flex flex-col gap-6">

        {/* Gênero */}
        <div className="flex flex-col gap-3 border-2 border-black p-4 bg-white">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <User className="w-5 h-5 text-[#c0392b]" />
            <span className="font-black text-sm uppercase tracking-tight text-black">
              Identidade de Gênero
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`border-2 border-black py-2 px-3 text-xs font-bold uppercase tracking-wide text-left transition cursor-pointer
                  ${gender === g
                    ? 'bg-[#c0392b] text-white border-[#c0392b] shadow-[3px_3px_0_#1e1e1e]'
                    : 'bg-[#f4f1ea] text-black hover:bg-[#e8b84b] hover:border-black'
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Raça */}
        <div className="flex flex-col gap-3 border-2 border-black p-4 bg-white">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <Sparkles className="w-5 h-5 text-[#2c5f8a]" />
            <span className="font-black text-sm uppercase tracking-tight text-black">
              Raça / Etnia
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {RACES.map((r) => (
              <button
                key={r}
                onClick={() => setRace(r)}
                className={`border-2 border-black py-2 px-3 text-xs font-bold uppercase tracking-wide text-left transition cursor-pointer
                  ${race === r
                    ? 'bg-[#2c5f8a] text-white border-[#2c5f8a] shadow-[3px_3px_0_#1e1e1e]'
                    : 'bg-[#f4f1ea] text-black hover:bg-[#e8b84b] hover:border-black'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Comorbidades */}
        <div className="flex flex-col gap-3 border-2 border-black p-4 bg-white">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <ShieldAlert className="w-5 h-5 text-black" />
            <span className="font-black text-sm uppercase tracking-tight text-black">
              Comorbidades / Deficiências
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-sans leading-relaxed -mt-1">
            Selecione a condição que mais impacta sua vida escolar/acadêmica. Caso tenha mais de uma, selecione a principal.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMORBIDITIES.map((c) => (
              <button
                key={c}
                onClick={() => setComorbidity(c)}
                className={`border-2 border-black py-2 px-3 text-xs font-bold uppercase tracking-wide text-left transition cursor-pointer
                  ${comorbidity === c
                    ? 'bg-black text-white border-black shadow-[3px_3px_0_#c0392b]'
                    : 'bg-[#f4f1ea] text-black hover:bg-[#e8b84b] hover:border-black'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resumo das escolhas */}
      {(gender || race || comorbidity) && (
        <div className="bg-[#1e1e1e] text-white border-2 border-black p-4 flex flex-col gap-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#e8b84b]">
            Resumo das suas escolhas
          </span>
          <div className="grid grid-cols-3 gap-3 mt-1">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase">Gênero</span>
              <span className="font-bold text-xs text-white uppercase leading-tight">
                {gender || '—'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase">Raça</span>
              <span className="font-bold text-xs text-white uppercase leading-tight">
                {race || '—'}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] text-neutral-400 uppercase">Comorbidade</span>
              <span className="font-bold text-xs text-white uppercase leading-tight">
                {comorbidity || '—'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nota de privacidade */}
      <p className="text-xs text-neutral-500 font-sans leading-relaxed border-t border-black/20 pt-3">
        🔒 Suas respostas são 100% anônimas. Nenhum dado pessoal identificável é coletado. As respostas servem exclusivamente para personalizar a experiência do jogo e alimentar a pesquisa de forma agregada.
      </p>

      {/* Erro */}
      {error && (
        <p className="bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold uppercase p-3 tracking-wide">
          {error}
        </p>
      )}

      {/* Botão confirmar */}
      <button
        onClick={handleConfirm}
        className="flex items-center justify-center gap-2 bg-[#1e1e1e] text-white border-4 border-black font-black uppercase text-sm tracking-widest py-3.5 hover:bg-[#c0392b] transform hover:-translate-y-1 hover:shadow-[4px_4px_0_#1e1e1e] active:translate-y-0.5 transition cursor-pointer"
      >
        Confirmar e Sortear Classe Social <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
