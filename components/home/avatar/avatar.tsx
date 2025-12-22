"use client";

import { ShineBorder } from "@/components/ui/shine-border";
import dynamic from "next/dynamic";

const PixelImage = dynamic(
  () => import("@/components/ui/pixel-image").then((mod) => mod.PixelImage),
  { ssr: false }
);

export default function Avatar() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative rounded-2xl">
        <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl">
          <ShineBorder
            shineColor={["#b85a32", "#d4a84b", "#822e3a"]}
            borderWidth={2}
            duration={10}
          />
        </div>
        <PixelImage
          src="/robin.jpg"
          grid="8x8"
          grayscaleAnimation={true}
          pixelFadeInDuration={800}
          maxAnimationDelay={1000}
          colorRevealDelay={1200}
          className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
          imageClassName="rounded-2xl"
        />
      </div>
    </div>
  );
}
