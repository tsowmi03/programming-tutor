import { notFound } from "next/navigation";
import { getProblemDetail, getProblemRecord } from "@/lib/problems";
import { requireUserPage } from "@/lib/auth";
import { CodeWorkspace } from "@/components/workspace/CodeWorkspace";
import { ExplanationWorkspace } from "@/components/workspace/ExplanationWorkspace";

export const dynamic = "force-dynamic";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await requireUserPage();
  const { slug } = await params;
  const problem = await getProblemDetail(slug, user.id);
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
  const record = await getProblemRecord(slug);
  return { title: record?.title ?? "Problem" };
}
