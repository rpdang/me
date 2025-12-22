'use client';

import { useSectionInView } from '@/lib/hooks';
import Avatar from './avatar';
import ConnectSection from './connect-section';
import IntroText from './intro-text';

export default function Home() {
  const { ref } = useSectionInView('Home', 0.75);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-200 text-center sm:mb-0 scroll-mt-400"
    >
      <Avatar />
      <IntroText />
      <ConnectSection />
    </section>
  );
}
