/**
 * Client-facing shapes for the lesson viewer. Hidden test expectations are
 * stripped server-side — only the visible sample tests and a hidden count
 * cross to the browser (mirroring the problem workspace).
 */

import type { FunctionSignature, TestCase } from "@/lib/judge/types";

export interface ClientExercise {
  id: string;
  title: string;
  prompt: string;
  signature: FunctionSignature;
  /** Sample tests only; hidden tests are summarised by hiddenTestCount. */
  visibleTests: TestCase[];
  hiddenTestCount: number;
  starterCode: string;
  /** The reference solution (revealable in the UI). */
  solution: string;
  hints?: string[];
}

export type ClientBlock =
  | { kind: "prose"; markdown: string }
  | { kind: "exercise"; exercise: ClientExercise };
