import { notFound } from "next/navigation";
import { getProblemDetail, getProblemRecord, listProblems } from "@/lib/problems";
import { requireUserPage } from "@/lib/auth";
import { CodeWorkspace } from "@/components/workspace/CodeWorkspace";
import { ExplanationWorkspace } from "@/components/workspace/ExplanationWorkspace";
import type { WorkspaceNavigation } from "@/components/workspace/WorkspaceHeader";
import { listReviewQueue } from "@/lib/review-queue";
import {
  buildProblemHref,
  buildProblemsHref,
  getAdjacentProblems,
  getProblemSequence,
  getShuffleCandidates,
  parseProblemSequenceParams,
  type ProblemSequenceParams,
} from "@/lib/problem-navigation";

export const dynamic = "force-dynamic";

type ProblemSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

function createShuffleSeed(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function buildRandomProblemHref(
  problems: Awaited<ReturnType<typeof listProblems>>,
  params: ProblemSequenceParams,
  currentSlug: string,
): string | null {
  const candidates = getShuffleCandidates(problems, params).filter(
    (problem) => problem.slug !== currentSlug,
  );
  if (candidates.length === 0) return null;

  const shuffleParams = { ...params, shuffle: createShuffleSeed() };
  const target = getProblemSequence(problems, shuffleParams).find(
    (problem) => problem.slug !== currentSlug,
  );

  return target ? buildProblemHref(target.slug, shuffleParams) : null;
}

function buildWorkspaceNavigation(
  problems: Awaited<ReturnType<typeof listProblems>>,
  params: ProblemSequenceParams,
  currentSlug: string,
): WorkspaceNavigation {
  const sequence = getProblemSequence(problems, params, currentSlug);
  const adjacent = getAdjacentProblems(sequence, currentSlug);

  return {
    problemsHref: buildProblemsHref(params),
    backLabel: params.queue === "review" ? "Review" : "Problems",
    studyMode: params.mode,
    previousProblemHref: adjacent.previous
      ? buildProblemHref(adjacent.previous.slug, params)
      : null,
    nextProblemHref: adjacent.next
      ? buildProblemHref(adjacent.next.slug, params)
      : null,
    randomProblemHref:
      params.queue === "review"
        ? null
        : buildRandomProblemHref(problems, params, currentSlug),
    position: adjacent.position,
    total: adjacent.total,
    shuffled: Boolean(params.shuffle),
  };
}

export default async function ProblemPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: ProblemSearchParams;
}) {
  const user = await requireUserPage();
  const [{ slug }, rawSearchParams] = await Promise.all([params, searchParams]);
  const sequenceParams = parseProblemSequenceParams(rawSearchParams);
  const [problem, problems, reviewQueue] = await Promise.all([
    getProblemDetail(slug, user.id),
    listProblems(user.id),
    sequenceParams.queue === "review"
      ? listReviewQueue(user.id)
      : Promise.resolve(null),
  ]);
  if (!problem) notFound();

  const navigationProblems =
    sequenceParams.queue === "review" && reviewQueue
      ? reviewQueue.items.map((item) => item.problem)
      : problems;

  const navigation = buildWorkspaceNavigation(
    navigationProblems,
    sequenceParams,
    slug,
  );

  if (problem.type === "code") {
    return <CodeWorkspace problem={problem} navigation={navigation} />;
  }
  return <ExplanationWorkspace problem={problem} navigation={navigation} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getProblemRecord(slug);
  return { title: record?.title ?? "Problem" };
}
