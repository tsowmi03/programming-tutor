import { describe, expect, it } from "vitest";
import {
  configuredOAuthProviders,
  isOAuthProviderConfigured,
  oauthCallbackUrl,
  oauthCookieNames,
  oauthErrorMessage,
  oauthRequestOrigin,
  oauthProviderFromParam,
  oauthRedirectOrigin,
} from "./oauth";

describe("OAuth helpers", () => {
  const oauthEnvKeys = [
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "APPLE_CLIENT_ID",
    "APPLE_TEAM_ID",
    "APPLE_KEY_ID",
    "APPLE_PRIVATE_KEY",
  ] as const;

  function withOAuthEnv(
    values: Partial<Record<(typeof oauthEnvKeys)[number], string>>,
    run: () => void,
  ) {
    const previous = Object.fromEntries(
      oauthEnvKeys.map((key) => [key, process.env[key]]),
    );

    for (const key of oauthEnvKeys) delete process.env[key];
    for (const [key, value] of Object.entries(values)) {
      process.env[key] = value;
    }

    try {
      run();
    } finally {
      for (const key of oauthEnvKeys) {
        const value = previous[key];
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  }

  it("accepts only supported providers", () => {
    expect(oauthProviderFromParam("google")).toBe("google");
    expect(oauthProviderFromParam("github")).toBe("github");
    expect(oauthProviderFromParam("apple")).toBe("apple");
    expect(oauthProviderFromParam("discord")).toBeNull();
  });

  it("reports only configured providers", () => {
    withOAuthEnv(
      {
        GOOGLE_CLIENT_ID: "google-id",
        GOOGLE_CLIENT_SECRET: "google-secret",
        GITHUB_CLIENT_ID: "github-id",
      },
      () => {
        expect(isOAuthProviderConfigured("google")).toBe(true);
        expect(isOAuthProviderConfigured("github")).toBe(false);
        expect(configuredOAuthProviders()).toEqual(["google"]);
      },
    );
  });

  it("builds stable callback URLs", () => {
    expect(oauthCallbackUrl("github", "http://localhost:3000")).toBe(
      "http://localhost:3000/api/auth/github/callback",
    );
  });

  it("uses APP_URL when configured", () => {
    const previous = process.env.APP_URL;
    process.env.APP_URL = "https://codeclimb.example/";

    expect(oauthRedirectOrigin("http://localhost:3000")).toBe(
      "https://codeclimb.example",
    );
    expect(oauthCallbackUrl("google", "http://localhost:3000")).toBe(
      "https://codeclimb.example/api/auth/google/callback",
    );

    if (previous === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = previous;
  });

  it("derives the request origin from forwarded host headers", () => {
    const request = new Request("http://0.0.0.0:3002/api/auth/google", {
      headers: {
        host: "127.0.0.1:3002",
        "x-forwarded-proto": "https",
      },
    });

    expect(oauthRequestOrigin(request)).toBe("https://127.0.0.1:3002");
  });

  it("keeps provider cookies isolated", () => {
    expect(oauthCookieNames("apple")).toEqual({
      state: "cc_oauth_apple_state",
      verifier: "cc_oauth_apple_verifier",
      next: "cc_oauth_apple_next",
    });
  });

  it("maps known OAuth errors to user-facing messages", () => {
    expect(oauthErrorMessage("oauth_config")).toBe(
      "That sign-in provider is not configured.",
    );
    expect(oauthErrorMessage("unknown")).toBeNull();
  });
});
