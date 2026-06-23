import { NextResponse } from "next/server";
import { judgeCode } from "@/lib/judge/judge";
import { getCourse, getExercise } from "@/content/courses";
import { courseExerciseRunSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Submit" a course exercise: judge against the full test set (visible +
 * hidden), ordered visible-first so result indices line up with the sample
 * tests the client shows. Course exercises are practice — the pass/fail is
 * returned to the client (which tracks it locally), not stored as a
 * submission row. Lesson completion is recorded separately via the progress
 * endpoint.
 */
export async function POST(req: Request) {
  try {
    await requireUser();
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

    return NextResponse.json({ outcome });
  } catch (err) {
    return toErrorResponse(err);
  }
}
