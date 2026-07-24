"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY, type Venture } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

function VentureBlock({ venture, index }: { venture: Venture; index: number }) {
  const sunset = venture.status === "sunset";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={`max-w-[58ch] ${sunset ? "opacity-80 saturate-[0.8]" : ""}`}
    >
      <h3 className="font-display text-3xl font-bold tracking-tight">
        {venture.name}
        {sunset && (
          <span className="ml-3 align-middle font-mono text-xs text-[var(--act-muted)]">
            sunset
          </span>
        )}
      </h3>
      <p className="font-mono text-sm text-terracotta">{venture.role}</p>
      <p className="mt-4 font-body text-lg leading-relaxed">{venture.story}</p>
      {venture.stack && (
        <p className="mt-3 font-mono text-xs text-[var(--act-muted)]">
          {venture.stack.join(" / ")}
        </p>
      )}
    </motion.article>
  );
}

export default function ZeroToOne() {
  const { ref } = useSectionInView("zero-to-one", 0.15);
  const { intro, ventures } = STORY.zeroToOne;

  return (
    <section
      ref={ref}
      id="zero-to-one"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment enter="right" home="right" exit="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={4} title="Zero to One" />
        <p className="mb-16 max-w-[52ch] font-body text-xl leading-relaxed md:text-2xl">
          {intro}
        </p>
        <div className="space-y-20">
          {ventures.map((v, i) => (
            <VentureBlock key={v.name} venture={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
