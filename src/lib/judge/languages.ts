/** Supported languages and their Piston runtime / editor metadata. */

export const LANGUAGE_IDS = ["python", "javascript", "java", "c"] as const;
export type LanguageId = (typeof LANGUAGE_IDS)[number];

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
  java: {
    id: "java",
    label: "Java",
    piston: { language: "java", version: "15.0.2" },
    monaco: "java",
    fileName: "Main.java",
  },
  c: {
    id: "c",
    label: "C",
    piston: { language: "c", version: "10.2.0" },
    monaco: "c",
    fileName: "main.c",
  },
};

export function isLanguageId(value: string): value is LanguageId {
  return (LANGUAGE_IDS as readonly string[]).includes(value);
}
