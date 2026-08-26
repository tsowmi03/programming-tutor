import { NextResponse } from "next/server";
import {
  getCourse,
  getKnowledgeCheck,
  getModuleForLesson,
} from "@/content/courses";
import { answerIsAccepted, courseLessonIsUnlocked, getCourseMasterySnapshot } from "@/lib/course-mastery";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { courseKnowledgeCheckSchema } from "@/lib/validation";
import { recordLearningEvent, recordLearningEventOnce } from "@/lib/learning-events";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = courseKnowledgeCheckSchema.parse(await req.json());
    const course = getCourse(body.courseSlug);
    if (!course) throw new NotFoundError("Course not found");
    const check = getKnowledgeCheck(
      course,
      body.lessonSlug,
      body.activityId,
    );
    const courseModule = getModuleForLesson(course, body.lessonSlug);
    if (!check || !courseModule) throw new NotFoundError("Activity not found");
    if (!(await courseLessonIsUnlocked(user.id, course, body.lessonSlug))) {
      return NextResponse.json({ error: "This lesson is locked." }, { status: 409 });
    }

    const correct = answerIsAccepted(body.answer, check.acceptedAnswers);
    await prisma.courseActivityAttempt.create({
      data: {
        userId: user.id,
        courseSlug: course.slug,
        moduleSlug: courseModule.slug,
        lessonSlug: body.lessonSlug,
        activityId: check.id,
        objectiveId: check.objectiveId,
        kind: "knowledge_check",
        answer: body.answer,
        correct,
        score: correct ? 1 : 0,
        maxScore: 1,
      },
    });

    await recordLearningEvent(user.id, {
      eventName: "knowledge_check_answered",
      courseSlug: course.slug,
      lessonSlug: body.lessonSlug,
      activityId: check.id,
      properties: { correct },
    });
    if (correct) {
      const mastery = await getCourseMasterySnapshot(user.id, course);
      const lessonMastered = mastery.modules
        .flatMap((module) => module.lessons)
        .some(
          (lesson) => lesson.slug === body.lessonSlug && lesson.mastered,
        );
      if (lessonMastered) {
        await recordLearningEventOnce(user.id, {
          eventName: "lesson_mastered",
          courseSlug: course.slug,
          lessonSlug: body.lessonSlug,
        });
      }
    }

    return NextResponse.json({ correct, explanation: check.explanation });
  } catch (err) {
    return toErrorResponse(err);
  }
}
