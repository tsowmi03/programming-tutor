import { describe, expect, it } from "vitest";
import {
  experiencedStartPath,
  onboardingPath,
  safeRedirectPath,
} from "./auth-utils";

describe("auth redirect paths", () => {
  it("rejects external and protocol-relative destinations", () => {
    expect(safeRedirectPath("https://example.com")).toBe("/");
    expect(safeRedirectPath("//example.com/path")).toBe("/");
  });

  it("sends ordinary new registrations through onboarding", () => {
    expect(onboardingPath(undefined)).toBe("/onboarding");
    expect(onboardingPath("/progress?tab=courses")).toBe(
      "/onboarding?next=%2Fprogress%3Ftab%3Dcourses",
    );
  });

  it("sends experienced learners to courses unless a safe path was requested", () => {
    expect(experiencedStartPath(undefined)).toBe("/courses");
    expect(experiencedStartPath("/review")).toBe("/review");
    expect(experiencedStartPath("https://example.com")).toBe("/courses");
  });
});
