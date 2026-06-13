import Link from "next/link";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import type { ProblemStatus } from "@/lib/problems";
import { DifficultyBadge, StatusIcon } from "@/components/badges";

export interface WorkspaceNavigation {
  problemsHref: string;
  nextProblemHref: string | null;
  shuffleHref: string | null;
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
  nextProblemHref,
  shuffleHref,
  position,
  total,
  shuffled,
}: {
  title: string;
  difficulty: string;
  category: CategoryId;
  status: ProblemStatus;
} & WorkspaceNavigation) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-edge bg-surface px-4">
      <Link
        href={problemsHref}
        className="flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Problems
      </Link>
      <span className="text-zinc-700">/</span>
      <div className="flex min-w-0 items-center gap-2.5">
        <StatusIcon status={status} />
        <h1 className="truncate text-[15px] font-semibold">{title}</h1>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <span className="hidden text-xs text-muted xl:block">
          {CATEGORIES[category]?.label}
        </span>
        <span className="hidden text-xs tabular-nums text-muted lg:block">
          {position} / {total}
        </span>
        <span className="hidden sm:block">
          <DifficultyBadge difficulty={difficulty} />
        </span>
        {shuffleHref && (
          <Link
            href={shuffleHref}
            title={shuffled ? "Reshuffle exercises" : "Shuffle exercises"}
            className="inline-flex items-center gap-1.5 rounded-md border border-edge bg-surface-raised px-2.5 py-1.5 text-xs font-semibold text-muted transition hover:border-indigo-500/50 hover:text-indigo-300"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span className="hidden md:inline">
              {shuffled ? "Reshuffle" : "Shuffle"}
            </span>
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
