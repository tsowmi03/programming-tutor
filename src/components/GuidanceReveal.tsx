"use client";

import { useState } from "react";
import { Code2, Lightbulb, Map, TriangleAlert } from "lucide-react";
import { MarkdownView } from "@/components/MarkdownView";
import type { GuidanceItem, GuidanceLevel } from "@/content/types";

const GUIDANCE_META: Record<
  GuidanceLevel,
  { label: string; icon: typeof Lightbulb; classes: string }
> = {
  nudge: {
    label: "Nudge",
    icon: Lightbulb,
    classes: "border-amber-500/25 bg-amber-500/5 text-amber-300",
  },
  strategy: {
    label: "Strategy",
    icon: Map,
    classes: "border-indigo-500/25 bg-indigo-500/5 text-indigo-300",
  },
  pitfall: {
    label: "Pitfall",
    icon: TriangleAlert,
    classes: "border-orange-500/25 bg-orange-500/5 text-orange-300",
  },
  pseudocode: {
    label: "Pseudocode",
    icon: Code2,
    classes: "border-emerald-500/25 bg-emerald-500/5 text-emerald-300",
  },
};

export function GuidanceReveal({
  guidance,
  emptyText = "No guidance yet.",
  compact = false,
  beginnerMode = false,
  onAllRevealed,
}: {
  guidance: GuidanceItem[];
  emptyText?: string;
  compact?: boolean;
  beginnerMode?: boolean;
  onAllRevealed?: () => void;
}) {
  const [revealed, setRevealed] = useState(0);

  if (guidance.length === 0) {
    return <p className="text-sm text-muted">{emptyText}</p>;
  }

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {!compact && (
        <p className="text-sm text-muted">
          Reveal guidance one step at a time, then return to the editor before
          opening the next step.
        </p>
      )}
      {guidance.map((item, index) => {
        const meta = GUIDANCE_META[item.level];
        const Icon = meta.icon;
        const beginnerLabel = {
          nudge: "Small hint",
          strategy: "A plan to try",
          pitfall: "Common mistake",
          pseudocode: "Steps in plain language",
        }[item.level];
        return index < revealed ? (
          <div
            key={index}
            className={`rounded-lg border ${
              compact ? "px-3 py-2 text-sm" : "p-4 text-sm leading-relaxed"
            } ${meta.classes}`}
          >
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
              <Icon className="h-3.5 w-3.5" />
              {beginnerMode ? beginnerLabel : meta.label} {index + 1}: {item.title}
            </p>
            <MarkdownView>{item.body}</MarkdownView>
          </div>
        ) : index === revealed ? (
          <button
            key={index}
            onClick={() => {
              const next = revealed + 1;
              setRevealed(next);
              if (next === guidance.length) onAllRevealed?.();
            }}
            className={
              compact
                ? "flex items-center gap-1.5 text-xs text-muted transition hover:text-amber-300"
                : "flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-edge py-3 text-sm text-muted transition hover:border-amber-500/40 hover:text-amber-300"
            }
          >
            <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            {beginnerMode
              ? `Show ${beginnerLabel.toLowerCase()}`
              : `Reveal ${item.title.toLowerCase()}`}
          </button>
        ) : null;
      })}
    </div>
  );
}
