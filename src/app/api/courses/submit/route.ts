import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judgeCode, judgeScript } from "@/lib/judge/judge";
import { getCourse, getExercise } from "@/content/courses";
import { courseExerciseRunSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { courseLessonIsUnlocked, getCourseMasterySnapshot } from "@/lib/course-mastery";
import { recordLearningEvent, recordLearningEventOnce } from "@/lib/learning-events";

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
    if (!(await courseLessonIsUnlocked(user.id, course, lessonSlug))) {
      return NextResponse.json({ error: "This lesson is locked." }, { status: 409 });
    }

    const outcome =
      exercise.mode === "script"
        ? await judgeScript({
            language: course.language,
            code,
            tests: [
              ...exercise.tests.filter((test) => !test.hidden),
              ...exercise.tests.filter((test) => test.hidden),
            ],
            revealHiddenTests: showHiddenTests,
          })
        : await judgeCode({
            language: course.language,
            code,
            signature: exercise.signature,
            tests: [
              ...exercise.tests.filter((test) => !test.hidden),
              ...exercise.tests.filter((test) => test.hidden),
            ],
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
        mode: "submit",
        status: outcome.status,
        results: JSON.stringify(outcome.results),
        passedCount: outcome.passedCount,
        totalCount: outcome.totalCount,
      },
    });

    await recordLearningEvent(user.id, {
      eventName: "program_checked",
      courseSlug,
      lessonSlug,
      activityId: exerciseId,
      properties: {
        status: outcome.status,
        passedCount: outcome.passedCount,
        totalCount: outcome.totalCount,
      },
    });
    if (outcome.status === "passed") {
      await recordLearningEventOnce(user.id, {
        eventName: "first_program_passed",
        courseSlug,
        properties: { lessonSlug, activityId: exerciseId },
      });
      const mastery = await getCourseMasterySnapshot(user.id, course);
      const lessonMastered = mastery.modules
        .flatMap((courseModule) => courseModule.lessons)
        .some((lesson) => lesson.slug === lessonSlug && lesson.mastered);
      if (lessonMastered) {
        await recordLearningEventOnce(user.id, {
          eventName: "lesson_mastered",
          courseSlug,
          lessonSlug,
        });
      }
    }

    return NextResponse.json({ submission: { id: submission.id }, outcome });
  } catch (err) {
    return toErrorResponse(err);
  }
}
