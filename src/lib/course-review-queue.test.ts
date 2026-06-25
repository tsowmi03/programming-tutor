import { describe, expect, it } from "vitest";
import {
  buildCourseExerciseReviewQueue,
  type CourseExerciseReviewMetadata,
  type CourseExerciseReviewSubmissionInput,
} from "./course-review-queue";

const NOW = new Date("2026-06-25T10:00:00.000Z");

const METADATA: Record<string, CourseExerciseReviewMetadata> = {
  "python-for-developers/loops/sum-array": {
    courseSlug: "python-for-developers",
    courseTitle: "Python for Developers",
    lessonSlug: "loops",
    lessonTitle: "Loops",
    exerciseId: "sum-array",
    exerciseTitle: "Sum an array",
    language: "python",
  },
  "python-for-developers/hash-maps/frequency-map": {
    courseSlug: "python-for-developers",
    courseTitle: "Python for Developers",
    lessonSlug: "hash-maps",
    lessonTitle: "Hash maps",
    exerciseId: "frequency-map",
    exerciseTitle: "Build a frequency map",
    language: "python",
  },
};

function submission(
  overrides: Partial<CourseExerciseReviewSubmissionInput>,
): CourseExerciseReviewSubmissionInput {
  return {
    courseSlug: "python-for-developers",
    lessonSlug: "loops",
    exerciseId: "sum-array",
    language: "python",
    mode: "submit",
    status: "failed",
    passedCount: 1,
    totalCount: 3,
    createdAt: new Date("2026-06-25T09:00:00.000Z"),
    ...overrides,
  };
}

function resolveMetadata(
  input: CourseExerciseReviewSubmissionInput,
): CourseExerciseReviewMetadata | null {
  return METADATA[`${input.courseSlug}/${input.lessonSlug}/${input.exerciseId}`] ?? null;
}

describe("buildCourseExerciseReviewQueue", () => {
  it("queues failed latest course exercise submissions", () => {
    const queue = buildCourseExerciseReviewQueue(
      [submission({ status: "failed" })],
      resolveMetadata,
      NOW,
    );

    expect(queue.due).toHaveLength(1);
    expect(queue.due[0]).toMatchObject({
      reason: "retry_course_exercise",
      courseTitle: "Python for Developers",
      lessonTitle: "Loops",
      exerciseTitle: "Sum an array",
      latestStatus: "failed",
      attempts: 1,
      latestMode: "submit",
      due: true,
    });
  });

  it("ignores failures once an exercise has an accepted full submit", () => {
    const queue = buildCourseExerciseReviewQueue(
      [
        submission({
          status: "passed",
          createdAt: new Date("2026-06-25T09:00:00.000Z"),
          passedCount: 3,
          totalCount: 3,
        }),
        submission({
          mode: "run",
          status: "failed",
          createdAt: new Date("2026-06-26T09:00:00.000Z"),
        }),
        submission({
          status: "failed",
          createdAt: new Date("2026-06-24T09:00:00.000Z"),
        }),
      ],
      resolveMetadata,
      NOW,
    );

    expect(queue.items).toHaveLength(0);
  });

  it("queues failed sample runs when there is no accepted full submit", () => {
    const queue = buildCourseExerciseReviewQueue(
      [
        submission({
          mode: "run",
          status: "failed",
          passedCount: 1,
          totalCount: 2,
        }),
      ],
      resolveMetadata,
      NOW,
    );

    expect(queue.due[0]).toMatchObject({
      reason: "retry_course_exercise",
      latestMode: "run",
      detail: "Your latest sample-test run did not pass. Rework it before the full submission.",
    });
  });

  it("sorts runtime and compile issues before wrong answers", () => {
    const queue = buildCourseExerciseReviewQueue(
      [
        submission({
          status: "failed",
          createdAt: new Date("2026-06-25T09:30:00.000Z"),
        }),
        submission({
          lessonSlug: "hash-maps",
          exerciseId: "frequency-map",
          status: "compile_error",
          createdAt: new Date("2026-06-25T09:00:00.000Z"),
        }),
      ],
      resolveMetadata,
      NOW,
    );

    expect(queue.due.map((item) => item.reason)).toEqual([
      "fix_course_exercise_runtime",
      "retry_course_exercise",
    ]);
  });

  it("skips submissions for exercises that no longer exist", () => {
    const queue = buildCourseExerciseReviewQueue(
      [
        submission({
          lessonSlug: "old-lesson",
          exerciseId: "removed-exercise",
        }),
      ],
      resolveMetadata,
      NOW,
    );

    expect(queue.items).toHaveLength(0);
  });
});
