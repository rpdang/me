"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "../section-heading/section-heading";
import ExperienceElement from "./experience-element";

export default function Experiences() {
  const { ref } = useSectionInView("Experience", 0.2);

  return (
    <section
      ref={ref}
      id="experience"
      className="scroll-mt-28 mb-28 sm:mb-40 max-w-[68rem] mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Experience</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto text-base leading-relaxed">
          A journey through my professional career, from student worker to
          senior engineer.
        </p>
      </BlurFade>

      {/* Bento Grid Layout - Polished spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(220px,auto)]">
        {experiencesData.map((experience, index) => (
          <BlurFade
            key={index}
            delay={0.2 + index * 0.12}
            inView
            className={experience.gridClass}
          >
            <ExperienceElement experience={experience} featured={index === 0} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
