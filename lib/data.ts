import leya from "@/public/leya.png";
import lokasa from "@/public/lokasa.png";
import poodl from "@/public/poodl.png";
import React from "react";
import { FaBook, FaGraduationCap } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export type Experience = {
  title: string;
  company: string;
  location: string;
  icon: React.ReactNode;
  date: string;
  link?: string;
  logo?: string;
  gridClass?: string;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  description?: string;
  icon: React.ReactNode;
  date: string;
  link?: string;
};

export const experiencesData: Experience[] = [
  {
    title: "Software Engineer",
    company: "Uber",
    location: "Amsterdam, Netherlands",
    icon: React.createElement(HiDesktopComputer),
    date: "Oct 2024 - Present",
    logo: "/logos/uber.svg",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Senior Software Engineer",
    company: "Booking.com",
    location: "Remote/Amsterdam, Netherlands",
    icon: React.createElement(HiDesktopComputer),
    date: "Aug 2022 - Sep 2024",
    logo: "/logos/booking.svg",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Founding Software Engineer",
    company: "Legora (Leya AI, YC W24)",
    location: "Stockholm, Sweden",
    icon: React.createElement(HiDesktopComputer),
    date: "Jul 2023 - Nov 2023",
    logo: "/logos/leya.svg",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Software Engineer - Consultant",
    company: "Netlight",
    location: "Stockholm, Sweden",
    icon: React.createElement(HiDesktopComputer),
    date: "Aug 2022 - Sep 2024",
    logo: "/logos/netlight.svg",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Software Engineer - Student Worker",
    company: "Nasdaq",
    location: "Stockholm, Sweden",
    icon: React.createElement(IoPerson),
    date: "Jun 2020 - Aug 2022",
    logo: "/logos/nasdaq.svg",
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

export const educationData: Education[] = [
  {
    degree: "M.Sc. Computer Science",
    institution: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    icon: React.createElement(FaGraduationCap),
    date: "May 2022",
  },
  {
    degree: "Master's Thesis",
    institution: "Nasdaq & KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    description:
      "The Adoption of Distributed Ledger Technology within Central Securities Depositories: An Exploratory Study from a Business Perspective.",
    icon: React.createElement(FaBook),
    date: "Jan 2022 - May 2022",
    link: "https://www.diva-portal.org/smash/record.jsf?dswid=4748&pid=diva2%3A1695524",
  },
  {
    degree: "B.Sc. Computer Science",
    institution: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    icon: React.createElement(FaGraduationCap),
    date: "Jun 2020",
  },
  {
    degree: "Bachelor's Thesis",
    institution: "KTH Royal Institute of Technology",
    location: "Stockholm, Sweden",
    description:
      "Evaluation of Machine Learning classifiers for Breast Cancer Classification.",
    icon: React.createElement(FaBook),
    date: "Jan 2020 - Jun 2020",
    link: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1464600",
  },
];

export const projectsData = [
  {
    title: "Real Estate Marketplace",
    description:
      "Sweden's largest commercial real estate marketplace with 23,000+ listings. Features property search, SmartMatch recommendations, and market insights.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "MapLibre"],
    imageUrl: lokasa,
    demoUrl: "https://lokasa.se",
  },
  {
    title: "AI GEO Tracking Platform",
    description:
      "Tracks brand visibility across ChatGPT, Claude, Gemini, and Perplexity with real-time analytics and alerts.",
    tags: ["Next.js", "TypeScript", "Tailwind", "AI", "Analytics"],
    imageUrl: poodl,
  },
  {
    title: "Legora (Leya AI YC W24)",
    description:
      "Enhancing and streamlining manual legal workflows with Agentic RAG",
    tags: [
      "OpenAI",
      "Next.js",
      "TypeScript",
      "Python",
      "Langchain",
      "Weaviate",
      "Azure",
      "Tailwind",
    ],
    imageUrl: leya,
    demoUrl: "https://www.legora.com",
  },
] as const;

export type SkillCategory = {
  name: string;
  description: string;
  skills: { name: string; slug: string }[];
};

export const skillCategoriesData: SkillCategory[] = [
  {
    name: "Languages",
    description: "Programming languages",
    skills: [
      { name: "Java", slug: "java/java-original" },
      { name: "Kotlin", slug: "kotlin/kotlin-original" },
      { name: "JavaScript", slug: "javascript/javascript-original" },
      { name: "TypeScript", slug: "typescript/typescript-original" },
      { name: "Python", slug: "python/python-original" },
      { name: "Go", slug: "go/go-original-wordmark" },
    ],
  },
  {
    name: "Frameworks",
    description: "Frontend & backend",
    skills: [
      { name: "Next.js", slug: "nextjs/nextjs-original" },
      { name: "React", slug: "react/react-original" },
      { name: "Node.js", slug: "nodejs/nodejs-original" },
      { name: "Express", slug: "express/express-original" },
      { name: "Fastify", slug: "fastify/fastify-original" },
      { name: "Spring", slug: "spring/spring-original" },
      { name: "FastAPI", slug: "fastapi/fastapi-original" },
      { name: "Tailwind", slug: "tailwindcss/tailwindcss-original" },
    ],
  },
  {
    name: "Databases",
    description: "Data storage",
    skills: [
      { name: "PostgreSQL", slug: "postgresql/postgresql-original" },
      { name: "MySQL", slug: "mysql/mysql-original" },
      { name: "MongoDB", slug: "mongodb/mongodb-original" },
      { name: "Elasticsearch", slug: "elasticsearch/elasticsearch-original" },
      { name: "Redis", slug: "redis/redis-original" },
      { name: "Supabase", slug: "supabase/supabase-original" },
      { name: "Firebase", slug: "firebase/firebase-original" },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "Infrastructure",
    skills: [
      {
        name: "AWS",
        slug: "amazonwebservices/amazonwebservices-original-wordmark",
      },
      { name: "Azure", slug: "azure/azure-original" },
      { name: "Docker", slug: "docker/docker-original" },
      { name: "Kubernetes", slug: "kubernetes/kubernetes-original" },
      { name: "Terraform", slug: "terraform/terraform-original" },
    ],
  },
  {
    name: "Tools",
    description: "Development tools",
    skills: [
      { name: "Git", slug: "git/git-original" },
      { name: "GitHub", slug: "github/github-original" },
      { name: "Kafka", slug: "apachekafka/apachekafka-original" },
      { name: "GraphQL", slug: "graphql/graphql-plain" },
    ],
  },
];

// Flat list for backward compatibility with IconCloud
export const skillsData = [
  "Java",
  "TypeScript",
  "Python",
  "Go",
  "Langchain",
  "OpenAI",
  "Next JS",
  "Node JS",
  "React JS",
  "Tailwind",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Elasticsearch",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Firebase",
  "Supabase",
  "Git",
  "MapLibre",
] as const;
