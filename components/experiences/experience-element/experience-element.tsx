'use client';

import { useTheme } from '@/context/theme-context';
import { experiencesData } from '@/lib/data';
import { useInView } from 'react-intersection-observer';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

type ExperienceProps = (typeof experiencesData)[number];

export default function ExperienceElement({
  company,
  date,
  icon,
  title,
  location,
  description,
}: ExperienceProps) {
  const { theme } = useTheme();
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
          background: theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.15)',
          fontSize: '1.5rem',
        }}
        contentStyle={{
          background:
            theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          textAlign: 'left',
          padding: '1.3rem 2rem',
        }}
        contentArrowStyle={{
          borderRight:
            theme === 'light'
              ? '0.4rem solid #9ca3af'
              : '0.4rem solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <h3 className="font-semibold">{title}</h3>
        <p className="!mt-1 font-normal">{company}</p>
        <p className="!mt-0 font-normal">{location}</p>
        {description && (
          <p className="!mt-0 !font-normal text-gray-700 dark:text-white/75">
            {description}
          </p>
        )}
      </VerticalTimelineElement>
    </div>
  );
}
