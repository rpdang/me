"use client";

import { motion } from "motion/react";
import { CHAPTERS } from "@/lib/story";
import { useActiveSectionContext } from "@/context/active-section-context";

export default function ChapterRail() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <nav
      aria-label="Chapters"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {CHAPTERS.map((chapter) => {
        const active = (activeSection as string) === chapter.id;
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.title}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              setActiveSection(chapter.id as never);
              setTimeOfLastClick(Date.now());
            }}
            className="group relative flex items-center p-1 transition-transform duration-150 active:scale-[0.97]"
          >
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap font-mono text-xs opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
              {chapter.title}
            </span>
            <motion.span
              animate={{ scale: active ? 1.5 : 1 }}
              transition={{ duration: 0.18 }}
              className={`block h-2 w-2 rounded-full ${
                active
                  ? "bg-terracotta"
                  : "bg-[var(--act-muted)]"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
