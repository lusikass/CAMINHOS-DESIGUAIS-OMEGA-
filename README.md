# Caminhos Desiguais — v13.0

Jogo-pesquisa para a Semana Acadêmica sobre desigualdade educacional no Brasil.

---

## 🔗 Como conectar com o Google Sheets (VERSÃO ATUALIZADA E ROBUSTA)

### Passo 1: Atualizar o código do Apps Script

1. Abra sua planilha do Google Sheets
2. Vá em **Extensões → Apps Script**
3. **APAGUE TUDO** que está no editor
4. **Cole o código abaixo** (versão robusta v2):

```javascript
// ====================================================
// CAMINHOS DESIGUAIS — Apps Script v2 (Robusto)
// ====================================================

const HEADERS = [
  'ID', 'Data/Hora', 'Duração (s)', 'Modo IA',
  'Pré Q1 (Esforço)', 'Pré Q2 (Sistema Justo)', 'Pré Q3 (Cotas)',
  'Gênero', 'Raça/Etnia', 'Comorbidade',
  'Classe Sorteada', 'Nome da Classe',
  'Conhecimento', 'Exaustão', 'Apoio Social',
  'Curso Conquistado', 'Descrição do Curso',
  'Veredito IA',
  'Pós Q1 (Oportunidades)', 'Pós Q2 (Escolhas vs Estrutura)',
  'Pós Q3 (O que impactou)', 'Pós Q4 (Como se sentiu)',
  'Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6', 'Fase 7'
];

const FIELD_ORDER = [
  'id', 'timestamp', 'duration', 'aiMode',
  'pre_q1', 'pre_q2', 'pre_q3',
  'gender', 'race', 'comorbidity',
  'path_key', 'path_name',
  'stat_conhecimento', 'stat_exaustao', 'stat_apoio',
  'course_name', 'course_desc',
  'verdict',
  'post_q1', 'post_q2', 'post_q3', 'post_q4',
  'fase_1', 'fase_2', 'fase_3', 'fase_4', 'fase_5', 'fase_6', 'fase_7'
];

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#1e1e1e')
      .setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);

    const data = JSON.parse(e.postData.contents);

    // Monta a linha respeitando a ordem dos campos
    const row = FIELD_ORDER.map(function (key) {
      const value = data[key];
      if (value === undefined || value === null) return '';
      return value;
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', received: data.id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Loga o erro na planilha para facilitar debug
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.appendRow(['ERRO: ' + err.toString(), new Date().toLocaleString('pt-BR')]);
    } catch (e2) {}

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Caminhos Desiguais — Endpoint ativo. Use POST para enviar dados.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Função opcional: limpar todos os dados (use no editor do Apps Script se precisar)
function limparPlanilha() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
}
```

### Passo 2: Salvar o código

1. Clique no ícone de **disquete 💾** (ou Ctrl+S)
2. Dê um nome ao projeto se pedir (ex: `Caminhos Desiguais API`)

### Passo 3: ⚠️ MUITO IMPORTANTE — Republicar como Nova Implantação

**Esse é o passo que costuma ser esquecido!** Toda vez que você edita o código, precisa criar uma NOVA implantação.

1. Clique em **Implantar → Gerenciar implantações** (no canto superior direito)
2. Vai aparecer uma lista com a implantação antiga
3. Clique no ícone de **lápis (editar)** ao lado dela
4. Em **Versão**, clique no dropdown e escolha **Nova versão**
5. Em **Descrição**, escreva: `v2 - 29 colunas`
6. Clique em **Implantar**
7. A URL **continua a mesma** — você não precisa atualizar nada no jogo

**⚠️ Não crie uma "Nova implantação" do zero** (isso geraria uma URL diferente). Use **"Gerenciar implantações" → "Editar"** para manter a mesma URL.

### Passo 4: Limpar a planilha (recomendado)

Como você teve dados quebrados antes, recomendo limpar e começar do zero:

**Opção A — Pelo Apps Script:**
1. No editor do Apps Script, selecione a função **`limparPlanilha`** no menu suspenso (em cima)
2. Clique em **Executar ▶️**
3. Autorize quando pedir

**Opção B — Manualmente:**
1. Vá na planilha
2. Selecione todas as células (Ctrl+A)
3. Tecle **Delete**

### Passo 5: Testar

1. Abra o jogo no Vercel
2. Clique em **Admin / Dados da Pesquisa**
3. Role até **Integração com Google Sheets**
4. Clique em **Enviar Linha de Teste**
5. Volte na planilha — deve aparecer **uma linha completa com 29 colunas**, incluindo os cabeçalhos em preto na primeira linha

---

## 🐛 Resolução de Problemas

### "Só aparecem 4 colunas"
Significa que o Apps Script antigo ainda está rodando. Siga o **Passo 3** (republicar como nova implantação) com cuidado.

### "Aparece a linha 'ERRO: ...' na planilha"
O script encontrou um erro. Verifique a mensagem exibida na linha.

### "Linha de teste não aparece"
- Confirme que a URL no campo termina com `/exec`
- Confirme que "Quem pode acessar" está como **Qualquer pessoa**
- Tente abrir a URL no navegador — deve mostrar "Caminhos Desiguais — Endpoint ativo"

### "Dados aparecem todos juntos em uma célula"
Significa que o script está antigo. Atualize seguindo o Passo 3.

---

## 🧠 Sobre a IA DeepSeek

O jogo usa a API do DeepSeek (compatível com OpenAI) para gerar:
- Fases dinâmicas personalizadas
- Consequências narrativas das escolhas
- Veredito sociológico final

A chave da API está embutida no código para que a IA funcione automaticamente para todos os participantes.

---

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

## 📦 Como fazer build para produção

```bash
npm run build
```

Os arquivos prontos ficam na pasta `dist`.
