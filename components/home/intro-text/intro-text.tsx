'use client';

import { motion } from 'framer-motion';
import { HyperText } from '@/components/ui/hyper-text';
import { TextAnimate } from '@/components/ui/text-animate';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';

export default function IntroText() {
  return (
    <div className="mb-10 mt-6 px-4 text-center">
      {/* Name with HyperText scramble effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <span className="text-lg sm:text-xl text-muted-foreground font-mono">
          Oh, hi there! I'm
        </span>
        <HyperText
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-2 block font-mono"
          duration={1200}
          delay={300}
          animateOnHover={true}
        >
          ROBIN DANG
        </HyperText>
      </motion.div>

      {/* Role with gradient text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <AnimatedGradientText
          className="text-xl sm:text-2xl font-semibold"
          colorFrom="#00fff0"
          colorTo="#ff00aa"
          speed={1}
        >
          Software Engineer
        </AnimatedGradientText>
      </motion.div>

      {/* Intro paragraph with animated text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
          duration={0.8}
          delay={0.5}
        >
          A curious software engineer who loves building cool things and learning new stuff. If you've stumbled here, what a pleasant surprise!
        </TextAnimate>
      </motion.div>
    </div>
  );
}
