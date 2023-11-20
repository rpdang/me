'use client';

import { projectsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import React from 'react';
import SectionHeading from '../section-heading';
import Project from './project';

export default function Projects() {
  const { ref } = useSectionInView('Projects');

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
