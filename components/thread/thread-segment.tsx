"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// Every segment starts and ends at the horizontal center with a vertical
// tangent, so consecutive segments join into one smooth continuous line.
function weavePath(curve: "left" | "right", w: number, h: number) {
  const cx = w / 2;
  const amp = w * 0.32;
  const side = curve === "right" ? amp : -amp;
  return [
    `M ${cx} 0`,
    `C ${cx} ${h * 0.09}, ${cx + side} ${h * 0.11}, ${cx + side} ${h * 0.25}`,
    `C ${cx + side} ${h * 0.39}, ${cx} ${h * 0.41}, ${cx} ${h * 0.52}`,
    `C ${cx} ${h * 0.64}, ${cx - side} ${h * 0.66}, ${cx - side} ${h * 0.77}`,
    `C ${cx - side} ${h * 0.89}, ${cx} ${h * 0.91}, ${cx} ${h}`,
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
  // Both offsets share one viewport anchor so the drawing tip stays pinned
  // to the same screen line across segments: each segment finishes exactly
  // where the next begins, keeping the thread continuous at boundaries.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.75"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
  });
  // The line renders at reduced strength so it never competes with content
  // it crosses; milestone dots keep full terracotta as the thread's anchors.
  // Zero-progress segments are fully hidden because round linecaps would
  // otherwise render a stray dot even at zero dash length.
  const strokeOpacity = useTransform(pathLength, (v) =>
    v > 0.005 ? 0.45 : 0
  );

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
  const d = size ? weavePath(curve, size.w, size.h) : null;

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
            style={{
              pathLength: reduce ? 1 : pathLength,
              opacity: reduce ? 0.45 : strokeOpacity,
            }}
          />
        </svg>
      )}
    </div>
  );
}
