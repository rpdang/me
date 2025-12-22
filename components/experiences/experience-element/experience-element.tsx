"use client";

import { Experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ExperienceProps = {
  experience: Experience;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function ExperienceElement({
  experience: { company, date, title, location, logo },
  isFirst = false,
  isLast = false,
}: ExperienceProps) {
  return (
    <div
      className={cn(
        "relative flex gap-4 sm:gap-6 pl-0",
        !isLast && "pb-8"
      )}
    >
      {/* Timeline dot & logo */}
      <div className="relative flex-shrink-0 z-10">
        <div
          className={cn(
            "relative flex items-center justify-center rounded-xl transition-all duration-300",
            "w-12 h-12 sm:w-16 sm:h-16",
            "bg-card border-2",
            isFirst
              ? "border-primary/40 shadow-md shadow-primary/10"
              : "border-border hover:border-primary/20"
          )}
        >
          {logo ? (
            <Image
              src={logo}
              alt={`${company} logo`}
              width={32}
              height={32}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain dark:invert opacity-90"
            />
          ) : (
            <div className="w-3 h-3 rounded-full bg-primary/60" />
          )}

          {/* Current indicator */}
          {isFirst && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1">
          {/* Company & Title */}
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-wider text-primary mb-0.5">
              {company}
            </p>
            <h3
              className={cn(
                "font-display font-semibold leading-tight",
                isFirst ? "text-lg sm:text-xl" : "text-base sm:text-lg",
                "text-foreground"
              )}
            >
              {title}
            </h3>
          </div>

          {/* Date badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isFirst && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Current
              </span>
            )}
            <span className="font-mono text-xs text-muted-foreground">
              {date}
            </span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
          <svg
            className="w-3.5 h-3.5 opacity-60 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {location}
        </p>
      </div>
    </div>
  );
}
