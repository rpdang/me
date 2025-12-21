'use client';

import { projectsData } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { BlurFade } from '@/components/ui/blur-fade';

type ProjectProps = (typeof projectsData)[number];

export default function ProjectElement({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
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
        className="relative overflow-hidden rounded-xl p-0"
        gradientSize={300}
        gradientColor="rgba(0, 255, 240, 0.15)"
        gradientOpacity={0.8}
        gradientFrom="#00fff0"
        gradientTo="#ff00aa"
      >
        <div className="relative sm:h-[22rem] overflow-hidden rounded-xl bg-card">
          {/* Content wrapper */}
          <div className="flex flex-col sm:flex-row h-full">
            {/* Text content */}
            <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center sm:group-even:order-2 sm:group-even:pl-8">
              <h3 className="text-2xl font-mono font-bold text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
              
              {/* Tags */}
              <ul className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full
                               bg-primary/10 text-primary border border-primary/20
                               hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative sm:w-1/2 h-64 sm:h-full sm:group-even:order-1">
              <div className="absolute inset-0 sm:inset-4 overflow-hidden rounded-lg sm:rounded-xl shadow-2xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          {/* Border beam on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <BorderBeam
              size={150}
              duration={6}
              colorFrom="#00fff0"
              colorTo="#ff00aa"
              borderWidth={2}
            />
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}
