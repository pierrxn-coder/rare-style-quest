// Promotion details shown on the page. Edit these values to match the real campaign.
export const PROMO = {
  storeName: "RARE STORE",
  instagram: "@rarestore",
  // The store has not set dates yet; the page tells users dates are announced on Instagram.
  datesNote: "Prazo de participação e data do sorteio são divulgados no Instagram oficial da loja.",
  prizes: ["Camiseta Premium", "Camiseta Lacoste", "Tênis Top", "Boné Lacoste"],
  steps: [
    "Responda todas as perguntas do quiz.",
    "Tire um print da tela com o seu resultado.",
    "Siga a loja no Instagram e envie o print do resultado por direct:",
  ],
  // Fixed shipping applies only to purchases at the store. It is never a fee to
  // take part in the draw and never releases a prize.
  shipping: {
    feeReais: 70,
    area: "para todo o Brasil",
    scope: "Condição de compra na loja. Não é taxa de participação, não dá prêmio e não libera envio de prêmios.",
  },
} as const;
