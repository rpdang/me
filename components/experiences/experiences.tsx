'use client';

import { experiencesData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from '../section-heading/section-heading';
import ExperienceElement from './experience-element';
import { BlurFade } from '@/components/ui/blur-fade';

export default function Experiences() {
  const { ref } = useSectionInView('Experience', 0.2);

  return (
    <section ref={ref} id="experience" className="scroll-mt-28 mb-28 sm:mb-40 max-w-[53rem] mx-auto px-4">
      <BlurFade delay={0.1} inView>
        <SectionHeading>My Experience</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          A journey through my professional career and education.
        </p>
      </BlurFade>

      <div className="space-y-6">
        {experiencesData.map((experience, index) => (
          <BlurFade key={index} delay={0.1 + index * 0.1} inView>
            <ExperienceElement experience={experience} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
