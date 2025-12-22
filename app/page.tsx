import About from '@/components/about';
import Contact from '@/components/contact';
import Education from '@/components/education';
import Experience from '@/components/experiences';
import Home from '@/components/home';
import Projects from '@/components/projects';
import SectionDivider from '@/components/section-divider';
import Skills from '@/components/skills';

export default function Page() {
  return (
    <main className="flex flex-col items-center px-4">
      <Home />
      <SectionDivider />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Education />
      <Contact />
    </main>
  );
}
