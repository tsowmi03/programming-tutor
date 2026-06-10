"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { JudgeValue, FunctionSignature } from "@/lib/judge/types";

/** localStorage-backed state (drafts survive reloads). */
export function useStoredState(key: string, initial: string) {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Hydrate from localStorage after mount (and when the key changes, e.g.
    // switching language). Reading localStorage during render would cause a
    // server/client hydration mismatch, so the sync setState here is the
    // standard pattern; consumers gate rendering on `loaded`.
    const saved = window.localStorage.getItem(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(saved ?? initial);
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(key, value);
  }, [key, value, loaded]);

  return [value, setValue, loaded] as const;
}

export function celebrate() {
  const opts = { spread: 70, ticks: 120, zIndex: 100, disableForReducedMotion: true };
  confetti({ ...opts, particleCount: 90, origin: { x: 0.5, y: 0.7 } });
  setTimeout(
    () => confetti({ ...opts, particleCount: 50, origin: { x: 0.2, y: 0.8 } }),
    180,
  );
  setTimeout(
    () => confetti({ ...opts, particleCount: 50, origin: { x: 0.8, y: 0.8 } }),
    320,
  );
}

/** "nums = [2,7,11,15], target = 9" */
export function formatInput(
  signature: FunctionSignature | undefined,
  input: JudgeValue[],
): string {
  if (!signature) return JSON.stringify(input);
  return input
    .map((v, i) => `${signature.params[i]?.name ?? `arg${i}`} = ${JSON.stringify(v)}`)
    .join(", ");
}

export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }
  return body;
}
