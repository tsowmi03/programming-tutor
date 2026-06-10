import { CheckCircle2, CircleDashed, CircleDot, FileText, Code2 } from "lucide-react";
import type { ProblemStatus } from "@/lib/problems";

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/30",
  medium: "text-amber-400 bg-amber-500/10 ring-amber-500/30",
  hard: "text-rose-400 bg-rose-500/10 ring-rose-500/30",
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ${DIFFICULTY_STYLES[difficulty] ?? ""}`}
    >
      {difficulty}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const isCode = type === "code";
  const Icon = isCode ? Code2 : FileText;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <Icon className="h-3.5 w-3.5" />
      {isCode ? "Code" : "Explain"}
    </span>
  );
}

export function StatusIcon({ status }: { status: ProblemStatus }) {
  if (status === "solved") {
    return <CheckCircle2 className="h-[18px] w-[18px] text-emerald-400" aria-label="Solved" />;
  }
  if (status === "attempted") {
    return <CircleDot className="h-[18px] w-[18px] text-amber-400" aria-label="Attempted" />;
  }
  return (
    <CircleDashed className="h-[18px] w-[18px] text-zinc-600" aria-label="Not started" />
  );
}
