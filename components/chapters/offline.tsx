"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Offline() {
  const { ref } = useSectionInView("offline", 0.4);

  return (
    <section
      ref={ref}
      id="offline"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-40"
    >
      <ThreadSegment enter="left" home="left" exit="left" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={5} title="Offline" />
        <div className="max-w-[52ch] space-y-6">
          {STORY.offline.paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8 }}
              className="font-body text-xl leading-relaxed md:text-2xl"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
