import { prisma } from "./prisma";
import type { Course, CourseModule, Lesson } from "@/content/courses";

const activityKey = (lessonSlug: string, activityId: string) =>
  `${lessonSlug}:${activityId}`;

export function normalizeCourseAnswer(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

export function answerIsAccepted(answer: string, accepted: string[]): boolean {
  const normalized = normalizeCourseAnswer(answer);
  return accepted.some((value) => normalizeCourseAnswer(value) === normalized);
}

export function requiredActivityIds(lesson: Lesson): string[] {
  return lesson.blocks.flatMap((block) => {
    if (block.kind === "exercise" && block.exercise.required !== false) {
      return [block.exercise.id];
    }
    if (block.kind === "knowledge_check" && block.check.required !== false) {
      return [block.check.id];
    }
    return [];
  });
}

export interface LessonMasteryState {
  slug: string;
  unlocked: boolean;
  mastered: boolean;
  requiredCount: number;
  completedCount: number;
  assistedCount: number;
}

export interface ModuleMasteryState {
  slug: string;
  unlocked: boolean;
  lessons: LessonMasteryState[];
  checkpointUnlocked: boolean;
  checkpointPassed: boolean;
  bestScore: number | null;
  maxScore: number;
  attempts: number;
  remediationObjectiveIds: string[];
  remediationComplete: boolean;
}

export interface CourseMasterySnapshot {
  modules: ModuleMasteryState[];
  masteredLessonSlugs: Set<string>;
  solvedActivityKeys: Set<string>;
  assistedActivityKeys: Set<string>;
  nextLessonSlug: string | null;
}

function objectiveForActivity(
  courseModule: CourseModule,
  activityId: string,
): string | undefined {
  for (const lesson of courseModule.lessons) {
    for (const block of lesson.blocks) {
      if (block.kind === "exercise" && block.exercise.id === activityId) {
        return block.exercise.objectiveId;
      }
      if (block.kind === "knowledge_check" && block.check.id === activityId) {
        return block.check.objectiveId;
      }
    }
  }
  return undefined;
}

export async function getCourseMasterySnapshot(
  userId: string,
  course: Course,
): Promise<CourseMasterySnapshot> {
  const [exerciseRows, activityRows, checkpointRows, legacyRows] =
    await Promise.all([
      prisma.courseExerciseSubmission.findMany({
        where: {
          userId,
          courseSlug: course.slug,
          mode: "submit",
          status: "passed",
        },
        select: { lessonSlug: true, exerciseId: true },
      }),
      prisma.courseActivityAttempt.findMany({
        where: { userId, courseSlug: course.slug },
        orderBy: { createdAt: "asc" },
        select: {
          lessonSlug: true,
          activityId: true,
          objectiveId: true,
          kind: true,
          correct: true,
          createdAt: true,
        },
      }),
      prisma.courseCheckpointAttempt.findMany({
        where: { userId, courseSlug: course.slug },
        orderBy: { createdAt: "asc" },
      }),
      prisma.lessonProgress.findMany({
        where: { userId, courseSlug: course.slug },
        select: { lessonSlug: true },
      }),
    ]);

  const solved = new Set(
    exerciseRows.map((row) => activityKey(row.lessonSlug, row.exerciseId)),
  );
  const assisted = new Set<string>();
  for (const row of activityRows) {
    const key = activityKey(row.lessonSlug, row.activityId);
    if (row.kind === "knowledge_check" && row.correct) solved.add(key);
    if (row.kind === "solution_reveal") assisted.add(key);
  }

  if (course.progression !== "mastery") {
    const completed = new Set(legacyRows.map((row) => row.lessonSlug));
    const modules = course.modules.map((courseModule) => ({
      slug: courseModule.slug,
      unlocked: true,
      lessons: courseModule.lessons.map((lesson) => ({
        slug: lesson.slug,
        unlocked: true,
        mastered: completed.has(lesson.slug),
        requiredCount: requiredActivityIds(lesson).length,
        completedCount: requiredActivityIds(lesson).filter((id) =>
          solved.has(activityKey(lesson.slug, id)),
        ).length,
        assistedCount: requiredActivityIds(lesson).filter((id) =>
          assisted.has(activityKey(lesson.slug, id)),
        ).length,
      })),
      checkpointUnlocked: true,
      checkpointPassed: false,
      bestScore: null,
      maxScore: 0,
      attempts: 0,
      remediationObjectiveIds: [],
      remediationComplete: true,
    }));
    return {
      modules,
      masteredLessonSlugs: completed,
      solvedActivityKeys: solved,
      assistedActivityKeys: assisted,
      nextLessonSlug:
        course.modules
          .flatMap((courseModule) => courseModule.lessons)
          .find((lesson) => !completed.has(lesson.slug))?.slug ?? null,
    };
  }

  const masteredLessonSlugs = new Set<string>();
  const modules: ModuleMasteryState[] = [];
  let previousModulePassed = true;
  let nextLessonSlug: string | null = null;

  for (const courseModule of course.modules) {
    const moduleUnlocked = previousModulePassed;
    let previousLessonMastered = true;
    const lessons = courseModule.lessons.map((lesson) => {
      const ids = requiredActivityIds(lesson);
      const completedCount = ids.filter((id) =>
        solved.has(activityKey(lesson.slug, id)),
      ).length;
      const mastered = ids.length > 0 && completedCount === ids.length;
      const unlocked = moduleUnlocked && previousLessonMastered;
      if (mastered) masteredLessonSlugs.add(lesson.slug);
      if (unlocked && !mastered && nextLessonSlug === null) {
        nextLessonSlug = lesson.slug;
      }
      previousLessonMastered = mastered;
      return {
        slug: lesson.slug,
        unlocked,
        mastered,
        requiredCount: ids.length,
        completedCount,
        assistedCount: ids.filter((id) =>
          assisted.has(activityKey(lesson.slug, id)),
        ).length,
      };
    });

    const attempts = checkpointRows.filter(
      (row) => row.moduleSlug === courseModule.slug,
    );
    const checkpointPassed = attempts.some((row) => row.passed);
    const latest = attempts.at(-1);
    const missed = latest && !latest.passed
      ? (JSON.parse(latest.missedObjectiveIds) as string[])
      : [];
    const completedRemediation = new Set(
      latest
        ? activityRows
            .filter(
              (row) =>
                row.correct &&
                row.kind === "knowledge_check" &&
                row.createdAt > latest.createdAt,
            )
            .map((row) => row.objectiveId)
        : [],
    );
    const remediationComplete = missed.every((id) =>
      completedRemediation.has(id),
    );
    const checkpointUnlocked =
      moduleUnlocked && lessons.every((lesson) => lesson.mastered);
    const bestScore = attempts.length
      ? Math.max(...attempts.map((row) => row.score))
      : null;
    modules.push({
      slug: courseModule.slug,
      unlocked: moduleUnlocked,
      lessons,
      checkpointUnlocked,
      checkpointPassed,
      bestScore,
      maxScore: courseModule.checkpoint?.slots.length ?? 0,
      attempts: attempts.length,
      remediationObjectiveIds: missed,
      remediationComplete,
    });
    previousModulePassed = checkpointPassed;
  }

  return {
    modules,
    masteredLessonSlugs,
    solvedActivityKeys: solved,
    assistedActivityKeys: assisted,
    nextLessonSlug,
  };
}

export function findActivityObjective(
  course: Course,
  moduleSlug: string,
  activityId: string,
): string | undefined {
  const courseModule = course.modules.find((item) => item.slug === moduleSlug);
  return courseModule
    ? objectiveForActivity(courseModule, activityId)
    : undefined;
}

export async function courseLessonIsUnlocked(
  userId: string,
  course: Course,
  lessonSlug: string,
): Promise<boolean> {
  if (course.progression !== "mastery") return true;
  const snapshot = await getCourseMasterySnapshot(userId, course);
  return (
    snapshot.modules
      .flatMap((courseModule) => courseModule.lessons)
      .find((lesson) => lesson.slug === lessonSlug)?.unlocked ?? false
  );
}
