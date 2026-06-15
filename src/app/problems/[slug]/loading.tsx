export default function ProblemLoading() {
  return (
    <div
      className="flex h-full flex-col motion-safe:animate-pulse"
      aria-label="Loading problem"
    >
      <div className="h-12 shrink-0 border-b border-edge bg-surface" />
      <div className="grid min-h-0 flex-1 grid-rows-2 md:grid-cols-[42%_58%] md:grid-rows-1">
        <div className="border-b border-edge bg-surface p-5 md:border-b-0 md:border-r">
          <div className="h-5 w-48 rounded bg-surface-raised" />
          <div className="mt-6 space-y-3">
            <div className="h-3 rounded bg-surface-raised" />
            <div className="h-3 rounded bg-surface-raised" />
            <div className="h-3 w-3/4 rounded bg-surface-raised" />
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[62%_38%]">
          <div className="border-b border-edge bg-[#1e1e1e]" />
          <div className="bg-background" />
        </div>
      </div>
    </div>
  );
}
