import { notFound } from "next/navigation";
import { getLessonView } from "@/lib/courses";
import { getCourse, getLesson } from "@/content/courses";
import { requireUserPage } from "@/lib/auth";
import { LessonView } from "@/components/courses/LessonView";
import { toClientCourseBlocks } from "@/lib/course-client";
import { LearningEventBeacon } from "@/components/LearningEventBeacon";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const user = await requireUserPage();
  const { courseSlug, lessonSlug } = await params;
  const view = await getLessonView(courseSlug, lessonSlug, user.id);
  if (!view) notFound();

  const {
    course,
    lesson,
    completed,
    solvedExerciseIds,
    attemptedExerciseIds,
    initialExerciseCodes,
    solvedKnowledgeCheckIds,
    initialKnowledgeCheckAnswers,
    assistedExerciseIds,
    unlocked,
    prevSlug,
    nextSlug,
    position,
    total,
  } =
    view;

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
          <h1 className="text-2xl font-bold">This lesson is still locked</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Complete the required activities before this lesson, including the
            previous module checkpoint when applicable, to continue.
          </p>
          <a href={`/courses/${course.slug}`} className="mt-5 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
            Return to course
          </a>
        </div>
      </main>
    );
  }

  // Locate the module title for the breadcrumb.
  const moduleTitle =
    course.modules.find((m) => m.lessons.some((l) => l.slug === lesson.slug))
      ?.title ?? course.title;

  return (
    <>
      {course.level === "beginner" && (
        <LearningEventBeacon
          eventName="lesson_started"
          courseSlug={course.slug}
          lessonSlug={lesson.slug}
        />
      )}
      <LessonView
      courseSlug={course.slug}
      courseTitle={course.title}
      language={course.language}
      lessonSlug={lesson.slug}
      lessonTitle={lesson.title}
      moduleTitle={moduleTitle}
      blocks={toClientCourseBlocks(lesson.blocks)}
      initialCompleted={completed}
      initialSolvedExerciseIds={solvedExerciseIds}
      initialAttemptedExerciseIds={attemptedExerciseIds}
      initialExerciseCodes={initialExerciseCodes}
      initialSolvedKnowledgeCheckIds={solvedKnowledgeCheckIds}
      initialKnowledgeCheckAnswers={initialKnowledgeCheckAnswers}
      initialAssistedExerciseIds={assistedExerciseIds}
      masteryGated={course.progression === "mastery"}
      beginnerMode={course.level === "beginner"}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
      position={position}
      total={total}
      estimatedMinutes={lesson.estimatedMinutes ?? 20}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = course ? getLesson(course, lessonSlug) : undefined;
  return { title: lesson?.title ?? "Lesson" };
}
