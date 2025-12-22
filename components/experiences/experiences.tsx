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
      className="scroll-mt-28 mb-28 sm:mb-40 max-w-3xl mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Experience</SectionHeading>
      </BlurFade>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {experiencesData.map((experience, index) => (
            <BlurFade key={index} delay={0.15 + index * 0.08} inView>
              <ExperienceElement
                experience={experience}
                isFirst={index === 0}
                isLast={index === experiencesData.length - 1}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
