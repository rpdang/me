"use client"

import { motion, MotionProps, useScroll } from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92] shadow-[0_0_10px_rgba(243,140,184,0.5)]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
}
