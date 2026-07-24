"use client";

import { useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";
import { ACT_BY_CHAPTER, type ChapterId } from "@/lib/story";

export default function ActBackground() {
  const { activeSection } = useActiveSectionContext();

  useEffect(() => {
    const act = ACT_BY_CHAPTER[activeSection as ChapterId] ?? "cream";
    document.documentElement.setAttribute("data-act", act);
  }, [activeSection]);

  return (
    <>
      <div className="act-layer" aria-hidden />
      <div className="grain-layer" aria-hidden />
    </>
  );
}
