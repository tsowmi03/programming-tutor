export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 py-8 motion-safe:animate-pulse"
      aria-label="Loading page"
    >
      <div className="h-7 w-40 rounded bg-surface-raised" />
      <div className="mt-3 h-4 w-72 max-w-full rounded bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-32 rounded-xl border border-edge bg-surface"
          />
        ))}
      </div>
    </main>
  );
}
