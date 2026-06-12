/** Supported languages and their Piston runtime / editor metadata. */

export const LANGUAGE_IDS = [
  "python",
  "javascript",
  "typescript",
  "java",
  "csharp",
  "c",
  "cpp",
] as const;
export type LanguageId = (typeof LANGUAGE_IDS)[number];

/**
 * The original four languages, which every code problem is guaranteed to ship
 * starter code and solutions for. The newer languages (typescript, csharp,
 * cpp) are optional per problem until backfilled; the UI only offers the
 * languages a problem actually has.
 */
export const CORE_LANGUAGE_IDS = [
  "python",
  "javascript",
  "java",
  "c",
] as const satisfies readonly LanguageId[];
export type CoreLanguageId = (typeof CORE_LANGUAGE_IDS)[number];

/** Per-language code map: the core four required, the rest optional. */
export type LanguageCodeMap = Record<CoreLanguageId, string> &
  Partial<Record<LanguageId, string>>;

export interface LanguageInfo {
  id: LanguageId;
  label: string;
  /** Piston runtime identifier and pinned version. */
  piston: { language: string; version: string };
  /** Monaco editor language id. */
  monaco: string;
  /** Source file name sent to Piston (Java requires Main.java). */
  fileName: string;
}

export const LANGUAGES: Record<LanguageId, LanguageInfo> = {
  python: {
    id: "python",
    label: "Python",
    piston: { language: "python", version: "3.10.0" },
    monaco: "python",
    fileName: "main.py",
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    piston: { language: "javascript", version: "18.15.0" },
    monaco: "javascript",
    fileName: "main.js",
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    // Piston compiles with a bare `tsc *.ts` and runs the emitted JS with
    // node, appending extensions itself — so the source is named "main" and
    // becomes main.ts -> main.js inside the sandbox.
    piston: { language: "typescript", version: "5.0.3" },
    monaco: "typescript",
    fileName: "main.ts",
  },
  java: {
    id: "java",
    label: "Java",
    piston: { language: "java", version: "15.0.2" },
    monaco: "java",
    fileName: "Main.java",
  },
  csharp: {
    id: "csharp",
    label: "C#",
    // Provided by Piston's "mono" package: csc compiles every .cs file and
    // mono runs the resulting executable.
    piston: { language: "csharp", version: "6.12.0" },
    monaco: "csharp",
    fileName: "Main.cs",
  },
  c: {
    id: "c",
    label: "C",
    piston: { language: "c", version: "10.2.0" },
    monaco: "c",
    fileName: "main.c",
  },
  cpp: {
    id: "cpp",
    label: "C++",
    // Same Piston package as C (gcc 10.2.0), compiled with -std=c++17.
    piston: { language: "c++", version: "10.2.0" },
    monaco: "cpp",
    fileName: "main.cpp",
  },
};

export function isLanguageId(value: string): value is LanguageId {
  return (LANGUAGE_IDS as readonly string[]).includes(value);
}
