'use client';

import { projectsData } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { MagicCard } from '@/components/ui/magic-card';
import { DotPattern } from '@/components/ui/dot-pattern';
import { HiExternalLink } from 'react-icons/hi';

type ProjectProps = (typeof projectsData)[number];

export default function ProjectElement({
  title,
  description,
  tags,
  imageUrl,
  demoUrl,
}: ProjectProps & { demoUrl?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-6 sm:mb-10 last:mb-0"
    >
      <MagicCard
        className="relative overflow-hidden rounded-lg p-0"
        gradientSize={300}
        gradientColor="rgba(184, 90, 50, 0.06)"
        gradientOpacity={0.6}
      >
        <div className="relative sm:h-88 overflow-hidden rounded-lg bg-card border border-border hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover transition-all duration-300">
          {/* Subtle dot pattern background */}
          <DotPattern
            className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] text-primary/30 dark:text-primary/25"
            width={20}
            height={20}
            cr={1}
          />

          {/* Editorial accent line on hover */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* Content wrapper */}
          <div className="flex flex-col sm:flex-row h-full">
            {/* Text content */}
            <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center sm:group-even:order-2 sm:group-even:pl-8">
              <h3 className="text-2xl font-display font-bold text-foreground mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>

              {/* Tags - Editorial style */}
              <ul className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 text-xs font-sans uppercase tracking-[0.15em]
                               bg-secondary text-secondary-foreground border border-border
                               hover:bg-primary/10 hover:text-primary hover:border-primary/20
                               transition-colors duration-200 rounded"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Demo link */}
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  <HiExternalLink className="w-4 h-4" />
                  <span className="relative">
                    View Live
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
                  </span>
                </a>
              )}
            </div>

            {/* Image */}
            <div className="relative sm:w-1/2 h-64 sm:h-full sm:group-even:order-1">
              <div className="absolute inset-0 sm:inset-4 overflow-hidden rounded-lg shadow-lg">
                <Image
                  className="w-full h-full object-cover object-top
                             transition-all duration-500 ease-out
                             group-hover:scale-105"
                  src={imageUrl}
                  alt={`${title} project screenshot`}
                  quality={95}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-card/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}
