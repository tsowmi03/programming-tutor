import { describe, expect, it } from "vitest";
import { deriveStatus } from "./problems";

describe("deriveStatus", () => {
  it("counts passing code submissions as solved", () => {
    expect(deriveStatus([{ status: "passed", selfScore: null }])).toBe("solved");
  });

  it("counts AI-marked explanation submissions as solved at score 2", () => {
    expect(
      deriveStatus([{ status: "ai_assessed", selfScore: null, aiScore: 2 }]),
    ).toBe("solved");
    expect(
      deriveStatus([{ status: "ai_assessed", selfScore: null, aiScore: 1 }]),
    ).toBe("attempted");
  });

  it("lets manual self-assessment override an AI mark", () => {
    expect(
      deriveStatus([{ status: "self_assessed", selfScore: 1, aiScore: 2 }]),
    ).toBe("attempted");
    expect(
      deriveStatus([{ status: "self_assessed", selfScore: 2, aiScore: 0 }]),
    ).toBe("solved");
  });
});
