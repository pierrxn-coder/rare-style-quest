import { ExternalLink, Info, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PROMO } from "@/lib/promo";
import {
  PRODUCTS,
  SHIPPING_REAIS,
  canBuy,
  defaultSize,
  formatReais,
  isValidCheckout,
  totalReais,
  type Product,
} from "@/lib/shop";
import { cn } from "@/lib/utils";

export function Shop({ highlight }: { highlight?: string }) {
  const ordered = [...PRODUCTS].sort((a, b) => Number(b.name === highlight) - Number(a.name === highlight));

  return (
    <section aria-labelledby="loja" className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 id="loja" className="flex items-center gap-2 text-display text-2xl">
          <ShoppingBag className="size-5 shrink-0 text-primary-glow" /> Loja {PROMO.storeName}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Quer comprar uma peça? Escolha o tamanho e pague direto na loja.
        </p>
        <div className="mt-4 flex gap-3 rounded-xl border border-primary/40 bg-accent/40 p-3 text-sm">
          <Truck className="mt-0.5 size-5 shrink-0 text-primary-glow" />
          <p className="min-w-0 leading-relaxed">
            <strong>Frete grátis {PROMO.shipping.area}.</strong> O pagamento cobra só o valor da peça, sem
            nenhuma taxa extra.
          </p>
        </div>
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          Comprar é opcional e separado do sorteio: não é preciso comprar para participar, e comprar não aumenta suas
          chances.
        </p>
      </div>

      <ul className="space-y-4">
        {ordered.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} featured={product.name === highlight} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCard({ product, featured }: { product: Product; featured: boolean }) {
  const [size, setSize] = useState<string | null>(() => defaultSize(product));
  const linkReady = isValidCheckout(product.checkoutUrl);
  const ready = canBuy(product, size);
  const single = product.sizes.length === 1;
  const groupId = `size-${product.id}`;

  return (
    <article
      className={cn(
        "rounded-2xl border bg-surface p-5",
        featured ? "border-primary/60 shadow-glow" : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-glow">
            {featured ? "Combina com seu estilo" : product.category}
          </p>
          <h3 className="text-display mt-1 text-2xl">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <p className="shrink-0 text-display text-2xl">{formatReais(product.priceReais)}</p>
      </div>

      <div className="mt-4">
        <p id={groupId} className="mb-2 text-sm font-semibold">
          {single ? "Tamanho: único" : "Escolha o tamanho"}
        </p>
        {!single && (
          <div role="radiogroup" aria-labelledby={groupId} className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const active = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-12 min-w-12 rounded-xl border px-3 text-base font-semibold transition-colors active:scale-[0.97]",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background/60 text-foreground hover:bg-surface-raised",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <dl className="mt-4 space-y-1 rounded-xl bg-background/70 p-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Peça</dt>
          <dd>{formatReais(product.priceReais)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Frete</dt>
          <dd className={SHIPPING_REAIS === 0 ? "font-semibold text-success" : undefined}>
            {SHIPPING_REAIS === 0 ? "Grátis" : formatReais(SHIPPING_REAIS)}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-border pt-1 font-bold">
          <dt>Total no pagamento</dt>
          <dd>{formatReais(totalReais(product))}</dd>
        </div>
      </dl>

      {size && !single && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          No pagamento, escreva <strong className="text-foreground">tamanho {size}</strong> no campo indicado.
        </p>
      )}

      <div className="mt-4">
        {ready && product.checkoutUrl ? (
          <Button asChild variant="hero" size="xl">
            <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer">
              Comprar por {formatReais(totalReais(product))} <ExternalLink />
            </a>
          </Button>
        ) : (
          <Button variant="hero" size="xl" disabled>
            {linkReady ? "Escolha o tamanho" : "Compra disponível em breve"}
          </Button>
        )}
      </div>
    </article>
  );
}
