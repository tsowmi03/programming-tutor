import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <Compass className="h-10 w-10 text-zinc-600" />
      <h1 className="text-xl font-semibold">That page doesn&apos;t exist</h1>
      <p className="max-w-sm text-sm text-muted">
        The problem may have been renamed, or the link is stale.
      </p>
      <Link
        href="/problems"
        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
      >
        Browse problems
      </Link>
    </main>
  );
}
