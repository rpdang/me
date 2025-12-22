'use client';

import { motion } from 'framer-motion';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { cn } from '@/lib/utils';

export default function ConnectSection() {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* LinkedIn Connect - Shimmer Button */}
      <a
        href="https://linkedin.com/in/robin-dang"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ShimmerButton
          shimmerColor="#ffffff"
          shimmerSize="0.1em"
          shimmerDuration="2s"
          background="hsl(16, 60%, 45%)"
          className="font-sans font-medium text-white"
        >
          <BsLinkedin className="w-4 h-4 mr-2" />
          Let's Connect
          <HiArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
        </ShimmerButton>
      </a>

      {/* Social Links - Editorial style */}
      <div className="flex items-center gap-3">
        <motion.a
          href="https://github.com/rpdang"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group relative flex items-center justify-center',
            'w-12 h-12 rounded-full',
            'bg-card border border-border',
            'text-foreground hover:text-primary',
            'transition-all duration-300',
            'hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="GitHub"
        >
          <FaGithubSquare className="w-6 h-6" />

          {/* Subtle highlight on hover */}
          <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
        </motion.a>
      </div>
    </motion.div>
  );
}
