import { describe, expect, it } from "vitest";

import { PRODUCTS, SHIPPING_REAIS, canBuy, isValidCheckout, totalReais, type Product } from "@/lib/shop";

const withLink = (url: string): Product => ({ ...PRODUCTS[0]!, checkoutUrl: url });

describe("store showcase", () => {
  it("each piece costs R$ 70", () => {
    expect(PRODUCTS.map((p) => p.priceReais)).toEqual([70, 70, 70, 70]);
  });

  it("shipping is free, so the checkout total is just the piece (R$ 70)", () => {
    expect(SHIPPING_REAIS).toBe(0);
    for (const p of PRODUCTS) expect(totalReais(p)).toBe(70);
  });

  it("never accepts the shipping-only checkout link", () => {
    expect(isValidCheckout("https://pay.cakto.com.br/39ekr5t_1350703")).toBe(false);
    expect(isValidCheckout("https://pay.cakto.com.br/39ekr5t_1350703/")).toBe(false);
    for (const p of PRODUCTS) expect(p.checkoutUrl ?? "").not.toContain("39ekr5t_1350703");
  });

  it("accepts only https Cakto links", () => {
    expect(isValidCheckout("https://pay.cakto.com.br/abc123_999")).toBe(true);
    expect(isValidCheckout("http://pay.cakto.com.br/abc123_999")).toBe(false);
    expect(isValidCheckout("https://example.com/pay")).toBe(false);
    expect(isValidCheckout(null)).toBe(false);
  });

  it("buying needs a valid link and a chosen size", () => {
    const shirt = withLink("https://pay.cakto.com.br/abc123_999");
    expect(canBuy(shirt, null)).toBe(false);
    expect(canBuy(shirt, "XG")).toBe(false);
    expect(canBuy(shirt, "M")).toBe(true);
    expect(canBuy(PRODUCTS[0]!, "M")).toBe(false);
  });
});
