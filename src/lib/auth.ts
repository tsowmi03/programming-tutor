/**
 * Session management and the auth data-access layer.
 *
 * Sessions are database-backed: the browser holds a random token in an
 * httpOnly cookie, the database stores only its SHA-256 hash, so a leaked
 * database dump cannot be replayed as a cookie.
 */

import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const SESSION_COOKIE = "codeclimb_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface SessionUser {
  id: string;
  email: string;
  name: string;
}

export class UnauthorizedError extends Error {
  constructor(message = "You must be logged in.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}

/** Creates a DB session for the user and sets the session cookie. */
export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.session.create({
    data: { tokenHash: hashToken(token), userId, expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

/** Deletes the current DB session (if any) and clears the cookie. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * The signed-in user for this request, or null. Memoized per render pass so
 * pages, layouts, and metadata can all call it for the price of one query.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { select: { id: true, email: true, name: true } } },
  });
  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    // Expired sessions are reaped lazily as they are seen.
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
});

/** For API route handlers: 401 via toErrorResponse when not signed in. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError();
  return user;
}

/** For pages: bounce to /login when not signed in. */
export async function requireUserPage(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
