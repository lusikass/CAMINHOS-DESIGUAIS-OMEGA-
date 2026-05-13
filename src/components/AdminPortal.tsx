import { useState } from 'react';
import { Trial } from '../types';
import { Key, Save, Download, RefreshCw, AlertCircle, Sparkles, Filter, FileSpreadsheet, Trash2 } from 'lucide-react';

interface AdminPortalProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  aiModel: string;
  setAiModel: (m: string) => void;
  trials: Trial[];
  setTrials: (t: Trial[]) => void;
  onClose: () => void;
}

export default function AdminPortal({
  apiKey,
  setApiKey,
  aiModel,
  setAiModel,
  trials,
  setTrials,
  onClose,
}: AdminPortalProps) {
  const [localKey, setLocalKey] = useState(apiKey);
  const [localModel, setLocalModel] = useState(aiModel);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const saveConfig = () => {
    setApiKey(localKey);
    setAiModel(localModel);
    localStorage.setItem('bauhaus_api_key', localKey);
    localStorage.setItem('bauhaus_ai_model', localModel);
    setTestResult('Configuração salva com sucesso no navegador.');
    setTimeout(() => setTestResult(null), 3500);
  };

  const testConnection = async () => {
    if (!localKey) {
      setTestResult('Erro: Por favor, insira uma chave de API antes de testar.');
      return;
    }
    setTestingKey(true);
    setTestResult(null);

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localKey}`,
        },
        body: JSON.stringify({
          model: localModel || 'deepseek-v4-flash',
          max_tokens: 20,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: 'Say hello in 1 word.' }
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Erro HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || '(sem resposta)';
      setTestResult(`Conexão bem-sucedida! Resposta da IA: "${reply}"`);
    } catch (err: any) {
      setTestResult(`Erro na conexão: ${err.message || 'Verifique sua chave de API.'}`);
    } finally {
      setTestingKey(false);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(trials, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caminhos_desiguais_dados_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    const headers = [
      'ID', 'Data/Hora', 'Origem', 'Curso Conquistado', 'Conhecimento', 'Exaustão', 'Apoio Social',
      'Q1 (Pré)', 'Q2 (Pré)', 'Q3 (Pré)', 'Q1 (Pós)', 'Q2 (Pós)', 'Duração (segundos)'
    ];
    const rows = trials.map(t => [
      t.id,
      new Date(t.timestamp).toLocaleString('pt-BR'),
      t.game.path,
      t.game.course.name,
      t.game.finalStats.c,
      t.game.finalStats.e,
      t.game.finalStats.r,
      t.pre.p1, t.pre.p2, t.pre.p3,
      t.post.p1, t.post.p2,
      t.duration
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caminhos_desiguais_dados_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearTrials = () => {
    if (window.confirm('Tem certeza que deseja apagar todos os testes registrados? Esta ação é irreversível.')) {
      setTrials([]);
      localStorage.setItem('bauhaus_trials', JSON.stringify([]));
    }
  };

  const filteredTrials = trials.filter(t =>
    t.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.game.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.game.course.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn select-text overflow-y-auto">
      <div className="bg-white border-4 border-black w-full max-w-4xl p-6 shadow-[10px_10px_0px_#1e1e1e] flex flex-col gap-6 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b-4 border-black pb-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-black flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#c0392b]" /> PAINEL DO PESQUISADOR / ADMIN
            </h2>
            <p className="text-xs font-mono tracking-wider text-neutral-500 uppercase mt-1">
              Configurações de IA (DeepSeek) e Gestão de Dados Acadêmicos
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#c0392b] text-white border-2 border-black font-bold uppercase tracking-wider text-xs hover:bg-[#e8b84b] hover:text-black transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

        {/* Section 1: API Config */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#fdfaf4] border-2 border-black p-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-black uppercase tracking-tight flex items-center gap-2 border-b-2 border-black pb-1">
              <Key className="w-5 h-5 text-[#2c5f8a]" /> Configuração da API DeepSeek
            </h3>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-600 font-bold">
                Chave de API (DeepSeek API Key)
              </label>
              <input
                type="password"
                value={localKey}
                onChange={e => setLocalKey(e.target.value)}
                placeholder="sk-..."
                className="w-full border-2 border-black p-2 bg-[#f4f1ea] font-mono text-sm outline-none focus:border-[#2c5f8a]"
              />
              <p className="text-xs text-neutral-500 leading-relaxed font-sans">
                Obtenha sua chave gratuita em{' '}
                <a
                  href="https://platform.deepseek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2c5f8a] underline font-bold"
                >
                  platform.deepseek.com
                </a>
                . Novos accounts recebem 5M de tokens grátis. DeepSeek é código aberto (MIT License).
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-wider text-neutral-600 font-bold">
                Modelo de IA
              </label>
              <select
                value={localModel}
                onChange={e => setLocalModel(e.target.value)}
                className="w-full border-2 border-black p-2 bg-[#f4f1ea] font-sans font-bold text-sm outline-none focus:border-[#2c5f8a]"
              >
                <option value="deepseek-v4-flash">DeepSeek V4 Flash (Rápido / Econômico)</option>
                <option value="deepseek-v4-pro">DeepSeek V4 Pro (Máxima Qualidade)</option>
              </select>
              <p className="text-[10px] text-neutral-500 font-mono">
                V4 Flash: 12× mais barato, ideal para geração de fases. V4 Pro: melhor para análises complexas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={saveConfig}
                className="flex items-center justify-center gap-2 bg-[#1e1e1e] text-white border-2 border-black font-bold uppercase py-2 px-4 text-xs hover:bg-[#c0392b] transition cursor-pointer flex-1"
              >
                <Save className="w-4 h-4" /> Salvar Configuração
              </button>
              <button
                onClick={testConnection}
                disabled={testingKey}
                className="flex items-center justify-center gap-2 bg-[#e8b84b] text-black border-2 border-black font-bold uppercase py-2 px-4 text-xs hover:bg-[#d4a73a] transition cursor-pointer flex-1"
              >
                <RefreshCw className={`w-4 h-4 ${testingKey ? 'animate-spin' : ''}`} />
                {testingKey ? 'Testando...' : 'Testar Conexão'}
              </button>
            </div>

            {testResult && (
              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-400 p-2 text-xs font-mono text-yellow-800 animate-fadeIn select-text">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{testResult}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between p-2 border-2 border-dashed border-black/30 bg-[#f4f1ea]">
            <div>
              <h4 className="font-bold text-sm uppercase text-[#1e1e1e] tracking-tight">Status do Motor IA</h4>
              <ul className="text-xs space-y-2 mt-2 font-mono text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full border border-black ${apiKey ? 'bg-green-500' : 'bg-red-500'}`} />
                  IA Modo: {apiKey ? 'ATIVO (DeepSeek Real-time)' : 'INATIVO (Modo Estático)'}
                </li>
                <li>• Stats: Conhecimento / Exaustão / Apoio Social</li>
              <li>• Motor: DeepSeek (OpenAI-compatible)</li>
                <li>• Modelo Ativo: {aiModel || 'Nenhum'}</li>
                <li>• Dados coletados: {trials.length} testes</li>
                <li>• Licença: MIT (código aberto)</li>
              </ul>
            </div>

            <div className="mt-4 p-2 bg-white border border-black text-xs font-sans text-neutral-600 leading-relaxed italic">
              <strong>Nota acadêmica:</strong> DeepSeek é um modelo de IA de código aberto (MIT License), gratuito para uso acadêmico. O modo IA permite que consequências, dilemas e vereditos sejam gerados dinamicamente para cada resposta do participante.
            </div>
          </div>
        </div>

        {/* Section 2: Data Dashboard */}
        <div className="flex flex-col gap-4 border-2 border-black bg-[#fdfaf4] p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b-2 border-black pb-2">
            <h3 className="font-bold text-lg text-black uppercase tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#c0392b]" /> Dados dos Participantes
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={downloadJSON}
                disabled={trials.length === 0}
                className="flex items-center gap-2 border-2 border-black bg-[#2c5f8a] text-white text-xs font-bold uppercase px-3 py-1.5 hover:bg-[#1e1e1e] transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" /> Exportar JSON
              </button>
              <button
                onClick={downloadCSV}
                disabled={trials.length === 0}
                className="flex items-center gap-2 border-2 border-black bg-[#e8b84b] text-black text-xs font-bold uppercase px-3 py-1.5 hover:bg-[#d4a73a] transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FileSpreadsheet className="w-4 h-4" /> Exportar CSV
              </button>
              <button
                onClick={clearTrials}
                disabled={trials.length === 0}
                className="flex items-center gap-2 border-2 border-black bg-[#c0392b] text-white text-xs font-bold uppercase px-3 py-1.5 hover:bg-black transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" /> Limpar
              </button>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <Filter className="w-5 h-5 text-neutral-600" />
            <input
              type="text"
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              placeholder="Pesquisar por ID, Origem ou Curso conquistado..."
              className="w-full border-2 border-black p-2 text-sm bg-white outline-none focus:border-[#2c5f8a]"
            />
          </div>

          <div className="overflow-x-auto border border-black bg-white select-text">
            {filteredTrials.length === 0 ? (
              <p className="text-center py-6 font-mono text-xs text-neutral-400 font-bold uppercase">
                Nenhum participante registrado no momento.
              </p>
            ) : (
              <table className="w-full border-collapse text-left text-xs font-sans">
                <thead>
                  <tr className="bg-[#f4f1ea] border-b border-black font-mono font-bold text-black text-[11px] uppercase tracking-wider">
                    <th className="p-2 border-r border-black">ID do Teste</th>
                    <th className="p-2 border-r border-black">Data / Hora</th>
                    <th className="p-2 border-r border-black">Origem</th>
                    <th className="p-2 border-r border-black">Curso Conquistado</th>
                    <th className="p-2 border-r border-black">Stats Finais</th>
                    <th className="p-2">Tempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {filteredTrials.map(t => (
                    <tr key={t.id} className="hover:bg-neutral-50 transition">
                      <td className="p-2 border-r border-black font-mono text-neutral-800">{t.id}</td>
                      <td className="p-2 border-r border-black">{new Date(t.timestamp).toLocaleString('pt-BR')}</td>
                      <td className="p-2 border-r border-black font-bold uppercase">{t.game.path}</td>
                      <td className="p-2 border-r border-black font-bold text-[#2c5f8a] uppercase">{t.game.course.name}</td>
                      <td className="p-2 border-r border-black font-mono text-[10px]">
                        Con: {t.game.finalStats.c} | Exa: {t.game.finalStats.e} | Apo: {t.game.finalStats.r}
                      </td>
                      <td className="p-2 font-mono">{t.duration}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
