'use client';

import { Education } from '@/lib/data';
import { cn } from '@/lib/utils';
import { HiExternalLink } from 'react-icons/hi';
import Image from 'next/image';
import { MagicCard } from '@/components/ui/magic-card';
import { DotPattern } from '@/components/ui/dot-pattern';

type EducationProps = {
  education: Education;
};

export default function EducationElement({
  education: { institution, date, degree, location, description, link },
}: EducationProps) {
  // Check if it's a KTH education to show logo
  const isKTH = institution.toLowerCase().includes('kth');

  return (
    <div className="group relative w-full">
      <MagicCard
        className="w-full rounded-lg"
        gradientSize={250}
        gradientColor="rgba(184, 90, 50, 0.06)"
        gradientOpacity={0.5}
      >
        <div
          className={cn(
            'relative w-full rounded-lg p-6 md:p-8 transition-all duration-300',
            'border border-border hover:border-primary/30',
            'bg-card/50 dark:bg-card/30',
            'editorial-shadow hover:editorial-shadow-hover overflow-hidden'
          )}
        >
          {/* Subtle dot pattern background */}
          <DotPattern
            className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] text-primary/30 dark:text-primary/25"
            width={20}
            height={20}
            cr={1}
          />

          {/* Header with logo and date */}
          <div className="flex items-start justify-between mb-4">
            {isKTH && (
              <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                {/* Light mode logo */}
                <Image
                  src="/logos/kth.svg"
                  alt="KTH Royal Institute of Technology"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain dark:hidden"
                />
                {/* Dark mode logo */}
                <Image
                  src="/logos/kth_white.svg"
                  alt="KTH Royal Institute of Technology"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
            )}
            {/* Date badge - Editorial style */}
            <span className="inline-block px-3 py-1 text-xs font-sans uppercase tracking-[0.15em] rounded bg-secondary text-secondary-foreground border border-border ml-auto">
              {date}
            </span>
          </div>

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
      </MagicCard>
    </div>
  );
}
