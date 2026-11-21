import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Intro } from "@/components/quiz/Intro";
import { QuestionStep } from "@/components/quiz/QuestionStep";
import { Result } from "@/components/quiz/Result";
import { PROFILES, QUESTIONS, canAdvance, computeProfile, emptyAnswers, progressPercent } from "@/lib/quiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quiz de Natal RARE STORE — descubra seu estilo e concorra" },
      {
        name: "description",
        content:
          "Responda 6 perguntas, descubra seu estilo streetwear de Natal, veja as regras do sorteio e compre peças da loja.",
      },
      { property: "og:title", content: "Quiz de Natal RARE STORE — descubra seu estilo e concorra" },
      {
        property: "og:description",
        content: "6 perguntas rápidas, sem cadastro. Veja seu estilo de Natal, as regras do sorteio e a loja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

type Stage = "intro" | "quiz" | "result";

function QuizPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => emptyAnswers());
  const [direction, setDirection] = useState<"forward" | "back">("forward");

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
    start();
  };

  const question = QUESTIONS[index];

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

      {stage === "result" && <Result profile={PROFILES[computeProfile(answers)]} onRestart={restart} />}
    </main>
  );
}
