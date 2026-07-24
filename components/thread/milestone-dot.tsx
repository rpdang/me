"use client";

import { motion, useReducedMotion } from "motion/react";

export default function MilestoneDot({
  filled = true,
  className,
}: {
  filled?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`inline-block h-3.5 w-3.5 rounded-full border-2 border-terracotta ${
        filled ? "bg-terracotta" : "bg-transparent"
      } ${className ?? ""}`}
    />
  );
}
