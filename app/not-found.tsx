import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="block w-3 h-3 rounded-full bg-blood mb-8" aria-hidden="true" />
        <h1 className="font-serif text-4xl md:text-6xl text-ink leading-tight">
          This door leads nowhere.
        </h1>
        <p className="font-serif italic text-lg text-muted mt-6 max-w-md">
          The page you were looking for does not exist, or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 font-serif text-xs uppercase tracking-[0.2em] text-blood border-b border-blood/40 hover:border-blood pb-0.5 transition-colors"
        >
          Return to the book
        </Link>
      </main>
      <Footer />
    </>
  );
}