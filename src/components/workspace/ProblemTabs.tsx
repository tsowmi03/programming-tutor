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
import { GuidanceReveal } from "@/components/GuidanceReveal";
import { LANGUAGES, LANGUAGE_IDS, type LanguageId } from "@/lib/judge/languages";
import type { ProblemDetail, ProblemStatus } from "@/lib/problems";
import {
  AiGuidancePanel,
  type AiGuidanceContext,
} from "./AiGuidancePanel";
import { fetchJson } from "./shared";

type TabId = "description" | "guidance" | "solution" | "submissions" | "journal";

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
  aiScore: number | null;
  aiFeedback: string | null;
  aiMarking: string | null;
  passedCount: number | null;
  totalCount: number | null;
  createdAt: string;
}

interface MistakeNoteRow {
  id: string;
  category: string;
  note: string;
  submissionId: string | null;
  createdAt: string;
}

const MISTAKE_CATEGORIES = [
  { id: "edge_case", label: "Edge case" },
  { id: "wrong_data_structure", label: "Wrong data structure" },
  { id: "off_by_one", label: "Off-by-one" },
  { id: "complexity", label: "Complexity" },
  { id: "syntax", label: "Syntax" },
  { id: "misread_prompt", label: "Misread prompt" },
  { id: "other", label: "Other" },
] as const;

const MISTAKE_CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  MISTAKE_CATEGORIES.map((category) => [category.id, category.label]),
);

export const ProblemTabs = memo(function ProblemTabs({
  problem,
  status,
  language,
  submissionsVersion,
  onRestoreCode,
  getGuidanceContext,
  studyMode,
}: {
  problem: ProblemDetail;
  status: ProblemStatus;
  language: LanguageId;
  submissionsVersion: number;
  onRestoreCode: (code: string, language: LanguageId) => void;
  getGuidanceContext: () => AiGuidanceContext;
  studyMode?: "interview" | "no_hints";
}) {
  const [tab, setTab] = useState<TabId>("description");
  const guidanceLocked =
    studyMode === "interview" ||
    (studyMode === "no_hints" && status === "not_started");

  const activeTab = guidanceLocked && tab === "guidance" ? "description" : tab;

  const tabs: { id: TabId; label: string; icon: typeof BookOpen }[] = [
    { id: "description", label: "Description", icon: BookOpen },
    ...(!guidanceLocked
      ? [
          {
            id: "guidance" as const,
            label: `Guidance (${problem.guidance.length})`,
            icon: Lightbulb,
          },
        ]
      : []),
    { id: "solution", label: "Solution", icon: GraduationCap },
    { id: "submissions", label: "Submissions", icon: History },
    { id: "journal", label: "Journal", icon: BookOpen },
  ];

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="tab-scroll flex shrink-0 items-center gap-1 overflow-x-auto border-b border-edge px-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-[13px] font-medium transition ${
              activeTab === t.id
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
        {activeTab === "description" && <MarkdownView>{problem.description}</MarkdownView>}
        {activeTab === "guidance" && (
          <GuidanceTab
            slug={problem.slug}
            guidance={problem.guidance}
            language={language}
            getGuidanceContext={getGuidanceContext}
          />
        )}
        {activeTab === "solution" && (
          <SolutionTab slug={problem.slug} status={status} language={language} />
        )}
        {activeTab === "submissions" && (
          <SubmissionsTab
            slug={problem.slug}
            version={submissionsVersion}
            onRestoreCode={onRestoreCode}
          />
        )}
        {activeTab === "journal" && <MistakeJournalTab slug={problem.slug} />}
      </div>
    </div>
  );
});

function GuidanceTab({
  slug,
  guidance,
  language,
  getGuidanceContext,
}: {
  slug: string;
  guidance: ProblemDetail["guidance"];
  language: LanguageId;
  getGuidanceContext: () => AiGuidanceContext;
}) {
  const contextKey = `${slug}:${language}`;

  return (
    <div className="space-y-6">
      <GuidanceReveal
        guidance={guidance}
        emptyText="No guidance for this problem yet."
      />

      <AiGuidancePanel
        contextKey={contextKey}
        endpoint={`/api/problems/${encodeURIComponent(slug)}/guidance`}
        getGuidanceContext={getGuidanceContext}
        buildRequestBody={(mode, context) => ({
          language,
          mode,
          code: context.code,
          latestOutcome: context.latestOutcome,
          runError: context.runError,
        })}
      />
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
  ai_assessed: { label: "AI marked", classes: "text-indigo-300" },
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
                {row.aiScore !== null && (
                  <span className="text-xs text-muted">AI {row.aiScore}/2</span>
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
                {row.aiFeedback && (
                  <p className="mt-2 rounded border border-indigo-500/20 bg-indigo-500/5 p-3 text-sm leading-relaxed text-indigo-100">
                    {row.aiFeedback}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MistakeJournalTab({ slug }: { slug: string }) {
  const [rows, setRows] = useState<MistakeNoteRow[] | null>(null);
  const [category, setCategory] = useState<(typeof MISTAKE_CATEGORIES)[number]["id"]>(
    "edge_case",
  );
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<{ notes: MistakeNoteRow[] }>(`/api/problems/${slug}/mistakes`)
      .then((data) => setRows(data.notes))
      .catch((err) => {
        setRows([]);
        setError(err instanceof Error ? err.message : String(err));
      });
  }, [slug]);

  const saveNote = async () => {
    if (saving || !note.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const data = await fetchJson<{ note: MistakeNoteRow }>(
        `/api/problems/${slug}/mistakes`,
        {
          method: "POST",
          body: JSON.stringify({ category, note }),
        },
      );
      setRows((current) => [data.note, ...(current ?? [])]);
      setNote("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-edge bg-background/40 p-4">
        <h3 className="text-sm font-semibold">Record the mistake</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Keep the note short and specific so it is useful before your next
          retry.
        </p>
        <div className="mt-4 grid gap-3">
          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.currentTarget.value as (typeof MISTAKE_CATEGORIES)[number]["id"],
              )
            }
            className="rounded-md border border-edge bg-surface-raised px-3 py-2 text-sm outline-none transition focus:border-indigo-500/60"
            aria-label="Mistake category"
          >
            {MISTAKE_CATEGORIES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <textarea
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            placeholder="What should you watch for next time?"
            className="min-h-24 resize-y rounded-md border border-edge bg-background px-3 py-2 text-sm leading-relaxed outline-none placeholder:text-zinc-600 focus:border-indigo-500/60"
          />
          <div className="flex items-center justify-between gap-3">
            {error ? (
              <p className="text-xs text-rose-300">{error}</p>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={saveNote}
              disabled={saving || !note.trim()}
              className="rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save note"}
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold">Previous notes</h3>
        {!rows ? (
          <p className="text-sm text-muted">Loading notes...</p>
        ) : rows.length === 0 ? (
          <p className="rounded-lg border border-edge bg-background/40 p-4 text-sm text-muted">
            No notes yet.
          </p>
        ) : (
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.id} className="rounded-lg border border-edge p-3">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded bg-surface-raised px-1.5 py-0.5 text-[11px] font-medium text-indigo-200">
                    {MISTAKE_CATEGORY_LABELS[row.category] ?? row.category}
                  </span>
                  <span className="text-[11px] text-muted">
                    {new Date(row.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                  {row.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
