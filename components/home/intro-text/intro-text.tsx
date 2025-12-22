"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { HyperText } from "@/components/ui/hyper-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "motion/react";

export default function IntroText() {
  return (
    <div className="mb-10 mt-6 px-4 text-center">
      {/* Name with HyperText scramble effect - Editorial style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-3"
      >
        <HyperText
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight"
          duration={1500}
          delay={300}
          animateOnHover={true}
        >
          ROBIN DANG
        </HyperText>
      </motion.div>

      {/* Role with gradient text - Editorial warm tones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-4"
      >
        <AnimatedGradientText
          className="text-xl sm:text-3xl font-display font-medium tracking-tight"
          colorFrom="#b85a32"
          colorTo="#822e3a"
          speed={0.5}
        >
          Software Engineer
        </AnimatedGradientText>
      </motion.div>

      {/* Social proof tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-5"
      >
        <span className="text-sm sm:text-base font-mono text-muted-foreground tracking-wide">
          Currently @Uber | Ex-Booking.com, Legora (Leya AI YC W24)
        </span>
      </motion.div>

      {/* Intro paragraph with animated text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl mx-auto"
      >
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-sans"
          duration={1}
          delay={0.5}
        >
          Building products that matter - whether it's a 10-person startup or a
          platform serving millions.
        </TextAnimate>
      </motion.div>
    </div>
  );
}
