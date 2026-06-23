import { describe, expect, it } from "vitest";
import {
  DEFAULT_AI_EXPLANATION_MARKING_MODEL,
  buildAiExplanationMarkingPrompt,
  parseAiExplanationMarking,
  type AiExplanationMarkingContext,
} from "./ai-explanation-marking";

const context: AiExplanationMarkingContext = {
  title: "Big-O basics",
  difficulty: "easy",
  category: "complexity",
  description: "Explain what Big-O describes and why constants are dropped.",
  modelAnswer:
    "Big-O describes growth rate as input size grows. Constants are dropped because they do not change the growth class.",
  keyPoints: [
    "Big-O describes growth with input size",
    "Constants are dropped because growth class ignores constant factors",
    "Lower-order terms matter less for large inputs",
  ],
  answerText:
    "Big-O tells us how runtime grows as n gets bigger. We ignore constants like 2n because they do not change the shape.",
};

describe("AI explanation marking helpers", () => {
  it("defaults explanation marking to Haiku", () => {
    expect(DEFAULT_AI_EXPLANATION_MARKING_MODEL).toBe("claude-haiku-4-5");
  });

  it("builds a marker prompt with numbered key points and student answer", () => {
    const prompt = buildAiExplanationMarkingPrompt(context);

    expect(prompt.system).toContain("Return only valid JSON");
    expect(prompt.user).toContain("0 = missed it");
    expect(prompt.user).toContain("[1] Constants are dropped");
    expect(prompt.user).toContain("Student answer:");
    expect(prompt.user).toContain("Big-O tells us how runtime grows");
  });

  it("parses and normalizes model JSON", () => {
    const marking = parseAiExplanationMarking(
      `Here is the mark:
      {
        "score": "1",
        "feedback": "You explain growth and constants well, but you do not mention lower-order terms.",
        "coveredKeyPointIndexes": [1, 0, 99, 1],
        "missingKeyPointIndexes": [1],
        "nextStep": "Add one sentence about lower-order terms for large inputs."
      }`,
      context.keyPoints,
    );

    expect(marking).toEqual({
      score: 1,
      label: "Partially there",
      feedback:
        "You explain growth and constants well, but you do not mention lower-order terms.",
      coveredKeyPointIndexes: [0, 1],
      missingKeyPointIndexes: [2],
      nextStep: "Add one sentence about lower-order terms for large inputs.",
    });
  });
});
