'use client';

import { Education } from '@/lib/data';
import { ShineBorder } from '@/components/ui/shine-border';
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
          'w-full glass rounded-xl p-6 md:p-8 transition-all duration-300',
          'border border-border hover:border-primary/20',
          'bg-card/50 dark:bg-card/30'
        )}
      >
        {/* Date badge */}
        <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
          {date}
        </span>

        {/* Degree */}
        <h3 className="text-lg md:text-xl font-semibold text-foreground">
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

        {/* Shine border on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ShineBorder
            borderWidth={1}
            duration={14}
            shineColor={['#00fff0', '#ff00aa']}
          />
        </div>
      </div>
    </div>
  );
}
