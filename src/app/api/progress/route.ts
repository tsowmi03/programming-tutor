import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deriveStatus, type ProblemStatus } from "@/lib/problems";
import { requireUser } from "@/lib/auth";
import { toErrorResponse } from "@/lib/api";

interface CategoryProgress {
  category: string;
  total: number;
  solved: number;
  attempted: number;
}

/** The user's aggregate progress: overall, per category and difficulty, recents. */
export async function GET() {
  try {
    const user = await requireUser();
    const problems = await prisma.problem.findMany({
      include: {
        submissions: {
          where: { userId: user.id },
          select: { status: true, selfScore: true },
        },
      },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    const byCategory = new Map<string, CategoryProgress>();
    const byDifficulty = new Map<
      string,
      { total: number; solved: number }
    >();
    let solved = 0;
    let attempted = 0;

    const statuses = new Map<string, ProblemStatus>();
    for (const p of problems) {
      const status = deriveStatus(p.submissions);
      statuses.set(p.slug, status);
      if (status === "solved") solved++;
      if (status === "attempted") attempted++;

      const cat = byCategory.get(p.category) ?? {
        category: p.category,
        total: 0,
        solved: 0,
        attempted: 0,
      };
      cat.total++;
      if (status === "solved") cat.solved++;
      if (status === "attempted") cat.attempted++;
      byCategory.set(p.category, cat);

      const diff = byDifficulty.get(p.difficulty) ?? { total: 0, solved: 0 };
      diff.total++;
      if (status === "solved") diff.solved++;
      byDifficulty.set(p.difficulty, diff);
    }

    const recentSubmissions = await prisma.submission.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        kind: true,
        language: true,
        status: true,
        selfScore: true,
        passedCount: true,
        totalCount: true,
        createdAt: true,
        problem: { select: { slug: true, title: true, difficulty: true } },
      },
    });

    return NextResponse.json({
      totals: { problems: problems.length, solved, attempted },
      categories: Array.from(byCategory.values()),
      difficulties: Object.fromEntries(byDifficulty),
      recentSubmissions,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
