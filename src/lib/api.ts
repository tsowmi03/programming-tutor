/** Shared helpers for API route handlers. */

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ExecutorUnavailableError } from "@/lib/judge/executors";
import { UnauthorizedError } from "@/lib/auth";
import { AiGuidanceLimitError } from "@/lib/ai-guidance-limit";

export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Uniform error envelope: { error: string }. Validation problems are 400,
 * missing auth 401, missing resources 404, usage limits 429, executor outages
 * 503, everything else a logged 500.
 */
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ZodError) {
    const message = err.issues
      .map((i) => (i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message))
      .join("; ");
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (err instanceof UnauthorizedError) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
  if (err instanceof NotFoundError) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
  if (err instanceof ExecutorUnavailableError) {
    return NextResponse.json({ error: err.message }, { status: 503 });
  }
  if (err instanceof AiGuidanceLimitError) {
    return NextResponse.json(
      {
        error: err.message,
        code: err.code,
        retryAt: err.retryAt.toISOString(),
        retryAfterSeconds: err.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { "Retry-After": String(err.retryAfterSeconds) },
      },
    );
  }
  console.error("API error:", err);
  return NextResponse.json(
    { error: "Something went wrong on the server." },
    { status: 500 },
  );
}
