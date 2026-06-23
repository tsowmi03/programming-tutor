"use client";

import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  Send,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { MarkdownView } from "@/components/MarkdownView";
import type { ProblemDetail, ProblemStatus } from "@/lib/problems";
import {
  WorkspaceHeader,
  type WorkspaceNavigation,
} from "./WorkspaceHeader";
import {
  celebrate,
  fetchJson,
  useMediaQuery,
  useStoredState,
} from "./shared";

interface SubmitResponse {
  submission: { id: string };
  modelAnswer: string;
  keyPoints: string[];
  marking: AiExplanationMarking | null;
  aiMarkingUnavailable: string | null;
}

interface AiExplanationMarking {
  score: 0 | 1 | 2;
  label: "Missed it" | "Partially there" | "Got it";
  feedback: string;
  coveredKeyPointIndexes: number[];
  missingKeyPointIndexes: number[];
  nextStep: string;
}

const SCORES = [
  { value: 0, label: "Missed it", classes: "border-rose-500/40 hover:bg-rose-500/10 text-rose-300" },
  { value: 1, label: "Partially", classes: "border-amber-500/40 hover:bg-amber-500/10 text-amber-300" },
  { value: 2, label: "Got it", classes: "border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300" },
];

const AI_SCORE_STYLES: Record<AiExplanationMarking["score"], string> = {
  0: "border-rose-500/35 bg-rose-500/10 text-rose-200",
  1: "border-amber-500/35 bg-amber-500/10 text-amber-200",
  2: "border-emerald-500/35 bg-emerald-500/10 text-emerald-200",
};

export function ExplanationWorkspace({
  problem,
  navigation,
}: {
  problem: ProblemDetail;
  navigation: WorkspaceNavigation;
}) {
  const [status, setStatus] = useState<ProblemStatus>(problem.status);
  const [answer, setAnswer, loaded] = useStoredState(
    `cc-answer-${problem.slug}`,
    "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState<SubmitResponse | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scored, setScored] = useState<number | null>(null);
  const compact = useMediaQuery("(max-width: 767px)");

  const submit = async () => {
    if (submitting || !answer.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetchJson<SubmitResponse>("/api/submissions", {
        method: "POST",
        body: JSON.stringify({
          kind: "explanation",
          slug: problem.slug,
          answerText: answer,
        }),
      });
      setReview(res);
      setChecked(new Set());
      setScored(null);
      if (res.marking?.score === 2) {
        if (status !== "solved") celebrate();
        setStatus("solved");
      } else if (status === "not_started") {
        setStatus("attempted");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const selfAssess = async (score: number) => {
    if (!review) return;
    setScored(score);
    try {
      await fetchJson("/api/submissions", {
        method: "PATCH",
        body: JSON.stringify({
          submissionId: review.submission.id,
          selfScore: score,
        }),
      });
      if (score === 2) {
        if (status !== "solved") celebrate();
        setStatus("solved");
      } else if (status === "not_started") {
        setStatus("attempted");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex h-full flex-col">
      <WorkspaceHeader
        title={problem.title}
        difficulty={problem.difficulty}
        category={problem.category}
        status={status}
        {...navigation}
      />

      <PanelGroup
        key={compact ? "compact" : "wide"}
        direction={compact ? "vertical" : "horizontal"}
        className="min-h-0 flex-1"
      >
        <Panel
          defaultSize={compact ? 38 : 45}
          minSize={compact ? 20 : 28}
          className="min-w-0"
        >
          <div className="h-full overflow-y-auto bg-surface p-5 panel-scroll">
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300 ring-1 ring-indigo-500/30">
              <Lightbulb className="h-3 w-3" />
              Concept check — write, then compare
            </p>
            <MarkdownView>{problem.description}</MarkdownView>
          </div>
        </Panel>

        <PanelResizeHandle
          className={
            compact
              ? "h-1.5 cursor-row-resize bg-edge transition hover:bg-indigo-500/60"
              : "w-1 cursor-col-resize bg-edge transition hover:bg-indigo-500/60"
          }
        />

        <Panel
          defaultSize={compact ? 62 : 55}
          minSize={compact ? 40 : 30}
          className="min-w-0"
        >
          <div className="flex h-full flex-col">
            {!review ? (
              <>
                <div className="flex min-h-11 shrink-0 items-center justify-between gap-3 border-b border-edge bg-surface px-4 py-2">
                  <span className="hidden min-w-0 truncate text-xs text-muted sm:block">
                    Explaining out loud is the test — write as if teaching someone.
                  </span>
                  <button
                    onClick={submit}
                    disabled={submitting || !answer.trim()}
                    className="flex items-center gap-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {submitting ? "Marking…" : "Submit answer"}
                  </button>
                </div>
                {loaded ? (
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your explanation here… (Markdown welcome)"
                    className="min-h-0 flex-1 resize-none bg-background p-5 font-mono text-[13px] leading-relaxed outline-none placeholder:text-zinc-600 panel-scroll"
                  />
                ) : (
                  <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted">
                    Loading draft…
                  </div>
                )}
                {error && (
                  <p className="border-t border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-300">
                    {error}
                  </p>
                )}
              </>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto p-5 panel-scroll">
                <section className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-muted">
                    Your answer
                  </h3>
                  <div className="whitespace-pre-wrap rounded-lg border border-edge bg-surface p-4 text-sm leading-relaxed">
                    {answer}
                  </div>
                </section>

                {review.marking && (
                  <section className="mb-6 rounded-xl border border-indigo-500/25 bg-indigo-500/5 p-4">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 text-sm font-semibold">
                        <Sparkles className="h-4 w-4 text-indigo-300" />
                        AI mark
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${AI_SCORE_STYLES[review.marking.score]}`}
                      >
                        {review.marking.label} ({review.marking.score}/2)
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-indigo-50">
                      {review.marking.feedback}
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                          Covered
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted">
                          {review.marking.coveredKeyPointIndexes.length > 0 ? (
                            review.marking.coveredKeyPointIndexes.map((index) => (
                              <li key={index}>{review.keyPoints[index]}</li>
                            ))
                          ) : (
                            <li>No key points clearly covered yet.</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
                          Keep working on
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted">
                          {review.marking.missingKeyPointIndexes.length > 0 ? (
                            review.marking.missingKeyPointIndexes.map((index) => (
                              <li key={index}>{review.keyPoints[index]}</li>
                            ))
                          ) : (
                            <li>No major missing key points.</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <p className="mt-4 rounded-lg border border-edge bg-background/50 p-3 text-sm text-muted">
                      Next step: {review.marking.nextStep}
                    </p>
                  </section>
                )}

                {!review.marking && review.aiMarkingUnavailable && (
                  <section className="mb-6 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{review.aiMarkingUnavailable}</p>
                  </section>
                )}

                <section className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold">
                    Check yourself — did you cover these?
                  </h3>
                  <div className="space-y-2">
                    {review.keyPoints.map((point, i) => (
                      <label
                        key={i}
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-edge bg-surface p-3 text-sm leading-relaxed transition hover:border-zinc-600"
                      >
                        <input
                          type="checkbox"
                          checked={checked.has(i)}
                          onChange={(e) => {
                            const next = new Set(checked);
                            if (e.target.checked) next.add(i);
                            else next.delete(i);
                            setChecked(next);
                          }}
                          className="mt-0.5 h-4 w-4 accent-emerald-500"
                        />
                        {point}
                      </label>
                    ))}
                  </div>
                </section>

                <section className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold">Model answer</h3>
                  <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/5 p-4">
                    <MarkdownView>{review.modelAnswer}</MarkdownView>
                  </div>
                </section>

                <section className="rounded-xl border border-edge bg-surface p-4">
                  {scored === null ? (
                    <>
                      <h3 className="mb-3 text-sm font-semibold">
                        {review.marking
                          ? "Your call - override the AI mark?"
                          : "Honest call - how did you do?"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {SCORES.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => selfAssess(s.value)}
                            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${s.classes}`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-muted">
                        Got it marks this problem solved. Be honest - it only
                        cheats your own revision queue.
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        Recorded.{" "}
                        {scored === 2
                          ? "Nice work — concept locked in."
                          : "Worth another pass in a few days."}
                      </p>
                      <button
                        onClick={() => setReview(null)}
                        className="flex items-center gap-1.5 text-xs text-indigo-300 transition hover:text-indigo-200"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Revise and resubmit
                      </button>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
