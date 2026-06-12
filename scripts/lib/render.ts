/**
 * Renders a validated ProblemDef into a reviewable TypeScript module that
 * matches the hand-authored style under src/content/problems. Long markdown /
 * code fields become template literals; structured data (signature, test
 * cases) is emitted as pretty-printed object literals. The module
 * `export default`s the problem so build-generated-index.ts can pick it up.
 */

import type {
  CodeProblemDef,
  ExplanationProblemDef,
  ProblemDef,
} from "../../src/content/types";

/** Escape a string for safe embedding inside a backtick template literal. */
function tmpl(value: string): string {
  return "`" + value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
}

/** A JS string literal using double quotes. */
function str(value: string): string {
  return JSON.stringify(value);
}

/** Render a string[] as a multi-line array of template literals. */
function renderStringArray(items: string[]): string {
  if (items.length === 0) return "[]";
  const body = items.map((h) => `    ${tmpl(h)},`).join("\n");
  return `[\n${body}\n  ]`;
}

/** Render a Record<lang, code> as an object of template literals. */
function renderCodeMap(map: Record<string, string>): string {
  const body = Object.entries(map)
    .map(([lang, code]) => `    ${lang}: ${tmpl(code)},`)
    .join("\n");
  return `{\n${body}\n  }`;
}

/**
 * Render structured data (signature, testCases) via JSON, then lightly
 * pretty-print so it reads as an object literal rather than one long line.
 * JSON output is valid TS for plain data, so this is safe.
 */
function renderData(value: unknown, indent = "  "): string {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line, i) => (i === 0 ? line : indent + line))
    .join("\n");
}

function renderCode(def: CodeProblemDef): string {
  return `import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: ${str(def.slug)},
  title: ${str(def.title)},
  difficulty: ${str(def.difficulty)},
  category: ${str(def.category)},
  order: ${def.order},
  description: ${tmpl(def.description)},
  hints: ${renderStringArray(def.hints)},
  signature: ${renderData(def.signature)},
  testCases: ${renderData(def.testCases)},
  starterCode: ${renderCodeMap(def.starterCode)},
  solutions: ${renderCodeMap(def.solutions)},
  editorial: ${tmpl(def.editorial)},
};

export default problem;
`;
}

function renderExplanation(def: ExplanationProblemDef): string {
  return `import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: ${str(def.slug)},
  title: ${str(def.title)},
  difficulty: ${str(def.difficulty)},
  category: ${str(def.category)},
  order: ${def.order},
  description: ${tmpl(def.description)},
  hints: ${renderStringArray(def.hints)},
  modelAnswer: ${tmpl(def.modelAnswer)},
  keyPoints: ${renderStringArray(def.keyPoints)},
};

export default problem;
`;
}

export function renderProblemModule(def: ProblemDef): string {
  return def.type === "code" ? renderCode(def) : renderExplanation(def);
}
