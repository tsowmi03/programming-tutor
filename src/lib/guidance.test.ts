import { describe, expect, it } from "vitest";
import { guidanceBodies, guidanceFromHints, normalizeGuidance } from "./guidance";

describe("guidance helpers", () => {
  it("turns legacy hints into structured progressive guidance", () => {
    const guidance = guidanceFromHints(["Start small", "Use a set"]);

    expect(guidance).toEqual([
      { title: "First nudge", level: "nudge", body: "Start small" },
      { title: "Pattern to look for", level: "strategy", body: "Use a set" },
    ]);
  });

  it("accepts authored guidance and trims display fields", () => {
    const guidance = normalizeGuidance([
      { title: " Edge case ", level: "pitfall", body: " Check duplicates. " },
    ]);

    expect(guidance).toEqual([
      { title: "Edge case", level: "pitfall", body: "Check duplicates." },
    ]);
  });

  it("falls back to hints when guidance is malformed", () => {
    const guidance = normalizeGuidance([{ title: "No level", body: "Bad" }], [
      "Fallback",
    ]);

    expect(guidanceBodies(guidance)).toEqual(["Fallback"]);
  });
});
