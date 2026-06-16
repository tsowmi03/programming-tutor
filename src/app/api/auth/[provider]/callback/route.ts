import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createSession } from "@/lib/auth";
import {
  createOAuthClient,
  fetchOAuthProfile,
  findOrCreateOAuthUser,
  oauthClearCookieOptions,
  oauthCookieNames,
  oauthLoginRedirect,
  OAuthEmailError,
  oauthProviderFromParam,
  oauthRequestOrigin,
} from "@/lib/oauth";

type CallbackValues = {
  code: string | null;
  state: string | null;
  error: string | null;
  appleUser?: string | null;
};

async function readCallbackValues(
  req: NextRequest,
  method: "GET" | "POST",
): Promise<CallbackValues> {
  if (method === "GET") {
    return {
      code: req.nextUrl.searchParams.get("code"),
      state: req.nextUrl.searchParams.get("state"),
      error: req.nextUrl.searchParams.get("error"),
    };
  }

  const form = await req.formData();
  const value = (name: string) => {
    const item = form.get(name);
    return typeof item === "string" ? item : null;
  };
  return {
    code: value("code"),
    state: value("state"),
    error: value("error"),
    appleUser: value("user"),
  };
}

async function handleCallback(
  req: NextRequest,
  rawProvider: string,
  method: "GET" | "POST",
) {
  const provider = oauthProviderFromParam(rawProvider);
  const requestOrigin = oauthRequestOrigin(req);
  if (!provider) {
    return NextResponse.redirect(oauthLoginRedirect(requestOrigin, "oauth_invalid"));
  }

  const cookieStore = await cookies();
  const names = oauthCookieNames(provider);
  const storedState = cookieStore.get(names.state)?.value ?? null;
  const codeVerifier = cookieStore.get(names.verifier)?.value ?? null;
  const next = cookieStore.get(names.next)?.value ?? "/";
  const values = await readCallbackValues(req, method);

  cookieStore.set(names.state, "", oauthClearCookieOptions(provider));
  cookieStore.set(names.verifier, "", oauthClearCookieOptions(provider));
  cookieStore.set(names.next, "", oauthClearCookieOptions(provider));

  if (values.error) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_denied", next),
    );
  }
  if (!values.code || !values.state || !storedState || values.state !== storedState) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_invalid", next),
    );
  }
  if (provider === "google" && !codeVerifier) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_invalid", next),
    );
  }

  const client = createOAuthClient(provider, requestOrigin);
  if (!client) {
    return NextResponse.redirect(
      oauthLoginRedirect(requestOrigin, "oauth_config", next),
    );
  }

  try {
    const profile = await fetchOAuthProfile({
      provider,
      client,
      code: values.code,
      codeVerifier: codeVerifier ?? undefined,
      appleUser: values.appleUser,
    });
    const userId = await findOrCreateOAuthUser(profile);
    await createSession(userId);
    return NextResponse.redirect(new URL(next, requestOrigin));
  } catch (err) {
    const code = err instanceof OAuthEmailError ? "oauth_email" : "oauth_failed";
    return NextResponse.redirect(oauthLoginRedirect(requestOrigin, code, next));
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  return handleCallback(req, provider, "GET");
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  return handleCallback(req, provider, "POST");
}
