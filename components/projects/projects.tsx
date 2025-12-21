'use client';

import { projectsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import SectionHeading from '../section-heading';
import ProjectElement from './project-element';
import { BlurFade } from '@/components/ui/blur-fade';

export default function Projects() {
  const { ref } = useSectionInView('Projects');

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 max-w-[50rem] mx-auto px-4">
      <BlurFade delay={0.1} inView>
        <SectionHeading>My Projects</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          A selection of projects I've worked on. Hover over them to see the magic.
        </p>
      </BlurFade>

      <div className="space-y-8">
        {projectsData.map((project, index) => (
          <BlurFade key={index} delay={0.1 * (index + 1)} inView>
            <ProjectElement {...project} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
