"use client";

import { motion, useReducedMotion } from "motion/react";
import MaskedLines from "@/components/narrative/masked-lines";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Prologue() {
  const { ref } = useSectionInView("prologue" as never, 0.5);
  const reduce = useReducedMotion();
  const { headlineLines, sub, credentials } = STORY.prologue;

  return (
    <section
      ref={ref}
      id="prologue"
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 md:px-16"
    >
      <h1>
        <MaskedLines
          mode="mount"
          lines={[...headlineLines]}
          className="font-display text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight"
        />
      </h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 0.9, duration: 0.6 }}
        className="mt-8 max-w-[42ch] font-body text-lg text-[var(--act-muted)] md:text-xl"
      >
        {sub}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.2, duration: 0.6 }}
        className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--act-muted)]"
      >
        {credentials.join("  /  ")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.6, duration: 0.6 }}
        className="mt-16"
      >
        <MilestoneDot />
      </motion.div>
    </section>
  );
}
