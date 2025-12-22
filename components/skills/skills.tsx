"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { IconCloud } from "@/components/ui/icon-cloud";
import { skillCategoriesData, SkillCategory } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "../section-heading/section-heading";
import { MagicCard } from "@/components/ui/magic-card";
import Image from "next/image";

// Generate all skill images for IconCloud from categories
const allSkillImages = skillCategoriesData.flatMap((category) =>
  category.skills.map(
    (skill) =>
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.slug}.svg`
  )
);

// Skill category card component
function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <BlurFade delay={0.3 + index * 0.1} inView>
      <MagicCard
        className="p-5 rounded-xl h-full"
        gradientSize={180}
        gradientColor="rgba(184, 90, 50, 0.04)"
      >
        <div className="text-left">
          <h3 className="font-display text-base font-semibold text-foreground mb-0.5">
            {category.name}
          </h3>
          <p className="text-[10px] text-muted-foreground mb-3 font-mono uppercase tracking-wider">
            {category.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.slug}.svg`}
                  alt={skill.name}
                  width={14}
                  height={14}
                  className="opacity-80 dark:invert"
                />
                <span className="text-[11px] font-mono text-muted-foreground">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </MagicCard>
    </BlurFade>
  );
}

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-200 scroll-mt-28 text-center sm:mb-40 mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Technologies I've Worked With</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.3} inView>
        <div className="relative flex justify-center items-center mb-10">
          {/* Gradient glow behind the cloud */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 bg-gradient-radial from-primary/20 via-accent/10 to-transparent blur-3xl opacity-50" />
          </div>

          {/* Icon Cloud */}
          <div className="relative z-10">
            <IconCloud images={allSkillImages} />
          </div>
        </div>
      </BlurFade>

      {/* Category cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {skillCategoriesData.map((category, index) => (
          <SkillCategoryCard
            key={category.name}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
