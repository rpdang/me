"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { skillCategoriesData, SkillCategory } from "@/lib/data";
import { useIsMobile, useSectionInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import SectionHeading from "../section-heading/section-heading";

function SkillBentoCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <BlurFade delay={0.1 + index * 0.05} inView className="h-full">
      <div className="relative h-full rounded-xl overflow-hidden">
        {category.featured && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <BorderBeam
              size={80}
              duration={8}
              colorFrom={category.gradientFrom}
              colorTo={category.gradientTo}
              borderWidth={2}
            />
          </div>
        )}
        <MagicCard
          className="h-full rounded-xl"
          gradientFrom={category.gradientFrom}
          gradientTo={category.gradientTo}
          gradientSize={250}
          gradientOpacity={0.15}
        >
          <div className="p-5 h-full">
            <div className="flex flex-col h-full text-center">
              <div className="mb-3">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center content-start flex-1">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.slug}.svg`}
                      alt={skill.name}
                      width={18}
                      height={18}
                      className="opacity-90 dark:invert"
                    />
                    <span className="text-xs font-medium text-foreground/80">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </MagicCard>
      </div>
    </BlurFade>
  );
}

export default function Skills() {
  const isMobile = useIsMobile();
  const { ref } = useSectionInView("Skills" as never, isMobile ? 0.3 : 0.5);

  return (
    <section
      ref={ref}
      id="skills"
      className="mb-28 max-w-5xl scroll-mt-28 text-center sm:mb-30 mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Technologies </SectionHeading>
      </BlurFade>

      <BlurFade delay={0.15} inView>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto text-sm">
          A selection of tools and technologies I've used.
        </p>
      </BlurFade>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {skillCategoriesData.map((category, index) => (
          <div key={category.name} className={cn("h-full", category.gridClass)}>
            <SkillBentoCard category={category} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
