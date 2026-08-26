/**
 * Course registry and lookup helpers.
 *
 * Courses are static content (in memory). Lesson progress is the only thing
 * persisted — see prisma LessonProgress and src/lib/courses.ts.
 */

import type {
  Course,
  CourseExercise,
  CourseModule,
  KnowledgeCheck,
  Lesson,
} from "./types";
import { csharpCourse } from "./csharp";
import { pythonCourse } from "./python";
import { beginnerPythonCourse } from "./beginner-python";

export const ALL_COURSES: Course[] = [beginnerPythonCourse, pythonCourse, csharpCourse];

export function getCourse(slug: string): Course | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getLesson(
  course: Course,
  lessonSlug: string,
): Lesson | undefined {
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return lesson;
  }
  return undefined;
}

/** Flat, course-order list of lessons with their module — for prev/next nav. */
export function orderedLessons(
  course: Course,
): { lesson: Lesson; moduleSlug: string; moduleTitle: string }[] {
  return course.modules.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      lesson,
      moduleSlug: mod.slug,
      moduleTitle: mod.title,
    })),
  );
}

export function getExercise(
  course: Course,
  lessonSlug: string,
  exerciseId: string,
): CourseExercise | undefined {
  const lesson = getLesson(course, lessonSlug);
  if (!lesson) return undefined;
  for (const block of lesson.blocks) {
    if (block.kind === "exercise" && block.exercise.id === exerciseId) {
      return block.exercise;
    }
  }
  return undefined;
}

export function getKnowledgeCheck(
  course: Course,
  lessonSlug: string,
  activityId: string,
): KnowledgeCheck | undefined {
  const lesson = getLesson(course, lessonSlug);
  if (!lesson) return undefined;
  const block = lesson.blocks.find(
    (block) =>
      block.kind === "knowledge_check" && block.check.id === activityId,
  );
  return block?.kind === "knowledge_check" ? block.check : undefined;
}

export function getModuleForLesson(
  course: Course,
  lessonSlug: string,
): CourseModule | undefined {
  return course.modules.find((courseModule) =>
    courseModule.lessons.some((lesson) => lesson.slug === lessonSlug),
  );
}

export function getModule(
  course: Course,
  moduleSlug: string,
): CourseModule | undefined {
  return course.modules.find((courseModule) => courseModule.slug === moduleSlug);
}

export type {
  Course,
  CourseModule,
  Lesson,
  LessonBlock,
  CourseExercise,
  KnowledgeCheck,
} from "./types";
