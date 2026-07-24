"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

function weavePath(curve: "left" | "right", w: number, h: number) {
  const cx = w / 2;
  const amp = w * 0.32;
  const side = curve === "right" ? amp : -amp;
  return [
    `M ${cx} 0`,
    `C ${cx + side} ${h * 0.2}, ${cx + side} ${h * 0.38}, ${cx} ${h * 0.52}`,
    `C ${cx - side} ${h * 0.64}, ${cx - side} ${h * 0.82}, ${cx} ${h}`,
  ].join(" ");
}

export default function ThreadSegment({
  curve = "right",
}: {
  curve?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });

  useLayoutEffect(() => {
    pathLength.jump(scrollYProgress.get());
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The path is generated in real pixel coordinates so the 2px stroke and
  // motion's pathLength dash normalization both stay correct at every size.
  // Stretching a fixed viewBox with preserveAspectRatio="none" would force
  // vector-effect: non-scaling-stroke, which moves dash patterns into
  // screen space and shatters the scroll-drawn line into fragments.
  const d = size
    ? size.w >= 768
      ? weavePath(curve, size.w, size.h)
      : `M 10 0 L 10 ${size.h}`
    : null;

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {size && d && (
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${size.w} ${size.h}`}
        >
          <motion.path
            className="thread-path"
            d={d}
            fill="none"
            stroke="var(--color-terracotta)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : pathLength }}
          />
        </svg>
      )}
    </div>
  );
}
