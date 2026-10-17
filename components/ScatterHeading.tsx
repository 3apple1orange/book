"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface CharacterProps {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  reverse?: boolean;
}

function Character({ char, index, centerIndex, scrollYProgress, reverse }: CharacterProps) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    reverse ? [0, distanceFromCenter * 40] : [distanceFromCenter * 40, 0]
  );

  return (
    <motion.span className="inline-block" style={{ x, width: isSpace ? "0.28em" : undefined }}>
      {isSpace ? "\u00A0" : char}
    </motion.span>
  );
}

export default function ScatterHeading({
  text,
  className,
  reverse = false,
  offset,
}: {
  text: string;
  className?: string;
  reverse?: boolean;
  offset?: [string, string];
}) {
  const targetRef = useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: (offset as any) ?? ["start end", "center center"],
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <span ref={targetRef} className={`whitespace-nowrap ${className ?? ""}`}>
      {characters.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
          reverse={reverse}
        />
      ))}
    </span>
  );
}