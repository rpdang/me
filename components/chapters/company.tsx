"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ChapterHeading from "@/components/narrative/chapter-heading";
import ThreadSegment from "@/components/thread/thread-segment";
import ClipReveal from "@/components/narrative/clip-reveal";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Company() {
  const { ref } = useSectionInView("company", 0.1);
  const { origin, facts, capabilities, closing, href, screenshots } =
    STORY.company;

  return (
    <section ref={ref} id="company" className="relative scroll-mt-8">
      <ThreadSegment curve="right" thicken />
      <div className="relative px-6 py-32 md:px-16 md:py-48">
        <div className="mx-auto max-w-5xl">
          <ChapterHeading number={5} title="The Company" />
          <div className="max-w-[58ch] space-y-8">
            {origin.map((text, i) => (
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

          <dl className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <dt className="font-mono text-xs text-[var(--act-muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-bold">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {screenshots.map((shot) => (
        <ClipReveal key={shot.src} className="mx-auto max-w-7xl px-6 md:px-16">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={2400}
            height={1500}
            className="w-full rounded-lg"
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        </ClipReveal>
      ))}

      <div className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-5xl">
          <ul className="max-w-3xl">
            {capabilities.map((cap, i) => (
              <motion.li
                key={cap}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="border-b border-[var(--act-muted)] py-4 font-display text-2xl font-bold tracking-tight last:border-b-0 md:text-3xl"
              >
                {cap}
              </motion.li>
            ))}
          </ul>
          <p className="mt-16 max-w-[58ch] font-body text-lg leading-relaxed text-[var(--act-muted)]">
            {closing}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-terracotta px-8 py-4 font-display text-lg font-bold text-bone transition-transform duration-150 active:scale-[0.97]"
          >
            Visit Loonar
          </a>
        </div>
      </div>
    </section>
  );
}
