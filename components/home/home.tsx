'use client';

import Avatar from './avatar';
import ConnectSection from './connect-section';
import IntroText from './intro-text';

export default function Home() {
  return (
    <section
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <Avatar />
      <IntroText />
      <ConnectSection />
    </section>
  );
}
