import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  GraduationCap,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import type { SessionUser } from "@/lib/auth";
import { getCourse, getLesson, orderedLessons } from "@/content/courses";
import { getCourseOverview } from "@/lib/courses";
import { prisma } from "@/lib/prisma";
import { LearningEventBeacon } from "@/components/LearningEventBeacon";

const BEGINNER_COURSE_SLUG = "programming-foundations-python";

export async function BeginnerDashboard({ user }: { user: SessionUser }) {
  const course = getCourse(BEGINNER_COURSE_SLUG);
  if (!course) return null;

  const [overview, attemptedPrograms] = await Promise.all([
    getCourseOverview(course.slug, user.id),
    prisma.courseExerciseSubmission.count({
      where: { userId: user.id, courseSlug: course.slug },
    }),
  ]);
  if (!overview) return null;

  const ordered = orderedLessons(course);
  const nextLesson = overview.nextLessonSlug
    ? getLesson(course, overview.nextLessonSlug)
    : null;
  const nextModule = nextLesson
    ? course.modules.find((courseModule) =>
        courseModule.lessons.some((lesson) => lesson.slug === nextLesson.slug),
      )
    : null;
  const firstLesson = ordered[0]?.lesson;
  const firstLessonMastered = firstLesson
    ? overview.completed.has(firstLesson.slug)
    : false;
  const courseMastered = overview.mastery.modules.every(
    (courseModule) => courseModule.checkpointPassed,
  );
  const pendingCheckpoint = overview.mastery.modules.find(
    (courseModule) =>
      courseModule.checkpointUnlocked && !courseModule.checkpointPassed,
  );
  const primaryHref = nextLesson
    ? `/courses/${course.slug}/${nextLesson.slug}`
    : `/courses/${course.slug}`;
  const primaryLabel = courseMastered
    ? "Review your course"
    : pendingCheckpoint
      ? "Take the module checkpoint"
      : overview.completed.size > 0
        ? "Continue your next lesson"
        : "Start your first lesson";
  const progressPercent = Math.round(
    (overview.completed.size / overview.lessonCount) * 100,
  );

  const checklist = [
    { label: "Choose your starting path", complete: true },
    { label: "Check your first program", complete: attemptedPrograms > 0 },
    { label: "Master your first lesson", complete: firstLessonMastered },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LearningEventBeacon eventName="beginner_dashboard_viewed" courseSlug={course.slug} />
      <section className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/70 via-surface to-surface p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200 ring-1 ring-indigo-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome {overview.completed.size > 0 ? "back" : "to your first climb"}, {user.name.split(" ")[0]}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {courseMastered
              ? "You completed Programming Foundations"
              : nextLesson
                ? nextLesson.title
                : "Your next checkpoint is ready"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {courseMastered
              ? "You now have the core tools to build, test, and debug small programs."
              : nextLesson
                ? `${nextModule?.title ?? "Programming Foundations"} · About ${nextLesson.estimatedMinutes ?? 20} minutes`
                : "Finish the module checkpoint to unlock the next part of your course."}
          </p>
          <Link
            href={primaryHref}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:bg-indigo-400"
          >
            <PlayCircle className="h-4 w-4" />
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-xl border border-edge bg-surface p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-semibold">
                <GraduationCap className="h-5 w-5 text-indigo-300" />
                Programming Foundations with Python
              </h2>
              <p className="mt-1 text-xs text-muted">
                {overview.completed.size} of {overview.lessonCount} lessons mastered
              </p>
            </div>
            <span className="text-sm font-semibold tabular-nums text-indigo-200">
              {progressPercent}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {course.modules.map((courseModule, index) => {
              const state = overview.mastery.modules[index];
              const masteredLessons = state.lessons.filter(
                (lesson) => lesson.mastered,
              ).length;
              return (
                <div
                  key={courseModule.slug}
                  className="flex items-center gap-3 rounded-lg border border-edge bg-background/40 px-3 py-2.5"
                >
                  {state.checkpointPassed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : state.unlocked ? (
                    <Circle className="h-4 w-4 shrink-0 text-indigo-300" />
                  ) : (
                    <Lock className="h-4 w-4 shrink-0 text-zinc-600" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">
                      {index + 1}. {courseModule.title}
                    </p>
                    <p className="text-[11px] text-muted">
                      {masteredLessons}/{state.lessons.length} lessons
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:underline"
          >
            View the full course <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        <section className="rounded-xl border border-edge bg-surface p-5">
          <h2 className="flex items-center gap-2 font-semibold">
            <Clock3 className="h-5 w-5 text-amber-300" />
            Your first milestones
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            One useful result at a time. You do not need to learn everything today.
          </p>
          <ul className="mt-4 space-y-3">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                {item.complete ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
                )}
                <span className={item.complete ? "text-muted line-through" : ""}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-lg bg-background/60 p-3 text-xs leading-relaxed text-muted ring-1 ring-edge">
            Good stopping point: finish one lesson. CodeClimb will remember exactly where you reached.
          </p>
        </section>
      </div>
    </main>
  );
}
