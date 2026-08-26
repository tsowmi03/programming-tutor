"use client";

import { useState } from "react";
import { CheckCircle2, Send, XCircle } from "lucide-react";
import { MarkdownView } from "@/components/MarkdownView";
import { fetchJson } from "@/components/workspace/shared";
import type { ClientKnowledgeCheck } from "./types";

export function KnowledgeCheckWidget({
  courseSlug,
  lessonSlug,
  check,
  initialSolved,
  onSolvedChange,
}: {
  courseSlug: string;
  lessonSlug: string;
  check: ClientKnowledgeCheck;
  initialSolved: boolean;
  onSolvedChange: (activityId: string, solved: boolean) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(initialSolved);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  const submit = async () => {
    if (busy || !answer.trim()) return;
    setBusy(true);
    try {
      const next = await fetchJson<{ correct: boolean; explanation: string }>(
        "/api/courses/check",
        {
          method: "POST",
          body: JSON.stringify({
            courseSlug,
            lessonSlug,
            activityId: check.id,
            answer,
          }),
        },
      );
      setResult(next);
      if (next.correct && !solved) {
        setSolved(true);
        onSolvedChange(check.id, true);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      className={`my-6 rounded-xl border p-4 ${
        solved ? "border-emerald-500/40 bg-emerald-500/5" : "border-edge bg-surface"
      }`}
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        {solved ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/15 text-[11px] text-indigo-300">
            ?
          </span>
        )}
        Check your understanding
      </div>
      <div className="mt-3 text-sm">
        <MarkdownView>{check.prompt}</MarkdownView>
      </div>

      {check.choices ? (
        <div className="mt-3 space-y-2">
          {check.choices.map((choice) => (
            <label key={choice} className="flex cursor-pointer items-start gap-2 rounded-lg border border-edge px-3 py-2 text-sm hover:bg-surface-raised">
              <input
                type="radio"
                name={`${lessonSlug}-${check.id}`}
                value={choice}
                checked={answer === choice}
                onChange={(event) => setAnswer(event.currentTarget.value)}
                className="mt-0.5 accent-indigo-500"
              />
              {choice}
            </label>
          ))}
        </div>
      ) : (
        <input
          value={answer}
          onChange={(event) => setAnswer(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void submit();
          }}
          placeholder="Type your answer"
          className="mt-3 w-full rounded-lg border border-edge bg-background px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
      )}

      <button
        onClick={() => void submit()}
        disabled={busy || !answer.trim()}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        Check answer
      </button>

      {result && (
        <div className={`mt-3 rounded-lg border p-3 text-sm ${result.correct ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-rose-500/30 bg-rose-500/10 text-rose-200"}`}>
          <p className="flex items-center gap-1.5 font-semibold">
            {result.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {result.correct ? "Correct" : "Not yet"}
          </p>
          <p className="mt-1 leading-relaxed">{result.explanation}</p>
        </div>
      )}
    </section>
  );
}
