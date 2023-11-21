'use client';

import { projectsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import SectionHeading from '../section-heading';
import ProjectElement from './project-element';

export default function Projects() {
  const { ref } = useSectionInView('Projects');

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectElement {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
