import { describe, expect, it } from "vitest";
import { loginSchema, onboardingSchema, signupSchema } from "./validation";

describe("auth validation", () => {
  it("normalizes valid signup fields", () => {
    const parsed = signupSchema.parse({
      name: "  Ada   Lovelace  ",
      email: " ADA@example.COM ",
      password: "Analytical engine 1843",
    });

    expect(parsed).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
    });
  });

  it("rejects weak signup values", () => {
    const parsed = signupSchema.safeParse({
      name: "x",
      email: "not-email",
      password: "aaaaaaaaaaaa",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((issue) => issue.message);
      expect(messages).toContain("Name must be at least 2 characters.");
      expect(messages).toContain("Enter a valid email address.");
      expect(messages).toContain(
        "Password cannot be the same character repeated.",
      );
    }
  });

  it("rejects passwords containing account identifiers", () => {
    const parsed = signupSchema.safeParse({
      name: "Grace Hopper",
      email: "grace@example.com",
      password: "grace-hopper-12345",
    });

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.map((issue) => issue.message)).toContain(
        "Password cannot contain your email address.",
      );
    }
  });

  it("caps login password size", () => {
    const parsed = loginSchema.safeParse({
      email: "test@example.com",
      password: "x".repeat(201),
    });

    expect(parsed.success).toBe(false);
  });

  it("accepts only the two supported onboarding paths", () => {
    expect(onboardingSchema.parse({ experience: "beginner" })).toEqual({
      experience: "beginner",
    });
    expect(onboardingSchema.parse({ experience: "experienced" })).toEqual({
      experience: "experienced",
    });
    expect(
      onboardingSchema.safeParse({ experience: "skip" }).success,
    ).toBe(false);
  });
});
