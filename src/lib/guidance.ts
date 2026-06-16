import type { GuidanceItem, GuidanceLevel } from "@/content/types";

const FALLBACK_STEPS: { title: string; level: GuidanceLevel }[] = [
  { title: "First nudge", level: "nudge" },
  { title: "Pattern to look for", level: "strategy" },
  { title: "Common trap", level: "pitfall" },
  { title: "Implementation shape", level: "pseudocode" },
];

function fallbackStep(index: number): { title: string; level: GuidanceLevel } {
  return (
    FALLBACK_STEPS[index] ?? {
      title: `Further guidance ${index + 1}`,
      level: "strategy",
    }
  );
}

function isGuidanceLevel(value: unknown): value is GuidanceLevel {
  return (
    value === "nudge" ||
    value === "strategy" ||
    value === "pitfall" ||
    value === "pseudocode"
  );
}

function isGuidanceItem(value: unknown): value is GuidanceItem {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.title === "string" &&
    candidate.title.trim().length > 0 &&
    typeof candidate.body === "string" &&
    candidate.body.trim().length > 0 &&
    isGuidanceLevel(candidate.level)
  );
}

export function guidanceFromHints(hints: string[]): GuidanceItem[] {
  return hints
    .filter((hint) => hint.trim().length > 0)
    .map((hint, index) => ({
      ...fallbackStep(index),
      body: hint,
    }));
}

export function normalizeGuidance(
  guidance: unknown,
  fallbackHints: string[] = [],
): GuidanceItem[] {
  if (Array.isArray(guidance) && guidance.every(isGuidanceItem)) {
    return guidance.map((item) => ({
      title: item.title.trim(),
      body: item.body.trim(),
      level: item.level,
    }));
  }

  if (Array.isArray(guidance) && guidance.every((item) => typeof item === "string")) {
    return guidanceFromHints(guidance);
  }

  return guidanceFromHints(fallbackHints);
}

export function guidanceBodies(guidance: GuidanceItem[]): string[] {
  return guidance.map((item) => item.body);
}
