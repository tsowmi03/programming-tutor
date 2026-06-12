"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { login, signup, type AuthFormState } from "@/lib/auth-actions";

const initialState: AuthFormState = {};

const COPY = {
  login: {
    title: "Welcome back",
    subtitle: "Log in to pick up your climb where you left off.",
    submit: "Log in",
    submitting: "Logging in…",
    alt: { prompt: "New here?", label: "Create an account", href: "/signup" },
  },
  signup: {
    title: "Create your account",
    subtitle: "Track your progress as you climb through the problem set.",
    submit: "Sign up",
    submitting: "Creating account…",
    alt: { prompt: "Already have an account?", label: "Log in", href: "/login" },
  },
} as const;

export function AuthForm({
  mode,
  next,
}: {
  mode: "login" | "signup";
  next?: string;
}) {
  const [state, formAction, pending] = useActionState(
    mode === "login" ? login : signup,
    initialState,
  );
  const copy = COPY[mode];
  const altHref = next
    ? `${copy.alt.href}?next=${encodeURIComponent(next)}`
    : copy.alt.href;

  return (
    <main className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/40">
            <Mountain className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-1 text-sm text-muted">{copy.subtitle}</p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-2xl border border-edge bg-surface p-6"
        >
          {next && <input type="hidden" name="next" value={next} />}

          {mode === "signup" && (
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                placeholder="Ada Lovelace"
                defaultValue={state.values?.name}
                className={inputClasses}
              />
            </Field>
          )}

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              defaultValue={state.values?.email}
              className={inputClasses}
            />
          </Field>

          <Field label="Password" htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
              minLength={mode === "signup" ? 8 : 1}
              placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
              className={inputClasses}
            />
          </Field>

          {state.error && (
            <p
              role="alert"
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? copy.submitting : copy.submit}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {copy.alt.prompt}{" "}
          <Link
            href={altHref}
            className="font-medium text-indigo-300 transition hover:text-indigo-200"
          >
            {copy.alt.label}
          </Link>
        </p>
      </div>
    </main>
  );
}

const inputClasses =
  "w-full rounded-lg border border-edge bg-surface-raised px-3 py-2 text-sm text-foreground placeholder:text-zinc-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
