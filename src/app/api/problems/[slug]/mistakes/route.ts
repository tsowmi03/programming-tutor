import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProblemRecord } from "@/lib/problems";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { mistakeNoteSchema } from "@/lib/validation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireUser();
    const { slug } = await params;
    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);

    const notes = await prisma.mistakeNote.findMany({
      where: { userId: user.id, problemId: record.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        category: true,
        note: true,
        submissionId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ notes });
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireUser();
    const { slug } = await params;
    const body = mistakeNoteSchema.parse(await req.json());
    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);

    if (body.submissionId) {
      const submission = await prisma.submission.findFirst({
        where: {
          id: body.submissionId,
          userId: user.id,
          problemId: record.id,
        },
        select: { id: true },
      });
      if (!submission) throw new NotFoundError("Submission not found");
    }

    const note = await prisma.mistakeNote.create({
      data: {
        userId: user.id,
        problemId: record.id,
        submissionId: body.submissionId,
        category: body.category,
        note: body.note,
      },
      select: {
        id: true,
        category: true,
        note: true,
        submissionId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ note });
  } catch (err) {
    return toErrorResponse(err);
  }
}
