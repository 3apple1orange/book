"use client";

import { motion } from "framer-motion";
import { DrawLine, EASE } from "@/components/Motion";

export default function SectionMarker({
  label,
  count,
  tone = "light",
}: {
  label: string;
  count: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <motion.span
            aria-hidden="true"
            className={`block w-3 h-3 rounded-full ${dark ? "bg-paper" : "bg-blood"}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
          />
          <motion.p
            className={`font-serif italic text-lg md:text-xl ${dark ? "text-paper" : "text-ink"}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            {label}
          </motion.p>
        </div>
        <motion.p
          className={`font-grotesk font-bold text-xs md:text-sm tracking-[0.1em] ${
            dark ? "text-paper/70" : "text-muted"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          {count}
        </motion.p>
      </div>
      <DrawLine className={dark ? "bg-paper/40" : "bg-ink/20"} />
    </div>
  );
}