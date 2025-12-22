'use client';

import { motion } from 'framer-motion';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-10">
      {/* Gradient fade from content to footer */}
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-transparent to-background pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Divider line */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-border to-transparent mb-10" />

        <div className="flex flex-col items-center gap-6">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { href: 'https://linkedin.com/in/robin-dang', icon: BsLinkedin, label: 'LinkedIn' },
              { href: 'https://github.com/rpdang', icon: BsGithub, label: 'GitHub' },
              { href: 'mailto:robindang95@gmail.com', icon: HiMail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'w-10 h-10 rounded-full',
                  'flex items-center justify-center',
                  'text-muted-foreground hover:text-primary',
                  'border border-border/50 hover:border-primary/30',
                  'transition-all duration-300',
                  'editorial-shadow hover:editorial-shadow-hover'
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright and credits */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear}{' '}
              <span className="font-display text-primary">Robin Dang</span>
              {' '}| All rights reserved
            </p>
            
            <p className="text-xs text-muted-foreground/60 max-w-md">
              Built with{' '}
              <span className="text-muted-foreground">Next.js</span>,{' '}
              <span className="text-muted-foreground">TypeScript</span>,{' '}
              <span className="text-muted-foreground">Tailwind CSS</span>,{' '}
              <span className="text-muted-foreground">Magic UI</span>, and{' '}
              <span className="text-muted-foreground">Framer Motion</span>
            </p>
          </div>

          {/* Subtle branding */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-xs font-sans text-muted-foreground/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
            <span>Designed with precision</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
