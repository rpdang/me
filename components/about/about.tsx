'use client';

import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import SectionHeading from '../section-heading';

export default function About() {
  const { ref } = useSectionInView('About', 0.95);

  return (
    <motion.section
      id="about"
      ref={ref}
      className="mb-s8 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        Driven software engineer with +2 years of diverse experience in full
        stack development. I'm eager to grow & loves to learn. Passionate about
        software architecture & building everything between databases to
        browsers. I also love taking on new experiences & challenges, basically
        just excited to explore the world & live life. Let's connect! M.Sc.
        Computer Science
      </p>
      <p></p>
    </motion.section>
  );
}
