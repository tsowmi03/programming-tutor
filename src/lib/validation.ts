import { z } from "zod";
import { LANGUAGE_IDS } from "@/lib/judge/languages";

export const runRequestSchema = z.object({
  slug: z.string().min(1),
  language: z.enum(LANGUAGE_IDS),
  code: z.string().min(1, "Code cannot be empty").max(100_000),
});

export const codeSubmissionSchema = z.object({
  kind: z.literal("code"),
  slug: z.string().min(1),
  language: z.enum(LANGUAGE_IDS),
  code: z.string().min(1, "Code cannot be empty").max(100_000),
});

export const explanationSubmissionSchema = z.object({
  kind: z.literal("explanation"),
  slug: z.string().min(1),
  answerText: z.string().min(1, "Answer cannot be empty").max(50_000),
});

export const submissionSchema = z.discriminatedUnion("kind", [
  codeSubmissionSchema,
  explanationSubmissionSchema,
]);

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address.").max(254));

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  email: emailSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(200),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const selfAssessSchema = z.object({
  submissionId: z.string().min(1),
  selfScore: z.number().int().min(0).max(2),
});

const judgeResultSchema = z.object({
  index: z.number().int().nonnegative(),
  status: z.enum(["pass", "fail", "error", "not_run"]),
  got: z.string().max(5_000).optional(),
  expected: z.string().max(5_000).optional(),
  error: z.string().max(5_000).optional(),
  stdout: z.string().max(5_000).optional(),
  hidden: z.boolean().optional(),
});

const judgeOutcomeSchema = z.object({
  status: z.enum(["passed", "failed", "error", "compile_error"]),
  results: z.array(judgeResultSchema).max(100),
  compileOutput: z.string().max(10_000).optional(),
  passedCount: z.number().int().nonnegative(),
  totalCount: z.number().int().nonnegative(),
});

export const aiGuidanceRequestSchema = z.object({
  language: z.enum(LANGUAGE_IDS),
  code: z.string().max(100_000).optional(),
  mode: z
    .enum(["nudge", "debug", "strategy", "edge_case"])
    .default("nudge"),
  latestOutcome: judgeOutcomeSchema.nullish(),
  runError: z.string().max(10_000).nullish(),
});

/** Judging a course exercise (run = sample tests; submit = all tests). */
export const courseExerciseRunSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  exerciseId: z.string().min(1),
  code: z.string().min(1, "Code cannot be empty").max(100_000),
});

export const lessonProgressSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  completed: z.boolean(),
});

export type RunRequest = z.infer<typeof runRequestSchema>;
export type SubmissionRequest = z.infer<typeof submissionSchema>;
export type AiGuidanceRequest = z.infer<typeof aiGuidanceRequestSchema>;
