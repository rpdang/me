'use client';

import { useSectionInView } from '@/lib/hooks';
import SectionHeading from '../section-heading';
import { BlurFade } from '@/components/ui/blur-fade';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';

export default function About() {
  const { ref } = useSectionInView('About', 0.75);

  return (
    <section
      id="about"
      ref={ref}
      className="mb-28 max-w-[50rem] scroll-mt-28 px-4"
    >
      <BlurFade delay={0.1} inView>
        <SectionHeading>About me</SectionHeading>
      </BlurFade>

      <BlurFade delay={0.2} inView>
        <NeonGradientCard
          className="max-w-[45rem] mx-auto"
          borderSize={1}
          borderRadius={16}
          neonColors={{
            firstColor: '#00fff0',
            secondColor: '#ff00aa',
          }}
        >
          <div className="text-center leading-8 space-y-4">
            <BlurFade delay={0.3} inView>
              <p className="text-muted-foreground">
                I'm a software engineer with a skill set in{' '}
                <AnimatedGradientText
                  className="font-semibold"
                  colorFrom="#00fff0"
                  colorTo="#9333ea"
                >
                  full stack development
                </AnimatedGradientText>
                . I'm passionate about innovation, designing and building highly
                scalable solutions from the ground up. With a solid foundation in
                both frontend and backend development, my expertise spans from
                everything between database management to user interface creation.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-muted-foreground">
                <span className="italic text-foreground/80">Beyond coding,</span>{' '}
                you'll often find me playing the electric guitar, sweating it out
                at the gym or experimenting with new recipes in the kitchen. In a
                previous life, I was playing handball on a professional level,
                representing the Swedish junior national team, and I also worked as
                a professional{' '}
                <AnimatedGradientText
                  className="font-semibold"
                  colorFrom="#ff00aa"
                  colorTo="#00fff0"
                >
                  DJ
                </AnimatedGradientText>
                .
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <div className="pt-4 border-t border-border/50 mt-6">
                <p className="font-mono text-sm text-primary">Robin Dang</p>
                <p className="font-mono text-xs text-muted-foreground">
                  M.Sc. Computer Science
                </p>
              </div>
            </BlurFade>
          </div>
        </NeonGradientCard>
      </BlurFade>
    </section>
  );
}
