export interface StatModifier {
  c?: number; // Conhecimento
  e?: number; // Exaustão Estrutural
  r?: number; // Apoio Social
}

export interface Choice {
  n: string;
  m: StatModifier;
}

export interface Phase {
  tag: string;
  title: string;
  desc: string;
  fact: string;
  choices: Choice[];
}

export interface Origin {
  name: string;
  key: string;
  stats: {
    c: number;
    e: number;
    r: number;
  };
  phases: Phase[];
}

export interface PreQuestionnaire {
  p1: string;
  p2: string;
  p3: string;
}

export interface PostQuestionnaire {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

export interface GameChoice {
  phase: number;
  choice: string;
  delta: StatModifier;
  tag: string;
}

export interface Trial {
  id: string;
  timestamp: string;
  pre: PreQuestionnaire;
  post: PostQuestionnaire;
  game: {
    path: string;
    pathKey: string;
    gender: string;
    race: string;
    comorbidity: string;
    aiMode: boolean;
    choices: GameChoice[];
    finalStats: {
      c: number;
      e: number;
      r: number;
    };
    course: {
      name: string;
      desc: string;
    };
    verdict?: string;
  };
  duration: number;
}
