import { Origin } from './types';

export const STATIC: Record<string, Origin> = {
  A: {
    name: 'Elite Herdeira',
    key: 'A',
    stats: { c: 65, e: 10, r: 70 },
    phases: [
      {
        tag: 'Educação Infantil',
        title: 'Primeiros Anos',
        desc: 'Acesso a creches bilíngues, estimulação precoce e viagens culturais. O ambiente doméstico é repleto de livros e estímulos.',
        fact: 'Heckman: O retorno sobre investimento na primeira infância chega a 13% ao ano.',
        choices: [
          { n: 'Creche Particular Bilíngue', m: { c: 20, r: 15 } },
          { n: 'Tutores Domiciliares', m: { c: 18, r: 10 } },
          { n: 'Viagens Culturais', m: { c: 25, r: 20 } },
          { n: 'Esportes de Elite', m: { c: 10, r: 15 } }
        ]
      },
      {
        tag: 'Ensino Fundamental',
        title: 'A Escola Certa',
        desc: 'Escolas com infraestrutura de ponta, laboratórios modernos e professores altamente qualificados.',
        fact: 'O gasto por aluno em escolas privadas de elite é até 10× superior à média pública.',
        choices: [
          { n: 'Escola de Referência Nacional', m: { c: 22, r: 15 } },
          { n: 'Intercâmbio de Férias', m: { c: 15, r: 22 } },
          { n: 'Aulas de Piano e Artes', m: { c: 12, r: 10 } },
          { n: 'Segunda Língua Fluente', m: { c: 14, r: 18 } }
        ]
      },
      {
        tag: 'Conhecimento & Cultura',
        title: 'Construindo Repertório',
        desc: 'Museus, teatros e networking em eventos seletos. O conhecimento e o repertório cultural acumulam-se silenciosamente.',
        fact: 'Bourdieu: O conhecimento e capital cultural herdado facilita o acesso a posições privilegiadas no campo educacional.',
        choices: [
          { n: 'Museus Internacionais', m: { c: 25, r: 15 } },
          { n: 'Teatro e Cinema Semanal', m: { c: 15, r: 10 } },
          { n: 'Networking em Clubes', m: { c: 10, r: 28 } },
          { n: 'Leituras de Clássicos', m: { c: 22, r: 5 } }
        ]
      },
      {
        tag: 'Ensino Médio',
        title: 'A Corrida pelo Topo',
        desc: 'Foco total na preparação. Cursinhos de elite, simulados e acompanhamento psicológico.',
        fact: 'Candidatos de alta renda ocupam 80% das vagas nos cursos de alta concorrência das federais.',
        choices: [
          { n: 'Cursinho de Elite', m: { c: 28, e: 15 } },
          { n: 'Aulas Particulares', m: { c: 22, e: 10 } },
          { n: 'Simulados Intensivos', m: { c: 18, e: 20 } },
          { n: 'Apoio Psicológico', m: { c: 12, e: -12 } }
        ]
      },
      {
        tag: 'Escolha do Curso',
        title: 'Liberdade de Escolher',
        desc: 'Sem pressão financeira, você escolhe por vocação. A família apoia qualquer decisão.',
        fact: 'A liberdade de escolha vocacional é um privilégio estrutural.',
        choices: [
          { n: 'Medicina', m: { c: 32, e: 22 } },
          { n: 'Direito', m: { c: 28, e: 16 } },
          { n: 'Engenharia', m: { c: 26, e: 18 } },
          { n: 'Relações Internacionais', m: { c: 18, e: 6 } }
        ]
      },
      {
        tag: 'Reta Final',
        title: 'Os Últimos Meses',
        desc: 'Preparação em ambiente controlado. Você dorme bem, come bem, estuda com foco total.',
        fact: 'Estabilidade emocional pré-prova aumenta o desempenho cognitivo em até 40%.',
        choices: [
          { n: 'Imersão Total', m: { c: 22, e: 28 } },
          { n: 'Revisão Leve com Lazer', m: { c: 14, e: 5 } },
          { n: 'Foco em Redação', m: { c: 20, e: 16 } },
          { n: 'Simulados Finais', m: { c: 16, e: 12 } }
        ]
      },
      {
        tag: 'O Dia do ENEM',
        title: 'Hora H',
        desc: 'Chegou de carro, descansado, após boa noite de sono. O local fica a 10 minutos.',
        fact: 'Conforto logístico reduz significativamente a ansiedade pré-prova.',
        choices: [
          { n: 'Ir de Carro', m: { c: 12, e: -12 } },
          { n: 'Alimentação Balanceada', m: { c: 6, e: -6 } },
          { n: 'Confiança na Base', m: { c: 16, e: 0 } },
          { n: 'Técnicas de Respiração', m: { c: 8, e: -16 } }
        ]
      }
    ]
  },
  B: {
    name: 'Classe Média Alta',
    key: 'B',
    stats: { c: 45, e: 20, r: 50 },
    phases: [
      {
        tag: 'Educação Infantil',
        title: 'Boa Base',
        desc: 'Creches particulares de qualidade, atividades extracurriculares e suporte familiar constante.',
        fact: 'Investimento precoce em educação gera retorno de até 17% ao ano.',
        choices: [
          { n: 'Creche Particular', m: { c: 18, e: 8 } },
          { n: 'Atividades Culturais', m: { c: 15, r: 12 } },
          { n: 'Aulas de Música', m: { c: 12, r: 10 } },
          { n: 'Esportes Organizados', m: { c: 10, e: 5 } }
        ]
      },
      {
        tag: 'Ensino Fundamental',
        title: 'Escola de Qualidade',
        desc: 'Escola particular com bom currículo, professores qualificados e infraestrutura adequada.',
        fact: 'Escolas particulares têm taxa de aprovação 20% superior à média nacional.',
        choices: [
          { n: 'Escola Particular', m: { c: 20, e: 10 } },
          { n: 'Reforço Escolar', m: { c: 16, e: 8 } },
          { n: 'Clubes de Ciência', m: { c: 14, r: 15 } },
          { n: 'Viagens Educativas', m: { c: 12, r: 18 } }
        ]
      },
      {
        tag: 'Desenvolvimento Pessoal',
        title: 'Construindo Habilidades',
        desc: 'Cursos de idiomas, artes e esportes. Rede social começa a se formar.',
        fact: 'Atividades extracurriculares aumentam o conhecimento e repertório cultural em 25%.',
        choices: [
          { n: 'Curso de Inglês', m: { c: 18, r: 10 } },
          { n: 'Artes e Teatro', m: { c: 14, r: 12 } },
          { n: 'Esportes Competitivos', m: { c: 10, e: 12 } },
          { n: 'Voluntariado', m: { c: 8, r: 20 } }
        ]
      },
      {
        tag: 'Ensino Médio',
        title: 'Preparação Intensiva',
        desc: 'Cursinho pré-vestibular particular, simulados e acompanhamento psicológico.',
        fact: 'Cursinhos particulares aumentam chances de aprovação em 30%.',
        choices: [
          { n: 'Cursinho Particular', m: { c: 25, e: 15 } },
          { n: 'Aulas Particulares', m: { c: 20, e: 12 } },
          { n: 'Simulados Online', m: { c: 18, e: 10 } },
          { n: 'Mentoria', m: { c: 12, r: 15 } }
        ]
      },
      {
        tag: 'Escolha do Curso',
        title: 'Oportunidades Abertas',
        desc: 'Família apoia escolhas ambiciosas, com recursos para concursos e vestibulares.',
        fact: 'Classe média alta tem acesso a 60% das vagas em cursos de elite.',
        choices: [
          { n: 'Medicina', m: { c: 30, e: 20 } },
          { n: 'Engenharia', m: { c: 25, e: 15 } },
          { n: 'Direito', m: { c: 22, e: 12 } },
          { n: 'Administração', m: { c: 18, e: 8 } }
        ]
      },
      {
        tag: 'Reta Final',
        title: 'Foco Total',
        desc: 'Ambiente estável para estudo, com suporte familiar e material de qualidade.',
        fact: 'Estabilidade socioeconômica reduz burnout em 40%.',
        choices: [
          { n: 'Imersão nos Estudos', m: { c: 20, e: 25 } },
          { n: 'Equilíbrio com Lazer', m: { c: 15, e: 5 } },
          { n: 'Foco em Redação', m: { c: 18, e: 12 } },
          { n: 'Revisões Sistemáticas', m: { c: 16, e: 8 } }
        ]
      },
      {
        tag: 'O Dia do ENEM',
        title: 'Conforto e Preparo',
        desc: 'Transporte próprio, alimentação adequada e confiança na preparação.',
        fact: 'Conforto logístico aumenta performance em provas em 15%.',
        choices: [
          { n: 'Carro Particular', m: { c: 10, e: -8 } },
          { n: 'Alimentação Saudável', m: { c: 8, e: -5 } },
          { n: 'Confiança Plena', m: { c: 15, e: 0 } },
          { n: 'Técnicas de Relaxamento', m: { c: 12, e: -10 } }
        ]
      }
    ]
  },
  C: {
    name: 'Base Vulnerável',
    key: 'C',
    stats: { c: 12, e: 45, r: 15 },
    phases: [
      {
        tag: 'Educação Infantil',
        title: 'Começo Difícil',
        desc: 'Acesso limitado a creches. Filas longas, qualidade precária. Cuidado com vizinhos ou sozinho.',
        fact: '35% das crianças de baixa renda não têm acesso a creches de qualidade.',
        choices: [
          { n: 'Creche Pública (espera)', m: { c: 5, e: 12 } },
          { n: 'Cuidado por Vizinhos', m: { c: 2, e: 18 } },
          { n: 'Sozinho em Casa', m: { c: 0, e: 28 } },
          { n: 'Projeto Social de ONG', m: { c: 8, r: 12 } }
        ]
      },
      {
        tag: 'Ensino Fundamental',
        title: 'A Escola que Existe',
        desc: 'Escola pública com salas superlotadas e materiais escassos. Mas você vai — todo dia.',
        fact: 'Reprovação em escolas de periferia é 3× superior à média nacional.',
        choices: [
          { n: 'Escola Pública do Bairro', m: { c: 5, e: 16 } },
          { n: 'Ajudar a Família', m: { c: 2, e: 28 } },
          { n: 'Biblioteca Pública', m: { c: 10, e: 12 } },
          { n: 'Livros Doados', m: { c: 6, e: 14 } }
        ]
      },
      {
        tag: 'Sobrevivência',
        title: 'Trabalhar para Existir',
        desc: 'O trabalho não é escolha — é necessidade. Cada real conta para comida, transporte, luz.',
        fact: 'Trabalho juvenil precoce é um dos principais fatores de evasão escolar no Brasil.',
        choices: [
          { n: 'Trabalho Informal', m: { e: 32, c: -5 } },
          { n: 'Entregas por App', m: { e: 36, c: 2 } },
          { n: 'Cuidar dos Irmãos', m: { e: 26, c: 0 } },
          { n: 'Venda na Rua', m: { e: 30, c: 3 } }
        ]
      },
      {
        tag: 'Ensino Médio',
        title: 'Escola Noturna',
        desc: '8h de trabalho e escola à noite. O sono é escasso. A concentração, também.',
        fact: '30% dos jovens de baixa renda abandonam o ensino médio para trabalhar.',
        choices: [
          { n: 'Escola Noturna', m: { c: 5, e: 38 } },
          { n: 'Cursinho Comunitário', m: { c: 14, e: 28 } },
          { n: 'Estudar no Trajeto', m: { c: 8, e: 22 } },
          { n: 'Trabalho 44h/sem', m: { c: 2, e: 48 } }
        ]
      },
      {
        tag: 'Dilema',
        title: 'Sonho vs. Realidade',
        desc: 'A escolha do curso é limitada pela nota de corte e custo de permanência.',
        fact: 'A "livre escolha" de carreira é um privilégio estrutural.',
        choices: [
          { n: 'Pedagogia', m: { c: 10, e: 16 } },
          { n: 'Serviço Social', m: { c: 10, e: 20 } },
          { n: 'Medicina (risco alto)', m: { c: 22, e: 44 } },
          { n: 'Curso Técnico', m: { c: 8, e: 10 } }
        ]
      },
      {
        tag: 'Reta Final',
        title: 'Sem Estrutura, Só Força',
        desc: 'Sem cursinho, às vezes sem internet. Apostilas xerocadas e madrugadas de estudo.',
        fact: 'Exclusão digital afeta 40% dos estudantes da rede pública.',
        choices: [
          { n: 'Apostilas', m: { c: 10, e: 22 } },
          { n: 'Videoaulas Wi-Fi Público', m: { c: 13, e: 27 } },
          { n: 'Estudo Coletivo', m: { c: 9, r: 12 } },
          { n: 'Madrugar', m: { c: 16, e: 44 } }
        ]
      },
      {
        tag: 'O Dia do ENEM',
        title: 'Duas Horas de Ônibus',
        desc: 'Acordou às 4h, 3 ônibus. Chegou a tempo — mas exausto. Café da manhã: um biscoito.',
        fact: 'Candidatos dependentes de transporte público têm estresse significativamente maior.',
        choices: [
          { n: 'Oração e Esperança', m: { e: -10, c: 5 } },
          { n: 'Café para Alertar', m: { e: 16, c: 5 } },
          { n: 'Superar o Cansaço', m: { e: 22, c: 12 } },
          { n: 'Foco na Oportunidade', m: { e: 12, c: 18 } }
        ]
      }
    ]
  },
  D: {
    name: 'Classe Média Baixa',
    key: 'D',
    stats: { c: 25, e: 35, r: 30 },
    phases: [
      {
        tag: 'Educação Infantil',
        title: 'Início Instável',
        desc: 'Creches públicas ou particulares baratas, com qualidade variável e pouco suporte.',
        fact: 'Classe média baixa enfrenta barreiras similares à baixa renda em acesso à educação.',
        choices: [
          { n: 'Creche Pública', m: { c: 8, e: 15 } },
          { n: 'Babá Compartilhada', m: { c: 5, e: 20 } },
          { n: 'Cuidado Familiar', m: { c: 3, e: 25 } },
          { n: 'Programa Municipal', m: { c: 10, r: 8 } }
        ]
      },
      {
        tag: 'Ensino Fundamental',
        title: 'Escola Pública Melhor',
        desc: 'Escola pública em bairro melhor, com mais recursos mas ainda insuficientes.',
        fact: 'Diferenças intra-públicas afetam desempenho em até 15%.',
        choices: [
          { n: 'Escola Pública Boa', m: { c: 10, e: 18 } },
          { n: 'Reforço Particular', m: { c: 12, e: 12 } },
          { n: 'Biblioteca Escolar', m: { c: 8, e: 10 } },
          { n: 'Grupos de Estudo', m: { c: 6, r: 12 } }
        ]
      },
      {
        tag: 'Equilíbrio Financeiro',
        title: 'Trabalho e Estudo',
        desc: 'Trabalho eventual para ajudar em casa, conciliando com estudos.',
        fact: 'Trabalho juvenil em classe média baixa aumenta evasão em 20%.',
        choices: [
          { n: 'Trabalho de Verão', m: { e: 28, c: 5 } },
          { n: 'Babysitting', m: { e: 25, c: 8 } },
          { n: 'Ajudar nos Negócios', m: { e: 22, c: 10 } },
          { n: 'Estágio', m: { e: 20, c: 12 } }
        ]
      },
      {
        tag: 'Ensino Médio',
        title: 'Escola Diurna',
        desc: 'Escola pública diurna, com cursinho comunitário aos finais de semana.',
        fact: 'Cursinhos comunitários aumentam chances em 25% para classe média baixa.',
        choices: [
          { n: 'Escola Diurna', m: { c: 12, e: 25 } },
          { n: 'Cursinho Comunitário', m: { c: 18, e: 20 } },
          { n: 'Estudo Autônomo', m: { c: 10, e: 15 } },
          { n: 'Grupos Online', m: { c: 8, r: 10 } }
        ]
      },
      {
        tag: 'Dilema Moderado',
        title: 'Escolhas Limitadas',
        desc: 'Cursos acessíveis mas com competição, apoio familiar limitado.',
        fact: 'Classe média baixa compete por vagas intermediárias.',
        choices: [
          { n: 'Enfermagem', m: { c: 15, e: 18 } },
          { n: 'Psicologia', m: { c: 18, e: 22 } },
          { n: 'Letras', m: { c: 12, e: 14 } },
          { n: 'Educação Física', m: { c: 10, e: 16 } }
        ]
      },
      {
        tag: 'Reta Final',
        title: 'Esforço Concentrado',
        desc: 'Estudo intenso com recursos limitados, apoio de amigos e família.',
        fact: 'Rede social compensa parcialmente falta de recursos materiais.',
        choices: [
          { n: 'Estudo Intensivo', m: { c: 14, e: 30 } },
          { n: 'Videoaulas Gratuitas', m: { c: 16, e: 18 } },
          { n: 'Grupos de Apoio', m: { c: 12, r: 15 } },
          { n: 'Revisões Noturnas', m: { c: 18, e: 25 } }
        ]
      },
      {
        tag: 'O Dia do ENEM',
        title: 'Desafio Logístico',
        desc: 'Transporte público longo, preparação mental para superar obstáculos.',
        fact: 'Estresse logístico afeta performance cognitiva em provas.',
        choices: [
          { n: 'Ônibus Longo', m: { e: 20, c: 8 } },
          { n: 'Café da Manhã Simples', m: { e: 15, c: 5 } },
          { n: 'Motivação Interna', m: { e: 10, c: 12 } },
          { n: 'Apoio de Amigos', m: { e: 5, r: 10 } }
        ]
      }
    ]
  },
  E: {
    name: 'Classe Baixa',
    key: 'E',
    stats: { c: 15, e: 50, r: 10 },
    phases: [
      {
        tag: 'Educação Infantil',
        title: 'Começo Precário',
        desc: 'Acesso limitado a creches, muitas vezes inexistente. Cuidado comunitário ou sozinho.',
        fact: '45% das crianças de baixa renda não têm acesso a creches de qualidade.',
        choices: [
          { n: 'Creche Pública Lotada', m: { c: 4, e: 20 } },
          { n: 'Vizinhos Cuidam', m: { c: 2, e: 25 } },
          { n: 'Sozinho em Casa', m: { c: 0, e: 35 } },
          { n: 'ONG Comunitária', m: { c: 6, r: 15 } }
        ]
      },
      {
        tag: 'Ensino Fundamental',
        title: 'Escola Pública Básica',
        desc: 'Escola pública com infraestrutura deficiente, professores sobrecarregados.',
        fact: 'Escolas públicas de periferia têm reprovação 4× superior à média.',
        choices: [
          { n: 'Escola Pública Local', m: { c: 6, e: 22 } },
          { n: 'Ajudar Família', m: { c: 1, e: 30 } },
          { n: 'Biblioteca Pública', m: { c: 8, e: 18 } },
          { n: 'Doações de Livros', m: { c: 5, e: 20 } }
        ]
      },
      {
        tag: 'Sobrevivência Diária',
        title: 'Trabalho Essencial',
        desc: 'Trabalho para sobreviver, desde cedo. Escolha entre comida ou material escolar.',
        fact: 'Trabalho infantil precoce é causa principal de abandono escolar no Brasil.',
        choices: [
          { n: 'Trabalho Informal', m: { e: 40, c: -2 } },
          { n: 'Vendas Ambulantes', m: { e: 38, c: 1 } },
          { n: 'Cuidar Irmãos', m: { e: 32, c: 0 } },
          { n: 'Programa Social', m: { c: 10, r: 10 } }
        ]
      },
      {
        tag: 'Ensino Médio',
        title: 'Escola Noturna Exausta',
        desc: 'Trabalho diurno, escola noturna. Sono insuficiente, concentração baixa.',
        fact: '40% dos jovens de baixa renda abandonam o ensino médio por trabalho.',
        choices: [
          { n: 'Escola Noturna', m: { c: 4, e: 42 } },
          { n: 'Cursinho Gratuito', m: { c: 12, e: 35 } },
          { n: 'Estudo em Transporte', m: { c: 6, e: 28 } },
          { n: 'Trabalho Noturno', m: { c: 2, e: 50 } }
        ]
      },
      {
        tag: 'Escolha Limitada',
        title: 'Sonhos Ajustados',
        desc: 'Cursos acessíveis via cotas ou EaD. Prioridade: empregabilidade imediata.',
        fact: 'Classe baixa depende de cotas para acesso ao ensino superior.',
        choices: [
          { n: 'Pedagogia EaD', m: { c: 8, e: 20 } },
          { n: 'Serviço Social', m: { c: 10, e: 25 } },
          { n: 'Enfermagem Técnico', m: { c: 12, e: 30 } },
          { n: 'Licenciatura Básica', m: { c: 6, e: 18 } }
        ]
      },
      {
        tag: 'Preparação Mínima',
        title: 'Sem Recursos',
        desc: 'Estudo com apostilas velhas, internet pública. Muito esforço, pouco suporte.',
        fact: 'Exclusão digital afeta 50% dos estudantes de baixa renda.',
        choices: [
          { n: 'Apostilas Usadas', m: { c: 8, e: 28 } },
          { n: 'Wi-Fi Público', m: { c: 10, e: 32 } },
          { n: 'Estudo Coletivo', m: { c: 7, r: 15 } },
          { n: 'Madrugadas de Estudo', m: { c: 12, e: 40 } }
        ]
      },
      {
        tag: 'O Dia do ENEM',
        title: 'Luta Extrema',
        desc: 'Várias conduções, sem dinheiro para alimentação. Ansiedade máxima.',
        fact: 'Estudantes de baixa renda têm estresse 2× superior no dia da prova.',
        choices: [
          { n: 'Transporte Público', m: { e: 25, c: 6 } },
          { n: 'Sem Café da Manhã', m: { e: 20, c: 4 } },
          { n: 'Foco na Sobrevivência', m: { e: 15, c: 10 } },
          { n: 'Oração pela Sorte', m: { e: 10, c: 8 } }
        ]
      }
    ]
  }
};

export const COURSE_DATA: Record<string, string> = {
  'Medicina — FMUSP': 'Alta nota de corte. Vaga conquistada com conforto. Carreira de prestígio garantida.',
  'Odontologia — USP': 'Curso de alto prestígio e custo. Acesso via rede familiar.',
  'Engenharia Civil — ITA': 'Tradicionalmente alto retorno financeiro. Formação técnica de elite.',
  'Engenharia Mecânica — USP': 'Baixa participação feminina; prestígio em engenharia.',
  'Direito — USP': 'Acesso tranquilo a um dos cursos mais disputados do país.',
  'Arquitetura — FAUUSP': 'Alto custo de materiais/software. Criatividade e rede social.',
  'Psicologia — USP': 'Perfil de renda alta nas melhores universidades.',
  'Administração — FGV': 'Curso de elite acessível. Boa preparação pré-vestibular.',
  'Ciências Contábeis — USP': 'Perfil de negócios consolidado.',
  'Enfermagem — USP': 'Curso com perfil de prestígio intermediário.',
  'Pedagogia — UFRGS': 'Grande oferta EaD, bolsas Prouni.',
  'Serviço Social — UFRJ': 'Maior proporção de negros (52%), perfil de baixa renda.',
  'Educação Física — Unicamp': 'Bacharelado em boas universidades.',
  'Sistemas de Informação — USP': 'Crescimento acelerado, empregabilidade alta.',
  'Letras — USP': 'Licenciatura de prestígio.',
  'Engenharia — Unicamp': 'Acesso competitivo mas viável.',
  'Psicologia — Unicamp': 'Conquista significativa.',
  'Economia — UFRJ': 'Escolha pragmática.',
  'Pedagogia — UFPB': 'Acesso via cotas.',
  'Administração — UFPE': 'Ampla oferta EaD.',
  'Enfermagem — UFMG': 'Perfil C/D predominante.',
  'Licenciaturas — UFRN': 'Licenciaturas EaD.',
  'Ciências Contábeis — UFPB': 'Alternativa de negócios.',
  'Educação Física — UFRN': 'Bacharelado/licenciatura.',
  'Sistemas de Informação — UFPE': 'Tecnólogo EaD.',
  'Pedagogia EaD — UAB': 'Principal porta de entrada para classe baixa.',
  'Serviço Social — UFPB': 'Curso com maior vulnerabilidade social.',
  'Licenciaturas EaD — UAB': 'Pé-de-Meia Licenciaturas.',
  'Enfermagem EaD — UFRN': 'Acesso via Prouni.',
  'Administração EaD — UFRN': 'Apenas via bolsa integral.',
  'Ciências Contábeis EaD — UFRN': 'Idem.',
  'Outros EaD — UFRN': 'Ex.: Gestão de RH, Logística.'
};

export const PROBABILITIES: Record<string, Record<string, number>> = {
  A: { 'Medicina — FMUSP': 30, 'Odontologia — USP': 15, 'Engenharia Civil — ITA': 12, 'Engenharia Mecânica — USP': 8, 'Direito — USP': 12, 'Arquitetura — FAUUSP': 10, 'Psicologia — USP': 8, 'Outros EaD — UFRN': 5 },
  B: { 'Medicina — FMUSP': 0, 'Odontologia — USP': 8, 'Engenharia Civil — ITA': 15, 'Direito — USP': 18, 'Arquitetura — FAUUSP': 10, 'Psicologia — USP': 12, 'Administração — FGV': 14, 'Ciências Contábeis — USP': 6, 'Enfermagem — USP': 6, 'Educação Física — Unicamp': 5, 'Economia — UFRJ': 6, 'Outros EaD — UFRN': 6 },
  C: { 'Engenharia Civil — ITA': 5, 'Direito — USP': 12, 'Psicologia — USP': 4, 'Administração — FGV': 22, 'Ciências Contábeis — USP': 15, 'Enfermagem — USP': 12, 'Pedagogia — UFRGS': 10, 'Educação Física — Unicamp': 6, 'Sistemas de Informação — USP': 8, 'Outros EaD — UFRN': 6 },
  D: { 'Pedagogia — UFRGS': 28, 'Serviço Social — UFRJ': 18, 'Educação Física — Unicamp': 5, 'Sistemas de Informação — USP': 5, 'Letras — USP': 5, 'Administração — UFPE': 14, 'Enfermagem — UFMG': 15, 'Licenciaturas — UFRN': 5, 'Ciências Contábeis — UFPB': 10 },
  E: { 'Pedagogia EaD — UAB': 30, 'Serviço Social — UFPB': 22, 'Licenciaturas EaD — UAB': 18, 'Enfermagem EaD — UFRN': 12, 'Administração EaD — UFRN': 10, 'Ciências Contábeis EaD — UFRN': 5, 'Outros EaD — UFRN': 3 }
};
