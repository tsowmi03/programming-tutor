import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import type { ProblemStatus } from "@/lib/problems";
import { DifficultyBadge, StatusIcon } from "@/components/badges";

export function WorkspaceHeader({
  title,
  difficulty,
  category,
  status,
}: {
  title: string;
  difficulty: string;
  category: CategoryId;
  status: ProblemStatus;
}) {
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-edge bg-surface px-4">
      <Link
        href="/problems"
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
      <div className="ml-auto flex shrink-0 items-center gap-3">
        <span className="hidden text-xs text-muted sm:block">
          {CATEGORIES[category]?.label}
        </span>
        <DifficultyBadge difficulty={difficulty} />
      </div>
    </div>
  );
}
