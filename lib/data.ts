import culinaro from '@/public/culinario.png';
import leya from '@/public/leya.png';
import mePortfolio from '@/public/me-portfolio.png';
import React from 'react';
import { FaBook, FaGraduationCap } from 'react-icons/fa';
import { HiDesktopComputer } from 'react-icons/hi';
import { IoPerson } from 'react-icons/io5';
import { LiaSchoolSolid } from 'react-icons/lia';

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

export const experiencesData = [
  {
    title: 'Computer Science Student',
    location: 'Stockholm, Sweden',
    description:
      'Enrolled as a student in Computer Science at KTH Royal Institute of Technology.',
    icon: React.createElement(LiaSchoolSolid),
    date: 'Aug 2017',
  },
  {
    title: 'Software Engineer Intern',
    location: 'Stockholm, Sweden',
    description: 'First software engineering summer internship.',
    icon: React.createElement(IoPerson),
    date: 'Jun 2020 - Aug 2020',
  },
  {
    title: 'Software Engineer',
    location: 'Stockholm, Sweden',
    description:
      "Prolonged after the internship, working part-time during master's studies.",
    icon: React.createElement(IoPerson),
    date: 'Aug 2020 - Jun 2021',
  },
  {
    title: 'Software Engineer Intern',
    location: 'Stockholm, Sweden',
    description: 'Second summer internship, developing my core skills.',
    icon: React.createElement(IoPerson),
    date: 'Jun 2021 - Aug 2021',
  },
  {
    title: 'Software Engineer',
    location: 'Stockholm, Sweden',
    description: "Prolonged during my final year of master's studies.",
    icon: React.createElement(IoPerson),
    date: 'Jun 2021 - Jul 2022',
  },
  {
    title: "Master's thesis student",
    location: 'Stockholm, Sweden',
    description:
      'Wrote my thesis with the title: The Adoption of Distributed Ledger Technology within Central Securities Depositories: An Exploratory Study from a Business Perspective.',
    icon: React.createElement(FaBook),
    date: 'Jan 2022 - May 2022',
  },
  {
    title: 'Graduated M.Sc. Computer Science',
    location: 'Stockholm, Sweden',
    description:
      "Graduated after 5 years of studies with a master's in Industrial Engineering Management & Computer Science.",
    icon: React.createElement(FaGraduationCap),
    date: 'May 2022',
  },
  {
    title: 'Software Engineer Consultant',
    location: 'Stockholm, Sweden',
    description:
      'Im working as a software engineer consultant, mostly engaging in full stack projects.',
    icon: React.createElement(HiDesktopComputer),
    date: 'Aug 2022 - Present',
  },
  {
    title: 'Software Engineer Technical Lead [C]',
    location: 'Remote/Amsterdam, Netherlands',
    description:
      'Currently leading a greenfield project, overseeing the technical delivery. Developing a system utilized by over 10,000 users across 150+ countries.',
    icon: React.createElement(HiDesktopComputer),
    date: 'Aug 2022 - Present',
  },
] as const;

export const projectsData = [
  {
    title: 'AI RAG Application',
    description:
      'Enhancing and streamlining manual workflows with Artificial Intelligence leveraging the concept of Retrieval Augmented Generation.',
    tags: [
      'OpenAI',
      'Next.js',
      'TypeScript',
      'Python',
      'Langchain',
      'Weaviate',
      'Azure',
      'Tailwind',
    ],
    imageUrl: leya,
  },
  {
    title: 'Discover Local Restaurants',
    description:
      'Android app dedicated to discorvering hidden gems among local restaurants.',
    tags: ['Android', 'Java', 'Kotlin'],
    imageUrl: culinaro,
  },
  {
    title: 'Portfolio Website',
    description:
      'Personal website project developed during the exploration and learning phase of Next.js 14 and Tailwind.',
    tags: ['Next.js', 'TypeScript', 'React', 'Tailwind', 'Framer Motion'],
    imageUrl: mePortfolio,
  },
] as const;

export const skillsData = [
  'Java',
  'JavaScript',
  'SQL',
  'TypeScript',
  'Python',
  'Shell',
  'HTML/CSS',
  'C#',
  'GoLang',
  'C',
  'Kotlin',
  'Haskell',
  'LaTeX',
  'C++',
  'Assembly',
  'PostgreSQL',
  'MySQL',
  'Oracle',
  'MongoDB',
  'SQLite',
  'ElasticSearch',
  'Weaviate',
  'Pinecone',
  'React',
  'Vue.js',
  'Next.js',
  'Spring Boot',
  'FastAPI',
  'Tailwind',
  'Node.js',
  'Express.js',
  'Git',
  'GitLab',
  'Docker',
  'Kubernetes',
  'Vercel',
  'Jira',
  'Webpack',
  'Heroku',
  'Firebase',
] as const;
