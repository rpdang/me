"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

const PATHS = {
  right: "M 50 0 C 82 20, 82 38, 50 52 C 22 64, 22 82, 50 100",
  left: "M 50 0 C 18 20, 18 38, 50 52 C 78 64, 78 82, 50 100",
};

export default function ThreadSegment({
  curve = "right",
  thicken = false,
}: {
  curve?: "left" | "right";
  thicken?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });

  useEffect(() => {
    pathLength.jump(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strokeWidth = thicken ? 5 : 2;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Weaving path, tablet and up */}
      <svg
        className="hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={PATHS[curve]}
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
      {/* Straight left rail, mobile */}
      <svg
        className="h-full w-4 md:hidden"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 0 L 50 100"
          fill="none"
          stroke="var(--color-terracotta)"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : pathLength }}
        />
      </svg>
    </div>
  );
}
