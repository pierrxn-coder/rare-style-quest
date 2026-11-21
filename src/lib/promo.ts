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
  // Shipping on store purchases is free; the checkout charges only the piece.
  // It is never a fee to take part in the draw and never releases a prize.
  shipping: {
    feeReais: 0,
    area: "para todo o Brasil",
    scope: "Vale para compras na loja: o pagamento cobra só o valor da peça. Não é taxa de participação e não libera prêmios.",
  },
} as const;
