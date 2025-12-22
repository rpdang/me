"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { skillCategoriesData, SkillCategory } from "@/lib/data";
import { useIsMobile, useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "../section-heading/section-heading";

// Skill category card component - simplified horizontal layout
function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.05} inView>
      <div className="text-left">
        <h3 className="font-display text-sm font-semibold text-foreground mb-2">
          {category.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/40 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.03 * i }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.slug}.svg`}
                alt={skill.name}
                width={16}
                height={16}
                className="opacity-80 dark:invert"
              />
              <span className="text-xs font-mono text-muted-foreground">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </BlurFade>
  );
}

export default function Skills() {
  const isMobile = useIsMobile();
  const { ref } = useSectionInView("Skills", isMobile ? 0.3 : 0.5);

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-200 scroll-mt-28 text-center sm:mb-40 mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Technologies I've Worked With</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.15} inView>
        <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto text-sm">
          A selection of tools and technologies I've used.
        </p>
      </BlurFade>

      {/* Simplified grid layout - scannable in 3 seconds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
