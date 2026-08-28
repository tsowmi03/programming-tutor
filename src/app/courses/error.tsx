"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function CoursesError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Course page failed:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center px-4 py-16">
      <section
        role="alert"
        className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-7 text-center sm:p-9"
      >
        <AlertTriangle className="mx-auto h-9 w-9 text-amber-300" />
        <h1 className="mt-4 text-2xl font-bold">This course hit a problem</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">
          Your saved work is safe. Try loading this part of the course again,
          or return to your courses and continue from there.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/courses"
            className="rounded-lg border border-edge px-4 py-2.5 text-sm font-semibold text-muted transition hover:border-zinc-600 hover:text-foreground"
          >
            Return to courses
          </Link>
        </div>
        {error.digest && (
          <p className="mt-5 text-xs text-muted">
            Reference: {error.digest}
          </p>
        )}
      </section>
    </main>
  );
}
