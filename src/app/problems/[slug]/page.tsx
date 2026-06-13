import { randomBytes } from "node:crypto";
import { notFound } from "next/navigation";
import {
  getProblemDetail,
  getProblemRecord,
  listProblems,
} from "@/lib/problems";
import { requireUserPage } from "@/lib/auth";
import { CodeWorkspace } from "@/components/workspace/CodeWorkspace";
import { ExplanationWorkspace } from "@/components/workspace/ExplanationWorkspace";
import {
  buildProblemHref,
  buildProblemsHref,
  getNextProblem,
  getProblemSequence,
  parseProblemSequenceParams,
} from "@/lib/problem-navigation";

export const dynamic = "force-dynamic";

export default async function ProblemPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await requireUserPage();
  const { slug } = await params;
  const [problem, problems] = await Promise.all([
    getProblemDetail(slug, user.id),
    listProblems(user.id),
  ]);
  if (!problem) notFound();

  const requestedParams = parseProblemSequenceParams(await searchParams);
  let sequenceParams = requestedParams;
  let sequence = getProblemSequence(problems, sequenceParams);
  if (!sequence.some((candidate) => candidate.slug === slug)) {
    sequenceParams = {};
    sequence = getProblemSequence(problems, {});
  }

  const currentIndex = sequence.findIndex(
    (candidate) => candidate.slug === slug,
  );
  const nextProblem = getNextProblem(sequence, slug);

  const nextProblemHref = nextProblem
    ? buildProblemHref(nextProblem.slug, sequenceParams)
    : null;

  const newShuffleParams = {
    ...sequenceParams,
    shuffle: randomBytes(8).toString("hex"),
  };
  const shuffledSequence = getProblemSequence(problems, newShuffleParams);
  const shuffledProblem =
    shuffledSequence.length > 1
      ? shuffledSequence.find((candidate) => candidate.slug !== slug)
      : undefined;

  const navigation = {
    problemsHref: buildProblemsHref(sequenceParams),
    nextProblemHref,
    shuffleHref: shuffledProblem
      ? buildProblemHref(shuffledProblem.slug, newShuffleParams)
      : null,
    position: currentIndex >= 0 ? currentIndex + 1 : 1,
    total: sequence.length || 1,
    shuffled: Boolean(sequenceParams.shuffle),
  };

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
