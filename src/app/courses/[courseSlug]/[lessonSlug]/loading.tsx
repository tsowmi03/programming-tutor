export default function LessonLoading() {
  return (
    <main
      className="mx-auto max-w-3xl px-3 py-6 motion-safe:animate-pulse sm:px-4 sm:py-8"
      aria-label="Loading lesson"
    >
      <div className="h-4 w-48 rounded bg-zinc-800" />
      <div className="mt-6 h-3 w-56 rounded bg-indigo-950" />
      <div className="mt-3 h-8 w-3/4 rounded bg-zinc-800" />
      <div className="mt-8 rounded-2xl border border-edge bg-surface p-5">
        <div className="h-4 w-52 rounded bg-zinc-800" />
        <div className="mt-4 h-2 rounded bg-zinc-800" />
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-9 rounded-lg bg-zinc-900" />
          ))}
        </div>
      </div>
      <div className="mt-8 h-32 rounded-xl bg-zinc-900" />
      <div className="mt-6 h-96 rounded-xl bg-zinc-900" />
    </main>
  );
}
