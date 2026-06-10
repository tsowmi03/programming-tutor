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

export const selfAssessSchema = z.object({
  submissionId: z.string().min(1),
  selfScore: z.number().int().min(0).max(2),
});

export type RunRequest = z.infer<typeof runRequestSchema>;
export type SubmissionRequest = z.infer<typeof submissionSchema>;
