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

// The content column is max-w-5xl (1024px) centered inside the section's
// horizontal padding; the thread anchors sit centered in whatever margin
// that leaves at the current viewport, so they never graze the text column.
function pageMargin(w: number) {
  const pad = w >= 768 ? 64 : 24;
  return Math.max(pad, (w - 1024) / 2);
}

function anchorX(side: Side, w: number) {
  const inset = Math.max(10, pageMargin(w) * 0.5);
  return side === "left" ? inset : w - inset;
}

// One smooth transition between two x positions with vertical tangents at
// both ends, so any chain of these segments joins without kinks.
function seg(x0: number, x1: number, y0: number, y1: number) {
  const dy = y1 - y0;
  return `C ${x0} ${y0 + dy * 0.45}, ${x1} ${y0 + dy * 0.55}, ${x1} ${y1}`;
}

// The thread dwells in the chapter's empty margin as a gentle meander (drift
// inward, breathe back past home, settle) rather than a dead-straight line,
// and crosses the content column at most once, in the final fifth of the
// chapter where only the section's bottom padding lives.
function sidePath(enter: Side, home: Side, exit: Side, w: number, h: number) {
  const xe = anchorX(enter, w);
  const xh = anchorX(home, w);
  const xx = anchorX(exit, w);
  const inward =
    (home === "right" ? -1 : 1) *
    Math.min(w * 0.035, 48, pageMargin(w) * 0.4);
  return [
    `M ${xe} 0`,
    seg(xe, xh, 0, h * 0.18),
    seg(xh, xh + inward, h * 0.18, h * 0.42),
    seg(xh + inward, xh - inward * 0.5, h * 0.42, h * 0.66),
    seg(xh - inward * 0.5, xh, h * 0.66, h * 0.8),
    seg(xh, xx, h * 0.8, h),
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
