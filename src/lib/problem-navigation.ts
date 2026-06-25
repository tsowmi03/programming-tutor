import { CATEGORY_LIST } from "@/content/categories";
import type { CategoryId, Difficulty } from "@/content/types";
import type { ProblemStatus, ProblemSummary } from "@/lib/problems";

export interface ProblemSequenceParams {
  category?: CategoryId;
  difficulty?: Difficulty;
  type?: ProblemSummary["type"];
  status?: ProblemStatus;
  query?: string;
  shuffle?: string;
  queue?: "review";
  mode?: "interview" | "no_hints";
  session?: "review10" | "weak_topic" | "timed_interview" | "no_hints";
  limit?: number;
  timerMinutes?: number;
}

export interface ProblemAdjacent {
  previous: ProblemSummary | null;
  next: ProblemSummary | null;
  position: number;
  total: number;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

const DIFFICULTIES = new Set<Difficulty>(["easy", "medium", "hard"]);
const TYPES = new Set<ProblemSummary["type"]>(["code", "explanation"]);
const STATUSES = new Set<ProblemStatus>([
  "not_started",
  "attempted",
  "solved",
]);
const STUDY_MODES = new Set<NonNullable<ProblemSequenceParams["mode"]>>([
  "interview",
  "no_hints",
]);
const STUDY_SESSIONS = new Set<NonNullable<ProblemSequenceParams["session"]>>([
  "review10",
  "weak_topic",
  "timed_interview",
  "no_hints",
]);
const MAX_SEQUENCE_LIMIT = 50;
const MAX_TIMER_MINUTES = 180;
const CATEGORY_ORDER = new Map(
  CATEGORY_LIST.map((category, index) => [category.id, index]),
);

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseBoundedInt(
  value: string | undefined,
  max: number,
): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return undefined;
  return Math.min(parsed, max);
}

export function parseProblemSequenceParams(
  raw: RawSearchParams,
): ProblemSequenceParams {
  const category = firstValue(raw.category);
  const difficulty = firstValue(raw.difficulty);
  const type = firstValue(raw.type);
  const status = firstValue(raw.status);
  const query = firstValue(raw.q)?.trim();
  const shuffle = firstValue(raw.shuffle)?.trim();
  const queue = firstValue(raw.queue)?.trim();
  const mode = firstValue(raw.mode)?.trim();
  const session = firstValue(raw.session)?.trim();
  const limit = parseBoundedInt(firstValue(raw.limit)?.trim(), MAX_SEQUENCE_LIMIT);
  const timerMinutes = parseBoundedInt(
    firstValue(raw.timer)?.trim(),
    MAX_TIMER_MINUTES,
  );

  return {
    category: CATEGORY_ORDER.has(category as CategoryId)
      ? (category as CategoryId)
      : undefined,
    difficulty: DIFFICULTIES.has(difficulty as Difficulty)
      ? (difficulty as Difficulty)
      : undefined,
    type: TYPES.has(type as ProblemSummary["type"])
      ? (type as ProblemSummary["type"])
      : undefined,
    status: STATUSES.has(status as ProblemStatus)
      ? (status as ProblemStatus)
      : undefined,
    query: query || undefined,
    shuffle: shuffle ? shuffle.slice(0, 100) : undefined,
    queue: queue === "review" ? "review" : undefined,
    mode: STUDY_MODES.has(mode as NonNullable<ProblemSequenceParams["mode"]>)
      ? (mode as NonNullable<ProblemSequenceParams["mode"]>)
      : undefined,
    session: STUDY_SESSIONS.has(
      session as NonNullable<ProblemSequenceParams["session"]>,
    )
      ? (session as NonNullable<ProblemSequenceParams["session"]>)
      : undefined,
    limit,
    timerMinutes,
  };
}

export function buildProblemSequenceQuery(
  params: ProblemSequenceParams,
): string {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.difficulty) query.set("difficulty", params.difficulty);
  if (params.type) query.set("type", params.type);
  if (params.status) query.set("status", params.status);
  if (params.query) query.set("q", params.query);
  if (params.shuffle) query.set("shuffle", params.shuffle);
  if (params.queue) query.set("queue", params.queue);
  if (params.mode) query.set("mode", params.mode);
  if (params.session) query.set("session", params.session);
  if (params.limit) query.set("limit", String(params.limit));
  if (params.timerMinutes) query.set("timer", String(params.timerMinutes));
  return query.toString();
}

export function buildProblemsHref(params: ProblemSequenceParams): string {
  if (params.queue === "review") return "/review";
  const query = buildProblemSequenceQuery({ ...params, shuffle: undefined });
  return query ? `/problems?${query}` : "/problems";
}

export function buildProblemHref(
  slug: string,
  params: ProblemSequenceParams,
): string {
  const query = buildProblemSequenceQuery(params);
  return query ? `/problems/${slug}?${query}` : `/problems/${slug}`;
}

export function filterProblems(
  problems: ProblemSummary[],
  params: ProblemSequenceParams,
): ProblemSummary[] {
  const query = params.query?.toLowerCase();
  return problems.filter(
    (problem) =>
      (!params.category || problem.category === params.category) &&
      (!params.difficulty || problem.difficulty === params.difficulty) &&
      (!params.type || problem.type === params.type) &&
      (!params.status || problem.status === params.status) &&
      (!query || problem.title.toLowerCase().includes(query)),
  );
}

export function getShuffleCandidates(
  problems: ProblemSummary[],
  params: ProblemSequenceParams,
): ProblemSummary[] {
  if (params.queue === "review") return problems;
  return orderProblems(filterProblems(problems, params)).filter(
    (problem) => problem.status !== "solved",
  );
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: string): () => number {
  let state = hashSeed(seed);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function orderProblems(
  problems: ProblemSummary[],
  shuffleSeed?: string,
): ProblemSummary[] {
  const ordered = [...problems].sort((a, b) => {
    const categoryDifference =
      (CATEGORY_ORDER.get(a.category) ?? Number.MAX_SAFE_INTEGER) -
      (CATEGORY_ORDER.get(b.category) ?? Number.MAX_SAFE_INTEGER);
    return (
      categoryDifference ||
      a.order - b.order ||
      a.title.localeCompare(b.title)
    );
  });

  if (!shuffleSeed) return ordered;

  const random = seededRandom(shuffleSeed);
  for (let i = ordered.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
  }
  return ordered;
}

export function getProblemSequence(
  problems: ProblemSummary[],
  params: ProblemSequenceParams,
  currentSlug?: string,
): ProblemSummary[] {
  if (params.queue === "review") return problems.slice(0, params.limit);

  let sequence = filterProblems(problems, params);

  if (params.shuffle) {
    sequence = sequence.filter(
      (problem) =>
        problem.status !== "solved" ||
        (currentSlug !== undefined && problem.slug === currentSlug),
    );
  }

  return orderProblems(sequence, params.shuffle).slice(0, params.limit);
}

export function getAdjacentProblems(
  sequence: ProblemSummary[],
  currentSlug: string,
): ProblemAdjacent {
  const currentIndex = sequence.findIndex(
    (problem) => problem.slug === currentSlug,
  );

  if (currentIndex < 0) {
    return { previous: null, next: null, position: 0, total: sequence.length };
  }

  return {
    previous: currentIndex > 0 ? sequence[currentIndex - 1] : null,
    next: currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : null,
    position: currentIndex + 1,
    total: sequence.length,
  };
}
