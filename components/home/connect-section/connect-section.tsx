'use client';

import { motion } from 'motion/react';
import { FaGithubSquare } from 'react-icons/fa';
import { HiArrowDown, HiCalendar } from 'react-icons/hi';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { cn } from '@/lib/utils';

export default function ConnectSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Primary CTA - View My Work */}
      <ShimmerButton
        onClick={scrollToProjects}
        shimmerColor="#ffffff"
        shimmerSize="0.1em"
        shimmerDuration="2s"
        background="hsl(16, 60%, 45%)"
        className="font-sans font-medium text-white"
      >
        View My Work
        <HiArrowDown className="w-4 h-4 ml-2 opacity-70 group-hover:translate-y-0.5 transition-transform" />
      </ShimmerButton>

      {/* Secondary CTA - Book a Call */}
      <a
        href="https://cal.com/robin-dang-ln1pzg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.button
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-full',
            'bg-card border border-border',
            'text-foreground hover:text-primary',
            'font-sans font-medium text-sm',
            'transition-all duration-300',
            'hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiCalendar className="w-4 h-4" />
          Book a Call
        </motion.button>
      </a>

      {/* GitHub Icon */}
      <motion.a
        href="https://github.com/rpdang"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group relative flex items-center justify-center',
          'w-11 h-11 rounded-full',
          'bg-card border border-border',
          'text-foreground hover:text-primary',
          'transition-all duration-300',
          'hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="GitHub"
      >
        <FaGithubSquare className="w-5 h-5" />
        <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
      </motion.a>
    </motion.div>
  );
}
