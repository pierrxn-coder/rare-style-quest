import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/quiz";

interface Props {
  question: QuizQuestion;
  index: number;
  total: number;
  selected: number | null;
  progress: number;
  direction: "forward" | "back";
  onSelect: (option: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionStep({ question, index, total, selected, progress, direction, onSelect, onNext, onBack }: Props) {
  const isLast = index === total - 1;
  const hasAnswer = selected !== null;

  return (
    <div className="flex min-h-dvh flex-col px-5 pb-6 pt-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl"
          onClick={onBack}
          aria-label={index === 0 ? "Voltar ao início" : "Pergunta anterior"}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <p className="truncate text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Pergunta <span className="text-foreground">{index + 1}</span> de {total}
        </p>
      </div>

      <div className="mt-4">
        <ProgressBar value={progress} />
      </div>

      <div
        key={question.id}
        className={cn("mt-7 flex-1", direction === "forward" ? "animate-quiz-in" : "animate-quiz-in-back")}
      >
        <h2 className="text-display text-[1.9rem]">{question.title}</h2>
        <div className="mt-6 space-y-3" role="radiogroup" aria-label={question.title}>
          {question.options.map((option, i) => {
            const active = selected === i;
            return (
              <button
                key={option.label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(i)}
                className={cn(
                  "flex min-h-16 w-full items-center gap-4 rounded-xl border-2 px-4 py-3 text-left text-base font-semibold transition-all active:scale-[0.98]",
                  active
                    ? "border-primary bg-accent shadow-glow"
                    : "border-border bg-surface hover:border-muted-foreground/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/50 text-muted-foreground",
                  )}
                >
                  {active ? <Check className="size-4 animate-pop-check" strokeWidth={3} /> : String.fromCharCode(65 + i)}
                </span>
                <span className="min-w-0">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-5 mt-6 bg-gradient-to-t from-background via-background to-transparent px-5 pb-1 pt-4">
        <Button variant="hero" size="xl" disabled={!hasAnswer} onClick={onNext}>
          {isLast ? "Ver meu resultado" : "Próxima pergunta"}
        </Button>
        <p className="mt-2 h-4 text-center text-xs text-muted-foreground" aria-live="polite">
          {hasAnswer ? "" : "Escolha uma alternativa para continuar"}
        </p>
      </div>
    </div>
  );
}
