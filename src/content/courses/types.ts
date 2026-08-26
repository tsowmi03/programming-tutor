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
import type {
  FunctionSignature,
  ScriptTestCase,
  TestCase,
} from "@/lib/judge/types";
import type { GuidanceItem } from "@/content/types";

interface CourseExerciseBase {
  /** Stable id, unique within its lesson (used in storage keys and the API). */
  id: string;
  title: string;
  /** Markdown task statement shown above the editor. */
  prompt: string;
  /** Editor stub in the course language. */
  starterCode: string;
  /** Reference solution — verified by scripts/verify-courses.ts. */
  solution: string;
  /** Progressive hints, revealed one at a time. */
  hints?: string[];
  /** Optional structured guidance, revealed only when requested. */
  guidance?: GuidanceItem[];
  /** Required activities gate progress in mastery courses. Defaults to true. */
  required?: boolean;
  /** Stable learning objective used for checkpoint remediation. */
  objectiveId?: string;
}

export interface FunctionCourseExercise extends CourseExerciseBase {
  /** Omitted by legacy courses; omitted means function mode. */
  mode?: "function";
  signature: FunctionSignature;
  /** Includes hidden tests; visible ones are shown before running. */
  tests: TestCase[];
}

export interface ScriptCourseExercise extends CourseExerciseBase {
  mode: "script";
  tests: ScriptTestCase[];
}

export type CourseExercise = FunctionCourseExercise | ScriptCourseExercise;

export type KnowledgeCheckFormat =
  | "single_choice"
  | "short_answer"
  | "prediction"
  | "trace";

export interface KnowledgeCheck {
  id: string;
  format: KnowledgeCheckFormat;
  prompt: string;
  choices?: string[];
  /** Normalized, case-insensitive accepted answers. Never sent to the client. */
  acceptedAnswers: string[];
  explanation: string;
  objectiveId: string;
  required?: boolean;
}

export interface CheckpointVariant {
  id: string;
  prompt: string;
  choices?: string[];
  acceptedAnswers: string[];
  explanation: string;
}

export interface CheckpointSlot {
  objectiveId: string;
  format: KnowledgeCheckFormat;
  remediationLessonSlug: string;
  variants: CheckpointVariant[];
}

export interface ModuleCheckpoint {
  id: string;
  title: string;
  passingScore: number;
  slots: CheckpointSlot[];
}

/** A lesson is an ordered list of blocks: teaching prose or an exercise. */
export type LessonBlock =
  | { kind: "prose"; markdown: string }
  | { kind: "exercise"; exercise: CourseExercise }
  | { kind: "knowledge_check"; check: KnowledgeCheck };

export interface Lesson {
  /** Unique within the course. */
  slug: string;
  title: string;
  /** One-line summary for the course outline. */
  summary: string;
  objectives?: string[];
  estimatedMinutes?: number;
  blocks: LessonBlock[];
}

export interface CourseModule {
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
  objectiveIds?: string[];
  checkpoint?: ModuleCheckpoint;
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
  level?: "beginner" | "intermediate" | "advanced";
  audience?: string;
  prerequisiteCourseSlugs?: string[];
  estimatedMinutes?: number;
  outcomes?: string[];
  progression?: "open" | "mastery";
  nextCourseSlug?: string;
}
