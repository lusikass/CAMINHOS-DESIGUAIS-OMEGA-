import { Trial } from './types';

/**
 * Envia os dados do experimento para uma planilha Google Sheets
 * via Google Apps Script Web App.
 *
 * Como funciona:
 * 1. O usuário cria uma planilha no Google Sheets
 * 2. Cola um Apps Script especial (instruções no README)
 * 3. Publica o script como Web App
 * 4. Cola a URL gerada na variável SHEETS_URL abaixo (ou no painel Admin)
 */

// URL fixa do Apps Script (preenchida pelo pesquisador)
// Todos os dispositivos enviarão automaticamente para esta planilha
const SHEETS_URL_DEFAULT = 'https://script.google.com/macros/s/AKfycbxsls7ufiTO8KqoHBNuLySWu-5Iji6SB5v0jIQ4V_orrey8xw88GkB9SCBTjhdJKoIo/exec';

export function getSheetsUrl(): string {
  // Prioridade: localStorage > variável fixa
  const stored = localStorage.getItem('bauhaus_sheets_url');
  if (stored && stored.trim().length > 0) return stored;
  return SHEETS_URL_DEFAULT;
}

export async function sendTrialToSheets(trial: Trial): Promise<boolean> {
  const url = getSheetsUrl();
  if (!url || url.trim().length === 0) {
    console.warn('[Sheets] URL não configurada — dados salvos apenas localmente.');
    return false;
  }

  try {
    // Estrutura achatada (flat) para casar com as colunas da planilha
    const choices = trial.game.choices || [];
    const payload = {
      id: trial.id,
      timestamp: new Date(trial.timestamp).toLocaleString('pt-BR'),
      duration: trial.duration,
      aiMode: trial.game.aiMode ? 'Sim' : 'Não',

      pre_q1: trial.pre.p1,
      pre_q2: trial.pre.p2,
      pre_q3: trial.pre.p3,

      gender: trial.game.gender,
      race: trial.game.race,
      comorbidity: trial.game.comorbidity,

      path_key: trial.game.pathKey,
      path_name: trial.game.path,

      stat_conhecimento: trial.game.finalStats.c,
      stat_exaustao: trial.game.finalStats.e,
      stat_apoio: trial.game.finalStats.r,

      course_name: trial.game.course?.name || '',
      course_desc: trial.game.course?.desc || '',

      verdict: trial.game.verdict || '',

      post_q1: trial.post.p1,
      post_q2: trial.post.p2,
      post_q3: trial.post.p3,
      post_q4: trial.post.p4,

      // Escolhas das 7 fases
      fase_1: choices[0]?.choice || '',
      fase_2: choices[1]?.choice || '',
      fase_3: choices[2]?.choice || '',
      fase_4: choices[3]?.choice || '',
      fase_5: choices[4]?.choice || '',
      fase_6: choices[5]?.choice || '',
      fase_7: choices[6]?.choice || '',
    };

    // Apps Script: usamos no-cors com text/plain para evitar preflight CORS
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    console.log('[Sheets] Dados enviados com sucesso.');
    return true;
  } catch (err) {
    console.error('[Sheets] Falha ao enviar:', err);
    return false;
  }
}
