import { PROMO } from "@/lib/promo";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceReais: number;
  sizes: string[];
  checkoutUrl: string | null;
}

export const SHIPPING_REAIS: number = PROMO.shipping.feeReais;

const SHIRT_SIZES = ["PP", "P", "M", "G", "GG"];

export const PRODUCTS: Product[] = [
  {
    id: "kit-quebra-fina",
    name: "Kit quebra fina de ano 🎅🏻",
    category: "Kit Especial",
    description: "2 Camisetas + Boné Lacoste + Tênis Top. Frete grátis para todo o Brasil.",
    priceReais: 70,
    sizes: SHIRT_SIZES,
    checkoutUrl: "https://pay.cakto.com.br/39ekr5t_1350703",
  },
];

const SHIPPING_ONLY_CHECKOUTS: string[] = [];

export function totalReais(product: Product): number {
  return product.priceReais + SHIPPING_REAIS;
}

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

export function defaultSize(product: Product): string | null {
  return product.sizes.length === 1 ? (product.sizes[0] ?? null) : null;
}

export function canBuy(product: Product, size: string | null): boolean {
  if (!isValidCheckout(product.checkoutUrl)) return false;
  return size !== null && product.sizes.includes(size);
}

export function formatReais(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
