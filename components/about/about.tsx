'use client';

import { useSectionInView } from '@/lib/hooks';
import { motion } from 'framer-motion';
import SectionHeading from '../section-heading';

export default function About() {
  const { ref } = useSectionInView('About', 0.75);

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
        Seasoned software engineer with an expansive skill set in{' '}
        <span className="font-medium">full-stack development</span>. I am driven
        by personal commitment to continual growth and learning, with a passion
        for software architecture. I am actively pursuing the latest in
        technology, my expertise spans everything between databases to browsers.
        My core lies in{' '}
        <span className="font-medium underline">
          React, Next.js, Java, Spring Boot, Python, FastAPI
        </span>{' '}
        I eagerly embrace new experiences and challenges, fueled by enthusiasm
        to explore all the opportunities life has to offer. Basically, I'm just
        excited to live life.
      </p>
      <p>
        <span className="italic">Beyond coding,</span> you'll often find me
        playing vibrant chords of my electric guitar, sweating it out at the
        gym, experimenting with new recipes in the kitchen, and delving into
        diverse cuisines. This zest for exploration is ingrained in my
        bicultural background as a{' '}
        <span className="font-medium">Sweden-born Vietnamese</span>{' '}
        second-generation immigrant, where curiosity and adaptability have
        become my greatest assets. I thrive on embracing diversity, continuously
        learning, and growing alongside others. Notably, I've been fortunate
        enough to be a proficient professional{' '}
        <span className="font-medium"> handball</span> player, representing the
        junior national team, and a professional{' '}
        <span className="font-medium">DJ</span> before I was able to turn coffee
        into elegant lines of code.
      </p>
      <p className="italic mt-5 text-sm"> Robin Dang</p>
      <span className="italic text-sm">M.Sc. Computer Science</span>
    </motion.section>
  );
}
