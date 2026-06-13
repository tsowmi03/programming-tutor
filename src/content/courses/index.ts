/**
 * Course registry and lookup helpers.
 *
 * Courses are static content (in memory). Lesson progress is the only thing
 * persisted — see prisma LessonProgress and src/lib/courses.ts.
 */

import type { Course, CourseExercise, Lesson } from "./types";
import { csharpCourse } from "./csharp";
import { pythonCourse } from "./python";

export const ALL_COURSES: Course[] = [csharpCourse, pythonCourse];

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

export type { Course, CourseModule, Lesson, LessonBlock, CourseExercise } from "./types";
