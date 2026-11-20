export type ProfileId = "classico" | "street" | "esportivo" | "minimal";

export interface QuizOption {
  label: string;
  profile: ProfileId;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
}

export interface StyleProfile {
  id: ProfileId;
  name: string;
  tagline: string;
  description: string;
  pick: string;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "peca",
    title: "Qual peça não pode faltar no seu look de Natal?",
    options: [
      { label: "Camiseta de marca com logo discreto", profile: "classico" },
      { label: "Camiseta oversized estampada", profile: "street" },
      { label: "Tênis de corrida com amortecimento", profile: "esportivo" },
      { label: "Boné preto básico", profile: "minimal" },
    ],
  },
  {
    id: "paleta",
    title: "Qual paleta de cores mais combina com você?",
    options: [
      { label: "Branco e azul claro", profile: "classico" },
      { label: "Cores fortes e contrastes", profile: "street" },
      { label: "Cinza, grafite e prata", profile: "esportivo" },
      { label: "Preto total", profile: "minimal" },
    ],
  },
  {
    id: "role",
    title: "Onde você vai estrear o look?",
    options: [
      { label: "Ceia em família", profile: "classico" },
      { label: "Rolê com os amigos", profile: "street" },
      { label: "Viagem de fim de ano", profile: "esportivo" },
      { label: "Festa à noite", profile: "minimal" },
    ],
  },
  {
    id: "tenis",
    title: "Seu tênis ideal é…",
    options: [
      { label: "Branco, cano baixo e limpo", profile: "classico" },
      { label: "Chunky, chamando atenção", profile: "street" },
      { label: "Running tecnológico", profile: "esportivo" },
      { label: "Todo preto, sem detalhes", profile: "minimal" },
    ],
  },
  {
    id: "bone",
    title: "Como você usa boné?",
    options: [
      { label: "Aba curva, com logo bordado", profile: "classico" },
      { label: "Aba reta, sempre", profile: "street" },
      { label: "Só pra treinar ou correr", profile: "esportivo" },
      { label: "Raramente — e só se for preto", profile: "minimal" },
    ],
  },
  {
    id: "frase",
    title: "Qual frase mais te define?",
    options: [
      { label: "Elegância sem esforço", profile: "classico" },
      { label: "A rua é minha passarela", profile: "street" },
      { label: "Conforto em movimento", profile: "esportivo" },
      { label: "Menos é mais", profile: "minimal" },
    ],
  },
];

export const PROFILES: Record<ProfileId, StyleProfile> = {
  classico: {
    id: "classico",
    name: "Clássico Premium",
    tagline: "Logo discreto, presença forte.",
    description:
      "Você prefere peças de marca, cortes limpos e cores claras. Seu look de Natal é arrumado sem parecer forçado.",
    pick: "Camiseta Premium",
  },
  street: {
    id: "street",
    name: "Street Raiz",
    tagline: "A rua é sua passarela.",
    description:
      "Estampa grande, caimento oversized e atitude. Você usa a roupa pra se expressar e não tem medo de chamar atenção.",
    pick: "Camiseta Lacoste",
  },
  esportivo: {
    id: "esportivo",
    name: "Esportivo Tech",
    tagline: "Conforto em movimento.",
    description:
      "Tecnologia, amortecimento e peças que acompanham seu ritmo. Do treino ao rolê, seu estilo é funcional.",
    pick: "Tênis Top",
  },
  minimal: {
    id: "minimal",
    name: "Dark Minimal",
    tagline: "Menos é mais. Preto é tudo.",
    description:
      "Você aposta no básico bem feito: tons escuros, poucas peças e zero excesso. Discreto e sempre no estilo.",
    pick: "Boné Lacoste",
  },
};

/** Answers are the chosen option index per question, or null when not answered yet. */
export type Answers = (number | null)[];

export function emptyAnswers(total = QUESTIONS.length): Answers {
  return Array.from({ length: total }, () => null);
}

/** The user may only move past a question after choosing an option for it. */
export function canAdvance(answers: Answers, index: number): boolean {
  const value = answers[index];
  return typeof value === "number" && value >= 0;
}

/** Progress goes from 0% (nothing answered) to 100% (every question answered). */
export function progressPercent(answers: Answers): number {
  if (answers.length === 0) return 0;
  const answered = answers.filter((a) => typeof a === "number").length;
  return Math.round((answered / answers.length) * 100);
}

/** Most chosen profile wins; ties go to the profile picked in the latest question. */
export function computeProfile(answers: Answers, questions: QuizQuestion[] = QUESTIONS): ProfileId {
  const counts: Record<ProfileId, number> = { classico: 0, street: 0, esportivo: 0, minimal: 0 };
  const lastSeen: Record<ProfileId, number> = { classico: -1, street: -1, esportivo: -1, minimal: -1 };
  answers.forEach((choice, qi) => {
    if (typeof choice !== "number") return;
    const option = questions[qi]?.options[choice];
    if (!option) return;
    counts[option.profile] += 1;
    lastSeen[option.profile] = qi;
  });
  const ids = Object.keys(counts) as ProfileId[];
  return ids.reduce((best, id) => {
    if (counts[id] > counts[best]) return id;
    if (counts[id] === counts[best] && lastSeen[id] > lastSeen[best]) return id;
    return best;
  }, ids[0] as ProfileId);
}
