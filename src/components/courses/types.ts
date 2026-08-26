/**
 * Client-facing shapes for the lesson viewer. Hidden test expectations are
 * stripped server-side — only the visible sample tests and a hidden count
 * cross to the browser (mirroring the problem workspace).
 */

import type {
  FunctionSignature,
  ScriptTestCase,
  TestCase,
} from "@/lib/judge/types";
import type { KnowledgeCheckFormat } from "@/content/courses/types";
import type { GuidanceItem } from "@/content/types";

interface ClientExerciseBase {
  id: string;
  title: string;
  prompt: string;
  hiddenTestCount: number;
  starterCode: string;
  guidance: GuidanceItem[];
  /** Legacy shape retained for older callers. */
  hints?: string[];
  required: boolean;
}

export interface ClientFunctionExercise extends ClientExerciseBase {
  mode: "function";
  signature: FunctionSignature;
  visibleTests: TestCase[];
}

export interface ClientScriptExercise extends ClientExerciseBase {
  mode: "script";
  visibleTests: ScriptTestCase[];
}

export type ClientExercise = ClientFunctionExercise | ClientScriptExercise;

export interface ClientKnowledgeCheck {
  id: string;
  format: KnowledgeCheckFormat;
  prompt: string;
  choices?: string[];
  objectiveId: string;
  required: boolean;
}

export type ClientBlock =
  | { kind: "prose"; markdown: string }
  | { kind: "exercise"; exercise: ClientExercise }
  | { kind: "knowledge_check"; check: ClientKnowledgeCheck };
