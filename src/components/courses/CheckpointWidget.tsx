"use client";

import { useEffect, useState } from "react";
import { Award, CheckCircle2, RotateCcw } from "lucide-react";
import { fetchJson } from "@/components/workspace/shared";
import { createCheckpointAnswerChangeHandler } from "./checkpoint-answer-change";

interface Question {
  objectiveId: string;
  format: string;
  prompt: string;
  choices?: string[];
}

interface CheckpointResult {
  score: number;
  maxScore: number;
  passed: boolean;
  results: {
    objectiveId: string;
    correct: boolean;
    explanation: string;
    remediationLessonSlug: string;
  }[];
}

export function CheckpointWidget({
  courseSlug,
  moduleSlug,
  title,
}: {
  courseSlug: string;
  moduleSlug: string;
  title: string;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [result, setResult] = useState<CheckpointResult | null>(null);

  const load = async () => {
    setBusy(true);
    setError(null);
    try {
      const form = await fetchJson<{ questions: Question[] }>(
        `/api/courses/checkpoints?courseSlug=${encodeURIComponent(courseSlug)}&moduleSlug=${encodeURIComponent(moduleSlug)}`,
      );
      setQuestions(form.questions);
      setAnswers({});
      setResult(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const url = `/api/courses/checkpoints?courseSlug=${encodeURIComponent(courseSlug)}&moduleSlug=${encodeURIComponent(moduleSlug)}`;
    void fetchJson<{ questions: Question[] }>(url)
      .then((form) => {
        if (!cancelled) setQuestions(form.questions);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [courseSlug, moduleSlug]);

  const submit = async () => {
    setBusy(true);
    try {
      const next = await fetchJson<CheckpointResult>("/api/courses/checkpoints", {
        method: "POST",
        body: JSON.stringify({ courseSlug, moduleSlug, answers }),
      });
      setResult(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-indigo-200">
        <Award className="h-4 w-4" /> {title}
      </h3>
      <p className="mt-1 text-xs text-muted">Score at least 4 out of 5 to unlock the next module.</p>

      {busy && questions.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Loading checkpoint…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-amber-200">{error}</p>
      ) : result ? (
        <div className="mt-4">
          <p className={`text-lg font-bold ${result.passed ? "text-emerald-300" : "text-amber-300"}`}>
            {result.score}/{result.maxScore} — {result.passed ? "Mastered" : "Review required"}
          </p>
          <div className="mt-3 space-y-2">
            {result.results.map((item) => (
              <div key={item.objectiveId} className="rounded-lg border border-edge bg-background/50 p-3 text-xs">
                <p className={item.correct ? "text-emerald-300" : "text-rose-300"}>
                  {item.correct ? "Correct" : "Needs review"}
                </p>
                <p className="mt-1 text-muted">{item.explanation}</p>
                {!item.correct && (
                  <a href={`/courses/${courseSlug}/${item.remediationLessonSlug}`} className="mt-2 inline-block text-indigo-300 hover:underline">
                    Review lesson
                  </a>
                )}
              </div>
            ))}
          </div>
          {result.passed && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> The next module is unlocked.
            </p>
          )}
          {!result.passed && (
            <button onClick={() => void load()} className="mt-3 inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:underline">
              <RotateCcw className="h-3.5 w-3.5" /> Retry after completing review
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-5">
          {questions.map((question, index) => (
            <fieldset key={question.objectiveId}>
              <legend className="text-sm font-medium">{index + 1}. {question.prompt}</legend>
              {question.choices ? (
                <div className="mt-2 space-y-1.5">
                  {question.choices.map((choice) => (
                    <label key={choice} className="flex cursor-pointer items-start gap-2 rounded-lg border border-edge bg-background/40 px-3 py-2 text-sm">
                      <input type="radio" name={`${moduleSlug}-${question.objectiveId}`} value={choice} checked={answers[question.objectiveId] === choice} onChange={createCheckpointAnswerChangeHandler(question.objectiveId, setAnswers)} className="mt-0.5 accent-indigo-500" />
                      {choice}
                    </label>
                  ))}
                </div>
              ) : (
                <input value={answers[question.objectiveId] ?? ""} onChange={createCheckpointAnswerChangeHandler(question.objectiveId, setAnswers)} className="mt-2 w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm" />
              )}
            </fieldset>
          ))}
          <button onClick={() => void submit()} disabled={busy || questions.some((question) => !answers[question.objectiveId]?.trim())} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            Submit checkpoint
          </button>
        </div>
      )}
    </div>
  );
}
