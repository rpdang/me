'use client';

import { useSectionInView } from '@/lib/hooks';
import Avatar from './avatar';
import ConnectSection from './connect-section';
import IntroText from './intro-text';
import { Particles } from '@/components/ui/particles';
import { useTheme } from '@/context/theme-context';

export default function Home() {
  const { ref } = useSectionInView('Home', 0.75);
  const { theme } = useTheme();

  return (
    <section
      ref={ref}
      id="home"
      className="relative mb-28 max-w-200 text-center sm:mb-0 scroll-mt-400"
    >
      {/* Subtle particle background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={35}
        color={theme === 'dark' ? '#d4a574' : '#b85a32'}
        staticity={100}
        ease={80}
        size={0.4}
      />

      <Avatar />
      <IntroText />
      <ConnectSection />
    </section>
  );
}
