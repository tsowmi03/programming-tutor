import { NextResponse } from "next/server";
import { judgeCode } from "@/lib/judge/judge";
import { getCourse, getExercise } from "@/content/courses";
import { courseExerciseRunSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * "Run" a course exercise against its sample (visible) tests only — a fast
 * feedback loop that records nothing. Auth is required so the executor can't
 * be driven anonymously. The exercise is solved in the course's language.
 */
export async function POST(req: Request) {
  try {
    await requireUser();
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

    return NextResponse.json({ outcome });
  } catch (err) {
    return toErrorResponse(err);
  }
}
