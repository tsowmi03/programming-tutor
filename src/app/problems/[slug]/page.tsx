import { notFound } from "next/navigation";
import { getProblemDetail } from "@/lib/problems";
import { CodeWorkspace } from "@/components/workspace/CodeWorkspace";
import { ExplanationWorkspace } from "@/components/workspace/ExplanationWorkspace";

export const dynamic = "force-dynamic";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblemDetail(slug);
  if (!problem) notFound();

  if (problem.type === "code") {
    return <CodeWorkspace problem={problem} />;
  }
  return <ExplanationWorkspace problem={problem} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblemDetail(slug);
  return { title: problem?.title ?? "Problem" };
}
