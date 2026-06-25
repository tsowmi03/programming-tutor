import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judgeCode } from "@/lib/judge/judge";
import { getCourse, getExercise } from "@/content/courses";
import { courseExerciseRunSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Run" a course exercise against its sample (visible) tests only — a fast
 * feedback loop that stores a run attempt without marking the exercise solved.
 * Auth is required so the executor can't be driven anonymously. The exercise
 * is solved in the course's language.
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const { courseSlug, lessonSlug, exerciseId, code } =
      courseExerciseRunSchema.parse(await req.json());

    const course = getCourse(courseSlug);
    if (!course) throw new NotFoundError(`No course named "${courseSlug}"`);
    const exercise = getExercise(course, lessonSlug, exerciseId);
    if (!exercise) throw new NotFoundError("Exercise not found");

    const visibleTests = exercise.tests.filter((t) => !t.hidden);
    const outcome = await judgeCode({
      language: course.language,
      code,
      signature: exercise.signature,
      tests: visibleTests,
    });

    const submission = await prisma.courseExerciseSubmission.create({
      data: {
        userId: user.id,
        courseSlug,
        lessonSlug,
        exerciseId,
        language: course.language,
        code,
        mode: "run",
        status: outcome.status,
        results: JSON.stringify(outcome.results),
        passedCount: outcome.passedCount,
        totalCount: outcome.totalCount,
      },
    });

    return NextResponse.json({ submission: { id: submission.id }, outcome });
  } catch (err) {
    return toErrorResponse(err);
  }
}
