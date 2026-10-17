"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import SectionMarker from "@/components/SectionMarker";
import { FadeUp } from "@/components/Motion";
import { facts, book } from "@/lib/content";

const QUOTE = [
  ...("\u201CEvery life has a backyard.".split(" ").map((w) => ({ w, tone: "text-paper" }))),
  ...("The self waits to be discovered.\u201D".split(" ").map((w) => ({ w, tone: "text-ink" }))),
];

function Word({
  word,
  tone,
  index,
  total,
  progress,
}: {
  word: string;
  tone: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className={`inline-block ${tone}`}>
      {word}
    </motion.span>
  );
}

export default function Preview() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress: curtain } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 25%"],
  });
  const clipPath = useTransform(curtain, [0, 1], ["inset(42% 0% 42% 0%)", "inset(0% 0% 0% 0%)"]);

  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start 85%", "end 55%"],
  });

  return (
    <motion.section
      ref={sectionRef}
      id="preview"
      style={{ clipPath }}
      className="bg-blood text-paper px-6 md:px-12 py-20 md:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <SectionMarker label="A note on the book" count="02 / 04" tone="dark" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mb-20 md:mb-28">
          <FadeUp>
            <p className="font-grotesk font-medium text-lg md:text-xl leading-snug tracking-[-0.01em]">
              <span className="font-black">{book.title}</span> is a philosophical
              investigation into identity, fear, mortality and desire, and the stories
              through which the mind protects itself.
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="font-grotesk font-medium text-lg md:text-xl leading-snug tracking-[-0.01em]">
              Written by {book.author}, it keeps returning to one private question:{" "}
              <span className="font-black text-ink">
                what are we hiding from ourselves, and what happens when we finally look?
              </span>
            </p>
          </FadeUp>
        </div>

        <h2
          ref={quoteRef}
          className="font-grotesk font-black uppercase text-center text-[9vw] md:text-[5.6vw] leading-[0.9] tracking-[-0.04em] mb-20 md:mb-28"
        >
          {QUOTE.map((q, i) => (
            <span key={i}>
              <Word word={q.w} tone={q.tone} index={i} total={QUOTE.length} progress={quoteProgress} />
              {i < QUOTE.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mb-16 md:mb-20">
          <div className="hidden lg:block" />
          <FadeUp>
            <p className="font-grotesk font-medium text-lg md:text-xl leading-snug tracking-[-0.01em]">
              A place where fear is hidden and memory is rearranged, where every
              reader, eventually, has to go and stand alone.
            </p>
            <p className="font-script text-4xl text-paper mt-6">{book.author}</p>
          </FadeUp>
        </div>

        <FadeUp>
          <div className="border-t border-paper pt-8 md:pt-10 pb-2 flex flex-wrap gap-x-14 md:gap-x-20 gap-y-5">
            {facts.map((f) => (
              <p
                key={f.code}
                className="font-grotesk font-extrabold uppercase text-sm md:text-base tracking-[0.12em]"
              >
                <span className="text-ink mr-3">{f.code}</span>
                {f.value}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>
    </motion.section>
  );
}