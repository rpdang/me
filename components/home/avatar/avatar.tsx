"use client";

import profilePic from "@/public/robin.jpg";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Avatar() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.5,
          }}
          className="relative"
        >
          {/* Avatar container with editorial warm gradient border */}
          <div className="relative rounded-full p-[3px] bg-linear-to-br from-primary via-accent to-primary">
            <div className="rounded-full bg-background p-[2px]">
              <Image
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover"
                alt="Robin Dang portrait"
                src={profilePic}
                width={192}
                height={192}
                quality={95}
                priority={true}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
