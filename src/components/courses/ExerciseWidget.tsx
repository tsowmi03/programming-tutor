"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  GraduationCap,
  Terminal,
} from "lucide-react";
import type { JudgeOutcome } from "@/lib/judge/types";
import { LANGUAGES, type LanguageId } from "@/lib/judge/languages";
import { MarkdownView } from "@/components/MarkdownView";
import { GuidanceReveal } from "@/components/GuidanceReveal";
import { AiGuidancePanel } from "@/components/workspace/AiGuidancePanel";
import { TestPanel } from "@/components/workspace/TestPanel";
import { fetchJson, useStoredState, celebrate } from "@/components/workspace/shared";
import type { ClientExercise } from "./types";

type Phase = "idle" | "running" | "submitting";

export function ExerciseWidget({
  courseSlug,
  lessonSlug,
  exercise,
  language,
  index,
  onSolvedChange,
}: {
  courseSlug: string;
  lessonSlug: string;
  exercise: ClientExercise;
  language: LanguageId;
  /** 1-based position of this exercise within its lesson. */
  index: number;
  onSolvedChange?: (exerciseId: string, solved: boolean) => void;
}) {
  const storageKey = `cc-course-${courseSlug}-${lessonSlug}-${exercise.id}`;
  const [code, setCode, codeLoaded] = useStoredState(
    `${storageKey}-code`,
    exercise.starterCode,
  );
  const [solved, setSolved, solvedLoaded] = useStoredState(
    `${storageKey}-solved`,
    "",
  );
  const isSolved = solved === "1";

  const [phase, setPhase] = useState<Phase>("idle");
  const [outcome, setOutcome] = useState<JudgeOutcome | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const busy = phase !== "idle";

  // Notify the parent lesson once the solved state is known and on changes.
  const onSolvedRef = useRef(onSolvedChange);
  useEffect(() => {
    onSolvedRef.current = onSolvedChange;
  });
  useEffect(() => {
    if (solvedLoaded) onSolvedRef.current?.(exercise.id, isSolved);
  }, [solvedLoaded, isSolved, exercise.id]);

  const judge = useCallback(
    async (endpoint: "run" | "submit") => {
      if (busy) return;
      setPhase(endpoint === "run" ? "running" : "submitting");
      setRunError(null);
      setOutcome(null);
      try {
        const { outcome } = await fetchJson<{ outcome: JudgeOutcome }>(
          `/api/courses/${endpoint}`,
          {
            method: "POST",
            body: JSON.stringify({
              courseSlug,
              lessonSlug,
              exerciseId: exercise.id,
              code,
            }),
          },
        );
        setOutcome(outcome);
        if (endpoint === "submit" && outcome.status === "passed" && !isSolved) {
          setSolved("1");
          celebrate();
        }
      } catch (err) {
        setRunError(err instanceof Error ? err.message : String(err));
      } finally {
        setPhase("idle");
      }
    },
    [busy, code, courseSlug, lessonSlug, exercise.id, isSolved, setSolved],
  );

  const resetCode = () => {
    if (window.confirm("Replace your code with the starter code?")) {
      setCode(exercise.starterCode);
    }
  };

  const monacoOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 13,
      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      scrollBeyondLastLine: false,
      padding: { top: 10, bottom: 10 },
      tabSize: language === "python" ? 4 : 4,
      lineNumbers: "on" as const,
      automaticLayout: true,
      renderLineHighlight: "none" as const,
      scrollbar: { verticalScrollbarSize: 8, alwaysConsumeMouseWheel: false },
    }),
    [language],
  );

  const visibleTests = exercise.visibleTests;
  const hiddenCount = exercise.hiddenTestCount;
  const guidanceContextKey = `${courseSlug}:${lessonSlug}:${exercise.id}`;
  const getGuidanceContext = useCallback(
    () => ({ code, latestOutcome: outcome, runError }),
    [code, outcome, runError],
  );

  return (
    <div
      className={`my-6 overflow-hidden rounded-xl border bg-surface transition ${
        isSolved ? "border-emerald-500/40" : "border-edge"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-edge bg-surface-raised/50 px-4 py-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
            isSolved
              ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
              : "bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30"
          }`}
        >
          {isSolved ? <CheckCircle2 className="h-4 w-4" /> : index}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-semibold">
            Exercise: {exercise.title}
          </p>
        </div>
        <span className="ml-auto rounded bg-background px-2 py-0.5 text-[11px] font-medium text-muted">
          {LANGUAGES[language].label}
        </span>
      </div>

      {/* Prompt */}
      <div className="border-b border-edge px-4 py-3">
        <MarkdownView>{exercise.prompt}</MarkdownView>
      </div>

      {/* Editor toolbar */}
      <div className="flex h-10 items-center gap-2 border-b border-edge px-3">
        <button
          onClick={resetCode}
          title="Reset to starter code"
          className="rounded-md p-1.5 text-muted transition hover:bg-surface-raised hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => judge("run")}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-md border border-edge bg-surface-raised px-3 py-1.5 text-xs font-semibold transition hover:border-zinc-600 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" />
            Run
          </button>
          <button
            onClick={() => judge("submit")}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            Submit
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-72 border-b border-edge">
        {codeLoaded ? (
          <Editor
            language={LANGUAGES[language].monaco}
            value={code}
            onChange={(v) => setCode(v ?? "")}
            theme="vs-dark"
            options={monacoOptions}
            loading={
              <div className="flex h-full items-center justify-center text-sm text-muted">
                Loading editor…
              </div>
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#1e1e1e] text-sm text-muted">
            Loading editor…
          </div>
        )}
      </div>

      {/* Results */}
      <div className="h-64 bg-background">
        <TestPanel
          signature={exercise.signature}
          visibleTests={visibleTests}
          hiddenTestCount={hiddenCount}
          outcome={outcome}
          phase={phase}
          errorMessage={runError}
        />
      </div>

      {/* Hints & solution */}
      <div className="space-y-3 border-t border-edge px-4 py-3">
        <GuidanceReveal guidance={exercise.guidance} compact />

        <AiGuidancePanel
          contextKey={guidanceContextKey}
          endpoint="/api/courses/guidance"
          getGuidanceContext={getGuidanceContext}
          buildRequestBody={(mode, context) => ({
            courseSlug,
            lessonSlug,
            exerciseId: exercise.id,
            mode,
            code: context.code,
            latestOutcome: context.latestOutcome,
            runError: context.runError,
          })}
        />

        <div>
          {showSolution || isSolved ? (
            <details className="group" open={showSolution}>
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground">
                <GraduationCap className="h-3.5 w-3.5" />
                Reference solution
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-edge bg-zinc-900/80 p-3 font-mono text-xs leading-relaxed">
                {exercise.solution}
              </pre>
            </details>
          ) : (
            <button
              onClick={() => setShowSolution(true)}
              className="flex items-center gap-1.5 text-xs text-muted underline-offset-2 transition hover:text-foreground hover:underline"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Stuck? Reveal the reference solution
            </button>
          )}
        </div>

        {visibleTests.length === 0 && (
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <Terminal className="h-3 w-3" /> Submit to run the hidden tests.
          </p>
        )}
      </div>
    </div>
  );
}
