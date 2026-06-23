import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judgeCode } from "@/lib/judge/judge";
import { getProblemRecord, parseJudgingData } from "@/lib/problems";
import { selfAssessSchema, submissionSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import {
  DEFAULT_AI_EXPLANATION_MARKING_MODEL,
  requestAiExplanationMarking,
  type AiExplanationMarking,
} from "@/lib/ai-explanation-marking";
import {
  AiGuidanceLimitError,
  type AiGuidanceUsageReservation,
  refundAiGuidanceUsage,
  reserveAiGuidanceUsage,
} from "@/lib/ai-guidance-limit";

/**
 * "Submit" judges against the full test set (including hidden tests) and
 * records the attempt. Explanation submissions store the written answer and
 * return the model answer, key points, and AI marking when available.
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = submissionSchema.parse(await req.json());

    const record = await getProblemRecord(body.slug);
    if (!record) throw new NotFoundError(`No problem named "${body.slug}"`);

    if (body.kind === "code") {
      const judging = parseJudgingData(record);
      if (!judging) {
        return NextResponse.json(
          { error: "This problem does not accept code submissions." },
          { status: 400 },
        );
      }

      const outcome = await judgeCode({
        language: body.language,
        code: body.code,
        signature: judging.signature,
        tests: judging.tests,
        revealHiddenTests: body.showHiddenTests,
      });

      const submission = await prisma.submission.create({
        data: {
          problemId: record.id,
          userId: user.id,
          kind: "code",
          language: body.language,
          code: body.code,
          status: outcome.status,
          results: JSON.stringify(outcome.results),
          passedCount: outcome.passedCount,
          totalCount: outcome.totalCount,
        },
      });

      return NextResponse.json({ submission: { id: submission.id }, outcome });
    }

    if (record.type !== "explanation") {
      return NextResponse.json(
        { error: "This problem expects a code submission." },
        { status: 400 },
      );
    }

    const submission = await prisma.submission.create({
      data: {
        problemId: record.id,
        userId: user.id,
        kind: "explanation",
        answerText: body.answerText,
        status: "self_assessed",
        selfScore: null,
      },
    });
    const keyPoints = record.keyPoints ? JSON.parse(record.keyPoints) : [];
    const modelAnswer = record.modelAnswer ?? "";
    let marking: AiExplanationMarking | null = null;
    let aiMarkingUnavailable: string | null = null;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      aiMarkingUnavailable =
        "AI marking is not configured right now. You can still compare against the model answer.";
    } else {
      let usage: AiGuidanceUsageReservation | null = null;
      try {
        usage = await reserveAiGuidanceUsage(user.id);
        marking = await requestAiExplanationMarking({
          client: new Anthropic({ apiKey }),
          model:
            process.env.AI_EXPLANATION_MARKING_MODEL ??
            process.env.AI_GUIDANCE_MODEL ??
            DEFAULT_AI_EXPLANATION_MARKING_MODEL,
          context: {
            title: record.title,
            difficulty: record.difficulty,
            category: record.category,
            description: record.description,
            modelAnswer,
            keyPoints,
            answerText: body.answerText,
          },
        });
      } catch (err) {
        if (usage) {
          await refundAiGuidanceUsage(user.id, usage).catch((refundErr) => {
            console.error("Failed to refund AI explanation marking quota:", refundErr);
          });
        }

        if (err instanceof AiGuidanceLimitError) {
          aiMarkingUnavailable = err.message;
        } else {
          console.error("AI explanation marking failed:", err);
          aiMarkingUnavailable =
            "AI marking could not run this time. You can still compare against the model answer.";
        }
      }

      if (marking) {
        await prisma.submission
          .update({
            where: { id: submission.id },
            data: {
              status: "ai_assessed",
              aiScore: marking.score,
              aiFeedback: marking.feedback,
              aiMarking: JSON.stringify(marking),
            },
          })
          .catch((err) => {
            console.error("Failed to save AI explanation marking:", err);
            aiMarkingUnavailable =
              "AI marking ran, but the feedback could not be saved to history.";
          });
      }
    }

    return NextResponse.json({
      submission: { id: submission.id },
      modelAnswer,
      keyPoints,
      marking,
      aiMarkingUnavailable,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}

/** Record the self-assessment score on an explanation submission. */
export async function PATCH(req: Request) {
  try {
    const user = await requireUser();
    const { submissionId, selfScore } = selfAssessSchema.parse(
      await req.json(),
    );

    const existing = await prisma.submission.findUnique({
      where: { id: submissionId },
    });
    // Other users' submissions are indistinguishable from nonexistent ones.
    if (!existing || existing.userId !== user.id) {
      throw new NotFoundError("Submission not found");
    }
    if (existing.kind !== "explanation") {
      return NextResponse.json(
        { error: "Only explanation submissions can be self-assessed." },
        { status: 400 },
      );
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: { selfScore, status: "self_assessed" },
    });

    return NextResponse.json({
      submission: { id: submission.id, selfScore: submission.selfScore },
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
