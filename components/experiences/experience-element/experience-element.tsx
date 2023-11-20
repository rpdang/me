'use client';

import { experiencesData } from '@/lib/data';
import { useInView } from 'react-intersection-observer';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

type ExperienceProps = (typeof experiencesData)[number];

export default function ExperienceElement({
  date,
  icon,
  title,
  location,
  description,
}: ExperienceProps) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref} className="vertical-timeline-element">
      <VerticalTimelineElement
        visible={inView}
        date={date}
        icon={icon}
        iconStyle={{
          background: 'white',
          fontSize: '1.5rem',
        }}
        contentStyle={{
          background: '#f3f4f6',
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          textAlign: 'left',
          padding: '1.3rem 2rem',
        }}
        contentArrowStyle={{
          borderRight: '0.4rem solid #9ca3af',
        }}
      >
        <h3 className="font-semibold capitalize">{title}</h3>
        <p className="!mt-0 font-normal">{location}</p>
        <p className="!mt-1 !font-normal text-gray-700">{description}</p>
      </VerticalTimelineElement>
    </div>
  );
}
