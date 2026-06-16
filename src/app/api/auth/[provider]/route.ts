import * as arctic from "arctic";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import {
  assertAuthAllowed,
  AuthRateLimitError,
  recordAuthFailure,
} from "@/lib/auth-rate-limit";
import { clientIp, hashRateLimitKey, safeRedirectPath } from "@/lib/auth-utils";
import {
  createOAuthClient,
  oauthCallbackUrl,
  oauthClearCookieOptions,
  oauthCookieNames,
  oauthCookieOptions,
  oauthLoginRedirect,
  oauthProviderFromParam,
  oauthRequestOrigin,
} from "@/lib/oauth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;
  const provider = oauthProviderFromParam(rawProvider);
  const requestOrigin = oauthRequestOrigin(req);
  const next = safeRedirectPath(req.nextUrl.searchParams.get("next"));
  if (!provider) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_invalid", next),
    );
  }

  const rateKey = hashRateLimitKey(["oauth", await clientIp()]);
  try {
    await assertAuthAllowed("oauth", rateKey);
    await recordAuthFailure("oauth", rateKey);
  } catch (err) {
    if (err instanceof AuthRateLimitError) {
      return NextResponse.redirect(
        oauthLoginRedirect(requestOrigin, "oauth_failed", next),
      );
    }
    throw err;
  }

  const client = createOAuthClient(provider, requestOrigin);
  if (!client) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_config", next),
    );
  }

  const state = arctic.generateState();
  const codeVerifier =
    provider === "google" ? arctic.generateCodeVerifier() : null;
  let authorizationUrl: URL;

  if (provider === "google") {
    authorizationUrl = (client as arctic.Google).createAuthorizationURL(
      state,
      codeVerifier!,
      ["openid", "profile", "email"],
    );
  } else if (provider === "github") {
    authorizationUrl = (client as arctic.GitHub).createAuthorizationURL(state, [
      "user:email",
    ]);
  } else {
    authorizationUrl = (client as arctic.Apple).createAuthorizationURL(state, [
      "name",
      "email",
    ]);
    authorizationUrl.searchParams.set("response_mode", "form_post");
  }

  const cookieStore = await cookies();
  const names = oauthCookieNames(provider);
  const options = oauthCookieOptions(provider);
  cookieStore.set(names.state, state, options);
  cookieStore.set(names.next, next, options);
  if (codeVerifier) cookieStore.set(names.verifier, codeVerifier, options);
  else cookieStore.set(names.verifier, "", oauthClearCookieOptions(provider));

  // Force the redirect URI from the active origin/env into provider URLs.
  authorizationUrl.searchParams.set(
    "redirect_uri",
    oauthCallbackUrl(provider, requestOrigin),
  );

  return NextResponse.redirect(authorizationUrl);
}
