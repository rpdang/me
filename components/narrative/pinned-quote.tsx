"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function Word({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className="mr-[0.28em] inline-block"
    >
      {children}
    </motion.span>
  );
}

export default function PinnedQuote({
  quote,
  className,
}: {
  quote: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const words = quote.split(" ");

  return (
    <div ref={ref} className={`relative h-[220vh] ${className ?? ""}`}>
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center px-6 md:px-16">
        <p className="max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              reduce={!!reduce}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </div>
  );
}
