import { CalendarDays, Gift, ShieldCheck, Trophy } from "lucide-react";

import { PROMO } from "@/lib/promo";

export function PromoRules() {
  return (
    <div className="space-y-5 text-sm leading-relaxed">
      <section>
        <h3 className="mb-2 flex items-center gap-2 font-bold text-foreground">
          <Trophy className="size-4 shrink-0 text-primary-glow" /> Como participar
        </h3>
        <ol className="space-y-2">
          {PROMO.steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5 text-muted-foreground">
                {step}
                {i === PROMO.steps.length - 1 && (
                  <strong className="text-foreground"> {PROMO.instagram}</strong>
                )}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="mb-2 flex items-center gap-2 font-bold text-foreground">
          <Gift className="size-4 shrink-0 text-primary-glow" /> Prêmios
        </h3>
        <ul className="grid grid-cols-2 gap-2">
          {PROMO.prizes.map((p) => (
            <li key={p} className="rounded-lg border border-border bg-background/60 px-3 py-2 font-medium">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-muted-foreground">Um prêmio por ganhador, sem troca por dinheiro.</p>
      </section>

      <section>
        <h3 className="mb-2 flex items-center gap-2 font-bold text-foreground">
          <CalendarDays className="size-4 shrink-0 text-primary-glow" /> Datas
        </h3>
        <p className="text-muted-foreground">{PROMO.datesNote}</p>
      </section>

      <section className="rounded-xl border border-primary/40 bg-accent/40 p-3">
        <h3 className="mb-1 flex items-center gap-2 font-bold text-foreground">
          <ShieldCheck className="size-4 shrink-0 text-primary-glow" /> Importante
        </h3>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Terminar o quiz não significa que você ganhou. Os ganhadores são definidos por sorteio.</li>
          <li>O resultado do quiz mostra apenas o seu estilo; ele não aumenta nem diminui suas chances.</li>
          <li>Esta página não pede nome, CPF, telefone nem dados bancários.</li>
          <li>Ganhadores serão contatados somente pelo perfil oficial {PROMO.instagram}. Nunca pedimos pagamento para entregar prêmios.</li>
        </ul>
      </section>
    </div>
  );
}
