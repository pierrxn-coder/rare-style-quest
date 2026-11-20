
 
 
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Intro } from "@/components/quiz/Intro";
import { QuestionStep } from "@/components/quiz/QuestionStep";
import { Result } from "@/components/quiz/Result";
import { PROFILES, QUESTIONS, canAdvance, computeProfile, emptyAnswers, progressPercent } from "@/lib/quiz";

export const Route = createFileRoute("/")({
  component: QuizPage,
});

type Stage = "intro" | "quiz" | "result" | "sizes";

function QuizPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => emptyAnswers());
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [shirt1, setShirt1] = useState("");
  const [shirt2, setShirt2] = useState("");
  const [shoe, setShoe] = useState("");

  const toTop = () => window.scrollTo({ top: 0 });

  const start = () => {
    setStage("quiz");
    setIndex(0);
    setDirection("forward");
    toTop();
  };

  const select = (option: number) => {
    setAnswers((prev) => prev.map((a, i) => (i === index ? option : a)));
  };

  const next = () => {
    if (!canAdvance(answers, index)) return;
    setDirection("forward");
    if (index === QUESTIONS.length - 1) {
      setStage("result");
    } else {
      setIndex(index + 1);
    }
    toTop();
  };

  const back = () => {
    setDirection("back");
    if (index === 0) setStage("intro");
    else setIndex(index - 1);
    toTop();
  };

  const restart = () => {
    setAnswers(emptyAnswers());
    setShirt1("");
    setShirt2("");
    setShoe("");
    start();
  };

  const question = QUESTIONS[index];
  const sizes = ["PP", "P", "M", "G", "GG"];
  const shoes = Array.from({ length: 11 }, (_, i) => String(i + 34));

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md">
      {stage === "intro" && <Intro onStart={start} />}

      {stage === "quiz" && question && (
        <QuestionStep
          question={question}
          index={index}
          total={QUESTIONS.length}
          selected={answers[index] ?? null}
          progress={progressPercent(answers)}
          direction={direction}
          onSelect={select}
          onNext={next}
          onBack={back}
        />
      )}

      {stage === "result" && (
        <div className="space-y-4">
          <Result
            profile={PROFILES[computeProfile(answers)]}
            onRestart={restart}
          />

          <div className="px-5 pb-8">
            <button
              onClick={() => {
                setStage("sizes");
                toTop();
              }}
              className="w-full rounded-xl bg-primary p-4 font-bold text-primary-foreground"
            >
              Escolher tamanhos dos produtos
            </button>
          </div>
        </div>
      )}

      {stage === "sizes" && (
        <section className="space-y-5 px-5 py-8">
          <h1 className="text-3xl font-bold">Escolha os tamanhos</h1>
          <p className="text-sm text-muted-foreground">
            Selecione os tamanhos dos produtos do seu pedido.
          </p>

          <div className="space-y-2">
            <label className="font-semibold">Camiseta Premium</label>
            <select
              value={shirt1}
              onChange={(e) => setShirt1(e.target.value)}
              className="w-full rounded-xl border bg-background p-3"
            >
              <option value="">Selecione o tamanho</option>
              {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Camiseta Lacoste</label>
            <select
              value={shirt2}
              onChange={(e) => setShirt2(e.target.value)}
              className="w-full rounded-xl border bg-background p-3"
            >
              <option value="">Selecione o tamanho</option>
              {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold">Tênis</label>
            <select
              value={shoe}
              onChange={(e) => setShoe(e.target.value)}
              className="w-full rounded-xl border bg-background p-3"
            >
              <option value="">Selecione a numeração</option>
              {shoes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="rounded-xl border p-4">
            <p className="font-semibold">Boné Lacoste</p>
            <p className="text-sm text-muted-foreground">Tamanho único</p>
          </div>

          <button
            disabled={!shirt1 || !shirt2 || !shoe}
            onClick={() => {
              const order = `Camiseta Premium: ${shirt1} | Camiseta Lacoste: ${shirt2} | Tênis: ${shoe} | Boné: tamanho único`;
              alert(order);
            }}
            className="w-full rounded-xl bg-primary p-4 font-bold text-primary-foreground disabled:opacity-40"
          >
            Confirmar tamanhos
          </button>

          <button
            onClick={() => setStage("result")}
            className="w-full rounded-xl border p-3"
          >
            Voltar
          </button>
        </section>
      )}
    </main>
  );
}
