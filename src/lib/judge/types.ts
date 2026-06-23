/**
 * Core types for the judging engine.
 *
 * Coding problems declare a typed function signature. The judge generates a
 * per-language test harness around the user's code, executes it in a sandbox
 * (Piston), and parses a marker-based protocol from stdout into TestResults.
 */

/** Value types supported by the cross-language harness generators. */
export type JudgeType =
  | "int"
  | "bool"
  | "string"
  | "int[]"
  | "string[]"
  | "int[][]";

export type JudgeValue =
  | number
  | boolean
  | string
  | number[]
  | string[]
  | number[][];

export interface Param {
  name: string;
  type: JudgeType;
}

export interface FunctionSignature {
  /** Canonical camelCase name. Python harnesses use the snake_case form. */
  name: string;
  params: Param[];
  returns: JudgeType;
  /**
   * When false, array return values are sorted before comparison so any
   * ordering is accepted. Defaults to true (exact order required).
   */
  ordered?: boolean;
}

export interface TestCase {
  /** One value per parameter, in signature order. */
  input: JudgeValue[];
  expected: JudgeValue;
  /** Hidden tests only run on submit, not on "Run". */
  hidden?: boolean;
}

export type TestStatus = "pass" | "fail" | "error" | "not_run";

export interface TestResult {
  index: number;
  status: TestStatus;
  /** Test input values, exposed only when hidden test reveal is enabled. */
  input?: JudgeValue[];
  /** Canonical JSON rendering of the returned / expected values. */
  got?: string;
  expected?: string;
  /** Error message for status "error". */
  error?: string;
  /** Anything the user printed while this test ran (debug output). */
  stdout?: string;
  hidden?: boolean;
}

export type JudgeStatus = "passed" | "failed" | "error" | "compile_error";

export interface JudgeOutcome {
  status: JudgeStatus;
  results: TestResult[];
  /** Compiler output when status is "compile_error". */
  compileOutput?: string;
  passedCount: number;
  totalCount: number;
}

/** Canonical compact-JSON rendering used for display and C-side comparison. */
export function canonical(value: JudgeValue): string {
  return JSON.stringify(value);
}

/** twoSum -> two_sum (used for Python naming conventions). */
export function snakeCase(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
}
