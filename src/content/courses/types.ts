/**
 * Authoring types for guided courses.
 *
 * A course teaches a single language for people who already program, using the
 * site's data-structures-and-algorithms lens. Courses are authored as
 * TypeScript modules (like problems) and held in memory; only per-user lesson
 * progress is persisted (see prisma LessonProgress).
 *
 * Lessons interleave teaching prose with coding exercises. Each exercise
 * declares a typed FunctionSignature + TestCase[] and is judged through the
 * exact same engine as the problem set (src/lib/judge), in the course's
 * language — so practice runs against real, verified test cases.
 */

import type { LanguageId } from "@/lib/judge/languages";
import type { FunctionSignature, TestCase } from "@/lib/judge/types";

export interface CourseExercise {
  /** Stable id, unique within its lesson (used in storage keys and the API). */
  id: string;
  title: string;
  /** Markdown task statement shown above the editor. */
  prompt: string;
  signature: FunctionSignature;
  /** Includes hidden tests; visible ones are shown before running. */
  tests: TestCase[];
  /** Editor stub in the course language. */
  starterCode: string;
  /** Reference solution — verified by scripts/verify-courses.ts. */
  solution: string;
  /** Progressive hints, revealed one at a time. */
  hints?: string[];
}

/** A lesson is an ordered list of blocks: teaching prose or an exercise. */
export type LessonBlock =
  | { kind: "prose"; markdown: string }
  | { kind: "exercise"; exercise: CourseExercise };

export interface Lesson {
  /** Unique within the course. */
  slug: string;
  title: string;
  /** One-line summary for the course outline. */
  summary: string;
  blocks: LessonBlock[];
}

export interface CourseModule {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  /** The language taught and used for every exercise in the course. */
  language: LanguageId;
  /** Short hero tagline. */
  tagline: string;
  /** Markdown intro shown on the course overview. */
  description: string;
  modules: CourseModule[];
}
