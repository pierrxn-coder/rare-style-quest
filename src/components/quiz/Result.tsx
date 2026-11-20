import { CheckCircle2, RotateCcw, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { PromoRules } from "@/components/quiz/PromoRules";
import { PROMO } from "@/lib/promo";
import type { StyleProfile } from "@/lib/quiz";

export function Result({ profile, onRestart }: { profile: StyleProfile; onRestart: () => void }) {
  return (
    <div className="animate-rise-in space-y-5 px-5 pb-10 pt-6">
      <ProgressBar value={100} />

      <div className="flex items-center gap-2 text-sm font-semibold text-success">
        <CheckCircle2 className="size-5 shrink-0" /> Quiz concluído
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-primary/50 bg-surface p-6 shadow-glow">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-glow">Seu estilo de Natal</p>
        <h1 className="text-display mt-2 text-5xl">{profile.name}</h1>
        <p className="mt-2 text-lg font-semibold">{profile.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.description}</p>
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-background/70 p-3">
          <Sparkles className="size-5 shrink-0 text-primary-glow" />
          <p className="min-w-0 text-sm">
            Peça que combina com você: <strong>{profile.pick}</strong>
          </p>
        </div>
        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {PROMO.storeName} · Quiz de Natal
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-display text-2xl">Quer concorrer aos prêmios?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Você ainda não ganhou nada — o prêmio sai só por sorteio. Siga as regras abaixo para participar.
        </p>
        <div className="mt-4">
          <PromoRules />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface/60 p-5">
        <h2 className="flex items-center gap-2 text-display text-xl">
          <Truck className="size-5 shrink-0 text-primary-glow" /> Frete fixo na loja
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          Frete fixo de{" "}
          <strong>
            R$ {PROMO.shipping.feeReais} {PROMO.shipping.area}
          </strong>{" "}
          nas compras da {PROMO.storeName}.
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{PROMO.shipping.scope}</p>
      </section>

      <Button variant="ghostLine" size="touch" className="w-full" onClick={onRestart}>
        <RotateCcw /> Refazer o quiz
      </Button>
    </div>
  );
}
