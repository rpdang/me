'use client';

import { Education } from '@/lib/data';
import { cn } from '@/lib/utils';
import { HiExternalLink } from 'react-icons/hi';

type EducationProps = {
  education: Education;
};

export default function EducationElement({
  education: { institution, date, degree, location, description, link },
}: EducationProps) {
  return (
    <div className="group relative w-full">
      <div
        className={cn(
          'w-full rounded-lg p-6 md:p-8 transition-all duration-300',
          'border border-border hover:border-primary/30',
          'bg-card/50 dark:bg-card/30',
          'editorial-shadow hover:editorial-shadow-hover'
        )}
      >
        {/* Date badge - Editorial style */}
        <span className="inline-block px-3 py-1 text-xs font-sans uppercase tracking-[0.15em] rounded bg-secondary text-secondary-foreground border border-border mb-4">
          {date}
        </span>

        {/* Degree */}
        <h3 className="text-lg md:text-xl font-display font-semibold text-foreground tracking-tight">
          {degree}
        </h3>

        {/* Institution */}
        <p className="text-primary font-medium mt-1">{institution}</p>

        {/* Location */}
        <p className="text-sm text-muted-foreground">{location}</p>

        {/* Description */}
        {description && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        {/* Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Read thesis
            <HiExternalLink className="w-4 h-4" />
          </a>
        )}

        {/* Editorial accent line on hover */}
        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-lg" />
      </div>
    </div>
  );
}
