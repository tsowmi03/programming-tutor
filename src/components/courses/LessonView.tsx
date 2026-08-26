"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronLeft,
  Clock3,
  Sparkles,
  Trophy,
} from "lucide-react";
import type { LanguageId } from "@/lib/judge/languages";
import { MarkdownView } from "@/components/MarkdownView";
import { celebrate, fetchJson, useStoredState } from "@/components/workspace/shared";
import { ExerciseWidget } from "./ExerciseWidget";
import { KnowledgeCheckWidget } from "./KnowledgeCheckWidget";
import type { ClientBlock } from "./types";

export function LessonView({
  courseSlug,
  courseTitle,
  language,
  lessonSlug,
  lessonTitle,
  moduleTitle,
  blocks,
  initialCompleted,
  initialSolvedExerciseIds,
  initialAttemptedExerciseIds,
  initialExerciseCodes,
  initialSolvedKnowledgeCheckIds,
  initialKnowledgeCheckAnswers,
  initialAssistedExerciseIds,
  masteryGated,
  beginnerMode,
  prevSlug,
  nextSlug,
  position,
  total,
  estimatedMinutes,
}: {
  courseSlug: string;
  courseTitle: string;
  language: LanguageId;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  blocks: ClientBlock[];
  initialCompleted: boolean;
  initialSolvedExerciseIds: string[];
  initialAttemptedExerciseIds: string[];
  initialExerciseCodes: Record<string, string>;
  initialSolvedKnowledgeCheckIds: string[];
  initialKnowledgeCheckAnswers: Record<string, string>;
  initialAssistedExerciseIds: string[];
  masteryGated: boolean;
  beginnerMode: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  position: number;
  total: number;
  estimatedMinutes: number;
}) {
  const router = useRouter();
  const firstLessonMode = beginnerMode && position === 1;
  const [completed, setCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [resumeDismissed, setResumeDismissed] = useState(false);
  const completionRef = useRef<HTMLDivElement>(null);
  const [lastActivityId, setLastActivityId] = useStoredState(
    `cc-course-${courseSlug}-${lessonSlug}-last-activity`,
    "",
  );
  const [solvedIds, setSolvedIds] = useState<Set<string>>(
    () => new Set([...initialSolvedExerciseIds, ...initialSolvedKnowledgeCheckIds]),
  );

  const requiredActivityIds = useMemo(
    () =>
      blocks.flatMap((block) => {
        if (block.kind === "exercise" && block.exercise.required) {
          return [block.exercise.id];
        }
        if (block.kind === "knowledge_check" && block.check.required) {
          return [block.check.id];
        }
        return [];
      }),
    [blocks],
  );

  const activityLabels = useMemo(
    () => {
      const knowledgeCheckIds = blocks.flatMap((block) =>
        block.kind === "knowledge_check" ? [block.check.id] : [],
      );
      return new Map(
        blocks.flatMap((block) => {
          if (block.kind === "exercise") {
            return [[block.exercise.id, block.exercise.title] as const];
          }
          if (block.kind === "knowledge_check") {
            return [
              [
                block.check.id,
                `Understanding check ${knowledgeCheckIds.indexOf(block.check.id) + 1}`,
              ] as const,
            ];
          }
          return [];
        }),
      );
    },
    [blocks],
  );

  // 1-based exercise number per block (null for prose), computed up front so
  // the render pass doesn't mutate a counter.
  const exerciseNumbers = useMemo(() => {
    let count = 0;
    return blocks.map((b) => (b.kind === "exercise" ? ++count : null));
  }, [blocks]);

  const scrollToActivity = useCallback((activityId: string) => {
    window.setTimeout(() => {
      document
        .getElementById(`activity-${activityId}`)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
    }, 1_100);
  }, []);

  const onSolvedChange = useCallback((id: string, solved: boolean) => {
    const has = solvedIds.has(id);
    if (solved === has) return;
    const next = new Set(solvedIds);
    if (solved) next.add(id);
    else next.delete(id);
    setSolvedIds(next);

    if (!solved) return;
    const allNow = requiredActivityIds.every((activityId) => next.has(activityId));
    if (allNow) {
      setLastActivityId("");
      if (firstLessonMode) {
        setShowCompletion(true);
        celebrate();
        window.setTimeout(() => {
          completionRef.current?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
            block: "center",
          });
        }, 900);
      }
      return;
    }

    const completedIndex = requiredActivityIds.indexOf(id);
    const nextId = requiredActivityIds
      .slice(Math.max(0, completedIndex + 1))
      .find((activityId) => !next.has(activityId));
    if (nextId) {
      setLastActivityId(nextId);
      if (firstLessonMode) scrollToActivity(nextId);
    }
  }, [firstLessonMode, requiredActivityIds, scrollToActivity, setLastActivityId, solvedIds]);

  const allSolved =
    requiredActivityIds.length > 0 &&
    requiredActivityIds.every((id) => solvedIds.has(id));
  const lessonCompleted = masteryGated ? completed || allSolved : completed;
  const completedActivityCount = requiredActivityIds.filter((id) =>
    solvedIds.has(id),
  ).length;
  const firstIncompleteActivityId = requiredActivityIds.find(
    (id) => !solvedIds.has(id),
  );
  const resumeActivityId =
    lastActivityId &&
    requiredActivityIds.includes(lastActivityId) &&
    !solvedIds.has(lastActivityId)
      ? lastActivityId
      : firstIncompleteActivityId;
  const hasPreviousWork =
    initialAttemptedExerciseIds.length > 0 ||
    Object.keys(initialKnowledgeCheckAnswers).length > 0 ||
    completedActivityCount > 0;
  const showResume = Boolean(
    firstLessonMode &&
      hasPreviousWork &&
      !lessonCompleted &&
      !resumeDismissed &&
      resumeActivityId,
  );

  const rememberActivity = useCallback(
    (activityId: string) => setLastActivityId(activityId),
    [setLastActivityId],
  );

  const saveCompletion = useCallback(
    async (value: boolean) => {
      const previous = completed;
      setCompleted(value);
      setSaving(true);
      try {
        await fetchJson("/api/courses/progress", {
          method: "POST",
          body: JSON.stringify({ courseSlug, lessonSlug, completed: value }),
        });
      } catch {
        setCompleted(previous);
      } finally {
        setSaving(false);
      }
    },
    [completed, courseSlug, lessonSlug],
  );

  // Auto-complete once every exercise in the lesson has been solved.
  const autoMarked = useRef(false);
  useEffect(() => {
    if (allSolved && !masteryGated && !completed && !autoMarked.current) {
      autoMarked.current = true;
      void saveCompletion(true);
    }
  }, [allSolved, completed, masteryGated, saveCompletion]);

  const nextHref = nextSlug
    ? `/courses/${courseSlug}/${nextSlug}`
    : `/courses/${courseSlug}`;

  useEffect(() => {
    router.prefetch(nextHref);
  }, [nextHref, router]);

  const goNext = () => {
    if (masteryGated && !allSolved) return;
    if (!masteryGated && !completed) void saveCompletion(true);
    router.push(nextHref);
  };

  return (
    <main className="mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-8">
      {/* Breadcrumb */}
      <Link
        href={`/courses/${courseSlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        {courseTitle}
      </Link>

      <div className="mt-4 mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-indigo-300">
          {moduleTitle} · Lesson {position} of {total}
        </p>
        <h1 className="mt-1 flex items-center gap-2.5 text-2xl font-bold tracking-tight">
          {lessonTitle}
          {lessonCompleted && (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-label="Completed" />
          )}
        </h1>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <Clock3 className="h-4 w-4" />
          {firstLessonMode ? "Your first lesson" : "Lesson"} · about {estimatedMinutes} minutes
        </p>
      </div>

      {firstLessonMode && (
        <section className="mb-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-indigo-100">
                <Sparkles className="h-4 w-4 text-indigo-300" />
                One goal: finish your first lesson
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Complete {requiredActivityIds.length} small activities. CodeClimb saves each
                result automatically.
              </p>
            </div>
            <span className="rounded-full bg-background/60 px-3 py-1 text-xs font-semibold text-indigo-200 ring-1 ring-indigo-500/30">
              {completedActivityCount}/{requiredActivityIds.length} complete
            </span>
          </div>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800"
            role="progressbar"
            aria-label="First lesson progress"
            aria-valuemin={0}
            aria-valuemax={requiredActivityIds.length}
            aria-valuenow={completedActivityCount}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{
                width: `${requiredActivityIds.length === 0 ? 0 : Math.round((completedActivityCount / requiredActivityIds.length) * 100)}%`,
              }}
            />
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {requiredActivityIds.map((activityId, index) => {
              const activityComplete = solvedIds.has(activityId);
              const isNext = activityId === firstIncompleteActivityId;
              return (
                <li
                  key={activityId}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ring-1 ${
                    activityComplete
                      ? "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20"
                      : isNext
                        ? "bg-indigo-500/10 text-indigo-100 ring-indigo-500/30"
                        : "bg-background/40 text-muted ring-edge"
                  }`}
                >
                  {activityComplete ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current text-[10px]">
                      {index + 1}
                    </span>
                  )}
                  <span className="truncate">{activityLabels.get(activityId)}</span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {showResume && (
        <section className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-100">Welcome back—your work is saved.</p>
            <p className="mt-1 text-xs text-amber-100/70">
              Continue with {resumeActivityId
                ? (activityLabels.get(resumeActivityId) ?? "your next activity")
                : "your next activity"}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (resumeActivityId) scrollToActivity(resumeActivityId);
              }}
              className="rounded-lg bg-amber-300 px-3 py-2 text-xs font-semibold text-amber-950 transition hover:bg-amber-200"
            >
              Continue where I stopped
            </button>
            <button
              onClick={() => setResumeDismissed(true)}
              className="px-2 py-2 text-xs text-amber-100/70 hover:text-amber-100"
            >
              Dismiss
            </button>
          </div>
        </section>
      )}

      {firstLessonMode && <BeginnerGlossary />}

      {/* Lesson body */}
      <article>
        {blocks.map((block, i) => {
          if (block.kind === "prose") {
            return <MarkdownView key={i}>{block.markdown}</MarkdownView>;
          }
          if (block.kind === "knowledge_check") {
            return (
              <KnowledgeCheckWidget
                key={block.check.id}
                courseSlug={courseSlug}
                lessonSlug={lessonSlug}
                check={block.check}
                initialSolved={initialSolvedKnowledgeCheckIds.includes(block.check.id)}
                initialAnswer={initialKnowledgeCheckAnswers[block.check.id]}
                onActivityFocus={rememberActivity}
                onSolvedChange={onSolvedChange}
              />
            );
          }
          return (
            <ExerciseWidget
              key={block.exercise.id}
              courseSlug={courseSlug}
              lessonSlug={lessonSlug}
              exercise={block.exercise}
              language={language}
              index={exerciseNumbers[i] ?? 1}
              initialSolved={initialSolvedExerciseIds.includes(block.exercise.id)}
              initialAttempted={initialAttemptedExerciseIds.includes(block.exercise.id)}
              initialAssisted={initialAssistedExerciseIds.includes(block.exercise.id)}
              initialCode={initialExerciseCodes[block.exercise.id]}
              beginnerMode={beginnerMode}
              firstLessonMode={firstLessonMode}
              guidedFirstRun={beginnerMode && position === 1 && exerciseNumbers[i] === 1}
              onActivityFocus={rememberActivity}
              onSolvedChange={onSolvedChange}
            />
          );
        })}
      </article>

      {showCompletion && (
        <section
          ref={completionRef}
          role="status"
          aria-live="polite"
          className="my-10 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-surface to-indigo-500/10 p-6 text-center shadow-xl shadow-emerald-950/20 sm:p-8"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
            <Trophy className="h-6 w-6" />
          </span>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            First lesson mastered
          </p>
          <h2 className="mt-2 text-2xl font-bold">You made a computer follow your instructions.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            You can now write instructions in order, predict what runs first, and distinguish source code from output.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <button
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Start lesson 2 <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowCompletion(false)}
              className="rounded-lg border border-edge px-4 py-3 text-sm text-muted transition hover:text-foreground"
            >
              Stay and review
            </button>
          </div>
        </section>
      )}

      {/* Completion + navigation footer */}
      <div className="mt-10 border-t border-edge pt-6">
        {requiredActivityIds.length > 0 && !allSolved && !lessonCompleted && (
          <p className="mb-4 text-sm text-muted">
            {requiredActivityIds.filter((id) => solvedIds.has(id)).length} of {requiredActivityIds.length} required activities complete.
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            {prevSlug ? (
              <Link
                href={`/courses/${courseSlug}/${prevSlug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-edge px-3 py-2 text-sm text-muted transition hover:border-zinc-600 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="flex items-center gap-3">
            {!masteryGated && <button
              onClick={() => saveCompletion(!completed)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground disabled:opacity-50"
            >
              {completed ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  Mark complete
                </>
              )}
            </button>}

            <button
              onClick={goNext}
              disabled={masteryGated && !allSolved}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {nextSlug ? "Next lesson" : "Finish course"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

const BEGINNER_WORDS = [
  {
    term: "Program",
    meaning: "A sequence of instructions that a computer follows.",
  },
  {
    term: "Code",
    meaning: "The instructions you write in a programming language such as Python.",
  },
  {
    term: "Output",
    meaning: "What a running program displays or produces.",
  },
  {
    term: "Error",
    meaning: "Information explaining why Python could not continue. It is evidence you can use.",
  },
] as const;

function BeginnerGlossary() {
  return (
    <details className="mb-6 rounded-xl border border-edge bg-surface p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold">
        <BookOpen className="h-4 w-4 text-indigo-300" />
        New words in this lesson
        <span className="ml-auto text-xs font-normal text-muted">Open definitions</span>
      </summary>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {BEGINNER_WORDS.map((item) => (
          <div key={item.term} className="rounded-lg bg-background/50 p-3 ring-1 ring-edge">
            <dt className="text-xs font-semibold text-indigo-200">{item.term}</dt>
            <dd className="mt-1 text-xs leading-relaxed text-muted">{item.meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
