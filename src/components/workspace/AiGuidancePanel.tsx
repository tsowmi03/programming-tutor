"use client";

import { useState } from "react";
import { Bug, Clock, Lightbulb, Map, Sparkles, Target } from "lucide-react";
import { MarkdownView } from "@/components/MarkdownView";
import type { AiGuidanceMode } from "@/lib/ai-guidance";
import type { JudgeOutcome } from "@/lib/judge/types";
import { ApiError, fetchJson } from "./shared";

export type AiGuidanceContext = {
  code: string;
  latestOutcome: JudgeOutcome | null;
  runError: string | null;
};

const AI_GUIDANCE_OPTIONS: {
  mode: AiGuidanceMode;
  label: string;
  icon: typeof Lightbulb;
}[] = [
  { mode: "nudge", label: "Nudge", icon: Lightbulb },
  { mode: "debug", label: "Debug", icon: Bug },
  { mode: "strategy", label: "Strategy", icon: Map },
  { mode: "edge_case", label: "Edge case", icon: Target },
];

export function AiGuidancePanel({
  contextKey,
  endpoint,
  getGuidanceContext,
  buildRequestBody,
}: {
  contextKey: string;
  endpoint: string;
  getGuidanceContext: () => AiGuidanceContext;
  buildRequestBody: (
    mode: AiGuidanceMode,
    context: AiGuidanceContext,
  ) => Record<string, unknown>;
}) {
  const [pendingMode, setPendingMode] = useState<AiGuidanceMode | null>(null);
  const [aiGuidance, setAiGuidance] = useState<{
    key: string;
    text: string;
  } | null>(null);
  const [aiError, setAiError] = useState<{
    key: string;
    text: string;
    limited: boolean;
  } | null>(null);

  const requestGuidance = async (mode: AiGuidanceMode) => {
    if (pendingMode) return;
    setPendingMode(mode);
    setAiError(null);
    try {
      const context = getGuidanceContext();
      const data = await fetchJson<{ guidance: string }>(endpoint, {
        method: "POST",
        body: JSON.stringify(buildRequestBody(mode, context)),
      });
      setAiGuidance({
        key: contextKey,
        text: data.guidance || "No guidance returned.",
      });
    } catch (err) {
      setAiError({
        key: contextKey,
        text: err instanceof Error ? err.message : String(err),
        limited: err instanceof ApiError && err.status === 429,
      });
    } finally {
      setPendingMode(null);
    }
  };

  const visibleError = aiError?.key === contextKey ? aiError : null;
  const visibleGuidance =
    aiGuidance?.key === contextKey ? aiGuidance.text : null;

  return (
    <section className="border-t border-edge pt-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-indigo-300" />
        <h3 className="text-sm font-semibold">Ask AI</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {AI_GUIDANCE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const loading = pendingMode === option.mode;
          return (
            <button
              key={option.mode}
              onClick={() => requestGuidance(option.mode)}
              disabled={pendingMode !== null}
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-edge bg-surface-raised px-2.5 py-2 text-xs font-semibold transition hover:border-indigo-400/50 hover:text-indigo-200 disabled:cursor-not-allowed disabled:opacity-55"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span>{loading ? "Asking..." : option.label}</span>
            </button>
          );
        })}
      </div>
      {visibleError && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${
            visibleError.limited
              ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
              : "border-rose-500/25 bg-rose-500/10 text-rose-300"
          }`}
        >
          {visibleError.limited && (
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          <p>{visibleError.text}</p>
        </div>
      )}
      {visibleGuidance && (
        <div className="mt-4 rounded-lg border border-indigo-500/25 bg-indigo-500/5 p-4 text-sm leading-relaxed">
          <MarkdownView>{visibleGuidance}</MarkdownView>
        </div>
      )}
    </section>
  );
}
