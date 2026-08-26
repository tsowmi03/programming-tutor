import Link from "next/link";
import { ArrowRight, Clock, Flame, GraduationCap, Sparkles } from "lucide-react";
import { listProblems } from "@/lib/problems";
import { listCourses } from "@/lib/courses";
import {
  listCourseExerciseReviewQueue,
  type CourseExerciseReviewItem,
} from "@/lib/course-review-queue";
import { listReviewQueue } from "@/lib/review-queue";
import { buildProblemHref } from "@/lib/problem-navigation";
import { requireUserPage } from "@/lib/auth";
import { CATEGORY_LIST } from "@/content/categories";
import { DifficultyBadge, StatusIcon } from "@/components/badges";
import { BeginnerDashboard } from "@/components/courses/BeginnerDashboard";

export const dynamic = "force-dynamic";

function buildCourseExerciseHref(item: CourseExerciseReviewItem): string {
  return `/courses/${item.courseSlug}/${item.lessonSlug}#exercise-${item.exerciseId}`;
}

export default async function DashboardPage() {
  const user = await requireUserPage();
  if (user.programmingExperience === "beginner") {
    return <BeginnerDashboard user={user} />;
  }
  const [problems, courses, reviewQueue, courseReviewQueue] = await Promise.all([
    listProblems(user.id),
    listCourses(user.id),
    listReviewQueue(user.id),
    listCourseExerciseReviewQueue(user.id),
  ]);
  const solved = problems.filter((p) => p.status === "solved").length;
  const attempted = problems.filter((p) => p.status === "attempted").length;
  const total = problems.length;
  const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

  // "Continue" = first attempted problem, else first unsolved in path order.
  const ordered = CATEGORY_LIST.flatMap((c) =>
    problems
      .filter((p) => p.category === c.id)
      .sort((a, b) => a.order - b.order),
  );
  const next =
    ordered.find((p) => p.status === "attempted") ??
    ordered.find((p) => p.status !== "solved");
  const reviewDueCount = reviewQueue.due.length + courseReviewQueue.due.length;
  const problemDuePreview = reviewQueue.due.slice(0, 3);
  const courseReviewItems = courseReviewQueue.due.slice(
    0,
    Math.max(0, 3 - problemDuePreview.length),
  );
  const upcomingReviewItems =
    reviewDueCount === 0
      ? reviewQueue.upcoming.slice(
          0,
          Math.max(0, 3 - problemDuePreview.length - courseReviewItems.length),
        )
      : [];
  const problemReviewItems = [...problemDuePreview, ...upcomingReviewItems];
  const reviewPreviewRows = [
    ...problemReviewItems.map((item) => ({ kind: "problem" as const, item })),
    ...courseReviewItems.map((item) => ({ kind: "course" as const, item })),
  ].slice(0, 3);
  const reviewTotalCount =
    reviewQueue.items.length + courseReviewQueue.items.length;

  const ring = 2 * Math.PI * 52;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-edge bg-gradient-to-br from-indigo-950/60 via-surface to-surface p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome back, {user.name.split(" ")[0]}
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Build problem-solving instincts,
              <br />
              one rep at a time.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Work through data structures and algorithms in Python,
              JavaScript, Java, or C — judged against real test cases — and
              cement the concepts with written explanations.
            </p>
            {next && (
              <Link
                href={`/problems/${next.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:bg-indigo-400"
              >
                {next.status === "attempted" ? "Keep going" : "Continue learning"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-6 pr-2">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#27272a" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * ring} ${ring}`}
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{pct}%</span>
                <span className="text-[11px] text-muted">complete</span>
              </div>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted">Solved</dt>
                <dd className="text-xl font-semibold text-emerald-400">
                  {solved}
                  <span className="text-sm font-normal text-muted"> / {total}</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted">In progress</dt>
                <dd className="text-xl font-semibold text-amber-400">{attempted}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {reviewTotalCount > 0 && (
        <section className="mt-8 rounded-xl border border-edge bg-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <Clock className="h-5 w-5 text-indigo-300" />
                Review queue
              </h2>
              <p className="mt-1 text-sm text-muted">
                {reviewDueCount > 0
                  ? `${reviewDueCount} due today`
                  : "Nothing due today"}
                {reviewQueue.upcoming.length > 0
                  ? ` · ${reviewQueue.upcoming.length} upcoming`
                  : ""}
              </p>
            </div>
            <Link
              href="/review"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Open review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {reviewPreviewRows.length > 0 && (
            <div className="mt-4 divide-y divide-edge overflow-hidden rounded-lg border border-edge">
              {reviewPreviewRows.map((row) =>
                row.kind === "problem" ? (
                  <Link
                    key={row.item.problem.slug}
                    href={buildProblemHref(row.item.problem.slug, { queue: "review" })}
                    className="flex items-center justify-between gap-3 bg-background/40 px-3 py-2.5 transition hover:bg-surface-raised"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <StatusIcon status={row.item.problem.status} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {row.item.problem.title}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {row.item.reasonLabel}
                        </p>
                      </div>
                    </div>
                    <DifficultyBadge difficulty={row.item.problem.difficulty} />
                  </Link>
                ) : (
                  <Link
                    key={`${row.item.courseSlug}:${row.item.lessonSlug}:${row.item.exerciseId}`}
                    href={buildCourseExerciseHref(row.item)}
                    className="flex items-center justify-between gap-3 bg-background/40 px-3 py-2.5 transition hover:bg-surface-raised"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="rounded-md bg-indigo-500/10 p-1 text-indigo-300 ring-1 ring-indigo-500/20">
                        <GraduationCap className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {row.item.exerciseTitle}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {row.item.reasonLabel}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full border border-edge px-2 py-0.5 text-[11px] font-medium text-muted">
                      Course
                    </span>
                  </Link>
                ),
              )}
            </div>
          )}
        </section>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <GraduationCap className="h-5 w-5 text-indigo-300" />
              Learn a language
            </h2>
            <Link
              href="/courses"
              className="text-sm text-indigo-300 transition hover:text-indigo-200"
            >
              All courses →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => {
              const pct =
                course.lessonCount === 0
                  ? 0
                  : Math.round(
                      (course.completedCount / course.lessonCount) * 100,
                    );
              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group rounded-xl border border-edge bg-surface p-5 transition hover:border-indigo-500/40 hover:bg-surface-raised"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium">{course.title}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-indigo-300" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    {course.tagline}
                  </p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {course.completedCount}/{course.lessonCount} lessons ·{" "}
                    {course.exerciseCount} exercises
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Topics</h2>
          <Link
            href="/problems"
            className="text-sm text-indigo-300 transition hover:text-indigo-200"
          >
            Browse all problems →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_LIST.map((cat) => {
            const inCat = problems.filter((p) => p.category === cat.id);
            if (inCat.length === 0) return null;
            const catSolved = inCat.filter((p) => p.status === "solved").length;
            const width = Math.round((catSolved / inCat.length) * 100);
            return (
              <Link
                key={cat.id}
                href={`/problems?category=${cat.id}`}
                className="group rounded-xl border border-edge bg-surface p-5 transition hover:border-indigo-500/40 hover:bg-surface-raised"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{cat.label}</h3>
                  <span className="text-xs tabular-nums text-muted">
                    {catSolved}/{inCat.length}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">
                  {cat.description}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Up next */}
      {next && (
        <section className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Flame className="h-5 w-5 text-orange-400" />
            Up next
          </h2>
          <Link
            href={`/problems/${next.slug}`}
            className="flex items-center justify-between rounded-xl border border-edge bg-surface p-5 transition hover:border-indigo-500/40 hover:bg-surface-raised"
          >
            <div className="flex items-center gap-4">
              <StatusIcon status={next.status} />
              <div>
                <p className="font-medium">{next.title}</p>
                <p className="text-xs capitalize text-muted">
                  {next.category.replace(/-/g, " ")}
                </p>
              </div>
            </div>
            <DifficultyBadge difficulty={next.difficulty} />
          </Link>
        </section>
      )}
    </main>
  );
}
