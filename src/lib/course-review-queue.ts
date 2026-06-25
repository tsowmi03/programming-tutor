import type { LanguageId } from "@/lib/judge/languages";
import { getCourse, getExercise, getLesson } from "@/content/courses";
import { prisma } from "./prisma";

export type CourseExerciseReviewReason =
  | "retry_course_exercise"
  | "fix_course_exercise_runtime";

export interface CourseExerciseReviewSubmissionInput {
  courseSlug: string;
  lessonSlug: string;
  exerciseId: string;
  language: string;
  mode: string;
  status: string;
  passedCount: number | null;
  totalCount: number | null;
  createdAt: Date;
}

export interface CourseExerciseReviewMetadata {
  courseSlug: string;
  courseTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  exerciseId: string;
  exerciseTitle: string;
  language: LanguageId;
}

export interface CourseExerciseReviewItem
  extends CourseExerciseReviewMetadata {
  reason: CourseExerciseReviewReason;
  reasonLabel: string;
  detail: string;
  latestMode: string;
  latestStatus: string;
  latestSubmissionAt: Date;
  dueAt: Date;
  attempts: number;
  passedCount: number | null;
  totalCount: number | null;
  priority: number;
  due: boolean;
}

export interface CourseExerciseReviewQueue {
  generatedAt: Date;
  items: CourseExerciseReviewItem[];
  due: CourseExerciseReviewItem[];
  upcoming: CourseExerciseReviewItem[];
}

const REVIEW_REASON_COPY: Record<
  CourseExerciseReviewReason,
  { label: string; detail: string; priority: number }
> = {
  retry_course_exercise: {
    label: "Retry course exercise",
    detail: "Your latest course exercise submission did not pass. Rework it before moving on.",
    priority: 70,
  },
  fix_course_exercise_runtime: {
    label: "Fix course runtime issue",
    detail: "The latest course exercise attempt stopped before all tests could pass.",
    priority: 75,
  },
};

const REVIEWABLE_STATUSES = new Set(["failed", "error", "compile_error"]);

function courseExerciseKey({
  courseSlug,
  lessonSlug,
  exerciseId,
}: Pick<
  CourseExerciseReviewSubmissionInput,
  "courseSlug" | "lessonSlug" | "exerciseId"
>): string {
  return `${courseSlug}\0${lessonSlug}\0${exerciseId}`;
}

function getReason(
  submission: CourseExerciseReviewSubmissionInput,
): CourseExerciseReviewReason | null {
  if (!REVIEWABLE_STATUSES.has(submission.status)) return null;
  if (submission.status === "error" || submission.status === "compile_error") {
    return "fix_course_exercise_runtime";
  }
  return "retry_course_exercise";
}

function getDetail(
  reason: CourseExerciseReviewReason,
  submission: CourseExerciseReviewSubmissionInput,
): string {
  if (submission.mode === "run" && reason === "retry_course_exercise") {
    return "Your latest sample-test run did not pass. Rework it before the full submission.";
  }
  if (submission.mode === "run" && reason === "fix_course_exercise_runtime") {
    return "The latest sample-test run stopped before all visible tests could pass.";
  }
  return REVIEW_REASON_COPY[reason].detail;
}

export function resolveCourseExerciseMetadata(
  submission: CourseExerciseReviewSubmissionInput,
): CourseExerciseReviewMetadata | null {
  const course = getCourse(submission.courseSlug);
  if (!course) return null;
  const lesson = getLesson(course, submission.lessonSlug);
  const exercise = getExercise(
    course,
    submission.lessonSlug,
    submission.exerciseId,
  );
  if (!lesson || !exercise) return null;

  return {
    courseSlug: course.slug,
    courseTitle: course.title,
    lessonSlug: lesson.slug,
    lessonTitle: lesson.title,
    exerciseId: exercise.id,
    exerciseTitle: exercise.title,
    language: course.language,
  };
}

function sortCourseReviewItems(
  a: CourseExerciseReviewItem,
  b: CourseExerciseReviewItem,
): number {
  return (
    b.priority - a.priority ||
    b.latestSubmissionAt.getTime() - a.latestSubmissionAt.getTime() ||
    a.courseTitle.localeCompare(b.courseTitle) ||
    a.lessonTitle.localeCompare(b.lessonTitle) ||
    a.exerciseTitle.localeCompare(b.exerciseTitle)
  );
}

export function buildCourseExerciseReviewQueue(
  submissions: CourseExerciseReviewSubmissionInput[],
  resolveMetadata = resolveCourseExerciseMetadata,
  now = new Date(),
): CourseExerciseReviewQueue {
  const grouped = new Map<string, CourseExerciseReviewSubmissionInput[]>();
  for (const submission of submissions) {
    const key = courseExerciseKey(submission);
    grouped.set(key, [...(grouped.get(key) ?? []), submission]);
  }

  const items = [...grouped.values()].flatMap((attempts) => {
    const sortedAttempts = [...attempts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    const hasPassedSubmit = sortedAttempts.some(
      (attempt) => attempt.mode === "submit" && attempt.status === "passed",
    );
    if (hasPassedSubmit) return [];

    const latest = sortedAttempts[0];
    const reason = getReason(latest);
    if (!reason) return [];

    const metadata = resolveMetadata(latest);
    if (!metadata) return [];

    const copy = REVIEW_REASON_COPY[reason];
    return [
      {
        ...metadata,
        reason,
        reasonLabel: copy.label,
        detail: getDetail(reason, latest),
        latestMode: latest.mode,
        latestStatus: latest.status,
        latestSubmissionAt: latest.createdAt,
        dueAt: latest.createdAt,
        attempts: sortedAttempts.length,
        passedCount: latest.passedCount,
        totalCount: latest.totalCount,
        priority: copy.priority,
        due: true,
      },
    ];
  });

  items.sort(sortCourseReviewItems);

  return {
    generatedAt: now,
    items,
    due: items,
    upcoming: [],
  };
}

export async function listCourseExerciseReviewQueue(
  userId: string,
): Promise<CourseExerciseReviewQueue> {
  const submissions = await prisma.courseExerciseSubmission.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      courseSlug: true,
      lessonSlug: true,
      exerciseId: true,
      language: true,
      mode: true,
      status: true,
      passedCount: true,
      totalCount: true,
      createdAt: true,
    },
  });

  return buildCourseExerciseReviewQueue(submissions);
}
