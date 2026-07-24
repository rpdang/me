"use client";

import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Side = "left" | "right";

function anchorX(side: Side, w: number) {
  const inset = Math.max(20, Math.min(w * 0.08, 110));
  return side === "left" ? inset : w - inset;
}

// The thread dwells in the chapter's empty margin and crosses the content
// column at most once, low in the chapter where the section's bottom padding
// is empty, on its way to the next chapter's side. Every segment starts and
// ends with a vertical tangent so consecutive segments join smoothly.
function sidePath(enter: Side, home: Side, exit: Side, w: number, h: number) {
  const xe = anchorX(enter, w);
  const xh = anchorX(home, w);
  const xx = anchorX(exit, w);
  return [
    `M ${xe} 0`,
    `C ${xe} ${h * 0.1}, ${xh} ${h * 0.12}, ${xh} ${h * 0.26}`,
    `L ${xh} ${h * 0.68}`,
    `C ${xh} ${h * 0.86}, ${xx} ${h * 0.88}, ${xx} ${h}`,
  ].join(" ");
}

export default function ThreadSegment({
  enter,
  home,
  exit,
}: {
  enter: Side;
  home: Side;
  exit: Side;
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

  // The path is generated in real pixel coordinates so the 3px stroke and
  // motion's pathLength dash normalization both stay correct at every size.
  // Stretching a fixed viewBox with preserveAspectRatio="none" would force
  // vector-effect: non-scaling-stroke, which moves dash patterns into
  // screen space and shatters the scroll-drawn line into fragments.
  const d = size ? sidePath(enter, home, exit, size.w, size.h) : null;

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
            strokeWidth={3}
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
