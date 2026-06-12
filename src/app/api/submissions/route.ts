import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judgeCode } from "@/lib/judge/judge";
import { getProblemRecord, parseJudgingData } from "@/lib/problems";
import { selfAssessSchema, submissionSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Submit" judges against the full test set (including hidden tests) and
 * records the attempt. Explanation submissions store the written answer and
 * return the model answer + key points for self-assessment.
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

    return NextResponse.json({
      submission: { id: submission.id },
      modelAnswer: record.modelAnswer,
      keyPoints: record.keyPoints ? JSON.parse(record.keyPoints) : [],
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
      data: { selfScore },
    });

    return NextResponse.json({
      submission: { id: submission.id, selfScore: submission.selfScore },
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
