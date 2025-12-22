'use client';

import { motion } from 'framer-motion';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

export default function SectionDivider() {
  return (
    <motion.div
      className="relative my-24 h-24 w-full max-w-md mx-auto hidden sm:block overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.125 }}
    >
      {/* Dot pattern with gradient fade */}
      <DotPattern
        className={cn(
          'mask-[radial-gradient(ellipse_at_center,white_30%,transparent_70%)]',
          'opacity-40 dark:opacity-30'
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
