import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Circle, Code2 } from "lucide-react";
import { getCourseOverview } from "@/lib/courses";
import { requireUserPage } from "@/lib/auth";
import { getCourse } from "@/content/courses";
import { MarkdownView } from "@/components/MarkdownView";

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

  const { course, completed, lessonCount, nextLessonSlug } = overview;
  const done = completed.size;
  const pct = lessonCount === 0 ? 0 : Math.round((done / lessonCount) * 100);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
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
      </section>

      {/* Curriculum */}
      <section className="mt-8 space-y-6">
        {course.modules.map((mod, modIndex) => (
          <div key={mod.slug}>
            <div className="mb-2 flex items-baseline gap-2">
              <h2 className="text-base font-semibold tracking-tight">
                {modIndex + 1}. {mod.title}
              </h2>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted">
              {mod.description}
            </p>
            <ul className="overflow-hidden rounded-xl border border-edge">
              {mod.lessons.map((lesson) => {
                const isDone = completed.has(lesson.slug);
                const exerciseCount = lesson.blocks.filter(
                  (b) => b.kind === "exercise",
                ).length;
                return (
                  <li key={lesson.slug} className="border-b border-edge last:border-0">
                    <Link
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
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
