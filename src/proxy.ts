/**
 * Optimistic auth redirects based on cookie presence only — no database
 * lookups here. Pages and API routes still verify the session for real via
 * the data-access layer in src/lib/auth.ts.
 */

import { NextResponse, type NextRequest } from "next/server";

// Keep in sync with SESSION_COOKIE in src/lib/auth.ts. Importing it would
// pull prisma into the proxy bundle, which must stay self-contained.
const SESSION_COOKIE = "codeclimb_session";

const PUBLIC_PATHS = new Set(["/login", "/signup"]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = req.cookies.has(SESSION_COOKIE);
  const isPublic = PUBLIC_PATHS.has(pathname);

  if (!hasSession && !isPublic) {
    const url = new URL("/login", req.nextUrl);
    if (pathname !== "/") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (hasSession && isPublic) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  // Pages only: API routes answer 401 themselves, and static assets are free.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|ico)$).*)"],
};
