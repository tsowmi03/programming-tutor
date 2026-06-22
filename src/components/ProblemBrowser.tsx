"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Shuffle } from "lucide-react";
import { CATEGORY_LIST, CATEGORIES } from "@/content/categories";
import type { ProblemSummary } from "@/lib/problems";
import {
  buildProblemHref,
  getProblemSequence,
  getShuffleCandidates,
  parseProblemSequenceParams,
} from "@/lib/problem-navigation";
import { DifficultyBadge, StatusIcon, TypeBadge } from "@/components/badges";

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

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") ?? "",
  );
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const deferredQuery = useDeferredValue(query);

  const sequenceParams = useMemo(
    () =>
      parseProblemSequenceParams({
        category,
        difficulty,
        type,
        status,
        q: deferredQuery,
      }),
    [category, deferredQuery, difficulty, status, type],
  );

  const ordered = useMemo(
    () => getProblemSequence(problems, sequenceParams),
    [problems, sequenceParams],
  );

  const shuffleCandidates = useMemo(
    () => getShuffleCandidates(problems, sequenceParams),
    [problems, sequenceParams],
  );

  const grouped = useMemo(() => {
    return CATEGORY_LIST.map((cat) => ({
      category: cat,
      problems: ordered.filter((p) => p.category === cat.id),
    })).filter((g) => g.problems.length > 0);
  }, [ordered]);

  const selectClass =
    "rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-indigo-500/60";

  const randomProblem = () => {
    if (shuffleCandidates.length === 0) return;
    const shuffleSeed = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2)}`;
    const shuffleParams = { ...sequenceParams, shuffle: shuffleSeed };
    const [target] = getProblemSequence(problems, shuffleParams);
    if (!target) return;
    router.push(buildProblemHref(target.slug, shuffleParams));
  };

  const randomDisabled = shuffleCandidates.length === 0;
  const randomTitle = randomDisabled
    ? "No unsolved problems match these filters"
    : `Pick from ${shuffleCandidates.length} unsolved ${
        shuffleCandidates.length === 1 ? "problem" : "problems"
      } matching these filters`;

  const rowHref = (slug: string) => buildProblemHref(slug, sequenceParams);

  const filterSummary = [
    sequenceParams.category ? CATEGORIES[sequenceParams.category]?.label : null,
    sequenceParams.difficulty
      ? sequenceParams.difficulty[0].toUpperCase() +
        sequenceParams.difficulty.slice(1)
      : null,
    sequenceParams.type
      ? TYPES.find((option) => option.id === sequenceParams.type)?.label
      : null,
    sequenceParams.status
      ? STATUSES.find((option) => option.id === sequenceParams.status)?.label
      : null,
    sequenceParams.query ? `Search: "${sequenceParams.query}"` : null,
  ].filter(Boolean);

  const randomLabel =
    filterSummary.length > 0 ? "Random from filters" : "Random unsolved";

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
        <button
          type="button"
          onClick={randomProblem}
          disabled={randomDisabled}
          title={randomTitle}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Shuffle className="h-4 w-4" />
          {randomLabel}
        </button>
      </div>

      {filterSummary.length > 0 && (
        <p className="mt-3 text-xs text-muted">
          Random will use: {filterSummary.join(" · ")}
        </p>
      )}

      {/* Grouped list */}
      {grouped.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">
          Nothing matches those filters.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map(({ category: cat, problems: ps }) => (
            <section key={cat.id} className="content-auto">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                {CATEGORIES[cat.id].label}
              </h2>
              <div className="overflow-hidden rounded-xl border border-edge">
                {ps.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={rowHref(p.slug)}
                    className={`flex items-center justify-between gap-4 bg-surface px-4 py-3.5 transition hover:bg-surface-raised ${
                      i > 0 ? "border-t border-edge" : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <StatusIcon status={p.status} />
                      <span className="truncate font-medium">{p.title}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                      <TypeBadge type={p.type} />
                      <DifficultyBadge difficulty={p.difficulty} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
