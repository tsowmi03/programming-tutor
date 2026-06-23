import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProblemRecord } from "@/lib/problems";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/** The user's submission history for one problem, newest first. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireUser();
    const { slug } = await params;
    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);

    const submissions = await prisma.submission.findMany({
      where: { problemId: record.id, userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: {
        id: true,
        kind: true,
        language: true,
        code: true,
        answerText: true,
        status: true,
        selfScore: true,
        aiScore: true,
        aiFeedback: true,
        aiMarking: true,
        passedCount: true,
        totalCount: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ submissions });
  } catch (err) {
    return toErrorResponse(err);
  }
}
