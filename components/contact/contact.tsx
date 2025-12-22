"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useIsMobile, useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { BsLinkedin } from "react-icons/bs";
import { HiCalendar, HiMail } from "react-icons/hi";
import SectionHeading from "../section-heading";

// Abstract decorative shapes component
function ArtisticShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Large soft blob - top left */}
      <motion.div
        className="absolute -top-20 -left-32 w-80 h-80 rounded-full opacity-[0.2] dark:opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, hsl(16 60% 45%) 0%, hsl(350 45% 35%) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium blob - top right */}
      <motion.div
        className="absolute -top-10 -right-20 w-60 h-60 rounded-full opacity-[0.15] dark:opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle at 70% 40%, hsl(45 40% 65%) 0%, hsl(16 60% 45%) 60%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          x: [0, -15, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Small accent blob - bottom left */}
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 rounded-full opacity-[0.25] dark:opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, hsl(350 45% 35%) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Small gold accent - bottom right */}
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-[0.2] dark:opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, hsl(45 60% 55%) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Decorative lines */}
      <svg
        className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full opacity-[0.12] dark:opacity-[0.08]"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M-50,200 Q200,100 400,200 T850,200"
          stroke="hsl(16 60% 45%)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.path
          d="M-50,220 Q200,320 400,220 T850,220"
          stroke="hsl(350 45% 35%)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
      </svg>

      {/* Small floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: i % 2 === 0 ? "hsl(16 60% 45%)" : "hsl(350 45% 35%)",
            opacity: 0.15,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const isMobile = useIsMobile();
  const { ref } = useSectionInView("Contact", isMobile ? 0.3 : 0.5);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative mb-28 max-w-200 scroll-mt-28 text-center sm:mb-40 mx-auto px-8 sm:px-16 py-12 sm:py-16 rounded-3xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden"
    >
      <ArtisticShapes />
      <BlurFade delay={0.1} inView>
        <SectionHeading>Let's Build Something Together</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          Open to interesting projects and collaborations. Whether you have a
          question or just want to say hi, I'll try my best to get back to you.
        </p>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA - LinkedIn */}
          <a
            href="https://linkedin.com/in/robin-dang"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              shimmerDuration="2s"
              background="hsl(var(--primary))"
              className="h-12 px-5 font-sans font-medium text-primary-foreground"
            >
              <BsLinkedin className="w-4 h-4 mr-2" />
              Let's Connect
            </ShimmerButton>
          </a>

          {/* Secondary options */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://cal.com/robin-dang-ln1pzg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RainbowButton variant="outline" className="font-sans font-medium">
                <HiCalendar className="w-4 h-4 mr-2" />
                Book a Call
              </RainbowButton>
            </a>

            <motion.a
              href="mailto:robindang95@gmail.com"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border text-foreground hover:text-primary transition-all duration-300 hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <HiMail className="w-5 h-5" />
              <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            </motion.a>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
