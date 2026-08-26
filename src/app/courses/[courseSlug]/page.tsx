import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Award, CheckCircle2, Circle, Code2, Lock } from "lucide-react";
import { getCourseOverview } from "@/lib/courses";
import { requireUserPage } from "@/lib/auth";
import { getCourse } from "@/content/courses";
import { MarkdownView } from "@/components/MarkdownView";
import { CheckpointWidget } from "@/components/courses/CheckpointWidget";
import { LearningEventBeacon } from "@/components/LearningEventBeacon";

export const dynamic = "force-dynamic";

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const user = await requireUserPage();
  const { courseSlug } = await params;
  const overview = await getCourseOverview(courseSlug, user.id);
  if (!overview) notFound();

  const { course, completed, lessonCount, nextLessonSlug, mastery } = overview;
  const done = completed.size;
  const pct = lessonCount === 0 ? 0 : Math.round((done / lessonCount) * 100);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {course.level === "beginner" && (
        <LearningEventBeacon eventName="course_overview_viewed" courseSlug={course.slug} />
      )}
      <Link
        href="/courses"
        className="text-sm text-muted transition hover:text-foreground"
      >
        ← All courses
      </Link>

      {/* Header */}
      <section className="mt-4 rounded-2xl border border-edge bg-gradient-to-br from-indigo-950/50 via-surface to-surface p-7">
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="mt-2 text-muted">{course.tagline}</p>

        {(course.level || course.estimatedMinutes) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
            {course.level && <span className="rounded-full border border-edge bg-background/40 px-2.5 py-1 capitalize">{course.level}</span>}
            {course.estimatedMinutes && <span className="rounded-full border border-edge bg-background/40 px-2.5 py-1">About {Math.round(course.estimatedMinutes / 60)} hours</span>}
            {course.audience && <span className="rounded-full border border-edge bg-background/40 px-2.5 py-1">{course.audience}</span>}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {nextLessonSlug && (
            <Link
              href={`/courses/${course.slug}/${nextLessonSlug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:bg-indigo-400"
            >
              {done > 0 ? "Continue" : "Start course"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted">
              {done}/{lessonCount} lessons
            </span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mt-8">
        <MarkdownView>{course.description}</MarkdownView>
        {course.outcomes && course.outcomes.length > 0 && (
          <div className="mt-6 rounded-xl border border-edge bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">By the end, you can</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{outcome}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Curriculum */}
      <section className="mt-8 space-y-6">
        {course.modules.map((mod, modIndex) => {
          const moduleState = mastery.modules.find((state) => state.slug === mod.slug);
          return <div key={mod.slug} className={!moduleState?.unlocked ? "opacity-65" : ""}>
            <div className="mb-2 flex items-baseline gap-2">
              <h2 className="text-base font-semibold tracking-tight">
                {modIndex + 1}. {mod.title}
              </h2>
              {!moduleState?.unlocked && <Lock className="h-3.5 w-3.5 text-muted" />}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              {mod.description}
            </p>
            <ul className="overflow-hidden rounded-xl border border-edge">
              {mod.lessons.map((lesson) => {
                const isDone = completed.has(lesson.slug);
                const lessonState = moduleState?.lessons.find((state) => state.slug === lesson.slug);
                const unlocked = lessonState?.unlocked ?? true;
                const exerciseCount = lesson.blocks.filter(
                  (b) => b.kind === "exercise",
                ).length;
                return (
                  <li key={lesson.slug} className="border-b border-edge last:border-0">
                    {unlocked ? <Link
                      href={`/courses/${course.slug}/${lesson.slug}`}
                      className="flex items-center gap-3 px-4 py-3 transition hover:bg-surface-raised"
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      ) : (
                        <Circle className="h-4 w-4 shrink-0 text-zinc-600" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {lesson.title}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {lesson.summary}
                        </p>
                      </div>
                      {exerciseCount > 0 && (
                        <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted">
                          <Code2 className="h-3 w-3" />
                          {exerciseCount}
                        </span>
                      )}
                    </Link> : <div className="flex items-center gap-3 px-4 py-3 text-muted">
                      <Lock className="h-4 w-4 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{lesson.title}</p>
                        <p className="truncate text-xs">Complete the previous lesson or checkpoint to unlock.</p>
                      </div>
                    </div>}
                  </li>
                );
              })}
            </ul>
            {mod.checkpoint && moduleState?.checkpointPassed && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                <Award className="h-4 w-4" /> Checkpoint mastered — {moduleState.bestScore}/{moduleState.maxScore}
              </div>
            )}
            {mod.checkpoint && moduleState?.checkpointUnlocked && !moduleState.checkpointPassed && moduleState.remediationComplete && (
              <CheckpointWidget courseSlug={course.slug} moduleSlug={mod.slug} title={mod.checkpoint.title} />
            )}
            {mod.checkpoint && moduleState?.checkpointUnlocked && !moduleState.checkpointPassed && !moduleState.remediationComplete && (
              <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm font-semibold text-amber-200">Complete these reviews before retrying</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {moduleState.remediationObjectiveIds.map((objectiveId) => {
                    const slot = mod.checkpoint?.slots.find((item) => item.objectiveId === objectiveId);
                    return slot ? (
                      <Link key={objectiveId} href={`/courses/${course.slug}/${slot.remediationLessonSlug}`} className="rounded-lg border border-amber-500/30 bg-background/50 px-3 py-2 text-xs text-amber-100 hover:bg-background">
                        {objectiveId.replace(/^m\d+-/, "").replaceAll("-", " ")}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            {mod.checkpoint && !moduleState?.checkpointUnlocked && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-edge px-4 py-3 text-xs text-muted">
                <Lock className="h-3.5 w-3.5" /> Complete all required module activities to unlock the checkpoint.
              </div>
            )}
          </div>;
        })}
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  return { title: course?.title ?? "Course" };
}
