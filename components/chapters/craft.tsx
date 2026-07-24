"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Craft() {
  const { ref } = useSectionInView("craft", 0.2);
  const { intro, milestones } = STORY.craft;

  return (
    <section
      ref={ref}
      id="craft"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment curve="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={2} title="The Craft" />
        <p className="mb-16 max-w-[52ch] font-body text-xl leading-relaxed md:text-2xl">
          {intro}
        </p>
        <ol className="space-y-14 md:max-w-xl">
          {milestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-5"
            >
              <MilestoneDot className="mt-1.5 shrink-0" />
              <div>
                <span className="font-mono text-xs text-[var(--act-muted)]">
                  {m.period}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-2 font-body text-base leading-relaxed text-[var(--act-muted)]">
                  {m.detail}
                </p>
                {m.href && (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-mono text-sm text-terracotta underline underline-offset-4 transition-transform duration-150 active:scale-[0.97]"
                  >
                    {m.linkLabel}
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
