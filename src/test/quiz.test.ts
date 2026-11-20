import { describe, expect, it } from "vitest";

import { QUESTIONS, canAdvance, computeProfile, emptyAnswers, progressPercent } from "@/lib/quiz";

describe("quiz rules", () => {
  it("blocks advancing while no option is selected", () => {
    const answers = emptyAnswers();
    expect(canAdvance(answers, 0)).toBe(false);
    answers[0] = 2;
    expect(canAdvance(answers, 0)).toBe(true);
    expect(canAdvance(answers, 1)).toBe(false);
  });

  it("progress starts at 0% and reaches 100% when every question is answered", () => {
    const answers = emptyAnswers();
    expect(progressPercent(answers)).toBe(0);
    answers[0] = 0;
    expect(progressPercent(answers)).toBe(17);
    const full = QUESTIONS.map(() => 1);
    expect(progressPercent(full)).toBe(100);
  });

  it("every question has selectable options", () => {
    expect(QUESTIONS).toHaveLength(6);
    for (const q of QUESTIONS) expect(q.options.length).toBeGreaterThanOrEqual(2);
  });

  it("result is the most chosen style", () => {
    expect(computeProfile([3, 3, 3, 0, 1, 2])).toBe("minimal");
    expect(computeProfile([2, 2, 2, 2, 2, 2])).toBe("esportivo");
  });
});
