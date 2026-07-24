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
      <Prologue />
      <TwoCultures />
      <Craft />
      <Scale />
      <ZeroToOne />
      <Offline />
      <Epilogue />
    </main>
  );
}
