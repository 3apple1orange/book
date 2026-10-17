"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Lines rise up out of an invisible mask, one after another */
export function MaskLines({
  lines,
  delay = 0,
  onLoad = false,
}: {
  lines: { content: ReactNode; className?: string }[];
  delay?: number;
  onLoad?: boolean;
}) {
  // Watch the visible wrapper, not the clipped lines, so the trigger always fires
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const show = onLoad || inView;

  return (
    <span ref={ref} className="block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-y-clip pb-[0.06em]">
          <motion.span
            className={cn("block", line.className)}
            initial={{ y: "110%" }}
            animate={{ y: show ? "0%" : "110%" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line.content}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Soft fade + rise when scrolled into view */
export function FadeUp({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A thin rule that draws itself left to right */
export function DrawLine({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("h-px w-full origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.3, ease: EASE }}
    />
  );
}

/** Counts up from 0 when it enters the screen */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = String(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      0
    </span>
  );
}