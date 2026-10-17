"use client";

import "./globals.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-serif">
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl">Something went wrong.</h1>
          <p className="italic text-lg text-muted mt-6 max-w-md">Please refresh the page.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-10 text-xs uppercase tracking-[0.2em] text-blood border-b border-blood/40 pb-0.5"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}