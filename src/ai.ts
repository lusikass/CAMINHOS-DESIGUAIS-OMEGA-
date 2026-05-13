import { GameChoice, Phase } from './types';

/**
 * DeepSeek API — OpenAI-compatible format
 * Base URL: https://api.deepseek.com
 * Endpoint: /chat/completions
 * Auth: Bearer token
 */

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';

export async function callDeepSeekAI(
  apiKey: string,
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<string | null> {
  if (!apiKey || apiKey.trim().length === 0) return null;

  try {
    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-v4-flash',
        max_tokens: 1200,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '';
    // Strip markdown fences if present
    return raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  } catch (error) {
    console.error('DeepSeek AI call failed:', error);
    return null;
  }
}

export async function generateAIPhase(
  apiKey: string,
  model: string,
  pathName: string,
  pathKey: string,
  phaseIndex: number,
  totalPhases: number,
  stats: { c: number; e: number; r: number },
  choiceHistory: GameChoice[]
): Promise<Phase | null> {
  const PHASE_TAGS: Record<string, string[]> = {
    A: ['Educação Infantil', 'Ensino Fundamental', 'Capital Cultural', 'Ensino Médio', 'Escolha do Curso', 'Reta Final', 'O Dia do ENEM'],
    B: ['Educação Infantil', 'Ensino Fundamental', 'Desenvolvimento Pessoal', 'Ensino Médio', 'Escolha do Curso', 'Reta Final', 'O Dia do ENEM'],
    C: ['Educação Infantil', 'Ensino Fundamental', 'Sobrevivência', 'Ensino Médio', 'Dilema', 'Reta Final', 'O Dia do ENEM'],
    D: ['Educação Infantil', 'Ensino Fundamental', 'Equilíbrio Financeiro', 'Ensino Médio', 'Dilema Moderado', 'Reta Final', 'O Dia do ENEM'],
    E: ['Educação Infantil', 'Ensino Fundamental', 'Sobrevivência Diária', 'Ensino Médio', 'Escolha Limitada', 'Preparação Mínima', 'O Dia do ENEM'],
  };

  const currentTag = PHASE_TAGS[pathKey]?.[phaseIndex] || 'Trajetória Social';

  const system = `Você é o motor narrativo do experimento sociológico "Caminhos Desiguais" — um jogo sério sobre desigualdade educacional no Brasil.
Responda APENAS com JSON válido, sem texto adicional, sem markdown fences.

Regras de design de jogo:
- Origem "${pathName}" (${pathKey === 'A' ? 'elite socioeconômica' : pathKey === 'B' ? 'classe média alta' : pathKey === 'C' ? 'baixa renda/vulnerabilidade' : pathKey === 'D' ? 'classe média baixa' : 'baixa renda extrema'})
- Fase ${phaseIndex + 1} de ${totalPhases}: tag obrigatória = "${currentTag}"
- Stats atuais do jogador: Conhecimento=${stats.c}/100, Exaustão=${stats.e}/100, Apoio Social=${stats.r}/100
- Gere exatamente 4 opções realistas e distintas para a origem "${pathName}"
- Cada opção tem modificadores de stats: use {c, e, r} sendo c=conhecimento, e=exaustão, r=apoio social
- Valores de modificadores devem ser INTEIROS entre -20 e +35. Nunca zeros em todas as chaves — cada opção deve ter impacto real.
- O "fato de pesquisa" deve citar dado real do IBGE, INEP, Bourdieu, Heckman, PNAD ou literatura sobre desigualdade educacional brasileira.
- title: máx 4 palavras. desc: 2-3 frases vívidas e realistas. fact: 1 frase com dado específico.`;

  const user = `Histórico de escolhas do jogador até agora: ${choiceHistory.length > 0 ? choiceHistory.map(c => `Fase ${c.phase}: "${c.choice}"`).join(', ') : 'nenhuma ainda'}.
Gere a fase ${phaseIndex + 1}. Retorne JSON neste formato exato:
{
  "tag": "string",
  "title": "string",
  "desc": "string",
  "fact": "string",
  "choices": [
    {"n": "string", "m": {"c": number, "e": number, "r": number}},
    {"n": "string", "m": {"c": number, "e": number, "r": number}},
    {"n": "string", "m": {"c": number, "e": number, "r": number}},
    {"n": "string", "m": {"c": number, "e": number, "r": number}}
  ]
}`;

  const raw = await callDeepSeekAI(apiKey, model, system, user);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.choices || parsed.choices.length < 2) return null;
    return parsed;
  } catch (err) {
    console.error('Failed to parse AI Phase JSON:', err);
    return null;
  }
}

export async function generateAIConsequence(
  apiKey: string,
  model: string,
  pathName: string,
  choiceMade: string,
  stats: { c: number; e: number; r: number },
  phaseTag: string
): Promise<string | null> {
  const system = `Você é o narrador do experimento "Caminhos Desiguais". Escreva UMA frase curta e impactante (máx 25 palavras, em português) descrevendo a consequência imediata da escolha do jogador. Tom: jornalístico, direto, sem julgamento moral. Responda APENAS com a frase, sem aspas, sem JSON.`;
  const user = `Origem: ${pathName}. Fase: ${phaseTag}. Escolha: "${choiceMade}". Stats após: Conhecimento=${stats.c}, Exaustão=${stats.e}, Apoio Social=${stats.r}.`;
  return await callDeepSeekAI(apiKey, model, system, user);
}

export async function generateAIVerdict(
  apiKey: string,
  model: string,
  pathName: string,
  choiceHistory: GameChoice[],
  stats: { c: number; e: number; r: number }
): Promise<string | null> {
  const system = `Você é um sociólogo analisando a trajetória de um participante no experimento "Caminhos Desiguais". Escreva UM parágrafo analítico (4-6 frases, em português) conectando as escolhas feitas com os resultados obtidos, destacando como a estrutura social moldou as possibilidades — não apenas as decisões individuais. Referencie 1-2 escolhas específicas feitas. Tom: acadêmico-acessível, empático, revelador. Responda APENAS com o parágrafo, sem título, sem JSON.`;
  const user = `Origem: ${pathName}. Escolhas: ${choiceHistory.map(c => `[Fase ${c.phase + 1} - ${c.choice}]`).join(' → ')}. Stats finais: Conhecimento=${stats.c}/100, Exaustão=${stats.e}/100, Apoio Social=${stats.r}/100.`;
  return await callDeepSeekAI(apiKey, model, system, user);
}
