export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  priceReais: number;
  sizes: string[];
  shoeSizes: string[];
  checkoutUrl: string | null;
}

export const SHIPPING_REAIS = 70;

const SHIRT_SIZES = ["PP", "P", "M", "G", "GG"];

const SHOE_SIZES = [
  "36", "37", "38", "39", "40",
  "41", "42", "43", "44"
];

export const PRODUCTS: Product[] = [
  {
    id: "kit-quebra-fina",
    name: "Kit quebra fina de ano 🎅🏻",
    category: "Kit Especial",
    description: "Kit especial com camisetas, boné e tênis.",
    priceReais: 0,
    sizes: SHIRT_SIZES,
    shoeSizes: SHOE_SIZES,
    checkoutUrl: "https://pay.cakto.com.br/39ekr5t_1350703",
  },
];

export function totalReais(product: Product): number {
  return product.priceReais;
}

export function isValidCheckout(url: string | null): url is string {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "pay.cakto.com.br"
    );
  } catch {
    return false;
  }
}

export function defaultSize(product: Product): string | null {
  return product.sizes.length === 1
    ? product.sizes[0] ?? null
    : null;
}

export function canBuy(
  product: Product,
  size: string | null,
  shoeSize?: string | null
): boolean {
  if (!isValidCheckout(product.checkoutUrl)) return false;

  if (size === null || !product.sizes.includes(size)) {
    return false;
  }

  if (shoeSize != null) {
    return product.shoeSizes.includes(shoeSize);
  }

  return true;
}

export function formatReais(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}