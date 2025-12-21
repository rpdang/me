'use client';

import { useActiveSectionContext } from '@/context/active-section-context';
import { links } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dock, DockIcon } from '@/components/ui/dock';
import { 
  HiHome, 
  HiUser, 
  HiCode, 
  HiLightningBolt, 
  HiBriefcase 
} from 'react-icons/hi';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: HiHome,
  About: HiUser,
  Projects: HiCode,
  Skills: HiLightningBolt,
  Experience: HiBriefcase,
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      {/* Mobile header - pill style */}
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full border-b border-white/5 bg-background/80 backdrop-blur-xl sm:hidden"
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      />
      
      {/* Mobile nav */}
      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:hidden">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-muted-foreground">
          {links.map(({ name, hash }) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={cn(
                  'flex w-full items-center justify-center px-3 py-3 hover:text-foreground transition-colors',
                  activeSection === name && 'text-primary'
                )}
                href={hash}
                onClick={() => {
                  setActiveSection(name);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {name}
                {activeSection === name && (
                  <motion.span
                    className="bg-primary/10 rounded-full absolute inset-0 -z-10"
                    layoutId="activeSectionMobile"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Desktop Dock navigation */}
      <motion.div
        className="fixed top-6 left-0 right-0 hidden sm:flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Dock
          className="!mt-0 !mx-0 glass border-white/10 dark:border-white/5 bg-background/60 dark:bg-background/40 shadow-glass dark:shadow-glass-dark px-4 items-center"
          iconSize={40}
          iconMagnification={60}
          iconDistance={120}
        >
          {links.map(({ name, hash }) => {
            const Icon = iconMap[name];
            const isActive = activeSection === name;
            
            return (
              <DockIcon
                key={hash}
                className={cn(
                  'relative transition-all duration-300',
                  isActive && 'bg-primary/10 rounded-full'
                )}
              >
                <Link
                  href={hash}
                  onClick={() => {
                    setActiveSection(name);
                    setTimeOfLastClick(Date.now());
                  }}
                  className={cn(
                    'flex items-center justify-center w-full h-full rounded-full transition-all duration-300',
                    'hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                  aria-label={name}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  
                  {/* Active indicator glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10"
                      layoutId="activeDockGlow"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
                
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono bg-card/90 border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {name}
                </span>
              </DockIcon>
            );
          })}
        </Dock>
      </motion.div>
    </header>
  );
}
