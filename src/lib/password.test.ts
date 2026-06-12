import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies a correct password", async () => {
    const stored = await hashPassword("hunter2hunter2");
    expect(await verifyPassword("hunter2hunter2", stored)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const stored = await hashPassword("correct horse battery staple");
    expect(await verifyPassword("Tr0ub4dor&3", stored)).toBe(false);
  });

  it("salts each hash uniquely", async () => {
    const a = await hashPassword("same-password");
    const b = await hashPassword("same-password");
    expect(a).not.toBe(b);
    expect(await verifyPassword("same-password", a)).toBe(true);
    expect(await verifyPassword("same-password", b)).toBe(true);
  });

  it("embeds its parameters in the stored format", async () => {
    const stored = await hashPassword("pw-pw-pw-pw");
    expect(stored).toMatch(/^scrypt:\d+:\d+:\d+:[\w-]+:[\w-]+$/);
  });

  it("rejects malformed stored values without throwing", async () => {
    expect(await verifyPassword("anything", "")).toBe(false);
    expect(await verifyPassword("anything", "bcrypt:whatever")).toBe(false);
    expect(await verifyPassword("anything", "scrypt:abc:8:1:salt:hash")).toBe(
      false,
    );
  });
});
