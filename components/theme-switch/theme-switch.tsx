'use client';

import { useTheme } from '@/context/theme-context';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { BsMoon, BsSun } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { BorderBeam } from '@/components/ui/border-beam';

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Only render theme-dependent content after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = async () => {
    // Graceful fallback for unsupported browsers or reduced motion preference
    if (
      !buttonRef.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      toggle();
      return;
    }

    // Start view transition with circular reveal animation
    const transition = document.startViewTransition(() => {
      flushSync(() => toggle());
    });

    await transition.ready;

    // Calculate animation parameters
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom)
    );

    // Animate the circular reveal
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'fixed bottom-5 right-5 z-999',
        'h-12 w-12 rounded-full',
        'bg-card border border-border backdrop-blur-xl',
        'flex items-center justify-center',
        'text-muted-foreground hover:text-primary',
        'hover:border-primary/30',
        'editorial-shadow hover:editorial-shadow-hover transition-all duration-300',
        'focus:outline-hidden focus:ring-2 focus:ring-primary/50'
      )}
      onClick={handleToggle}
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
      
      {/* Border beam effect */}
      <BorderBeam
        size={40}
        duration={3}
        colorFrom="#b85a32"
        colorTo="#822e3a"
        borderWidth={2}
      />
    </motion.button>
  );
}
