'use client';

import { Experience } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShineBorder } from '@/components/ui/shine-border';
import { cn } from '@/lib/utils';

type ExperienceProps = {
  experience: Experience;
  index: number;
  isLast: boolean;
};

export default function ExperienceElement({
  experience: { company, date, icon, title, location, description },
  index,
  isLast,
}: ExperienceProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-6 md:gap-10">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[1.3rem] md:left-1/2 md:-translate-x-1/2 top-14 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-border" />
      )}

      {/* Desktop: alternating layout */}
      <div className={cn(
        'hidden md:flex w-full items-center gap-8',
        isEven ? 'flex-row' : 'flex-row-reverse'
      )}>
        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <div className="relative group">
            <div className={cn(
              'glass rounded-xl p-6 transition-all duration-300',
              'hover:border-primary/30 hover:shadow-glow-cyan/20',
              'bg-card/50 dark:bg-card/30'
            )}>
              {/* Date badge */}
              <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
                {date}
              </span>

              <h3 className="text-lg font-semibold font-mono text-foreground">
                {title}
              </h3>
              <p className="text-primary font-medium mt-1">{company}</p>
              <p className="text-sm text-muted-foreground">{location}</p>
              
              {description && (
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              {/* Shine border on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ShineBorder
                  borderWidth={1}
                  duration={8}
                  shineColor={['#00fff0', '#ff00aa']}
                />
              </div>
            </div>

            {/* Arrow pointing to timeline */}
            <div className={cn(
              'absolute top-6 w-4 h-4 rotate-45 bg-card/50 dark:bg-card/30 border-t border-l border-white/10',
              isEven ? '-right-2 border-r-0 border-b-0' : '-left-2 border-l-0 border-t-0 border-r border-b'
            )} />
          </div>
        </motion.div>

        {/* Center icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center text-primary shadow-glow-cyan/30"
        >
          <span className="text-xl">{icon}</span>
        </motion.div>

        {/* Spacer for alternating layout */}
        <div className="flex-1" />
      </div>

      {/* Mobile: single column layout */}
      <div className="flex md:hidden items-start gap-4 w-full">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center text-primary"
        >
          <span className="text-lg">{icon}</span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <div className="glass rounded-xl p-5 bg-card/50 dark:bg-card/30">
            <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20 mb-3">
              {date}
            </span>

            <h3 className="text-base font-semibold font-mono text-foreground">
              {title}
            </h3>
            <p className="text-sm text-primary font-medium">{company}</p>
            <p className="text-xs text-muted-foreground">{location}</p>
            
            {description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
