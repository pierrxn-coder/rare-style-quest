import { Gift, ShieldCheck, Zap } from "lucide-react";

import heroAsset from "@/assets/quiz-natal.webp.asset.json";
import { Button } from "@/components/ui/button";
import { RulesDrawer } from "@/components/quiz/RulesDrawer";
import { PROMO } from "@/lib/promo";
import { QUESTIONS } from "@/lib/quiz";

export function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="animate-rise-in">
      <img
        src={heroAsset.url}
        alt="Quiz de Natal: responda e concorra a Camiseta Premium, Camiseta Lacoste, Tênis Top e Boné Lacoste"
        width={720}
        height={983}
        fetchPriority="high"
        className="block h-auto w-full"
      />
      <div className="-mt-10 relative space-y-4 px-5 pb-8">
        <div className="rounded-2xl border border-border bg-surface/95 p-5 shadow-card backdrop-blur">
          <h1 className="text-display text-3xl">
            Descubra seu estilo de Natal
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {QUESTIONS.length} perguntas rápidas. No final, veja seu resultado e como concorrer ao sorteio dos
            prêmios da {PROMO.storeName}.
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <li className="flex flex-col items-center gap-1 rounded-lg bg-background/60 py-2.5">
              <Zap className="size-4 text-primary-glow" /> 1 minuto
            </li>
            <li className="flex flex-col items-center gap-1 rounded-lg bg-background/60 py-2.5">
              <ShieldCheck className="size-4 text-primary-glow" /> Sem cadastro
            </li>
            <li className="flex flex-col items-center gap-1 rounded-lg bg-background/60 py-2.5">
              <Gift className="size-4 text-primary-glow" /> Sorteio real
            </li>
          </ul>
        </div>
        <Button variant="hero" size="xl" onClick={onStart}>
          Começar o quiz
        </Button>
        <RulesDrawer />
        <p className="text-center text-xs text-muted-foreground">
          Seu resultado aparece na hora. Responder o quiz não garante prêmio — os ganhadores saem por sorteio.
        </p>
      </div>
    </div>
  );
}
