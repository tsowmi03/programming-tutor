import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "./proxy";

function request(pathname: string, withSession = false) {
  return new NextRequest(`https://codeclimb.test${pathname}`, {
    headers: withSession
      ? { cookie: "codeclimb_session=stale-session-token" }
      : undefined,
  });
}

describe("proxy", () => {
  it("redirects signed-out learners to login", () => {
    const response = proxy(request("/courses"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://codeclimb.test/login?next=%2Fcourses",
    );
  });

  it("allows signed-out learners to reach authentication pages", () => {
    const response = proxy(request("/signup"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("lets the server validate a cookie before redirecting an auth page", () => {
    const response = proxy(request("/login", true));

    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("location")).toBeNull();
  });
});
