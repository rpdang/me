"use client";

import MaskedLines from "./masked-lines";

export default function ChapterHeading({
  number,
  title,
}: {
  number: number | null;
  title: string;
}) {
  return (
    <div className="mb-12 md:mb-20">
      {number !== null && (
        <span className="mb-3 block font-mono text-sm text-terracotta">
          {String(number).padStart(2, "0")}
        </span>
      )}
      <h2>
        <MaskedLines
          lines={[title]}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-tight"
        />
      </h2>
    </div>
  );
}
