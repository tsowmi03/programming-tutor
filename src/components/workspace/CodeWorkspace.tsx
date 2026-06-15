"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Play, Send, RotateCcw, PartyPopper } from "lucide-react";
import type { JudgeOutcome } from "@/lib/judge/types";
import { LANGUAGES, LANGUAGE_IDS, type LanguageId } from "@/lib/judge/languages";
import type { ProblemDetail, ProblemStatus } from "@/lib/problems";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { TestPanel } from "./TestPanel";
import { ProblemTabs } from "./ProblemTabs";
import {
  celebrate,
  fetchJson,
  useMediaQuery,
  useStoredState,
} from "./shared";

type Phase = "idle" | "running" | "submitting";

export function CodeWorkspace({ problem }: { problem: ProblemDetail }) {
  const [status, setStatus] = useState<ProblemStatus>(problem.status);
  const [language, setLanguage, langLoaded] = useStoredState(
    `cc-lang-${problem.slug}`,
    "python",
  );
  // Only offer languages this problem has starter code for (newer languages
  // are backfilled per problem and may be missing on some).
  const availableLangs = useMemo(() => {
    const available = LANGUAGE_IDS.filter(
      (id) => problem.starterCode?.[id] != null,
    );
    return available.length > 0 ? available : LANGUAGE_IDS;
  }, [problem.starterCode]);
  const lang = (availableLangs as readonly string[]).includes(language)
    ? (language as LanguageId)
    : "python";
  const starter = problem.starterCode?.[lang] ?? "";
  const [code, setCode, codeLoaded] = useStoredState(
    `cc-code-${problem.slug}-${lang}`,
    starter,
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [outcome, setOutcome] = useState<JudgeOutcome | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [justSolved, setJustSolved] = useState(false);
  const [submissionsVersion, setSubmissionsVersion] = useState(0);
  const busy = phase !== "idle";
  const compact = useMediaQuery("(max-width: 767px)");

  const run = useCallback(async () => {
    if (busy) return;
    setPhase("running");
    setRunError(null);
    setOutcome(null);
    setJustSolved(false);
    try {
      const { outcome } = await fetchJson<{ outcome: JudgeOutcome }>(
        "/api/run",
        {
          method: "POST",
          body: JSON.stringify({ slug: problem.slug, language: lang, code }),
        },
      );
      setOutcome(outcome);
    } catch (err) {
      setRunError(err instanceof Error ? err.message : String(err));
    } finally {
      setPhase("idle");
    }
  }, [busy, code, lang, problem.slug]);

  const submit = useCallback(async () => {
    if (busy) return;
    setPhase("submitting");
    setRunError(null);
    setOutcome(null);
    setJustSolved(false);
    try {
      const { outcome } = await fetchJson<{ outcome: JudgeOutcome }>(
        "/api/submissions",
        {
          method: "POST",
          body: JSON.stringify({
            kind: "code",
            slug: problem.slug,
            language: lang,
            code,
          }),
        },
      );
      setOutcome(outcome);
      setSubmissionsVersion((v) => v + 1);
      if (outcome.status === "passed") {
        const firstSolve = status !== "solved";
        setStatus("solved");
        setJustSolved(true);
        if (firstSolve) celebrate();
      } else if (status === "not_started") {
        setStatus("attempted");
      }
    } catch (err) {
      setRunError(err instanceof Error ? err.message : String(err));
    } finally {
      setPhase("idle");
    }
  }, [busy, code, lang, problem.slug, status]);

  // Cmd/Ctrl+Enter runs the sample tests.
  const runRef = useRef(run);
  useEffect(() => {
    runRef.current = run;
  }, [run]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        runRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const resetCode = () => {
    if (
      window.confirm("Replace your code with the starter code for this language?")
    ) {
      setCode(starter);
    }
  };

  const restoreCode = useCallback(
    (restored: string, restoredLang: LanguageId) => {
      setLanguage(restoredLang);
      if (restoredLang === lang) setCode(restored);
      else {
        // Defer setting code until the language (and storage key) flips.
        window.localStorage.setItem(
          `cc-code-${problem.slug}-${restoredLang}`,
          restored,
        );
      }
    },
    [lang, problem.slug, setCode, setLanguage],
  );

  const editorReady = langLoaded && codeLoaded;
  const monacoOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      fontSize: 13.5,
      fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
      scrollBeyondLastLine: false,
      padding: { top: 12 },
      tabSize: lang === "python" ? 4 : 2,
      automaticLayout: true,
      renderLineHighlight: "none" as const,
      scrollbar: { verticalScrollbarSize: 8 },
    }),
    [lang],
  );

  return (
    <div className="flex h-full flex-col">
      <WorkspaceHeader
        title={problem.title}
        difficulty={problem.difficulty}
        category={problem.category}
        status={status}
      />

      {justSolved && (
        <div className="flex shrink-0 items-center gap-2 border-b border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
          <PartyPopper className="h-4 w-4" />
          Accepted — all {outcome?.totalCount} tests passed. The Solution tab is
          unlocked; compare approaches!
        </div>
      )}

      <PanelGroup
        key={compact ? "compact" : "wide"}
        direction={compact ? "vertical" : "horizontal"}
        className="min-h-0 flex-1"
      >
        <Panel
          defaultSize={compact ? 36 : 42}
          minSize={compact ? 20 : 25}
          className="min-w-0"
        >
          <ProblemTabs
            problem={problem}
            status={status}
            language={lang}
            submissionsVersion={submissionsVersion}
            onRestoreCode={restoreCode}
          />
        </Panel>

        <PanelResizeHandle
          className={
            compact
              ? "h-1.5 cursor-row-resize bg-edge transition hover:bg-indigo-500/60"
              : "w-1 cursor-col-resize bg-edge transition hover:bg-indigo-500/60"
          }
        />

        <Panel
          defaultSize={compact ? 64 : 58}
          minSize={compact ? 40 : 30}
          className="min-w-0"
        >
          <PanelGroup direction="vertical">
            <Panel defaultSize={62} minSize={25} className="flex min-h-0 flex-col">
              {/* Editor toolbar */}
              <div className="flex h-11 shrink-0 items-center gap-2 border-b border-edge bg-surface px-3">
                <select
                  value={lang}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-md border border-edge bg-surface-raised px-2.5 py-1.5 text-xs font-medium outline-none transition focus:border-indigo-500/60"
                  aria-label="Language"
                >
                  {availableLangs.map((id) => (
                    <option key={id} value={id}>
                      {LANGUAGES[id].label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={resetCode}
                  title="Reset to starter code"
                  className="rounded-md p-1.5 text-muted transition hover:bg-surface-raised hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden text-[11px] text-muted md:block">
                    ⌘⏎ to run
                  </span>
                  <button
                    onClick={run}
                    disabled={busy}
                    className="flex items-center gap-1.5 rounded-md border border-edge bg-surface-raised px-3 py-1.5 text-xs font-semibold transition hover:border-zinc-600 disabled:opacity-50"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Run
                  </button>
                  <button
                    onClick={submit}
                    disabled={busy}
                    className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Submit
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1">
                {editorReady ? (
                  <Editor
                    language={LANGUAGES[lang].monaco}
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
            </Panel>

            <PanelResizeHandle className="h-1 bg-edge transition hover:bg-indigo-500/60" />

            <Panel defaultSize={38} minSize={15} className="min-h-0 bg-background">
              <TestPanel
                signature={problem.signature}
                visibleTests={problem.visibleTests ?? []}
                hiddenTestCount={problem.hiddenTestCount ?? 0}
                outcome={outcome}
                phase={phase}
                errorMessage={runError}
              />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
