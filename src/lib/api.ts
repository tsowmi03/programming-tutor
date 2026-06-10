/** Shared helpers for API route handlers. */

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { ExecutorUnavailableError } from "@/lib/judge/executors";

export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

/**
 * Uniform error envelope: { error: string }. Validation problems are 400,
 * missing resources 404, executor outages 503, everything else a logged 500.
 */
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof ZodError) {
    const message = err.issues
      .map((i) => (i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message))
      .join("; ");
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (err instanceof NotFoundError) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
  if (err instanceof ExecutorUnavailableError) {
    return NextResponse.json({ error: err.message }, { status: 503 });
  }
  console.error("API error:", err);
  return NextResponse.json(
    { error: "Something went wrong on the server." },
    { status: 500 },
  );
}
