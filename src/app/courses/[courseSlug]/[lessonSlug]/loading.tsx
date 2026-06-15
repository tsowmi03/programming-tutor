export default function LessonLoading() {
  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-8 motion-safe:animate-pulse"
      aria-label="Loading lesson"
    >
      <div className="h-4 w-40 rounded bg-surface-raised" />
      <div className="mt-5 h-3 w-52 rounded bg-surface" />
      <div className="mt-2 h-8 w-3/4 rounded bg-surface-raised" />
      <div className="mt-8 space-y-3">
        <div className="h-3 rounded bg-surface" />
        <div className="h-3 rounded bg-surface" />
        <div className="h-3 w-5/6 rounded bg-surface" />
      </div>
      <div className="mt-8 h-96 rounded-xl border border-edge bg-surface" />
    </main>
  );
}
