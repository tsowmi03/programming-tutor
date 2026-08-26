/**
 * Course service: typed access over the static course content plus per-user
 * lesson-completion progress (the LessonProgress table).
 */

import { prisma } from "./prisma";
import {
  ALL_COURSES,
  getCourse,
  getLesson,
  orderedLessons,
} from "@/content/courses";
import type { Course, Lesson } from "@/content/courses";
import { getCourseMasterySnapshot } from "./course-mastery";

export interface CourseSummary {
  slug: string;
  title: string;
  language: string;
  tagline: string;
  lessonCount: number;
  exerciseCount: number;
  completedCount: number;
  level: Course["level"];
  courseMastered: boolean;
}

function countExercises(course: Course): number {
  return course.modules.reduce(
    (sum, mod) =>
      sum +
      mod.lessons.reduce(
        (s, lesson) =>
          s + lesson.blocks.filter((b) => b.kind === "exercise").length,
        0,
      ),
    0,
  );
}

function countLessons(course: Course): number {
  return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}

/** Completed lesson slugs for one course, as a Set. */
export async function getCompletedLessons(
  userId: string,
  courseSlug: string,
): Promise<Set<string>> {
  const rows = await prisma.lessonProgress.findMany({
    where: { userId, courseSlug },
    select: { lessonSlug: true },
  });
  return new Set(rows.map((r) => r.lessonSlug));
}

export async function listCourses(userId: string): Promise<CourseSummary[]> {
  const completedByCourse = await prisma.lessonProgress.groupBy({
    by: ["courseSlug"],
    where: { userId },
    _count: { lessonSlug: true },
  });
  const completedMap = new Map(
    completedByCourse.map((c) => [c.courseSlug, c._count.lessonSlug]),
  );

  return Promise.all(
    ALL_COURSES.map(async (course) => {
      const mastery =
        course.progression === "mastery"
          ? await getCourseMasterySnapshot(userId, course)
          : null;
      const lessonCount = countLessons(course);
      const completedCount = mastery
        ? mastery.masteredLessonSlugs.size
        : (completedMap.get(course.slug) ?? 0);
      return {
        slug: course.slug,
        title: course.title,
        language: course.language,
        tagline: course.tagline,
        lessonCount,
        exerciseCount: countExercises(course),
        completedCount,
        level: course.level,
        courseMastered: mastery
          ? mastery.modules.every((courseModule) => courseModule.checkpointPassed)
          : lessonCount > 0 && completedCount === lessonCount,
      };
    }),
  );
}

export interface CourseOverview {
  course: Course;
  completed: Set<string>;
  lessonCount: number;
  /** First not-yet-completed lesson, for the "start / continue" button. */
  nextLessonSlug: string | null;
  mastery: Awaited<ReturnType<typeof getCourseMasterySnapshot>>;
}

export async function getCourseOverview(
  slug: string,
  userId: string,
): Promise<CourseOverview | null> {
  const course = getCourse(slug);
  if (!course) return null;
  const mastery = await getCourseMasterySnapshot(userId, course);
  const completed =
    course.progression === "mastery"
      ? mastery.masteredLessonSlugs
      : await getCompletedLessons(userId, slug);
  const ordered = orderedLessons(course);
  const next = ordered.find(
    (o) => o.lesson.slug === mastery.nextLessonSlug,
  );
  return {
    course,
    completed,
    lessonCount: ordered.length,
    nextLessonSlug:
      course.progression === "mastery"
        ? (next?.lesson.slug ?? null)
        : (next?.lesson.slug ?? ordered[0]?.lesson.slug ?? null),
    mastery,
  };
}

export interface LessonView {
  course: Course;
  lesson: Lesson;
  completed: boolean;
  solvedExerciseIds: string[];
  attemptedExerciseIds: string[];
  initialExerciseCodes: Record<string, string>;
  solvedKnowledgeCheckIds: string[];
  initialKnowledgeCheckAnswers: Record<string, string>;
  assistedExerciseIds: string[];
  unlocked: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  /** 1-based position in the course, and the total, for the progress label. */
  position: number;
  total: number;
}

export async function getLessonView(
  courseSlug: string,
  lessonSlug: string,
  userId: string,
): Promise<LessonView | null> {
  const course = getCourse(courseSlug);
  if (!course) return null;
  const lesson = getLesson(course, lessonSlug);
  if (!lesson) return null;

  const ordered = orderedLessons(course);
  const index = ordered.findIndex((o) => o.lesson.slug === lessonSlug);

  const [completedRow, solvedRows, attemptedRows, knowledgeRows, mastery] =
    await Promise.all([
      prisma.lessonProgress.findUnique({
        where: {
          userId_courseSlug_lessonSlug: { userId, courseSlug, lessonSlug },
        },
        select: { id: true },
      }),
      prisma.courseExerciseSubmission.findMany({
        where: {
          userId,
          courseSlug,
          lessonSlug,
          mode: "submit",
          status: "passed",
        },
        select: { exerciseId: true },
      }),
      prisma.courseExerciseSubmission.findMany({
        where: { userId, courseSlug, lessonSlug },
        orderBy: { createdAt: "desc" },
        select: { exerciseId: true, code: true },
      }),
      prisma.courseActivityAttempt.findMany({
        where: {
          userId,
          courseSlug,
          lessonSlug,
          kind: "knowledge_check",
          answer: { not: null },
        },
        orderBy: { createdAt: "desc" },
        select: { activityId: true, answer: true },
      }),
      getCourseMasterySnapshot(userId, course),
    ]);
  const solvedExerciseIds = [...new Set(solvedRows.map((row) => row.exerciseId))];
  const attemptedExerciseIds = [
    ...new Set(attemptedRows.map((row) => row.exerciseId)),
  ];
  const initialExerciseCodes: Record<string, string> = {};
  for (const row of attemptedRows) {
    initialExerciseCodes[row.exerciseId] ??= row.code;
  }
  const initialKnowledgeCheckAnswers: Record<string, string> = {};
  for (const row of knowledgeRows) {
    if (row.answer !== null) {
      initialKnowledgeCheckAnswers[row.activityId] ??= row.answer;
    }
  }

  const lessonState = mastery.modules
    .flatMap((courseModule) => courseModule.lessons)
    .find((state) => state.slug === lessonSlug);
  const solvedKnowledgeCheckIds = lesson.blocks.flatMap((block) =>
    block.kind === "knowledge_check" &&
    mastery.solvedActivityKeys.has(`${lessonSlug}:${block.check.id}`)
      ? [block.check.id]
      : [],
  );
  const assistedExerciseIds = lesson.blocks.flatMap((block) =>
    block.kind === "exercise" &&
    mastery.assistedActivityKeys.has(`${lessonSlug}:${block.exercise.id}`)
      ? [block.exercise.id]
      : [],
  );

  return {
    course,
    lesson,
    completed:
      course.progression === "mastery"
        ? (lessonState?.mastered ?? false)
        : completedRow != null,
    solvedExerciseIds,
    attemptedExerciseIds,
    initialExerciseCodes,
    solvedKnowledgeCheckIds,
    initialKnowledgeCheckAnswers,
    assistedExerciseIds,
    unlocked: lessonState?.unlocked ?? true,
    prevSlug: index > 0 ? ordered[index - 1].lesson.slug : null,
    nextSlug:
      index < ordered.length - 1 ? ordered[index + 1].lesson.slug : null,
    position: index + 1,
    total: ordered.length,
  };
}

/** Mark a lesson complete or incomplete for a user (idempotent). */
export async function setLessonCompletion(
  userId: string,
  courseSlug: string,
  lessonSlug: string,
  completed: boolean,
): Promise<void> {
  if (completed) {
    await prisma.lessonProgress.upsert({
      where: {
        userId_courseSlug_lessonSlug: { userId, courseSlug, lessonSlug },
      },
      create: { userId, courseSlug, lessonSlug },
      update: {},
    });
  } else {
    await prisma.lessonProgress.deleteMany({
      where: { userId, courseSlug, lessonSlug },
    });
  }
}
