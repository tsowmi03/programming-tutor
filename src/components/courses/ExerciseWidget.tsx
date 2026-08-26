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
  initialSolved,
  initialAttempted,
  initialAssisted,
  beginnerMode,
  guidedFirstRun,
  onSolvedChange,
}: {
  courseSlug: string;
  lessonSlug: string;
  exercise: ClientExercise;
  language: LanguageId;
  /** 1-based position of this exercise within its lesson. */
  index: number;
  initialSolved: boolean;
  initialAttempted: boolean;
  initialAssisted: boolean;
  beginnerMode: boolean;
  guidedFirstRun: boolean;
  onSolvedChange?: (exerciseId: string, solved: boolean) => void;
}) {
  const storageKey = `cc-course-${courseSlug}-${lessonSlug}-${exercise.id}`;
  const [code, setCode, codeLoaded] = useStoredState(
    `${storageKey}-code`,
    exercise.starterCode,
  );
  const [isSolved, setIsSolved] = useState(initialSolved);
  const [attempted, setAttempted] = useState(initialAttempted || initialSolved);
  const [assisted, setAssisted] = useState(initialAssisted);
  const [allGuidanceRevealed, setAllGuidanceRevealed] = useState(
    exercise.guidance.length === 0,
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [outcome, setOutcome] = useState<JudgeOutcome | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [showHiddenTestsSetting, setShowHiddenTestsSetting] = useStoredState(
    "cc-show-hidden-tests",
    "",
  );
  const showHiddenTests = showHiddenTestsSetting === "1";
  const busy = phase !== "idle";
  const firstProgramSuccess = guidedFirstRun && outcome?.status === "passed";

  // Notify the parent lesson once the solved state is known and on changes.
  const onSolvedRef = useRef(onSolvedChange);
  useEffect(() => {
    onSolvedRef.current = onSolvedChange;
  });
  useEffect(() => {
    onSolvedRef.current?.(exercise.id, isSolved);
  }, [isSolved, exercise.id]);

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
              ...(endpoint === "submit" ? { showHiddenTests } : {}),
              ...(endpoint === "submit" && beginnerMode
                ? { showHiddenTests: false }
                : {}),
            }),
          },
        );
        setOutcome(outcome);
        setAttempted(true);
        if (endpoint === "submit" && outcome.status === "passed" && !isSolved) {
          setIsSolved(true);
          celebrate();
        }
      } catch (err) {
        setRunError(err instanceof Error ? err.message : String(err));
      } finally {
        setPhase("idle");
      }
    },
    [
      busy,
      code,
      courseSlug,
      lessonSlug,
      exercise.id,
      isSolved,
      showHiddenTests,
      beginnerMode,
    ],
  );

  const resetCode = () => {
    if (window.confirm("Replace your code with the starter code?")) {
      setCode(exercise.starterCode);
    }
  };

  const revealSolution = async () => {
    try {
      const revealed = await fetchJson<{ solution: string; assisted: boolean }>(
        "/api/courses/assistance",
        {
        method: "POST",
        body: JSON.stringify({
          courseSlug,
          lessonSlug,
          exerciseId: exercise.id,
          kind: "solution_reveal",
        }),
        },
      );
      setSolution(revealed.solution);
      if (revealed.assisted) setAssisted(true);
    } catch (err) {
      setRunError(err instanceof Error ? err.message : String(err));
    }
  };

  const completeGuidance = () => {
    setAllGuidanceRevealed(true);
    void fetchJson("/api/courses/assistance", {
      method: "POST",
      body: JSON.stringify({
        courseSlug,
        lessonSlug,
        exerciseId: exercise.id,
        kind: "guidance_complete",
      }),
    }).catch(() => {});
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
      id={`exercise-${exercise.id}`}
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

      {guidedFirstRun && !attempted && (
        <div className="border-b border-indigo-500/20 bg-indigo-500/5 px-4 py-3">
          <p className="text-xs font-semibold text-indigo-200">
            Your first program: predict → change → check
          </p>
          <ol className="mt-2 grid gap-2 text-xs text-muted sm:grid-cols-3">
            <li><span className="font-semibold text-foreground">1. Predict</span> what the program will print.</li>
            <li><span className="font-semibold text-foreground">2. Change</span> the code to finish the task.</li>
            <li><span className="font-semibold text-foreground">3. Check</span> your program and compare.</li>
          </ol>
        </div>
      )}

      {firstProgramSuccess && (
        <div className="border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          <p className="font-semibold">You wrote and checked your first program.</p>
          <p className="mt-1 text-xs text-emerald-100/70">
            That edit → check → improve loop is the core habit you will use throughout the course.
          </p>
        </div>
      )}

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
          {!beginnerMode && <button
            onClick={() => judge("run")}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-md border border-edge bg-surface-raised px-3 py-1.5 text-xs font-semibold transition hover:border-zinc-600 disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5" />
            Run
          </button>}
          <button
            onClick={() => judge("submit")}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
          >
            {beginnerMode ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
            {beginnerMode ? "Check my program" : "Submit"}
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
          mode={exercise.mode}
          signature={exercise.mode === "function" ? exercise.signature : undefined}
          visibleTests={visibleTests}
          hiddenTestCount={hiddenCount}
          outcome={outcome}
          phase={phase}
          errorMessage={runError}
          showHiddenTestDetails={showHiddenTests}
          onShowHiddenTestDetailsChange={(value) =>
            setShowHiddenTestsSetting(value ? "1" : "")
          }
          beginnerMode={beginnerMode}
        />
      </div>

      {/* Hints & solution */}
      <div className="space-y-3 border-t border-edge px-4 py-3">
        {attempted ? (
          <GuidanceReveal
            guidance={exercise.guidance}
            compact
            onAllRevealed={completeGuidance}
          />
        ) : (
          <p className="text-xs text-muted">
            {beginnerMode
              ? "Check your program once to unlock step-by-step guidance."
              : "Run or submit once to unlock staged guidance."}
          </p>
        )}

        {attempted && <AiGuidancePanel
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
        />}

        <div>
          {solution !== null ? (
            <details className="group" open>
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground">
                <GraduationCap className="h-3.5 w-3.5" />
                Reference solution
              </summary>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-edge bg-zinc-900/80 p-3 font-mono text-xs leading-relaxed">
                {solution}
              </pre>
            </details>
          ) : (
            <button
              onClick={() => void revealSolution()}
              disabled={!isSolved && (!attempted || !allGuidanceRevealed)}
              className="flex items-center gap-1.5 text-xs text-muted underline-offset-2 transition hover:text-foreground hover:underline disabled:cursor-not-allowed disabled:opacity-40"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {isSolved
                ? "View the reference solution"
                : !attempted
                ? beginnerMode
                  ? "Check your program once before revealing help"
                  : "Run once before revealing help"
                : !allGuidanceRevealed
                  ? "Reveal each guidance step before the solution"
                  : "Stuck? Reveal the reference solution"}
            </button>
          )}
        </div>

        {assisted && (
          <p className="text-[11px] text-amber-300">
            Reference-solution assistance recorded for this activity.
          </p>
        )}

        {visibleTests.length === 0 && (
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <Terminal className="h-3 w-3" /> Submit to run the hidden tests.
          </p>
        )}
      </div>
    </div>
  );
}
