"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-paper">
      <span className="block w-3 h-3 rounded-full bg-blood mb-8" aria-hidden="true" />
      <h1 className="font-serif text-4xl md:text-5xl text-ink">Something went wrong.</h1>
      <p className="font-serif italic text-lg text-muted mt-6 max-w-md">
        Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-10 font-serif text-xs uppercase tracking-[0.2em] text-blood border-b border-blood/40 hover:border-blood pb-0.5 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}