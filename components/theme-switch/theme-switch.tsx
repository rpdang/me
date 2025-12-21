'use client';

import { useTheme } from '@/context/theme-context';
import { motion, AnimatePresence } from 'framer-motion';
import { BsMoon, BsSun } from 'react-icons/bs';
import { cn } from '@/lib/utils';

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      className={cn(
        'fixed bottom-5 right-5 z-[999]',
        'h-12 w-12 rounded-full',
        'bg-card border border-border backdrop-blur-xl',
        'flex items-center justify-center',
        'text-muted-foreground hover:text-primary',
        'hover:border-primary/30',
        'hover:shadow-glow-cyan transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary/50'
      )}
      onClick={toggle}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <BsSun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <BsMoon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full border border-primary/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
}
