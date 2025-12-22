"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { educationData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "../section-heading/section-heading";
import EducationElement from "./education-element";

export default function Education() {
  const { ref } = useSectionInView("Education", 0.2);

  return (
    <section
      ref={ref}
      id="education"
      className="scroll-mt-28 mb-28 sm:mb-40 max-w-200 mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Education</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Academic background and research.
        </p>
      </BlurFade>

      <div className="space-y-6 w-full">
        {educationData.map((education, index) => (
          <BlurFade
            key={index}
            delay={0.1 + index * 0.1}
            inView
            className="w-full"
          >
            <EducationElement education={education} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
