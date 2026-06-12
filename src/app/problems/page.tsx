import { Suspense } from "react";
import { listProblems } from "@/lib/problems";
import { requireUserPage } from "@/lib/auth";
import { ProblemBrowser } from "@/components/ProblemBrowser";

export const dynamic = "force-dynamic";

export const metadata = { title: "Problems" };

export default async function ProblemsPage() {
  const user = await requireUserPage();
  const problems = await listProblems(user.id);
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Problems</h1>
      <p className="mt-1 text-sm text-muted">
        {problems.length} problems across coding challenges and concept
        explanations.
      </p>
      <Suspense>
        <ProblemBrowser problems={problems} />
      </Suspense>
    </main>
  );
}
