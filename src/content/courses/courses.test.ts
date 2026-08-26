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
          const activityIds = new Set<string>();
          for (const block of lesson.blocks) {
            if (block.kind === "knowledge_check") {
              expect(
                activityIds.has(block.check.id),
                `duplicate activity id ${course.slug}/${lesson.slug}/${block.check.id}`,
              ).toBe(false);
              activityIds.add(block.check.id);
              continue;
            }
            if (block.kind !== "exercise") continue;
            expect(
              exerciseIds.has(block.exercise.id),
              `duplicate exercise id ${course.slug}/${lesson.slug}/${block.exercise.id}`,
            ).toBe(false);
            exerciseIds.add(block.exercise.id);
            expect(activityIds.has(block.exercise.id)).toBe(false);
            activityIds.add(block.exercise.id);
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
          if (block.kind === "knowledge_check") {
            expect(block.check.prompt.trim().length).toBeGreaterThan(20);
            expect(block.check.acceptedAnswers.length).toBeGreaterThan(0);
            expect(block.check.explanation.trim().length).toBeGreaterThan(20);
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
          if (exercise.mode !== "script") {
            for (const test of exercise.tests) {
              expect(test.input.length, `${id} test argument count`).toBe(
                exercise.signature.params.length,
              );
            }
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

  it("provides a complete mastery-gated beginner Python curriculum", () => {
    const course = ALL_COURSES.find(
      (item) => item.slug === "programming-foundations-python",
    );
    expect(course).toBeDefined();
    if (!course) throw new Error("beginner course missing");
    expect(course.progression).toBe("mastery");
    expect(course.level).toBe("beginner");
    expect(course.modules).toHaveLength(8);
    expect(orderedLessons(course)).toHaveLength(24);
    expect(exerciseCount(course)).toBe(48);
    const firstLesson = course.modules[0].lessons[0];
    expect(firstLesson.estimatedMinutes).toBe(15);
    expect(
      firstLesson.blocks.filter(
        (block) =>
          (block.kind === "exercise" && block.exercise.required !== false) ||
          (block.kind === "knowledge_check" && block.check.required !== false),
      ),
    ).toHaveLength(4);
    expect(
      firstLesson.blocks
        .filter((block) => block.kind === "exercise")
        .every((block) => block.kind === "exercise" && block.exercise.workedStart),
    ).toBe(true);

    for (const courseModule of course.modules) {
      expect(courseModule.objectiveIds).toHaveLength(5);
      expect(courseModule.checkpoint?.passingScore).toBe(4);
      expect(courseModule.checkpoint?.slots).toHaveLength(5);
      for (const slot of courseModule.checkpoint?.slots ?? []) {
        expect(slot.variants).toHaveLength(3);
        expect(
          courseModule.lessons.some((lesson) =>
            lesson.blocks.some(
              (block) =>
                block.kind === "knowledge_check" &&
                block.check.objectiveId === slot.objectiveId,
            ),
          ),
          `${courseModule.slug}/${slot.objectiveId} remediation check`,
        ).toBe(true);
      }
    }
  });
});
