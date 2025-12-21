'use client';

import profilePic from '@/public/robin.jpg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Ripple } from '@/components/ui/ripple';
import { BorderBeam } from '@/components/ui/border-beam';

export default function Avatar() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Ripple effect background */}
        <div className="absolute inset-0 -z-10 scale-[2.5]">
          <Ripple 
            mainCircleSize={100}
            mainCircleOpacity={0.15}
            numCircles={4}
            className="dark:opacity-40"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 20,
            duration: 0.5 
          }}
          className="relative"
        >
          {/* Avatar container with glow */}
          <div className="relative rounded-full p-[3px] bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-magenta">
            <div className="rounded-full bg-background p-[2px]">
              <Image
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover"
                alt="Robin Dang portrait"
                src={profilePic}
                width={192}
                height={192}
                quality={95}
                priority={true}
              />
            </div>
            
            {/* Border beam animation */}
            <BorderBeam 
              size={80}
              duration={4}
              colorFrom="#00fff0"
              colorTo="#ff00aa"
              borderWidth={2}
            />
          </div>
        </motion.div>
        
        {/* Wave emoji with glow */}
        <motion.span
          className="absolute -bottom-1 -right-1 text-4xl drop-shadow-lg"
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            delay: 0.3,
            duration: 0.7,
          }}
        >
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              delay: 1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="inline-block origin-[70%_70%]"
          >
            👋
          </motion.span>
        </motion.span>
      </div>
    </div>
  );
}
