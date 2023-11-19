import About from '@/components/about';
import Home from '@/components/home';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';

export default function Page() {
  return (
    <main className="flex flex-col items-center px-4 h-[5000px]">
      <Home />
      <SectionDivider />
      <About />
      <Projects />
    </main>
  );
}
