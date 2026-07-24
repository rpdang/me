"use client";

import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import MaskedLines from "@/components/narrative/masked-lines";
import ThreadSegment from "@/components/thread/thread-segment";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function TwoCultures() {
  const { ref } = useSectionInView("two-cultures", 0.3);
  const { paragraphs, pullQuote, closing, coordinates } = STORY.twoCultures;

  return (
    <section
      ref={ref}
      id="two-cultures"
      className="relative scroll-mt-8 px-6 py-32 md:px-16 md:py-48"
    >
      <ThreadSegment enter="left" home="left" exit="right" />
      <div className="relative mx-auto max-w-5xl">
        <ChapterHeading number={1} title="Two Cultures" />
        <div className="ml-auto max-w-[58ch] space-y-8">
          {paragraphs.map((text, i) => (
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
          <div className="py-6">
            <MaskedLines
              lines={[...pullQuote]}
              className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight text-terracotta"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="font-body text-xl leading-relaxed md:text-2xl"
          >
            {closing}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
            className="pt-8 font-mono text-sm text-terracotta"
          >
            {coordinates}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
