"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "../section-heading";

export default function About() {
  const { ref } = useSectionInView("About", 0.75);

  return (
    <section id="about" ref={ref} className="mb-28 max-w-200 scroll-mt-28 px-4">
      <BlurFade delay={0.1} inView>
        <SectionHeading>About me</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <MagicCard
          className="max-w-180 mx-auto rounded-lg border border-border p-6"
          gradientSize={300}
          gradientColor="rgba(184, 90, 50, 0.04)"
          gradientOpacity={0.5}
        >
          <div className="text-center leading-8 space-y-4">
            <BlurFade delay={0.3} inView>
              <p className="text-muted-foreground">
                I'm a software engineer with a skill set in{" "}
                <AnimatedGradientText
                  className="font-semibold"
                  colorFrom="#b85a32"
                  colorTo="#822e3a"
                >
                  full stack development
                </AnimatedGradientText>
                . I'm passionate about startups, innovation, designing and
                building highly scalable solutions from the ground up. With a
                solid foundation in both frontend and backend development, my
                expertise spans from everything between database management to
                UX design.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="pt-4 border-t border-border/50 mt-6">
                <p className="font-display text-sm text-primary font-medium">
                  Robin Dang
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  B.Sc. & M.Sc. Computer Science
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  KTH Royal Institute of Technology
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Stockholm, Sweden
                </p>
              </div>
            </BlurFade>
          </div>
        </MagicCard>
      </BlurFade>
    </section>
  );
}
