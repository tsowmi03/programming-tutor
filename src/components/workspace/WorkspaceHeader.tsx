import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, Shuffle } from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import type { ProblemStatus } from "@/lib/problems";
import { DifficultyBadge, StatusIcon } from "@/components/badges";

export interface WorkspaceNavigation {
  problemsHref: string;
  backLabel?: string;
  studyMode?: "interview" | "no_hints";
  previousProblemHref: string | null;
  nextProblemHref: string | null;
  randomProblemHref: string | null;
  position: number;
  total: number;
  shuffled: boolean;
}

export function WorkspaceHeader({
  title,
  difficulty,
  category,
  status,
  problemsHref,
  backLabel = "Problems",
  studyMode,
  previousProblemHref,
  nextProblemHref,
  randomProblemHref,
  position,
  total,
  shuffled,
}: {
  title: string;
  difficulty: string;
  category: CategoryId;
  status: ProblemStatus;
} & WorkspaceNavigation) {
  const showPosition = position > 0 && total > 0;

  return (
    <div className="flex min-h-12 shrink-0 flex-wrap items-center gap-2 border-b border-edge bg-surface px-3 py-2 sm:gap-3 sm:px-4">
      <Link
        href={problemsHref}
        aria-label="Back to problems"
        className="flex shrink-0 items-center gap-1 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">{backLabel}</span>
      </Link>
      <span className="hidden text-zinc-700 sm:inline">/</span>
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="hidden sm:inline-flex">
          <StatusIcon status={status} />
        </span>
        <h1 className="truncate text-[15px] font-semibold">{title}</h1>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
        {studyMode && (
          <span className="hidden rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30 lg:inline-flex">
            {studyMode === "interview" ? "Interview" : "No hints"}
          </span>
        )}
        <span className="hidden text-xs text-muted xl:block">
          {CATEGORIES[category]?.label}
        </span>
        {showPosition && (
          <span className="hidden text-xs tabular-nums text-muted lg:block">
            {position} / {total}
          </span>
        )}
        <span className="hidden sm:inline-flex">
          <DifficultyBadge difficulty={difficulty} />
        </span>
        {previousProblemHref && (
          <Link
            href={previousProblemHref}
            title="Previous problem"
            aria-label="Previous problem"
            className="inline-flex items-center gap-1 rounded-md border border-edge bg-surface-raised px-2.5 py-1.5 text-xs font-semibold text-muted transition hover:border-zinc-600 hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Previous</span>
          </Link>
        )}
        {randomProblemHref && (
          <Link
            href={randomProblemHref}
            title={
              shuffled
                ? "Pick another random unsolved problem"
                : "Pick a random unsolved problem"
            }
            aria-label="Random unsolved problem"
            className="inline-flex items-center gap-1 rounded-md border border-edge bg-surface-raised px-2.5 py-1.5 text-xs font-semibold text-muted transition hover:border-indigo-500/50 hover:text-indigo-300"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Random</span>
          </Link>
        )}
        {nextProblemHref && (
          <Link
            href={nextProblemHref}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400"
          >
            <span className="hidden sm:inline">Next problem</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
