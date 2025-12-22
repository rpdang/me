"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { projectsData } from "@/lib/data";
import { useIsMobile, useSectionInView } from "@/lib/hooks";
import SectionHeading from "../section-heading";
import ProjectElement from "./project-element";

export default function Projects() {
  const isMobile = useIsMobile();
  const { ref } = useSectionInView("Projects", isMobile ? 0.3 : 0.5);

  return (
    <section
      ref={ref}
      id="projects"
      className="scroll-mt-28 mb-28 max-w-200 mx-auto px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>Projects</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
          A selection of projects I've worked on.
        </p>
      </BlurFade>

      <div className="space-y-8">
        {projectsData.map((project, index) => (
          <BlurFade key={index} delay={0.1 * (index + 1)} inView>
            <ProjectElement {...project} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
