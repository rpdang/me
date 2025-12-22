"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { BsLinkedin } from "react-icons/bs";
import { HiMail, HiCalendar } from "react-icons/hi";
import SectionHeading from "../section-heading";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <section
      ref={ref}
      id="contact"
      className="mb-28 max-w-200 scroll-mt-28 text-center sm:mb-40 mx-auto px-4"
    >
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
          {/* Primary CTA - Calendly */}
          <a
            href="https://cal.com/robin-dang-ln1pzg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              shimmerDuration="2s"
              background="hsl(16, 60%, 45%)"
              className="font-sans font-medium text-white"
            >
              <HiCalendar className="w-4 h-4 mr-2" />
              Book a Call
            </ShimmerButton>
          </a>

          {/* Secondary options */}
          <div className="flex items-center gap-3">
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

            <motion.a
              href="https://linkedin.com/in/robin-dang"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-card border border-border text-foreground hover:text-primary transition-all duration-300 hover:border-primary/30 editorial-shadow hover:editorial-shadow-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <BsLinkedin className="w-5 h-5" />
              <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            </motion.a>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
