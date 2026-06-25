"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Pause,
  Play,
  RotateCcw,
  Shuffle,
  Timer,
} from "lucide-react";
import { CATEGORIES } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import type { ProblemStatus } from "@/lib/problems";
import type { ProblemSequenceParams } from "@/lib/problem-navigation";
import { DifficultyBadge, StatusIcon } from "@/components/badges";

export interface WorkspaceNavigation {
  problemsHref: string;
  backLabel?: string;
  studyMode?: ProblemSequenceParams["mode"];
  studySession?: ProblemSequenceParams["session"];
  timerMinutes?: number;
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
  studySession,
  timerMinutes,
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
  const sessionLabel = getStudySessionLabel(studySession, studyMode);

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
        {sessionLabel && (
          <span className="hidden rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30 lg:inline-flex">
            {sessionLabel}
          </span>
        )}
        {timerMinutes && (
          <StudySessionTimer key={timerMinutes} minutes={timerMinutes} />
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

function getStudySessionLabel(
  session: ProblemSequenceParams["session"],
  mode: ProblemSequenceParams["mode"],
): string | null {
  if (session === "review10") return "Review 10";
  if (session === "weak_topic") return "Weak topic";
  if (session === "timed_interview") return "Timed interview";
  if (session === "no_hints") return "No hints";
  if (mode === "interview") return "Interview";
  if (mode === "no_hints") return "No hints";
  return null;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function StudySessionTimer({ minutes }: { minutes: number }) {
  const initialSeconds = useMemo(() => minutes * 60, [minutes]);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || remaining <= 0) return undefined;
    const id = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [remaining, running]);

  const done = remaining <= 0;

  return (
    <div
      className={`hidden h-7 items-center gap-1.5 rounded-full border px-2 text-xs font-semibold tabular-nums lg:inline-flex ${
        done
          ? "border-rose-500/35 bg-rose-500/10 text-rose-200"
          : "border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
      }`}
      title="Timed interview session"
    >
      <Timer className="h-3.5 w-3.5" />
      <span className="min-w-12 text-center">
        {done ? "Time up" : formatTime(remaining)}
      </span>
      <button
        type="button"
        onClick={() => setRunning((value) => !value)}
        className="rounded p-0.5 transition hover:bg-white/10"
        title={running ? "Pause timer" : "Resume timer"}
        aria-label={running ? "Pause timer" : "Resume timer"}
      >
        {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      </button>
      <button
        type="button"
        onClick={() => {
          setRemaining(initialSeconds);
          setRunning(true);
        }}
        className="rounded p-0.5 transition hover:bg-white/10"
        title="Reset timer"
        aria-label="Reset timer"
      >
        <RotateCcw className="h-3 w-3" />
      </button>
    </div>
  );
}
