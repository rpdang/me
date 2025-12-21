'use client';

import { Experience } from '@/lib/data';
import { ShineBorder } from '@/components/ui/shine-border';
import { cn } from '@/lib/utils';

type ExperienceProps = {
  experience: Experience;
};

export default function ExperienceElement({
  experience: { company, date, title, location, description },
}: ExperienceProps) {
  return (
    <div className="group relative">
      <div
        className={cn(
          'glass rounded-xl p-6 md:p-8 transition-all duration-300',
          'border border-border hover:border-primary/20',
          'bg-card/50 dark:bg-card/30'
        )}
      >
        {/* Date badge */}
        <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
          {date}
        </span>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-foreground">
          {title}
        </h3>

        {/* Company */}
        <p className="text-primary font-medium mt-1">{company}</p>

        {/* Location */}
        <p className="text-sm text-muted-foreground">{location}</p>

        {/* Description */}
        {description && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
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
