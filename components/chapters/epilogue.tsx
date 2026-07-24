"use client";

import MaskedLines from "@/components/narrative/masked-lines";
import MilestoneDot from "@/components/thread/milestone-dot";
import { STORY } from "@/lib/story";
import { useSectionInView } from "@/lib/hooks";

export default function Epilogue() {
  const { ref } = useSectionInView("epilogue", 0.6);
  const { line, links } = STORY.epilogue;

  return (
    <section
      ref={ref}
      id="epilogue"
      className="relative flex min-h-[70dvh] flex-col justify-center px-6 py-32 md:px-16"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2>
          <MaskedLines
            lines={[line]}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight tracking-tight"
          />
        </h2>
        <div className="mt-14 flex gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl font-bold text-terracotta underline underline-offset-8 transition-transform duration-150 active:scale-[0.97] md:text-3xl"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-24">
          <MilestoneDot />
        </div>
        <p className="mt-10 font-mono text-xs text-[var(--act-muted)]">
          Robin Dang, Amsterdam
        </p>
      </div>
    </section>
  );
}
