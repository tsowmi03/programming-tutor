"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { CATEGORY_LIST, CATEGORIES } from "@/content/categories";
import type { ProblemSummary } from "@/lib/problems";
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

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return problems.filter(
      (p) =>
        (!category || p.category === category) &&
        (!difficulty || p.difficulty === difficulty) &&
        (!type || p.type === type) &&
        (!status || p.status === status) &&
        (!q || p.title.toLowerCase().includes(q)),
    );
  }, [problems, category, difficulty, type, status, deferredQuery]);

  const grouped = useMemo(() => {
    return CATEGORY_LIST.map((cat) => ({
      category: cat,
      problems: filtered
        .filter((p) => p.category === cat.id)
        .sort((a, b) => a.order - b.order),
    })).filter((g) => g.problems.length > 0);
  }, [filtered]);

  const selectClass =
    "rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-indigo-500/60";

  const updateCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    const params = new URLSearchParams(window.location.search);
    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
    );
  };

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
          onChange={(e) => updateCategory(e.target.value)}
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
      </div>

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
                    href={`/problems/${p.slug}`}
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
