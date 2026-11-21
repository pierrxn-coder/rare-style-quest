import { PROMO } from "@/lib/promo";

// Store items sold at the end of the quiz. Buying is separate from the draw.
// Each checkout link must sell the piece itself; shipping is free (included in the same payment).

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceReais: number;
  sizes: string[];
  /** Cakto link that sells the piece (free shipping), or null until the store sends it. */
  checkoutUrl: string | null;
}

export const SHIPPING_REAIS: number = PROMO.shipping.feeReais;

const SHIRT_SIZES = ["PP", "P", "M", "G", "GG"];
const SHOE_SIZES = Array.from({ length: 11 }, (_, i) => String(i + 34));

export const PRODUCTS: Product[] = [
  {
    id: "camiseta-premium",
    name: "Camiseta Premium",
    category: "Camiseta",
    description: "Branca, malha encorpada e logo discreto.",
    priceReais: 70,
    sizes: SHIRT_SIZES,
    checkoutUrl: null,
  },
  {
    id: "camiseta-lacoste",
    name: "Camiseta Lacoste",
    category: "Camiseta",
    description: "Preta, corte reto e logo bordado.",
    priceReais: 70,
    sizes: SHIRT_SIZES,
    checkoutUrl: null,
  },
  {
    id: "tenis-top",
    name: "Tênis Top",
    category: "Tênis",
    description: "Running preto com amortecimento.",
    priceReais: 70,
    sizes: SHOE_SIZES,
    checkoutUrl: null,
  },
  {
    id: "bone-lacoste",
    name: "Boné Lacoste",
    category: "Boné",
    description: "Preto, aba curva e regulagem atrás.",
    priceReais: 70,
    sizes: ["Único"],
    checkoutUrl: null,
  },
];

// A checkout that charges only shipping (no piece) is never allowed on this page.
const SHIPPING_ONLY_CHECKOUTS = ["pay.cakto.com.br/39ekr5t_1350703"];

/** Piece price plus shipping (currently free), charged together in one payment. */
export function totalReais(product: Product): number {
  return product.priceReais + SHIPPING_REAIS;
}

/** Only real Cakto product checkouts are accepted; shipping-only links are rejected. */
export function isValidCheckout(url: string | null): url is string {
  if (!url) return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:" || parsed.hostname !== "pay.cakto.com.br") return false;
  const bare = `${parsed.hostname}${parsed.pathname}`.replace(/\/$/, "");
  return !SHIPPING_ONLY_CHECKOUTS.includes(bare);
}

/** Sizes with a single option are picked automatically. */
export function defaultSize(product: Product): string | null {
  return product.sizes.length === 1 ? (product.sizes[0] ?? null) : null;
}

/** The buy button works only with a valid checkout and a chosen size. */
export function canBuy(product: Product, size: string | null): boolean {
  if (!isValidCheckout(product.checkoutUrl)) return false;
  return size !== null && product.sizes.includes(size);
}

export function formatReais(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
