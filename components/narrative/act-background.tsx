"use client";

import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ACT_BY_CHAPTER, type ChapterId } from "@/lib/story";

// Legacy anchors (see app/page.tsx) that don't match a ChapterId directly.
const LEGACY_ANCHOR_ALIASES: Record<string, ChapterId> = {
  home: "prologue",
  about: "two-cultures",
  education: "craft",
  experience: "scale",
  projects: "zero-to-one",
  contact: "epilogue",
};

export default function ActBackground() {
  const { activeSection } = useActiveSectionContext();

  useEffect(() => {
    const act = ACT_BY_CHAPTER[activeSection] ?? "cream";
    document.documentElement.setAttribute("data-act", act);
  }, [activeSection]);

  // On first mount, a deep link may land directly in a "slate" chapter. Read
  // the hash immediately so we don't flash "cream" before the scroll
  // observer catches up and updates activeSection.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const chapterId = (LEGACY_ANCHOR_ALIASES[hash] ?? hash) as ChapterId;
    const hashAct = ACT_BY_CHAPTER[chapterId];
    if (hashAct === "slate") {
      document.documentElement.setAttribute("data-act", hashAct);
    }
  }, []);

  return (
    <>
      <div className="act-layer" aria-hidden />
      <div className="grain-layer" aria-hidden />
    </>
  );
}
