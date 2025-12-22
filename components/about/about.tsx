"use client";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { useIsMobile, useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import SectionHeading from "../section-heading";

export default function About() {
  const isMobile = useIsMobile();
  const { ref } = useSectionInView("About", isMobile ? 0.4 : 0.75);

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
                I'm a{" "}
                <AnimatedGradientText
                  className="font-semibold"
                  colorFrom="#b85a32"
                  colorTo="#822e3a"
                >
                  full-stack software engineer
                </AnimatedGradientText>{" "}
                who builds production-ready products from zero to scale. I work
                across frontend, backend, and data, with a focus on shipping
                fast, making sound technical trade-offs, and designing systems
                that don't collapse as they grow.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="pt-4 border-t border-border/50 mt-6 flex flex-col items-center gap-3">
                {/* Light mode logo */}
                <Image
                  src="/logos/kth.svg"
                  alt="KTH Royal Institute of Technology"
                  width={40}
                  height={40}
                  className="rounded dark:hidden"
                />
                {/* Dark mode logo */}
                <Image
                  src="/logos/kth_white.svg"
                  alt="KTH Royal Institute of Technology"
                  width={50}
                  height={50}
                  className="rounded hidden dark:block"
                />
                <div>
                  <p className="font-display text-base text-primary font-medium">
                    Robin Dang
                  </p>
                  <p className="font-sans text-base text-muted-foreground">
                    B.Sc. & M.Sc. Computer Science
                  </p>
                  <p className="font-sans text-base text-muted-foreground">
                    KTH Royal Institute of Technology
                  </p>
                  <p className="font-sans text-base text-muted-foreground">
                    Stockholm, Sweden
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </MagicCard>
      </BlurFade>
    </section>
  );
}
