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
        I'm a software engineer with an expansive skill set in{' '}
        <span className="font-medium">full stack development</span>. I'm
        passionate about innovation, designing and building highly scalable
        solutions from the ground up. With a solid foundation in both frontend
        and backend development, my expertise spans from everything between
        database management to user interface creation, ensuring seamless,
        efficient, and robust software systems.
      </p>
      <p>
        <span className="italic">Beyond coding,</span> you'll often find me
        playing the electric guitar, sweating it out at the gym or experimenting
        with new recipes in the kitchen. In a previous life, I was playing
        handball on a professional level, representing the Swedish junior
        national team, and I also worked as a professional{' '}
        <span className="font-medium">DJ</span>.
      </p>
      <p className="italic mt-5 text-sm"> Robin Dang</p>
      <span className="italic text-sm">M.Sc. Computer Science</span>
    </motion.section>
  );
}
