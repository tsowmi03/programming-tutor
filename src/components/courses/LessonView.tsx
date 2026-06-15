"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ChevronLeft,
} from "lucide-react";
import type { LanguageId } from "@/lib/judge/languages";
import { MarkdownView } from "@/components/MarkdownView";
import { fetchJson } from "@/components/workspace/shared";
import { ExerciseWidget } from "./ExerciseWidget";
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
  prevSlug,
  nextSlug,
  position,
  total,
}: {
  courseSlug: string;
  courseTitle: string;
  language: LanguageId;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  blocks: ClientBlock[];
  initialCompleted: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
  position: number;
  total: number;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  const exerciseIds = useMemo(
    () =>
      blocks
        .filter((b) => b.kind === "exercise")
        .map((b) => (b.kind === "exercise" ? b.exercise.id : "")),
    [blocks],
  );

  // 1-based exercise number per block (null for prose), computed up front so
  // the render pass doesn't mutate a counter.
  const exerciseNumbers = useMemo(() => {
    let count = 0;
    return blocks.map((b) => (b.kind === "exercise" ? ++count : null));
  }, [blocks]);

  const onSolvedChange = useCallback((id: string, solved: boolean) => {
    setSolvedIds((prev) => {
      const has = prev.has(id);
      if (solved === has) return prev;
      const next = new Set(prev);
      if (solved) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const allSolved =
    exerciseIds.length > 0 && exerciseIds.every((id) => solvedIds.has(id));

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
    if (allSolved && !completed && !autoMarked.current) {
      autoMarked.current = true;
      void saveCompletion(true);
    }
  }, [allSolved, completed, saveCompletion]);

  const nextHref = nextSlug
    ? `/courses/${courseSlug}/${nextSlug}`
    : `/courses/${courseSlug}`;

  useEffect(() => {
    router.prefetch(nextHref);
  }, [nextHref, router]);

  const goNext = () => {
    if (!completed) void saveCompletion(true);
    router.push(nextHref);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
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
          {completed && (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-label="Completed" />
          )}
        </h1>
      </div>

      {/* Lesson body */}
      <article>
        {blocks.map((block, i) => {
          if (block.kind === "prose") {
            return <MarkdownView key={i}>{block.markdown}</MarkdownView>;
          }
          return (
            <ExerciseWidget
              key={block.exercise.id}
              courseSlug={courseSlug}
              lessonSlug={lessonSlug}
              exercise={block.exercise}
              language={language}
              index={exerciseNumbers[i] ?? 1}
              onSolvedChange={onSolvedChange}
            />
          );
        })}
      </article>

      {/* Completion + navigation footer */}
      <div className="mt-10 border-t border-edge pt-6">
        {exerciseIds.length > 0 && !allSolved && !completed && (
          <p className="mb-4 text-sm text-muted">
            {solvedIds.size} of {exerciseIds.length} exercises solved — finish
            them to complete this lesson automatically.
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
            <button
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
            </button>

            <button
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:bg-indigo-400"
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
