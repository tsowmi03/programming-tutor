import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Repeat2,
} from "lucide-react";
import { requireUserPage } from "@/lib/auth";
import {
  listReviewQueue,
  type ReviewQueueItem,
  type ReviewReason,
} from "@/lib/review-queue";
import { buildProblemHref } from "@/lib/problem-navigation";
import { CATEGORIES } from "@/content/categories";
import { DifficultyBadge, StatusIcon, TypeBadge } from "@/components/badges";

export const dynamic = "force-dynamic";

export const metadata = { title: "Review" };

const DAY_MS = 24 * 60 * 60 * 1000;

const REASON_STYLES: Record<ReviewReason, string> = {
  retry_failed_code: "border-rose-500/35 bg-rose-500/10 text-rose-200",
  fix_runtime_error: "border-orange-500/35 bg-orange-500/10 text-orange-200",
  revisit_missed_concept: "border-rose-500/35 bg-rose-500/10 text-rose-200",
  strengthen_partial_concept:
    "border-amber-500/35 bg-amber-500/10 text-amber-200",
  refresh_solved_problem:
    "border-emerald-500/35 bg-emerald-500/10 text-emerald-200",
};

const STATUS_LABELS: Record<string, string> = {
  passed: "Accepted",
  failed: "Wrong answer",
  error: "Runtime error",
  compile_error: "Compile error",
  self_assessed: "Self-assessed",
  ai_assessed: "AI marked",
};

const MISTAKE_CATEGORY_LABELS: Record<string, string> = {
  edge_case: "Edge case",
  wrong_data_structure: "Wrong data structure",
  off_by_one: "Off-by-one",
  complexity: "Complexity",
  syntax: "Syntax",
  misread_prompt: "Misread prompt",
  other: "Other",
};

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatDueLabel(item: ReviewQueueItem, now: Date): string {
  const dayDiff = Math.round((startOfDay(item.dueAt) - startOfDay(now)) / DAY_MS);
  if (item.due) {
    if (dayDiff === 0) return "Due today";
    return "Overdue";
  }
  if (dayDiff === 1) return "Tomorrow";
  return item.dueAt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function countByReason(items: ReviewQueueItem[], reasons: ReviewReason[]) {
  return items.filter((item) => reasons.includes(item.reason)).length;
}

export default async function ReviewPage() {
  const user = await requireUserPage();
  const queue = await listReviewQueue(user.id);
  const firstItem = queue.due[0] ?? queue.items[0] ?? null;
  const retryCount = countByReason(queue.due, [
    "retry_failed_code",
    "fix_runtime_error",
  ]);
  const conceptCount = countByReason(queue.due, [
    "revisit_missed_concept",
    "strengthen_partial_concept",
  ]);
  const refreshCount = countByReason(queue.due, ["refresh_solved_problem"]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300 ring-1 ring-indigo-500/30">
            <CalendarClock className="h-3.5 w-3.5" />
            Daily review
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Review queue</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
            A focused queue built from failed attempts, partial explanations,
            and solved work that is ready for another pass.
          </p>
        </div>
        {firstItem ? (
          <Link
            href={buildProblemHref(firstItem.problem.slug, { queue: "review" })}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400"
          >
            Start review
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-4 py-2 text-sm font-semibold text-muted transition hover:border-indigo-500/40 hover:text-foreground"
          >
            Find new problems
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatCard label="Due today" value={queue.due.length} accent="text-indigo-300" />
        <StatCard label="Retry" value={retryCount} accent="text-rose-300" />
        <StatCard label="Concepts" value={conceptCount} accent="text-amber-300" />
        <StatCard label="Refresh" value={refreshCount} accent="text-emerald-300" />
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Study modes
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StudyModeCard
            title="Review queue"
            body="Work through due and upcoming items from your history."
            href="/review"
          />
          <StudyModeCard
            title="Weak topic"
            body="Open the progress diagnosis and start from the roughest area."
            href="/progress#weak-topics"
          />
          <StudyModeCard
            title="Interview drill"
            body="Start unsolved medium code problems with guidance hidden."
            href="/problems?type=code&difficulty=medium&status=not_started&mode=interview"
          />
          <StudyModeCard
            title="No hints"
            body="Pick unsolved code problems with guidance locked until you try."
            href="/problems?type=code&status=not_started&mode=no_hints"
          />
        </div>
      </section>

      {queue.items.length === 0 ? (
        <section className="mt-8 rounded-xl border border-edge bg-surface p-8 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
          <h2 className="mt-3 text-lg font-semibold tracking-tight">
            Nothing to review yet
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted">
            Submit a few problems or explanation answers and this page will
            turn that history into a daily queue.
          </p>
        </section>
      ) : (
        <div className="mt-8 space-y-8">
          <ReviewSection
            title="Due"
            icon={Clock}
            items={queue.due}
            emptyText="Nothing is due today."
            now={queue.generatedAt}
          />
          <ReviewSection
            title="Upcoming"
            icon={Repeat2}
            items={queue.upcoming.slice(0, 8)}
            emptyText="No upcoming review items yet."
            now={queue.generatedAt}
          />
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-edge bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className={`mt-1 text-3xl font-bold tabular-nums ${accent}`}>
        {value}
      </p>
    </div>
  );
}

function StudyModeCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-edge bg-surface p-4 transition hover:border-indigo-500/40 hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
      </div>
    </Link>
  );
}

function ReviewSection({
  title,
  icon: Icon,
  items,
  emptyText,
  now,
}: {
  title: string;
  icon: typeof Clock;
  items: ReviewQueueItem[];
  emptyText: string;
  now: Date;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="rounded-xl border border-edge bg-surface p-5 text-sm text-muted">
          {emptyText}
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-edge">
          {items.map((item, index) => (
            <ReviewRow
              key={item.problem.slug}
              item={item}
              now={now}
              className={index > 0 ? "border-t border-edge" : ""}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ReviewRow({
  item,
  now,
  className,
}: {
  item: ReviewQueueItem;
  now: Date;
  className?: string;
}) {
  return (
    <Link
      href={buildProblemHref(item.problem.slug, { queue: "review" })}
      className={`group block bg-surface px-4 py-4 transition hover:bg-surface-raised ${className ?? ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5">
            <StatusIcon status={item.problem.status} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium transition group-hover:text-indigo-200">
                {item.problem.title}
              </h3>
              <TypeBadge type={item.problem.type} />
              <DifficultyBadge difficulty={item.problem.difficulty} />
            </div>
            <p className="mt-1 text-xs text-muted">
              {CATEGORIES[item.problem.category]?.label} -{" "}
              {item.attempts} {item.attempts === 1 ? "attempt" : "attempts"} -{" "}
              Latest: {STATUS_LABELS[item.latestStatus] ?? item.latestStatus}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {item.detail}
            </p>
            {item.mistakeNotes.length > 0 && (
              <div className="mt-3 max-w-2xl border-l border-amber-400/50 pl-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-200">
                  Mistake journal
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {item.mistakeNotes.map((note) => (
                    <li
                      key={note.id}
                      className="break-words text-xs leading-relaxed text-zinc-300"
                    >
                      <span className="font-semibold text-amber-100">
                        {MISTAKE_CATEGORY_LABELS[note.category] ?? "Mistake"}:
                      </span>{" "}
                      {note.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${REASON_STYLES[item.reason]}`}
          >
            {item.reasonLabel}
          </span>
          <span className="text-xs tabular-nums text-muted">
            {formatDueLabel(item, now)}
          </span>
        </div>
      </div>
    </Link>
  );
}
