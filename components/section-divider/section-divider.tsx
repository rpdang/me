'use client';

import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export default function SectionDivider() {
  return (
    <motion.div
      className="relative my-16 sm:my-24 h-20 sm:h-32 w-full max-w-xs sm:max-w-xl mx-auto flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.125 }}
    >
      {/* Dot pattern with gradient fade */}
      <DotPattern
        className={cn(
          'mask-[radial-gradient(ellipse_at_center,white_30%,transparent_70%)]',
          'opacity-60 dark:opacity-50'
        )}
        width={16}
        height={16}
        cr={1}
      />

      {/* Center gradient line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
    </motion.div>
  );
}
