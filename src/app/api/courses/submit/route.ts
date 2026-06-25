import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judgeCode } from "@/lib/judge/judge";
import { getCourse, getExercise } from "@/content/courses";
import { courseExerciseRunSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Submit" a course exercise: judge against the full test set (visible +
 * hidden), ordered visible-first so result indices line up with the sample
 * tests the client shows. The attempt is stored so course exercise progress
 * survives across devices. Lesson completion is still recorded separately via
 * the progress endpoint.
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const { courseSlug, lessonSlug, exerciseId, code, showHiddenTests } =
      courseExerciseRunSchema.parse(await req.json());

    const course = getCourse(courseSlug);
    if (!course) throw new NotFoundError(`No course named "${courseSlug}"`);
    const exercise = getExercise(course, lessonSlug, exerciseId);
    if (!exercise) throw new NotFoundError("Exercise not found");

    const ordered = [
      ...exercise.tests.filter((t) => !t.hidden),
      ...exercise.tests.filter((t) => t.hidden),
    ];
    const outcome = await judgeCode({
      language: course.language,
      code,
      signature: exercise.signature,
      tests: ordered,
      revealHiddenTests: showHiddenTests,
    });

    const submission = await prisma.courseExerciseSubmission.create({
      data: {
        userId: user.id,
        courseSlug,
        lessonSlug,
        exerciseId,
        language: course.language,
        code,
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
