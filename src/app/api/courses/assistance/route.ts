import { NextResponse } from "next/server";
import { getCourse, getExercise, getModuleForLesson } from "@/content/courses";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { courseAssistanceEventSchema } from "@/lib/validation";
import { courseLessonIsUnlocked } from "@/lib/course-mastery";
import { recordLearningEvent, recordLearningEventOnce } from "@/lib/learning-events";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = courseAssistanceEventSchema.parse(await req.json());
    const course = getCourse(body.courseSlug);
    if (!course) throw new NotFoundError("Course not found");
    const exercise = getExercise(course, body.lessonSlug, body.exerciseId);
    const courseModule = getModuleForLesson(course, body.lessonSlug);
    if (!exercise || !courseModule) throw new NotFoundError("Exercise not found");
    if (!(await courseLessonIsUnlocked(user.id, course, body.lessonSlug))) {
      return NextResponse.json({ error: "This lesson is locked." }, { status: 409 });
    }

    const submissions = await prisma.courseExerciseSubmission.findMany({
      where: {
        userId: user.id,
        courseSlug: course.slug,
        lessonSlug: body.lessonSlug,
        exerciseId: body.exerciseId,
      },
      select: { mode: true, status: true },
    });
    if (course.progression === "mastery" && submissions.length === 0) {
      return NextResponse.json(
        { error: "Run or submit your own attempt before revealing the solution." },
        { status: 409 },
      );
    }

    if (body.kind === "guidance_complete") {
      await recordLearningEventOnce(user.id, {
        eventName: "guidance_completed",
        courseSlug: course.slug,
        lessonSlug: body.lessonSlug,
        activityId: exercise.id,
      });
      return NextResponse.json({ recorded: true });
    }

    if (body.kind === "worked_start") {
      if (!exercise.workedStart) {
        throw new NotFoundError("Worked start not found");
      }
      return NextResponse.json({ workedStart: exercise.workedStart });
    }

    const alreadySolved = submissions.some(
      (submission) =>
        submission.mode === "submit" && submission.status === "passed",
    );
    if (!alreadySolved) {
      await prisma.courseActivityAttempt.create({
        data: {
          userId: user.id,
          courseSlug: course.slug,
          moduleSlug: courseModule.slug,
          lessonSlug: body.lessonSlug,
          activityId: exercise.id,
          objectiveId: exercise.objectiveId ?? "unmapped",
          kind: body.kind,
          correct: false,
          score: 0,
          maxScore: 0,
          assisted: true,
        },
      });
    }

    await recordLearningEvent(user.id, {
      eventName: "solution_revealed",
      courseSlug: course.slug,
      lessonSlug: body.lessonSlug,
      activityId: exercise.id,
      properties: { alreadySolved },
    });

    return NextResponse.json({
      solution: exercise.solution,
      assisted: !alreadySolved,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
