import { describe, expect, it } from "vitest";
import {
  aiGuidanceLimitPolicies,
  formatRetryDelay,
  secondsUntil,
} from "./ai-guidance-limit";

const envKeys = ["AI_GUIDANCE_DAILY_LIMIT", "AI_GUIDANCE_BURST_LIMIT"] as const;

function withLimitEnv(
  values: Partial<Record<(typeof envKeys)[number], string>>,
  run: () => void,
) {
  const previous = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));

  for (const key of envKeys) delete process.env[key];
  for (const [key, value] of Object.entries(values)) process.env[key] = value;

  try {
    run();
  } finally {
    for (const key of envKeys) {
      const value = previous[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

describe("AI guidance usage limits", () => {
  it("uses generous defaults for normal learning sessions", () => {
    withLimitEnv({}, () => {
      expect(aiGuidanceLimitPolicies()).toMatchObject([
        { bucket: "daily", limit: 30 },
        { bucket: "burst", limit: 6 },
      ]);
    });
  });

  it("allows deployment overrides without accepting invalid limits", () => {
    withLimitEnv(
      {
        AI_GUIDANCE_DAILY_LIMIT: "12",
        AI_GUIDANCE_BURST_LIMIT: "-1",
      },
      () => {
        expect(aiGuidanceLimitPolicies()).toMatchObject([
          { bucket: "daily", limit: 12 },
          { bucket: "burst", limit: 6 },
        ]);
      },
    );
  });

  it("formats retry delays for friendly limit messages", () => {
    const now = new Date("2026-06-22T00:00:00.000Z");

    expect(secondsUntil(now, new Date("2026-06-22T00:00:30.000Z"))).toBe(30);
    expect(formatRetryDelay(now, new Date("2026-06-22T00:00:30.000Z"))).toBe(
      "under a minute",
    );
    expect(formatRetryDelay(now, new Date("2026-06-22T00:10:00.000Z"))).toBe(
      "10 minutes",
    );
    expect(formatRetryDelay(now, new Date("2026-06-22T02:01:00.000Z"))).toBe(
      "3 hours",
    );
  });
});
