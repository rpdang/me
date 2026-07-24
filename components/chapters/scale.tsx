"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import PinnedQuote from "@/components/narrative/pinned-quote";
import CountUp from "@/components/narrative/count-up";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

function Role({
  company,
  role,
  period,
  story,
}: {
  company: string;
  role: string;
  period: string;
  story: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-[58ch]"
    >
      <span className="font-mono text-xs text-[var(--act-muted)]">{period}</span>
      <h3 className="mt-1 font-display text-3xl font-bold tracking-tight">
        {company}
      </h3>
      <p className="font-mono text-sm text-terracotta">{role}</p>
      <p className="mt-4 font-body text-lg leading-relaxed">{story}</p>
    </motion.div>
  );
}

export default function Scale() {
  const { ref } = useSectionInView("scale", 0.1);
  const { booking, uber, pinnedQuote, stat } = STORY.scale;

  return (
    <section ref={ref} id="scale" className="relative scroll-mt-8">
      <ThreadSegment enter="right" home="right" exit="right" />
      <div className="relative px-6 pt-32 md:px-16 md:pt-48">
        <div className="mx-auto max-w-5xl">
          <ChapterHeading number={3} title="Scale" />
          <Role {...booking} />
          <div className="mt-10 flex items-baseline gap-4">
            <CountUp
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-6xl font-extrabold text-terracotta"
            />
            <span className="max-w-[24ch] font-body text-sm text-[var(--act-muted)]">
              {stat.label}
            </span>
          </div>
          <div className="mt-24">
            <Role {...uber} />
          </div>
        </div>
      </div>
      <PinnedQuote quote={pinnedQuote} />
    </section>
  );
}
