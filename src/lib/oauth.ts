import * as arctic from "arctic";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "./prisma";
import { displayNameSchema, emailSchema } from "./validation";

export const OAUTH_PROVIDERS = ["google", "github", "apple"] as const;
export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const OAUTH_PROVIDER_LABELS: Record<OAuthProvider, string> = {
  google: "Google",
  github: "GitHub",
  apple: "Apple",
};

export type OAuthErrorCode =
  | "oauth_denied"
  | "oauth_invalid"
  | "oauth_config"
  | "oauth_email"
  | "oauth_failed";

export function oauthProviderFromParam(value: string): OAuthProvider | null {
  return OAUTH_PROVIDERS.includes(value as OAuthProvider)
    ? (value as OAuthProvider)
    : null;
}

export function isOAuthProviderConfigured(provider: OAuthProvider): boolean {
  if (provider === "google") {
    return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  }

  if (provider === "github") {
    return Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);
  }

  return Boolean(
    process.env.APPLE_CLIENT_ID &&
      process.env.APPLE_TEAM_ID &&
      process.env.APPLE_KEY_ID &&
      process.env.APPLE_PRIVATE_KEY,
  );
}

export function configuredOAuthProviders(): OAuthProvider[] {
  return OAUTH_PROVIDERS.filter(isOAuthProviderConfigured);
}

export function oauthErrorMessage(code: string | undefined): string | null {
  switch (code) {
    case "oauth_denied":
      return "Sign-in was cancelled.";
    case "oauth_invalid":
      return "That sign-in link expired. Try again.";
    case "oauth_config":
      return "That sign-in provider is not configured.";
    case "oauth_email":
      return "That provider did not return a verified email address.";
    case "oauth_failed":
      return "Provider sign-in failed. Try again.";
    default:
      return null;
  }
}

export function oauthRedirectOrigin(requestOrigin: string): string {
  return process.env.APP_URL?.replace(/\/$/, "") ?? requestOrigin;
}

export function oauthRequestOrigin(request: Request): string {
  const explicit = process.env.APP_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  if (!host) return new URL(request.url).origin;

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const url = new URL(request.url);
  const protocol = forwardedProto ?? url.protocol.replace(/:$/, "");
  return `${protocol}://${host}`;
}

export function oauthCallbackUrl(
  provider: OAuthProvider,
  requestOrigin: string,
): string {
  return `${oauthRedirectOrigin(requestOrigin)}/api/auth/${provider}/callback`;
}

export function oauthCookieNames(provider: OAuthProvider) {
  return {
    state: `cc_oauth_${provider}_state`,
    verifier: `cc_oauth_${provider}_verifier`,
    next: `cc_oauth_${provider}_next`,
  };
}

export function oauthCookieOptions(provider: OAuthProvider) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || provider === "apple",
    sameSite: provider === "apple" ? ("none" as const) : ("lax" as const),
    path: `/api/auth/${provider}`,
    maxAge: 10 * 60,
  };
}

export function oauthClearCookieOptions(provider: OAuthProvider) {
  return {
    ...oauthCookieOptions(provider),
    maxAge: 0,
  };
}

export function oauthLoginRedirect(
  requestOrigin: string,
  error: OAuthErrorCode,
  next = "/",
): URL {
  const url = new URL("/login", oauthRedirectOrigin(requestOrigin));
  url.searchParams.set("error", error);
  if (next !== "/") url.searchParams.set("next", next);
  return url;
}

export function createOAuthClient(
  provider: OAuthProvider,
  requestOrigin: string,
): arctic.Google | arctic.GitHub | arctic.Apple | null {
  const redirectURI = oauthCallbackUrl(provider, requestOrigin);
  if (provider === "google") {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return null;
    return new arctic.Google(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, redirectURI);
  }

  if (provider === "github") {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) return null;
    return new arctic.GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, redirectURI);
  }

  const {
    APPLE_CLIENT_ID,
    APPLE_TEAM_ID,
    APPLE_KEY_ID,
    APPLE_PRIVATE_KEY,
  } = process.env;
  if (!APPLE_CLIENT_ID || !APPLE_TEAM_ID || !APPLE_KEY_ID || !APPLE_PRIVATE_KEY) {
    return null;
  }
  return new arctic.Apple(
    APPLE_CLIENT_ID,
    APPLE_TEAM_ID,
    APPLE_KEY_ID,
    parseApplePrivateKey(APPLE_PRIVATE_KEY),
    redirectURI,
  );
}

function parseApplePrivateKey(value: string): Uint8Array {
  const normalized = value.replace(/\\n/g, "\n");
  const base64 = normalized
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s+/g, "");
  return new Uint8Array(Buffer.from(base64, "base64"));
}

function fallbackName(email: string): string {
  const local = email.split("@")[0] || "CodeClimber";
  const candidate = local.replace(/[._-]+/g, " ");
  const parsed = displayNameSchema.safeParse(candidate);
  return parsed.success ? parsed.data : "CodeClimber";
}

function normalizeOAuthName(value: unknown, email: string): string {
  const parsed =
    typeof value === "string" ? displayNameSchema.safeParse(value) : null;
  return parsed?.success ? parsed.data : fallbackName(email);
}

const googleProfileSchema = z.object({
  sub: z.string().min(1),
  email: emailSchema,
  email_verified: z.boolean(),
  name: z.string().optional(),
});

const githubUserSchema = z.object({
  id: z.union([z.string(), z.number()]),
  login: z.string().min(1),
  name: z.string().nullable().optional(),
});

const githubEmailSchema = z.object({
  email: emailSchema,
  primary: z.boolean(),
  verified: z.boolean(),
});

const appleClaimsSchema = z.object({
  iss: z.literal("https://appleid.apple.com"),
  aud: z.union([z.string(), z.array(z.string())]),
  exp: z.number(),
  sub: z.string().min(1),
  email: emailSchema.optional(),
  email_verified: z.union([z.boolean(), z.literal("true"), z.literal("false")]).optional(),
});

const appleUserSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  email: emailSchema.optional(),
});

export interface OAuthProfile {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  name: string;
}

export async function fetchOAuthProfile({
  provider,
  client,
  code,
  codeVerifier,
  appleUser,
}: {
  provider: OAuthProvider;
  client: arctic.Google | arctic.GitHub | arctic.Apple;
  code: string;
  codeVerifier?: string;
  appleUser?: string | null;
}): Promise<OAuthProfile> {
  if (provider === "google") {
    if (!(client instanceof arctic.Google) || !codeVerifier) throw new Error("Invalid client");
    const tokens = await client.validateAuthorizationCode(code, codeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokens.accessToken()}` },
    });
    if (!response.ok) throw new Error("Failed to fetch Google profile");
    const profile = googleProfileSchema.parse(await response.json());
    if (!profile.email_verified) throw new OAuthEmailError();
    return {
      provider,
      providerAccountId: profile.sub,
      email: profile.email,
      name: normalizeOAuthName(profile.name, profile.email),
    };
  }

  if (provider === "github") {
    if (!(client instanceof arctic.GitHub)) throw new Error("Invalid client");
    const tokens = await client.validateAuthorizationCode(code);
    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${tokens.accessToken()}`,
      "User-Agent": "CodeClimb",
    };
    const [userResponse, emailResponse] = await Promise.all([
      fetch("https://api.github.com/user", { headers }),
      fetch("https://api.github.com/user/emails", { headers }),
    ]);
    if (!userResponse.ok || !emailResponse.ok) {
      throw new Error("Failed to fetch GitHub profile");
    }
    const user = githubUserSchema.parse(await userResponse.json());
    const emails = z.array(githubEmailSchema).parse(await emailResponse.json());
    const verifiedEmail =
      emails.find((email) => email.primary && email.verified) ??
      emails.find((email) => email.verified);
    if (!verifiedEmail) throw new OAuthEmailError();
    return {
      provider,
      providerAccountId: String(user.id),
      email: verifiedEmail.email,
      name: normalizeOAuthName(user.name ?? user.login, verifiedEmail.email),
    };
  }

  if (!(client instanceof arctic.Apple)) throw new Error("Invalid client");
  const tokens = await client.validateAuthorizationCode(code);
  const claims = appleClaimsSchema.parse(arctic.decodeIdToken(tokens.idToken()));
  const clientId = process.env.APPLE_CLIENT_ID;
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!clientId || !audience.includes(clientId) || claims.exp * 1000 < Date.now()) {
    throw new Error("Invalid Apple ID token");
  }
  const verified =
    claims.email_verified === true || claims.email_verified === "true";
  if (!claims.email || !verified) throw new OAuthEmailError();

  const parsedUser = appleUser
    ? appleUserSchema.safeParse(JSON.parse(appleUser))
    : null;
  const appleName = parsedUser?.success
    ? [parsedUser.data.name?.firstName, parsedUser.data.name?.lastName]
        .filter(Boolean)
        .join(" ")
    : undefined;

  return {
    provider,
    providerAccountId: claims.sub,
    email: claims.email,
    name: normalizeOAuthName(appleName, claims.email),
  };
}

export class OAuthEmailError extends Error {
  constructor(message = "Verified email address is required.") {
    super(message);
    this.name = "OAuthEmailError";
  }
}

export interface OAuthUserResult {
  userId: string;
  isNewUser: boolean;
}

export async function findOrCreateOAuthUser(
  profile: OAuthProfile,
): Promise<OAuthUserResult> {
  try {
    return await prisma.$transaction(async (tx) => {
      const account = await tx.oAuthAccount.findUnique({
        where: {
          provider_providerAccountId: {
            provider: profile.provider,
            providerAccountId: profile.providerAccountId,
          },
        },
        select: { userId: true },
      });
      if (account) return { userId: account.userId, isNewUser: false };

      const existing = await tx.user.findUnique({
        where: { email: profile.email },
        select: { id: true, emailVerifiedAt: true },
      });
      const isNewUser = existing === null;
      const user = existing ??
        (await tx.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            passwordHash: null,
            emailVerifiedAt: new Date(),
          },
          select: { id: true, emailVerifiedAt: true },
        }));

      if (!user.emailVerifiedAt) {
        await tx.user.update({
          where: { id: user.id },
          data: { emailVerifiedAt: new Date() },
        });
      }

      await tx.oAuthAccount.create({
        data: {
          provider: profile.provider,
          providerAccountId: profile.providerAccountId,
          userId: user.id,
        },
      });

      return { userId: user.id, isNewUser };
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const account = await prisma.oAuthAccount.findUnique({
        where: {
          provider_providerAccountId: {
            provider: profile.provider,
            providerAccountId: profile.providerAccountId,
          },
        },
        select: { userId: true },
      });
      if (account) return { userId: account.userId, isNewUser: false };
    }
    throw err;
  }
}
