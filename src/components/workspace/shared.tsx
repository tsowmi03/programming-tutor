"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { JudgeValue, FunctionSignature } from "@/lib/judge/types";

function readLocalState(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalState(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Draft persistence is helpful, but storage restrictions must not block learning.
  }
}

/** localStorage-backed state (drafts survive reloads). */
export function useStoredState(key: string, initial: string) {
  const [value, setValue] = useState(initial);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const loaded = loadedKey === key;
  const latestRef = useRef({ key, value, loaded });
  const previousRef = useRef({ key, value, loaded });

  useEffect(() => {
    // Hydrate from localStorage after mount (and when the key changes, e.g.
    // switching language). Reading localStorage during render would cause a
    // server/client hydration mismatch, so the sync setState here is the
    // standard pattern; consumers gate rendering on `loaded`.
    const saved = readLocalState(key);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(saved ?? initial);
    setLoadedKey(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const previous = previousRef.current;
    if (previous.loaded && previous.key !== key) {
      writeLocalState(previous.key, previous.value);
    }
    previousRef.current = { key, value, loaded };
    latestRef.current = { key, value, loaded };
  }, [key, value, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const timeout = window.setTimeout(() => {
      const latest = latestRef.current;
      if (latest.loaded && latest.key === key) {
        writeLocalState(key, latest.value);
      }
    }, 150);
    return () => window.clearTimeout(timeout);
  }, [key, value, loaded]);

  useEffect(() => {
    const flush = () => {
      const latest = latestRef.current;
      if (latest.loaded) {
        writeLocalState(latest.key, latest.value);
      }
    };
    window.addEventListener("pagehide", flush);
    return () => {
      flush();
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  return [value, setValue, loaded] as const;
}

export function celebrate() {
  void import("canvas-confetti").then(({ default: confetti }) => {
    const opts = {
      spread: 70,
      ticks: 120,
      zIndex: 100,
      disableForReducedMotion: true,
    };

    const launch = (particleCount: number, x: number, y: number) => {
      try {
        confetti({ ...opts, particleCount, origin: { x, y } });
      } catch (error) {
        console.error("Celebration animation failed:", error);
      }
    };

    launch(90, 0.5, 0.7);
    setTimeout(
      () => launch(50, 0.2, 0.8),
      180,
    );
    setTimeout(
      () => launch(50, 0.8, 0.8),
      320,
    );
  }).catch((error) => {
    console.error("Celebration animation failed to load:", error);
  });
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
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

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const body = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    throw new ApiError(
      body.error ?? `Request failed (${res.status})`,
      res.status,
      body,
    );
  }
  return body;
}
