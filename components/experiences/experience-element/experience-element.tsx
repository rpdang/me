'use client';

import { Experience } from '@/lib/data';
import { ShineBorder } from '@/components/ui/shine-border';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type ExperienceProps = {
  experience: Experience;
  featured?: boolean;
};

export default function ExperienceElement({
  experience: { company, date, title, location, logo },
  featured = false,
}: ExperienceProps) {
  // Card content that's shared between featured and standard cards
  const cardContent = (
    <div className={cn(
      'relative z-10 flex flex-col h-full',
      featured ? 'p-8 md:p-10' : 'p-6'
    )}>
      {/* Top row: Logo + Date */}
      <div className="flex items-start justify-between mb-auto">
        {/* Company Logo */}
        {logo && (
          <div className={cn(
            'relative flex items-center justify-center rounded-xl transition-all duration-300',
            featured 
              ? 'w-20 h-20 p-4 bg-secondary/80 dark:bg-secondary/50 border-2 border-primary/20 group-hover:border-primary/40 shadow-lg dark:shadow-primary/10'
              : 'w-12 h-12 p-2.5 bg-secondary/60 dark:bg-secondary/40 border border-border group-hover:bg-secondary group-hover:border-primary/20'
          )}>
            <Image
              src={logo}
              alt={`${company} logo`}
              width={featured ? 48 : 28}
              height={featured ? 48 : 28}
              className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300 dark:invert"
            />
          </div>
        )}

        {/* Date badge - Enhanced for featured */}
        <div className="flex flex-col items-end gap-2">
          {featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Currently
            </span>
          )}
          <span className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full',
            'font-mono text-[10px] uppercase tracking-wider',
            'bg-primary/10 text-primary border border-primary/20',
            'transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30'
          )}>
            {!featured && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
            {date}
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="mt-auto pt-6">
        {/* Company name */}
        <p className={cn(
          'font-mono uppercase tracking-[0.2em] mb-2 transition-colors duration-300',
          featured 
            ? 'text-sm text-primary' 
            : 'text-xs text-primary/80 group-hover:text-primary'
        )}>
          {company}
        </p>

        {/* Title - Larger for featured */}
        <h3 className={cn(
          'font-sans font-semibold leading-tight transition-colors duration-300',
          featured 
            ? 'text-3xl md:text-4xl text-foreground' 
            : 'text-lg md:text-xl text-foreground/90 group-hover:text-foreground'
        )}>
          {title}
        </h3>

        {/* Location */}
        <p className={cn(
          'mt-3 text-muted-foreground flex items-center gap-1.5',
          featured ? 'text-base' : 'text-sm'
        )}>
          <svg className={cn('opacity-60', featured ? 'w-4 h-4' : 'w-3.5 h-3.5')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {location}
        </p>
      </div>
    </div>
  );

  // Featured card with MagicCard wrapper and BorderBeam
  if (featured) {
    return (
      <div className="group relative h-full">
        {/* Outer glow - visible in both themes */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-80 blur-xl transition-opacity duration-700 -z-10" />
        
        <MagicCard
          gradientSize={350}
          gradientColor="hsl(var(--primary) / 0.15)"
          gradientFrom="hsl(var(--primary))"
          gradientTo="hsl(var(--accent))"
          gradientOpacity={0.5}
          className="h-full rounded-2xl"
        >
          <div className={cn(
            'relative h-full w-full overflow-hidden rounded-2xl',
            'tech-corners-featured'
          )}>
            {/* Theme-aware background gradient for featured */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-primary/5 dark:from-card dark:via-card dark:to-primary/10" />
            
            {/* Subtle accent gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] via-transparent to-accent/[0.02]" />
            
            {cardContent}
          </div>

          {/* BorderBeam - Theme-aware colors */}
          <BorderBeam
            colorFrom="hsl(var(--primary))"
            colorTo="hsl(var(--accent))"
            duration={8}
            size={100}
            borderWidth={2}
          />
        </MagicCard>
      </div>
    );
  }

  // Standard card with ShineBorder on hover
  return (
    <div className="group relative h-full">
      <div
        className={cn(
          'relative h-full w-full overflow-hidden rounded-2xl transition-all duration-500',
          'border border-border hover:border-primary/30',
          'bg-card/80 dark:bg-card/60 backdrop-blur-sm',
          'hover:scale-[1.02] hover:shadow-lg dark:hover:shadow-primary/5',
          'tech-corners-standard'
        )}
      >
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {cardContent}

        {/* Shine border on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ShineBorder
            borderWidth={1}
            duration={10}
            shineColor={['hsl(var(--primary))', 'hsl(var(--accent))']}
          />
        </div>
      </div>
    </div>
  );
}
