'use client';

import { skillsData } from '@/lib/data';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from '../section-heading/section-heading';
import { IconCloud } from '@/components/ui/icon-cloud';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';

// Using devicon CDN for reliable icon loading
const iconSlugs = [
  { name: 'java', slug: 'java/java-original' },
  { name: 'javascript', slug: 'javascript/javascript-original' },
  { name: 'typescript', slug: 'typescript/typescript-original' },
  { name: 'python', slug: 'python/python-original' },
  { name: 'go', slug: 'go/go-original-wordmark' },
  { name: 'kotlin', slug: 'kotlin/kotlin-original' },
  { name: 'cplusplus', slug: 'cplusplus/cplusplus-original' },
  { name: 'csharp', slug: 'csharp/csharp-original' },
  { name: 'postgresql', slug: 'postgresql/postgresql-original' },
  { name: 'mysql', slug: 'mysql/mysql-original' },
  { name: 'oracle', slug: 'oracle/oracle-original' },
  { name: 'mongodb', slug: 'mongodb/mongodb-original' },
  { name: 'elasticsearch', slug: 'elasticsearch/elasticsearch-original' },
  { name: 'html5', slug: 'html5/html5-original' },
  { name: 'css3', slug: 'css3/css3-original' },
  { name: 'react', slug: 'react/react-original' },
  { name: 'vuejs', slug: 'vuejs/vuejs-original' },
  { name: 'nextjs', slug: 'nextjs/nextjs-original' },
  { name: 'spring', slug: 'spring/spring-original' },
  { name: 'nodejs', slug: 'nodejs/nodejs-original' },
  { name: 'express', slug: 'express/express-original' },
  { name: 'fastapi', slug: 'fastapi/fastapi-original' },
  { name: 'tailwindcss', slug: 'tailwindcss/tailwindcss-original' },
  { name: 'gitlab', slug: 'gitlab/gitlab-original' },
  { name: 'docker', slug: 'docker/docker-original' },
  { name: 'kubernetes', slug: 'kubernetes/kubernetes-original' },
  { name: 'firebase', slug: 'firebase/firebase-original' },
  { name: 'git', slug: 'git/git-original' },
  { name: 'github', slug: 'github/github-original' },
  { name: 'amazonwebservices', slug: 'amazonwebservices/amazonwebservices-original-wordmark' },
  { name: 'googlecloud', slug: 'googlecloud/googlecloud-original' },
  { name: 'redis', slug: 'redis/redis-original' },
  { name: 'graphql', slug: 'graphql/graphql-plain' },
  { name: 'nginx', slug: 'nginx/nginx-original' },
  { name: 'linux', slug: 'linux/linux-original' },
];

// Generate devicon CDN URLs
const images = iconSlugs.map(
  (icon) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.slug}.svg`
);

export default function Skills() {
  const { ref } = useSectionInView('Skills');

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>My Skills</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Drag and interact with the skill cloud below. These are the technologies I work with daily.
        </p>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="relative flex justify-center items-center">
          {/* Gradient glow behind the cloud */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-radial from-primary/20 via-accent/10 to-transparent blur-3xl opacity-50" />
          </div>

          {/* Icon Cloud */}
          <div className="relative z-10">
            <IconCloud images={images} />
          </div>
        </div>
      </BlurFade>

      {/* Skills list as subtle reference */}
      <BlurFade delay={0.5} inView>
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {skillsData.map((skill, index) => (
            <motion.span
              key={index}
              className="text-xs font-mono px-2 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
