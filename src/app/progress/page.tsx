import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deriveStatus } from "@/lib/problems";
import { requireUserPage } from "@/lib/auth";
import { CATEGORIES } from "@/content/categories";
import { DifficultyBadge } from "@/components/badges";
import { LANGUAGES } from "@/lib/judge/languages";
import type { LanguageId } from "@/lib/judge/languages";

export const dynamic = "force-dynamic";

export const metadata = { title: "Progress" };

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  passed: { label: "Accepted", classes: "text-emerald-400" },
  failed: { label: "Wrong answer", classes: "text-rose-400" },
  error: { label: "Runtime error", classes: "text-orange-400" },
  compile_error: { label: "Compile error", classes: "text-rose-400" },
  self_assessed: { label: "Self-assessed", classes: "text-indigo-300" },
};

export default async function ProgressPage() {
  const user = await requireUserPage();
  const [problems, recent, totalSubmissions] = await Promise.all([
    prisma.problem.findMany({
      include: {
        submissions: {
          where: { userId: user.id },
          select: { status: true, selfScore: true },
        },
      },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.submission.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 12,
      include: {
        problem: { select: { slug: true, title: true, difficulty: true } },
      },
    }),
    prisma.submission.count({
      where: { userId: user.id },
    }),
  ]);

  const withStatus = problems.map((p) => ({
    ...p,
    derived: deriveStatus(p.submissions),
  }));
  const solved = withStatus.filter((p) => p.derived === "solved").length;
  const attempted = withStatus.filter((p) => p.derived === "attempted").length;
  const difficulties = ["easy", "medium", "hard"] as const;
  const byDifficulty = difficulties
    .map((d) => ({
      difficulty: d,
      total: withStatus.filter((p) => p.difficulty === d).length,
      solved: withStatus.filter((p) => p.difficulty === d && p.derived === "solved").length,
    }))
    .filter((d) => d.total > 0);

  const categories = Object.values(CATEGORIES)
    .map((cat) => {
      const inCat = withStatus.filter((p) => p.category === cat.id);
      return {
        ...cat,
        total: inCat.length,
        solved: inCat.filter((p) => p.derived === "solved").length,
        attempted: inCat.filter((p) => p.derived === "attempted").length,
      };
    })
    .filter((c) => c.total > 0);

  const diffColor: Record<string, string> = {
    easy: "bg-emerald-400",
    medium: "bg-amber-400",
    hard: "bg-rose-400",
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
      <p className="mt-1 text-sm text-muted">
        Where your reps are landing — and where to aim next.
      </p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Solved" value={solved} suffix={` / ${problems.length}`} accent="text-emerald-400" />
        <StatCard label="In progress" value={attempted} accent="text-amber-400" />
        <StatCard label="Total submissions" value={totalSubmissions} accent="text-indigo-300" />
      </div>

      {/* Difficulty bars */}
      <section className="mt-8 rounded-xl border border-edge bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          By difficulty
        </h2>
        <div className="space-y-3">
          {byDifficulty.map((d) => (
            <div key={d.difficulty} className="flex items-center gap-3">
              <span className="w-16 text-sm capitalize">{d.difficulty}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className={`h-full rounded-full ${diffColor[d.difficulty]}`}
                  style={{ width: `${d.total ? (d.solved / d.total) * 100 : 0}%` }}
                />
              </div>
              <span className="w-12 text-right text-xs tabular-nums text-muted">
                {d.solved}/{d.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Category breakdown */}
      <section className="mt-6 rounded-xl border border-edge bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          By topic
        </h2>
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/problems?category=${c.id}`}
              className="group flex items-center gap-3"
            >
              <span className="w-40 truncate text-sm transition group-hover:text-indigo-300">
                {c.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                  style={{ width: `${c.total ? (c.solved / c.total) * 100 : 0}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs tabular-nums text-muted">
                {c.solved}/{c.total}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent submissions */}
      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Recent submissions
        </h2>
        {recent.length === 0 ? (
          <p className="rounded-xl border border-edge bg-surface p-8 text-center text-sm text-muted">
            Nothing yet —{" "}
            <Link href="/problems" className="text-indigo-300 hover:underline">
              pick a problem
            </Link>{" "}
            and make the first dent.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-edge">
            {recent.map((s, i) => {
              const meta = STATUS_LABELS[s.status] ?? {
                label: s.status,
                classes: "text-muted",
              };
              return (
                <Link
                  key={s.id}
                  href={`/problems/${s.problem.slug}`}
                  className={`flex items-center justify-between gap-3 bg-surface px-4 py-3 transition hover:bg-surface-raised ${i > 0 ? "border-t border-edge" : ""}`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`w-28 shrink-0 text-xs font-semibold ${meta.classes}`}>
                      {meta.label}
                    </span>
                    <span className="truncate text-sm">{s.problem.title}</span>
                    {s.language && (
                      <span className="rounded bg-surface-raised px-1.5 py-0.5 text-[11px] text-muted">
                        {LANGUAGES[s.language as LanguageId]?.label ?? s.language}
                      </span>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {s.passedCount !== null && (
                      <span className="text-xs tabular-nums text-muted">
                        {s.passedCount}/{s.totalCount}
                      </span>
                    )}
                    <DifficultyBadge difficulty={s.problem.difficulty} />
                    <span className="hidden text-xs text-muted sm:block">
                      {s.createdAt.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-edge bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${accent}`}>
        {value}
        {suffix && (
          <span className="text-base font-normal text-muted">{suffix}</span>
        )}
      </p>
    </div>
  );
}
