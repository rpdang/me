"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;

interface MaskedLinesProps {
  lines: string[];
  mode?: "mount" | "inView";
  delay?: number;
  className?: string;
}

export default function MaskedLines({
  lines,
  mode = "inView",
  delay = 0,
  className,
}: MaskedLinesProps) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  const line = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
      };

  const trigger =
    mode === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <motion.span
      role="text"
      aria-label={lines.join(" ")}
      className={className}
      variants={container}
      initial="hidden"
      {...trigger}
    >
      {lines.map((text, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
