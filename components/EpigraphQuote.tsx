"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const QUOTE =
  "\u201CMost of what you call your life is not a life. It is a set of arrangements you have made to ensure that nothing you cannot handle will happen to you today.\u201D";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
    </motion.span>
  );
}

export default function EpigraphQuote({ credit }: { credit: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const words = QUOTE.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"],
  });

  // Credit appears once the last words have filled in
  const creditOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const creditY = useTransform(scrollYProgress, [0.85, 1], [10, 0]);

  return (
    <div ref={ref}>
      <blockquote>
        <p className="font-serif italic text-2xl md:text-[2.4rem] leading-[1.35] md:leading-[1.3] text-ink">
          {words.map((w, i) => (
            <span key={i}>
              <Word word={w} index={i} total={words.length} progress={scrollYProgress} />
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <motion.footer style={{ opacity: creditOpacity, y: creditY }} className="mt-8 md:mt-10">
          {credit}
        </motion.footer>
      </blockquote>
    </div>
  );
}