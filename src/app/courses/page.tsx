import Link from "next/link";
import { ArrowRight, BookOpenCheck, GraduationCap } from "lucide-react";
import { listCourses } from "@/lib/courses";
import { requireUserPage } from "@/lib/auth";
import { LANGUAGES, isLanguageId } from "@/lib/judge/languages";

export const dynamic = "force-dynamic";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const user = await requireUserPage();
  const courses = await listCourses(user.id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/40">
          <GraduationCap className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm text-muted">
            Guided, interactive paths for learning a language through data
            structures and algorithms.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {courses.map((course) => {
          const pct =
            course.lessonCount === 0
              ? 0
              : Math.round((course.completedCount / course.lessonCount) * 100);
          const started = course.completedCount > 0;
          const langLabel = isLanguageId(course.language)
            ? LANGUAGES[course.language].label
            : course.language;
          return (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex flex-col rounded-2xl border border-edge bg-surface p-6 transition hover:border-indigo-500/40 hover:bg-surface-raised"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
                  {langLabel}
                </span>
                {started && pct === 100 && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <BookOpenCheck className="h-3.5 w-3.5" />
                    Complete
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                {course.title}
              </h2>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
                {course.tagline}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-muted">
                <span>{course.lessonCount} lessons</span>
                <span className="text-zinc-700">·</span>
                <span>{course.exerciseCount} exercises</span>
              </div>

              {started && (
                <div className="mt-3">
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {course.completedCount}/{course.lessonCount} lessons done
                  </p>
                </div>
              )}

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300">
                {started ? "Continue" : "Start course"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
