"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScatterHeading from "@/components/ScatterHeading";
import { EASE } from "@/components/Motion";
import { book } from "@/lib/content";

// Keep this as the exact filename of your landscape image in /public
const HERO_IMAGE = "/hero-bg.png";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const lineClass =
    "inline-block font-grotesk font-black uppercase text-[13vw] md:text-[8vw] leading-[0.88] tracking-[-0.05em]";

  return (
    <main
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-8 pb-8 overflow-hidden bg-ink"
    >
      <motion.img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        style={{ y: imageY }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute left-0 -top-[15%] w-full h-[130%] object-cover grayscale contrast-110 z-0"
      />
      <div className="absolute inset-0 bg-ink/50 z-0" />

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center"
      >
        {/* The visible title is the page's single H1 */}
        <h1 aria-label={book.title}>
          <span className="block overflow-y-clip pb-[0.04em]">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            >
              <ScatterHeading
                text="Meet Me In"
                reverse
                offset={["start start", "center start"]}
                className={`${lineClass} text-paper`}
              />
            </motion.span>
          </span>{" "}
          <span className="block overflow-y-clip pb-[0.04em]">
            <motion.span
              className="flex justify-center items-baseline gap-[0.25em] text-[13vw] md:text-[8vw]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.45 }}
            >
              <ScatterHeading
                text="The"
                reverse
                offset={["start start", "center start"]}
                className={`${lineClass} text-paper`}
              />{" "}
              <ScatterHeading
                text="Backyard."
                reverse
                offset={["start start", "center start"]}
                className={`${lineClass} text-blood`}
              />
            </motion.span>
          </span>
        </h1>

        {/* Desktop: details in the two corners */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="hidden lg:flex items-start justify-between mt-14 max-w-3xl mx-auto"
        >
          <p className="font-grotesk font-extrabold uppercase text-paper/80 text-base leading-[1.05] tracking-[-0.01em] text-left">
            Identity &middot; Fear<br />Truth &middot; Becoming
          </p>
          <p className="font-grotesk font-extrabold uppercase text-paper/80 text-base leading-[1.05] tracking-[-0.01em] text-right">
            Written By<br />{book.author}
          </p>
        </motion.div>

        {/* Mobile: one short centred line under the title */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="lg:hidden mt-8 font-grotesk font-extrabold uppercase text-paper/80 text-xs tracking-[0.1em]"
        >
          Written by {book.author}
        </motion.p>
      </motion.div>
    </main>
  );
}