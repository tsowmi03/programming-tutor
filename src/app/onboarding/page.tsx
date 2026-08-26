import { redirect } from "next/navigation";
import { BookOpen, Code2, Sparkles } from "lucide-react";
import { requireUserPage } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experiencedStartPath } from "@/lib/auth-utils";
import { completeOnboarding } from "@/lib/onboarding-actions";

export const dynamic = "force-dynamic";

export const metadata = { title: "Choose your starting point" };

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await requireUserPage();
  const { next } = await searchParams;
  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { programmingExperience: true },
  });

  if (profile?.programmingExperience === "beginner") {
    redirect("/courses/programming-foundations-python");
  }
  if (profile?.programmingExperience === "experienced") {
    redirect(experiencedStartPath(next));
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-4xl items-center px-4 py-12">
      <section className="w-full">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
            <Sparkles className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm font-medium text-indigo-300">
            Welcome to CodeClimb, {user.name.split(" ")[0]}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Have you programmed before?
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Choose honestly—this only changes where you begin. You can explore
            every course later.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <form action={completeOnboarding}>
            <input type="hidden" name="experience" value="beginner" />
            {next && <input type="hidden" name="next" value={next} />}
            <button
              type="submit"
              className="group h-full w-full rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-surface p-6 text-left transition hover:-translate-y-0.5 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-950/30"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="mt-5 block text-lg font-semibold">
                No, I’m completely new
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">
                Start with Python fundamentals, guided practice, and small
                projects. No prior knowledge is assumed.
              </span>
              <span className="mt-5 block text-sm font-semibold text-indigo-300">
                Start from the beginning →
              </span>
            </button>
          </form>

          <form action={completeOnboarding}>
            <input type="hidden" name="experience" value="experienced" />
            {next && <input type="hidden" name="next" value={next} />}
            <button
              type="submit"
              className="group h-full w-full rounded-2xl border border-edge bg-surface p-6 text-left transition hover:-translate-y-0.5 hover:border-zinc-600 hover:shadow-xl hover:shadow-black/20"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="mt-5 block text-lg font-semibold">
                Yes, I know the basics
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-muted">
                Browse language-fluency courses and the broader problem-solving
                curriculum.
              </span>
              <span className="mt-5 block text-sm font-semibold text-emerald-300">
                Explore all courses →
              </span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
