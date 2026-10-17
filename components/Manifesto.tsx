"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { EASE } from "@/components/Motion";
import { contents, type Chapter } from "@/lib/content";

const PALE = "#c9c8c2";
const INK = "#0f0f0f";
const BLOOD = "#B3121B";

function Line({
  ch,
  isLast,
  isOpen,
  onToggle,
}: {
  ch: Chapter;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [hovered, setHovered] = useState(false);
  const hasDescription = Boolean(ch.description);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 60%"] });
  const color = useTransform(scrollYProgress, [0, 1], [PALE, isLast ? BLOOD : INK]);

  return (
    <li ref={ref} className="border-b border-ink/10">
      <button
        type="button"
        disabled={!hasDescription}
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-expanded={hasDescription ? isOpen : undefined}
        className="w-full flex items-baseline gap-4 md:gap-6 py-4 text-left disabled:cursor-default"
      >
        <span className="font-serif italic text-sm text-muted tabular-nums w-6 shrink-0">{ch.no}</span>
        <motion.span
          style={{ color: hovered || isOpen ? BLOOD : color }}
          className="font-serif text-xl md:text-[1.6rem] leading-[1.25] tracking-[-0.01em]"
        >
          {ch.title}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && hasDescription && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-serif text-base leading-relaxed text-ink/75 pl-10 md:pl-12 pb-5">
              {ch.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Manifesto() {
  const [openNo, setOpenNo] = useState<number | null>(null);
  const lastNo = contents[contents.length - 1].chapters.slice(-1)[0].no;

  return (
    <div className="grid lg:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-24">
      {contents.map((part, idx) => (
        <motion.div
          key={part.numeral}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: EASE, delay: (idx % 2) * 0.15 }}
        >
          <div className="flex items-end gap-4 mb-4">
            <span className="font-grotesk font-black text-blood text-4xl md:text-5xl leading-none tracking-[-0.04em]">
              {part.numeral}
            </span>
            <span className="font-serif italic text-lg md:text-xl text-ink leading-tight pb-0.5">
              {part.title}
            </span>
          </div>

          <ul className="border-t border-ink">
            {part.chapters.map((ch) => (
              <Line
                key={ch.no}
                ch={ch}
                isLast={ch.no === lastNo}
                isOpen={openNo === ch.no}
                onToggle={() => setOpenNo(openNo === ch.no ? null : ch.no)}
              />
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}