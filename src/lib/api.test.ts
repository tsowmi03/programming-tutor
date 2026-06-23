import { describe, expect, it } from "vitest";
import { AiGuidanceLimitError } from "./ai-guidance-limit";
import { toErrorResponse } from "./api";

describe("API error responses", () => {
  it("returns a 429 envelope for AI guidance usage limits", async () => {
    const retryAt = new Date("2026-06-22T00:10:00.000Z");
    const res = toErrorResponse(
      new AiGuidanceLimitError(
        "burst",
        retryAt,
        600,
        "You've reached the short-term AI assistance limit.",
      ),
    );

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("600");
    await expect(res.json()).resolves.toMatchObject({
      error: "You've reached the short-term AI assistance limit.",
      code: "AI_GUIDANCE_LIMIT_REACHED",
      retryAt: retryAt.toISOString(),
      retryAfterSeconds: 600,
    });
  });
});
