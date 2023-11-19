import corpcommentImg from '@/public/corpcomment.png';
import rmtdevImg from '@/public/rmtdev.png';
import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { FaReact } from 'react-icons/fa';
import { LuGraduationCap } from 'react-icons/lu';

/**
 * SAMPLE DATA SET
 */

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

//TODO
export const educationData = [
  {
    school: 'KTH Royal Institute of Technology',
    location: 'Stockholm, Sweden',
    degree: 'M.Sc. Computer Science',
    field: 'Computer Science',
    date: '2017 - 2022',
  },
  {
    school: 'KTH Royal Institute of Technology',
    location: 'Stockholm, Sweden',
    degree: 'M.Sc. Industrial Engineering & Management',
    field: 'Computer Science',
    date: '2020 - 2022',
  },
  {
    school: 'KTH Royal Institute of Technology',
    location: 'Stockholm, Sweden',
    degree: 'B.Sc. in Computer Science',
    field: 'Computer Science',
    date: '2017 - 2020',
  },
] as const;

export const experiencesData = [
  {
    title: 'Software Engineer Technical Lead',
    company: 'Booking.com',
    location: 'Remote/Amsterdam, Netherlands',
    description: 'Blaha Blaha',
    icon: React.createElement(LuGraduationCap),
    date: 'Aug 2023 - present',
  },
  {
    title: 'Software Engineer Consultant',
    company: 'Netlight Consulting',
    location: 'Stockholm, Sweden',
    description: 'Blaha Blaha',
    icon: React.createElement(CgWorkAlt),
    date: 'Aug 2023 - present',
  },
  {
    title: 'Software Engineer',
    company: 'Nasdaq',
    location: 'Stockholm, Sweden',
    description: 'Stockholm, Sweden',
    icon: React.createElement(FaReact),
    date: 'Aug 2021 - Jul 2023',
  },
] as const;

export const projectsData = [
  {
    title: 'Software Engineer - Culinario',
    description:
      'I worked as a full-stack developer on this startup project for 2 years.',
    tags: ['React', 'Next.js', 'MongoDB', 'Tailwind', 'Prisma'],
    imageUrl: corpcommentImg,
  },
  {
    title: 'Software Engineer Leya',
    description: 'Blaha blaha',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Redux'],
    imageUrl: rmtdevImg,
  },
  {
    title: 'Software Engineer Leya',
    description: 'Blaha blaha',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Redux'],
    imageUrl: rmtdevImg,
  },
] as const;

export const skillsData = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Git',
  'Tailwind',
  'Prisma',
  'MongoDB',
  'Redux',
  'GraphQL',
  'Apollo',
  'Express',
  'PostgreSQL',
  'Python',
  'Django',
  'Framer Motion',
] as const;
