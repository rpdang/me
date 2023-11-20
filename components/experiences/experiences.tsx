'use client';

import { experiencesData } from '@/lib/data';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import SectionHeading from '../section-heading/section-heading';
import Experience from './experience-element';

export default function Experiences() {
  return (
    <section id="experience" className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My Experience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((experience, index) => (
          <Experience key={index} {...experience} />
        ))}
      </VerticalTimeline>
    </section>
  );
}
