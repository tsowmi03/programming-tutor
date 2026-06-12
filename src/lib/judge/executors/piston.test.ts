import { afterEach, describe, expect, it, vi } from "vitest";
import { executeOnPiston } from "./piston";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.unstubAllGlobals();
});

describe("executeOnPiston", () => {
  it("sends the configured bearer token", async () => {
    process.env.PISTON_URL = "https://piston.example.com/api/v2";
    process.env.PISTON_AUTH_TOKEN = "test-token";

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          language: "python",
          version: "3.10.0",
          run: {
            stdout: "ok\n",
            stderr: "",
            output: "ok\n",
            code: 0,
            signal: null,
            message: null,
            status: null,
            cpu_time: 12,
            wall_time: 18,
            memory: 4_500_000,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await executeOnPiston({
      language: "python",
      files: [{ name: "main.py", content: "print('ok')" }],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://piston.example.com/api/v2/execute",
      expect.objectContaining({
        headers: {
          Authorization: "Bearer test-token",
          "Content-Type": "application/json",
        },
      }),
    );
    expect(result.run).toMatchObject({
      status: null,
      message: null,
      cpu_time: 12,
      wall_time: 18,
      memory: 4_500_000,
    });
  });
});
