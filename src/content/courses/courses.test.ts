import { describe, expect, it } from "vitest";
import { ALL_COURSES, orderedLessons } from ".";
import { csharpCourse } from "./csharp";
import { pythonCourse } from "./python";
import { normalizeGuidance } from "@/lib/guidance";

function exerciseCount(course = csharpCourse): number {
  return course.modules.reduce(
    (moduleTotal, courseModule) =>
      moduleTotal +
      courseModule.lessons.reduce(
        (lessonTotal, lesson) =>
          lessonTotal +
          lesson.blocks.filter((block) => block.kind === "exercise").length,
        0,
      ),
    0,
  );
}

describe("course content", () => {
  it("uses unique course, module, lesson, and exercise identifiers", () => {
    const courseSlugs = new Set<string>();

    for (const course of ALL_COURSES) {
      expect(courseSlugs.has(course.slug), `duplicate course slug ${course.slug}`).toBe(
        false,
      );
      courseSlugs.add(course.slug);

      const moduleSlugs = new Set<string>();
      const lessonSlugs = new Set<string>();

      for (const courseModule of course.modules) {
        expect(
          moduleSlugs.has(courseModule.slug),
          `duplicate module slug ${course.slug}/${courseModule.slug}`,
        ).toBe(false);
        moduleSlugs.add(courseModule.slug);

        for (const lesson of courseModule.lessons) {
          expect(
            lessonSlugs.has(lesson.slug),
            `duplicate lesson slug ${course.slug}/${lesson.slug}`,
          ).toBe(false);
          lessonSlugs.add(lesson.slug);

          const exerciseIds = new Set<string>();
          for (const block of lesson.blocks) {
            if (block.kind !== "exercise") continue;
            expect(
              exerciseIds.has(block.exercise.id),
              `duplicate exercise id ${course.slug}/${lesson.slug}/${block.exercise.id}`,
            ).toBe(false);
            exerciseIds.add(block.exercise.id);
          }
        }
      }
    }
  });

  it("keeps every exercise runnable and useful for practice", () => {
    for (const course of ALL_COURSES) {
      for (const { lesson } of orderedLessons(course)) {
        for (const block of lesson.blocks) {
          if (block.kind === "prose") {
            const id = `${course.slug}/${lesson.slug} prose`;
            const fenceCount = block.markdown.match(/```/g)?.length ?? 0;
            expect(block.markdown.trim().length, id).toBeGreaterThan(80);
            expect(fenceCount % 2, `${id} code fences`).toBe(0);
            continue;
          }

          const exercise = block.exercise;
          const id = `${course.slug}/${lesson.slug}/${exercise.id}`;

          expect(exercise.prompt.trim().length, `${id} prompt`).toBeGreaterThan(40);
          expect(exercise.starterCode.trim().length, `${id} starter`).toBeGreaterThan(
            20,
          );
          expect(exercise.solution.trim().length, `${id} solution`).toBeGreaterThan(
            20,
          );
          if (course.language === "csharp") {
            expect(exercise.starterCode, `${id} C# starter`).toContain(
              "class Solution",
            );
            expect(exercise.solution, `${id} C# solution`).toContain(
              "class Solution",
            );
          }
          expect(exercise.tests.some((test) => !test.hidden), `${id} visible test`).toBe(
            true,
          );
          expect(exercise.tests.some((test) => test.hidden), `${id} hidden test`).toBe(
            true,
          );
          const guidance = normalizeGuidance(exercise.guidance, exercise.hints);
          expect(guidance.length, `${id} guidance`).toBeGreaterThanOrEqual(2);
          for (const test of exercise.tests) {
            expect(test.input.length, `${id} test argument count`).toBe(
              exercise.signature.params.length,
            );
          }
        }
      }
    }
  });

  it("provides a substantially expanded C# curriculum", () => {
    expect(csharpCourse.modules.length).toBeGreaterThanOrEqual(10);
    expect(orderedLessons(csharpCourse).length).toBeGreaterThanOrEqual(35);
    expect(exerciseCount()).toBeGreaterThanOrEqual(30);
  });

  it("provides a substantially expanded Python curriculum", () => {
    expect(pythonCourse.modules.length).toBeGreaterThanOrEqual(10);
    expect(orderedLessons(pythonCourse).length).toBeGreaterThanOrEqual(35);
    expect(exerciseCount(pythonCourse)).toBeGreaterThanOrEqual(30);
  });
});
