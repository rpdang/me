import Prologue from "@/components/chapters/prologue";
import TwoCultures from "@/components/chapters/two-cultures";
import Craft from "@/components/chapters/craft";
import Scale from "@/components/chapters/scale";
import ZeroToOne from "@/components/chapters/zero-to-one";
import Offline from "@/components/chapters/offline";
import Epilogue from "@/components/chapters/epilogue";
import ActBackground from "@/components/narrative/act-background";
import ChapterRail from "@/components/thread/chapter-rail";

export default function Home() {
  return (
    <main className="text-[var(--act-fg)]">
      <ActBackground />
      <ChapterRail />
      <span id="home" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <Prologue />
      <span id="about" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <TwoCultures />
      <span id="education" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <Craft />
      <span id="experience" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <Scale />
      <span id="projects" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <ZeroToOne />
      <Offline />
      <span id="contact" aria-hidden className="block h-0 w-0 overflow-hidden" />
      <Epilogue />
    </main>
  );
}
