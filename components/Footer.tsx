"use client";

import { motion } from "framer-motion";
import { EASE, FadeUp } from "@/components/Motion";
import { book, person } from "@/lib/content";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-paper text-ink px-6 md:px-12 pt-20 md:pt-28">
      <div className="max-w-5xl mx-auto border-t border-border pt-12 md:pt-16">
        {/* Author profile */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            className="lg:col-span-4 overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <motion.img
              src="/footer-image.png"
              alt={`${person.name}, author of ${book.title}`}
              className="w-full h-full object-cover grayscale"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </motion.div>

          <div className="lg:col-span-8 lg:pl-6">
            <FadeUp delay={0.15}>
              <p className="font-grotesk font-bold uppercase text-[11px] tracking-[0.2em] text-muted">
                About the author
              </p>
              <p className="font-serif text-3xl md:text-4xl text-ink mt-3">{person.name}</p>
              <p className="font-serif italic text-base md:text-lg text-muted mt-2">
                Based in {person.location}.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8">
                <a
                  href={person.aboutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xs uppercase tracking-[0.2em] text-ink border-b border-ink/30 hover:border-ink pb-0.5 transition-colors"
                >
                  Read the full biography
                </a>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${person.email}`}
                  className="font-serif text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
                >
                  {person.email}
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.45}>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mt-10 pt-6 border-t border-border">
                <p className="font-serif italic text-lg text-ink">{book.title}</p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xs uppercase tracking-[0.2em] text-blood border-b border-blood/40 hover:border-blood pb-0.5 transition-colors"
                >
                  Get a copy on Amazon
                </a>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-border mt-14 md:mt-20 py-6 font-serif text-[11px] uppercase tracking-[0.2em] text-muted">
          <p>&copy; {new Date().getFullYear()} {person.name}</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-ink transition-colors">Terms</a>
            <a href={person.siteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              {person.siteLabel}
            </a>
          </div>
          <button onClick={scrollToTop} className="hover:text-ink transition-colors">
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}