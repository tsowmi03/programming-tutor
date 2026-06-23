"use client";

import { memo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MinusCircle,
  EyeOff,
  Eye,
} from "lucide-react";
import type {
  FunctionSignature,
  JudgeOutcome,
  TestCase,
  TestResult,
} from "@/lib/judge/types";
import { formatInput } from "./shared";

type Phase = "idle" | "running" | "submitting";

const STATUS_META: Record<
  TestResult["status"],
  { icon: typeof CheckCircle2; classes: string; label: string }
> = {
  pass: { icon: CheckCircle2, classes: "text-emerald-400", label: "Passed" },
  fail: { icon: XCircle, classes: "text-rose-400", label: "Wrong answer" },
  error: { icon: AlertTriangle, classes: "text-orange-400", label: "Runtime error" },
  not_run: { icon: MinusCircle, classes: "text-zinc-500", label: "Not run" },
};

export const TestPanel = memo(function TestPanel({
  signature,
  visibleTests,
  hiddenTestCount,
  outcome,
  phase,
  errorMessage,
  showHiddenTestDetails,
  onShowHiddenTestDetailsChange,
}: {
  signature?: FunctionSignature;
  visibleTests: TestCase[];
  hiddenTestCount: number;
  outcome: JudgeOutcome | null;
  phase: Phase;
  errorMessage: string | null;
  showHiddenTestDetails: boolean;
  onShowHiddenTestDetailsChange: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState(0);

  if (phase !== "idle") {
    return (
      <div className="flex h-full items-center justify-center gap-3 text-sm text-muted">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-indigo-400" />
        {phase === "running"
          ? "Running sample tests…"
          : "Judging against all tests…"}
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="h-full overflow-y-auto p-4 panel-scroll">
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 text-sm text-orange-200">
          <p className="mb-1 font-semibold">Couldn&apos;t run your code</p>
          <p className="whitespace-pre-wrap font-mono text-xs">{errorMessage}</p>
        </div>
      </div>
    );
  }

  // Before any run: show the sample test cases.
  if (!outcome) {
    if (visibleTests.length === 0) {
      return (
        <div className="h-full overflow-y-auto p-4 panel-scroll">
          <div className="space-y-3">
            <HiddenTestSetting
              hiddenTestCount={hiddenTestCount}
              showDetails={showHiddenTestDetails}
              onChange={onShowHiddenTestDetailsChange}
            />
            <div className="rounded-lg border border-edge bg-surface/60 p-4 text-sm text-muted">
              No sample tests are shown for this exercise. Submit to run the
              hidden tests.
            </div>
          </div>
        </div>
      );
    }

    const test = visibleTests[Math.min(selected, visibleTests.length - 1)];
    return (
      <div className="flex h-full flex-col">
        <CaseChips
          count={visibleTests.length}
          selected={selected}
          onSelect={setSelected}
        />
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 panel-scroll">
          <HiddenTestSetting
            hiddenTestCount={hiddenTestCount}
            showDetails={showHiddenTestDetails}
            onChange={onShowHiddenTestDetailsChange}
          />
          <Field label="Input" value={formatInput(signature, test.input)} />
          <Field label="Expected" value={JSON.stringify(test.expected)} />
          {hiddenTestCount > 0 && (
            <p className="flex items-center gap-1.5 pt-1 text-xs text-muted">
              <EyeOff className="h-3.5 w-3.5" />
              {hiddenTestCount} hidden test{hiddenTestCount === 1 ? "" : "s"} run
              on submit
            </p>
          )}
        </div>
      </div>
    );
  }

  if (outcome.status === "compile_error") {
    return (
      <div className="h-full overflow-y-auto p-4 panel-scroll">
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4">
          <p className="mb-2 text-sm font-semibold text-rose-300">
            Compile error
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-rose-200/90">
            {outcome.compileOutput}
          </pre>
        </div>
      </div>
    );
  }

  const results = outcome.results;
  const result = results[Math.min(selected, results.length - 1)];
  if (!result) {
    return (
      <div className="h-full overflow-y-auto p-4 panel-scroll">
        <div className="rounded-lg border border-edge bg-surface/60 p-4 text-sm text-muted">
          No test result details were returned for this run.
        </div>
      </div>
    );
  }

  const test = visibleTests[result.index] as TestCase | undefined;
  const inputValue = result.input
    ? formatInput(signature, result.input)
    : test
      ? formatInput(signature, test.input)
      : null;
  const meta = STATUS_META[result.status];

  return (
    <div className="flex h-full flex-col">
      <CaseChips
        count={results.length}
        selected={Math.min(selected, results.length - 1)}
        onSelect={setSelected}
        results={results}
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 panel-scroll">
        <p className={`flex items-center gap-2 text-sm font-semibold ${meta.classes}`}>
          <meta.icon className="h-4 w-4" />
          {meta.label}
          {result.hidden && (
            <span className="flex items-center gap-1 text-xs font-normal text-muted">
              {result.input ? (
                <>
                  <Eye className="h-3 w-3" /> hidden test revealed
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" /> hidden test
                </>
              )}
            </span>
          )}
        </p>
        <HiddenTestSetting
          hiddenTestCount={hiddenTestCount}
          showDetails={showHiddenTestDetails}
          onChange={onShowHiddenTestDetailsChange}
        />
        {result.hidden && showHiddenTestDetails && !result.input && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
            Hidden details are enabled now. Submit again to include this hidden
            test&apos;s input, expected output, and your output in the result.
          </div>
        )}
        {result.hidden && !showHiddenTestDetails && !result.input && (
          <div className="rounded-lg border border-edge bg-surface/60 p-3 text-xs leading-relaxed text-muted">
            This is a hidden test. Turn on Reveal hidden details and submit
            again to see the exact failing case.
          </div>
        )}
        {inputValue && (
          <Field label="Input" value={inputValue} />
        )}
        {result.expected !== undefined && (
          <Field label="Expected" value={result.expected} />
        )}
        {result.got !== undefined && (
          <Field
            label="Your output"
            value={result.got}
            tone={result.status === "pass" ? "good" : "bad"}
          />
        )}
        {result.error && (
          <Field label="Error" value={result.error} tone="bad" mono />
        )}
        {result.stdout && <Field label="Your prints (stdout)" value={result.stdout} mono />}
      </div>
    </div>
  );
});

function HiddenTestSetting({
  hiddenTestCount,
  showDetails,
  onChange,
}: {
  hiddenTestCount: number;
  showDetails: boolean;
  onChange: (value: boolean) => void;
}) {
  if (hiddenTestCount <= 0) return null;

  return (
    <label className="flex flex-wrap items-center gap-2 rounded-lg border border-edge bg-surface/70 px-3 py-2 text-xs text-muted">
      <input
        type="checkbox"
        checked={showDetails}
        onChange={(event) => onChange(event.currentTarget.checked)}
        className="h-3.5 w-3.5 accent-indigo-500"
      />
      <span className="font-medium text-foreground">
        Reveal hidden details on submit
      </span>
      <span>
        {showDetails
          ? "On: hidden failures will show input, expected output, and your output."
          : "Off: hidden tests stay in challenge mode."}
      </span>
    </label>
  );
}

function CaseChips({
  count,
  selected,
  onSelect,
  results,
}: {
  count: number;
  selected: number;
  onSelect: (i: number) => void;
  results?: TestResult[];
}) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-edge px-4 py-2.5">
      {Array.from({ length: count }, (_, i) => {
        const r = results?.[i];
        const dot =
          r === undefined
            ? "bg-zinc-600"
            : r.status === "pass"
              ? "bg-emerald-400"
              : r.status === "fail"
                ? "bg-rose-400"
                : r.status === "error"
                  ? "bg-orange-400"
                  : "bg-zinc-600";
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
              selected === i
                ? "bg-surface-raised text-foreground ring-1 ring-edge"
                : "text-muted hover:bg-surface-raised/60"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            Case {i + 1}
            {r?.hidden && <EyeOff className="h-3 w-3 opacity-60" />}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  tone,
  mono,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
  mono?: boolean;
}) {
  const toneClass =
    tone === "good"
      ? "text-emerald-300"
      : tone === "bad"
        ? "text-rose-300"
        : "text-zinc-200";
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap rounded-lg bg-zinc-900/70 px-3 py-2 font-mono text-xs leading-relaxed ring-1 ring-edge ${toneClass} ${mono ? "" : ""}`}
      >
        {value}
      </pre>
    </div>
  );
}
