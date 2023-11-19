'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../section-heading';

export default function About() {
  return (
    <motion.section
      className="mb-s8 max-w-[45rem] text-center leading-8 sm:mb-40"
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
