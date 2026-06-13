"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ListRestart, Search, Shuffle } from "lucide-react";
import { CATEGORY_LIST, CATEGORIES } from "@/content/categories";
import type { ProblemSummary } from "@/lib/problems";
import { DifficultyBadge, StatusIcon, TypeBadge } from "@/components/badges";
import {
  buildProblemHref,
  buildProblemSequenceQuery,
  getProblemSequence,
  parseProblemSequenceParams,
  type ProblemSequenceParams,
} from "@/lib/problem-navigation";

const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const TYPES = [
  { id: "code", label: "Code" },
  { id: "explanation", label: "Explain" },
] as const;
const STATUSES = [
  { id: "not_started", label: "To do" },
  { id: "attempted", label: "Attempted" },
  { id: "solved", label: "Solved" },
] as const;

export function ProblemBrowser({ problems }: { problems: ProblemSummary[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") ?? "",
  );
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [shuffleSeed, setShuffleSeed] = useState(
    searchParams.get("shuffle") ?? "",
  );

  const sequenceParams = useMemo<ProblemSequenceParams>(
    () =>
      parseProblemSequenceParams({
        category,
        difficulty,
        type,
        status,
        q: query,
        shuffle: shuffleSeed,
      }),
    [category, difficulty, query, shuffleSeed, status, type],
  );

  // Keep the full exercise sequence shareable so workspace navigation can
  // continue through the same filtered or shuffled queue.
  useEffect(() => {
    const params = buildProblemSequenceQuery(sequenceParams);
    router.replace(`${pathname}${params ? `?${params}` : ""}`, {
      scroll: false,
    });
  }, [pathname, router, sequenceParams]);

  const ordered = useMemo(
    () => getProblemSequence(problems, sequenceParams),
    [problems, sequenceParams],
  );

  const grouped = useMemo(() => {
    return CATEGORY_LIST.map((cat) => ({
      category: cat,
      problems: ordered.filter((p) => p.category === cat.id),
    })).filter((g) => g.problems.length > 0);
  }, [ordered]);

  const startShuffle = () => {
    setShuffleSeed(
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
    );
  };

  const selectClass =
    "rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-indigo-500/60";

  return (
    <div>
      {/* Filter bar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems…"
            className={`${selectClass} w-56 pl-9`}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
          aria-label="Filter by topic"
        >
          <option value="">All topics</option>
          {CATEGORY_LIST.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={selectClass}
          aria-label="Filter by difficulty"
        >
          <option value="">Any difficulty</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d} className="capitalize">
              {d[0].toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={selectClass}
          aria-label="Filter by problem type"
        >
          <option value="">Any type</option>
          {TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
          aria-label="Filter by status"
        >
          <option value="">Any status</option>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-2">
          {shuffleSeed && (
            <button
              type="button"
              onClick={() => setShuffleSeed("")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-muted transition hover:border-zinc-600 hover:text-foreground"
            >
              <ListRestart className="h-4 w-4" />
              Standard order
            </button>
          )}
          <button
            type="button"
            onClick={startShuffle}
            disabled={ordered.length < 2}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Shuffle className="h-4 w-4" />
            {shuffleSeed ? "Reshuffle" : "Shuffle exercises"}
          </button>
        </div>
      </div>

      {/* Exercise list */}
      {ordered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">
          Nothing matches those filters.
        </p>
      ) : shuffleSeed ? (
        <section className="mt-8">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-300">
              Shuffled exercises
            </h2>
            <span className="text-xs text-muted">
              {ordered.length} in this queue
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-indigo-500/30">
            {ordered.map((problem, index) => (
              <ProblemLink
                key={problem.slug}
                problem={problem}
                href={buildProblemHref(problem.slug, sequenceParams)}
                bordered={index > 0}
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map(({ category: cat, problems: ps }) => (
            <section key={cat.id}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                {CATEGORIES[cat.id].label}
              </h2>
              <div className="overflow-hidden rounded-xl border border-edge">
                {ps.map((p, i) => (
                  <ProblemLink
                    key={p.slug}
                    problem={p}
                    href={buildProblemHref(p.slug, sequenceParams)}
                    bordered={i > 0}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemLink({
  problem,
  href,
  bordered,
}: {
  problem: ProblemSummary;
  href: string;
  bordered: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-4 bg-surface px-4 py-3.5 transition hover:bg-surface-raised ${
        bordered ? "border-t border-edge" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3.5">
        <StatusIcon status={problem.status} />
        <span className="truncate font-medium">{problem.title}</span>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <TypeBadge type={problem.type} />
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
    </Link>
  );
}
