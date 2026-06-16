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

const nameControlPattern = /[\u0000-\u001f\u007f]/;

export const displayNameSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, " "))
  .pipe(
    z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(80, "Name must be 80 characters or fewer."),
  )
  .refine((value) => !nameControlPattern.test(value), {
    message: "Name contains invalid characters.",
  })
  .refine((value) => !/^https?:\/\//i.test(value), {
    message: "Enter your name, not a URL.",
  })
  .refine((value) => !value.includes("@"), {
    message: "Enter your name, not your email address.",
  });

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Enter a valid email address.").min(3).max(254));

const weakPasswords = new Set([
  "password1234",
  "password12345",
  "password123456",
  "qwerty123456",
  "letmein123456",
  "codeclimb123",
]);

export const signupPasswordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters.")
  .max(200, "Password must be 200 characters or fewer.")
  .superRefine((password, ctx) => {
    const normalized = password.toLowerCase();
    if (weakPasswords.has(normalized)) {
      ctx.addIssue({
        code: "custom",
        message: "Choose a less common password.",
      });
    }
    if (/^(.)\1+$/.test(password)) {
      ctx.addIssue({
        code: "custom",
        message: "Password cannot be the same character repeated.",
      });
    }

    const hasLetter = /\p{L}/u.test(password);
    const hasNumberOrSymbol = /[\p{N}\p{P}\p{S}]/u.test(password);
    const looksLikePassphrase =
      password.length >= 16 && password.trim().split(/\s+/).length >= 3;
    if (!looksLikePassphrase && (!hasLetter || !hasNumberOrSymbol)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Use at least one letter and one number or symbol, or a longer passphrase.",
      });
    }
  });

export const signupSchema = z.object({
  name: displayNameSchema,
  email: emailSchema,
  password: signupPasswordSchema,
}).superRefine(({ name, email, password }, ctx) => {
  const normalizedPassword = password.toLowerCase();
  const emailLocalPart = email.split("@")[0];
  const nameParts = name.toLowerCase().split(/\s+/).filter((part) => part.length >= 3);
  if (emailLocalPart.length >= 3 && normalizedPassword.includes(emailLocalPart)) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password cannot contain your email address.",
    });
  }
  if (nameParts.some((part) => normalizedPassword.includes(part))) {
    ctx.addIssue({
      code: "custom",
      path: ["password"],
      message: "Password cannot contain your name.",
    });
  }
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required.")
    .max(200, "Password must be 200 characters or fewer."),
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
