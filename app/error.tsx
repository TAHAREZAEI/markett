"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-medium text-ink">500</p>
      <h1 className="mt-3 text-xl font-medium text-ink">Something went wrong on our end</h1>
      <p className="mt-2 text-ink-muted">Give it another try — if it keeps happening, let us know.</p>
      <button
        onClick={reset}
        className="focus-ring mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain"
      >
        Try again
      </button>
    </div>
  );
}
