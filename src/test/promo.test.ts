import { describe, expect, it } from "vitest";

import { PROMO } from "@/lib/promo";

describe("store shipping notice", () => {
  it("states free shipping for all of Brazil", () => {
    expect(PROMO.shipping.feeReais).toBe(0);
    expect(PROMO.shipping.area).toBe("para todo o Brasil");
  });

  it("keeps the fee tied to purchases, never to the draw", () => {
    expect(PROMO.shipping.scope).toContain("compra");
    expect(PROMO.shipping.scope).toMatch(/não é taxa de participação/i);
  });
});
