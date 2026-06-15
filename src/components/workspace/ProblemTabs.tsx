"use client";

import { memo, useEffect, useState } from "react";
import {
  BookOpen,
  Lightbulb,
  Lock,
  GraduationCap,
  History,
  ChevronDown,
} from "lucide-react";
import { MarkdownView } from "@/components/MarkdownView";
import { LANGUAGES, LANGUAGE_IDS, type LanguageId } from "@/lib/judge/languages";
import type { ProblemDetail, ProblemStatus } from "@/lib/problems";
import { fetchJson } from "./shared";

type TabId = "description" | "hints" | "solution" | "submissions";

interface SolutionPayload {
  solutions: Partial<Record<LanguageId, string>> | null;
  editorial: string | null;
}

export interface SubmissionRow {
  id: string;
  kind: string;
  language: string | null;
  code: string | null;
  answerText: string | null;
  status: string;
  selfScore: number | null;
  passedCount: number | null;
  totalCount: number | null;
  createdAt: string;
}

export const ProblemTabs = memo(function ProblemTabs({
  problem,
  status,
  language,
  submissionsVersion,
  onRestoreCode,
}: {
  problem: ProblemDetail;
  status: ProblemStatus;
  language: LanguageId;
  submissionsVersion: number;
  onRestoreCode: (code: string, language: LanguageId) => void;
}) {
  const [tab, setTab] = useState<TabId>("description");

  const tabs: { id: TabId; label: string; icon: typeof BookOpen }[] = [
    { id: "description", label: "Description", icon: BookOpen },
    { id: "hints", label: `Hints (${problem.hints.length})`, icon: Lightbulb },
    { id: "solution", label: "Solution", icon: GraduationCap },
    { id: "submissions", label: "Submissions", icon: History },
  ];

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="tab-scroll flex shrink-0 items-center gap-1 overflow-x-auto border-b border-edge px-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13px] font-medium transition ${
              tab === t.id
                ? "border-indigo-400 text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
            {t.id === "solution" && status !== "solved" && (
              <Lock className="h-3 w-3 opacity-60" />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 panel-scroll">
        {tab === "description" && <MarkdownView>{problem.description}</MarkdownView>}
        {tab === "hints" && <HintsTab hints={problem.hints} />}
        {tab === "solution" && (
          <SolutionTab slug={problem.slug} status={status} language={language} />
        )}
        {tab === "submissions" && (
          <SubmissionsTab
            slug={problem.slug}
            version={submissionsVersion}
            onRestoreCode={onRestoreCode}
          />
        )}
      </div>
    </div>
  );
});

function HintsTab({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0);
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Stuck? Reveal hints one at a time — try to get as far as you can after
        each before peeking at the next.
      </p>
      {hints.map((hint, i) =>
        i < revealed ? (
          <div
            key={i}
            className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-4 text-sm leading-relaxed"
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
              Hint {i + 1}
            </p>
            <MarkdownView>{hint}</MarkdownView>
          </div>
        ) : i === revealed ? (
          <button
            key={i}
            onClick={() => setRevealed(revealed + 1)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-edge py-3 text-sm text-muted transition hover:border-amber-500/40 hover:text-amber-300"
          >
            <Lightbulb className="h-4 w-4" />
            Reveal hint {i + 1}
          </button>
        ) : null,
      )}
    </div>
  );
}

function SolutionTab({
  slug,
  status,
  language,
}: {
  slug: string;
  status: ProblemStatus;
  language: LanguageId;
}) {
  const [manualUnlock, setManualUnlock] = useState(false);
  const [data, setData] = useState<SolutionPayload | null>(null);
  const [solutionLang, setSolutionLang] = useState<LanguageId>(language);
  const [error, setError] = useState<string | null>(null);
  const unlocked = manualUnlock || status === "solved";

  useEffect(() => {
    if (!unlocked || data) return;
    fetchJson<SolutionPayload>(`/api/problems/${slug}/solution`)
      .then(setData)
      .catch((e) => setError(e.message));
  }, [unlocked, data, slug]);

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <Lock className="h-8 w-8 text-zinc-600" />
        <div>
          <p className="font-medium">The solution is waiting for you</p>
          <p className="mx-auto mt-1 max-w-xs text-sm text-muted">
            You&apos;ll learn far more by wrestling with the problem first. It
            unlocks automatically when you solve it.
          </p>
        </div>
        <button
          onClick={() => setManualUnlock(true)}
          className="text-xs text-muted underline-offset-2 transition hover:text-foreground hover:underline"
        >
          I&apos;ve genuinely tried — show me anyway
        </button>
      </div>
    );
  }

  if (error) return <p className="text-sm text-rose-300">{error}</p>;
  if (!data) return <p className="text-sm text-muted">Loading solution…</p>;

  // Older problems may not have solutions in every language yet.
  const solutionLangs = LANGUAGE_IDS.filter(
    (id) => data.solutions?.[id] != null,
  );
  const shownLang = solutionLangs.includes(solutionLang)
    ? solutionLang
    : (solutionLangs[0] ?? "python");

  return (
    <div className="space-y-6">
      {data.editorial && <MarkdownView>{data.editorial}</MarkdownView>}
      {data.solutions && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Reference solution</h3>
            <select
              value={shownLang}
              onChange={(e) => setSolutionLang(e.target.value as LanguageId)}
              className="rounded-md border border-edge bg-surface-raised px-2 py-1 text-xs outline-none"
              aria-label="Solution language"
            >
              {solutionLangs.map((id) => (
                <option key={id} value={id}>
                  {LANGUAGES[id].label}
                </option>
              ))}
            </select>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-edge bg-zinc-900/80 p-4 font-mono text-xs leading-relaxed">
            {data.solutions[shownLang]}
          </pre>
        </div>
      )}
    </div>
  );
}

const STATUS_LABELS: Record<string, { label: string; classes: string }> = {
  passed: { label: "Accepted", classes: "text-emerald-400" },
  failed: { label: "Wrong answer", classes: "text-rose-400" },
  error: { label: "Runtime error", classes: "text-orange-400" },
  compile_error: { label: "Compile error", classes: "text-rose-400" },
  self_assessed: { label: "Self-assessed", classes: "text-indigo-300" },
};

function SubmissionsTab({
  slug,
  version,
  onRestoreCode,
}: {
  slug: string;
  version: number;
  onRestoreCode: (code: string, language: LanguageId) => void;
}) {
  const [rows, setRows] = useState<SubmissionRow[] | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ submissions: SubmissionRow[] }>(
      `/api/problems/${slug}/submissions`,
    )
      .then((d) => setRows(d.submissions))
      .catch(() => setRows([]));
  }, [slug, version]);

  if (!rows) return <p className="text-sm text-muted">Loading…</p>;
  if (rows.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        No submissions yet — your attempts will appear here.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {rows.map((row) => {
        const meta = STATUS_LABELS[row.status] ?? {
          label: row.status,
          classes: "text-muted",
        };
        const isOpen = expanded === row.id;
        return (
          <div key={row.id} className="rounded-lg border border-edge">
            <button
              onClick={() => setExpanded(isOpen ? null : row.id)}
              className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${meta.classes}`}>
                  {meta.label}
                </span>
                {row.passedCount !== null && (
                  <span className="text-xs text-muted">
                    {row.passedCount}/{row.totalCount} tests
                  </span>
                )}
                {row.language && (
                  <span className="rounded bg-surface-raised px-1.5 py-0.5 text-[11px] text-muted">
                    {LANGUAGES[row.language as LanguageId]?.label ?? row.language}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                {new Date(row.createdAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>
            {isOpen && (row.code || row.answerText) && (
              <div className="border-t border-edge p-3">
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded bg-zinc-900/70 p-3 font-mono text-xs leading-relaxed panel-scroll">
                  {row.code ?? row.answerText}
                </pre>
                {row.code && row.language && (
                  <button
                    onClick={() =>
                      onRestoreCode(row.code!, row.language as LanguageId)
                    }
                    className="mt-2 text-xs text-indigo-300 transition hover:text-indigo-200"
                  >
                    Restore this code to the editor
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
