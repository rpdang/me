import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rainbowButtonVariants = cva(
  cn(
    "relative cursor-pointer group transition-all animate-rainbow",
    "inline-flex items-center justify-center gap-2 shrink-0",
    "rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring",
    "text-sm font-medium whitespace-nowrap",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    // Rainbow border gradient
    "bg-[length:200%]",
    "[background-clip:padding-box,border-box,border-box]",
    "[background-origin:border-box]",
    "[border:calc(0.125rem)_solid_transparent]",
    // Subtle glow effect
    "before:absolute before:bottom-[-15%] before:left-1/2 before:z-0",
    "before:h-[10%] before:w-2/5 before:-translate-x-1/2 before:opacity-50",
    "before:animate-rainbow before:[filter:blur(0.5rem)]",
    "before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]"
  ),
  {
    variants: {
      variant: {
        default: cn(
          // Terracotta/primary button with light text
          "bg-[linear-gradient(hsl(var(--primary)),hsl(var(--primary))),linear-gradient(hsl(var(--primary))_50%,hsl(var(--primary)/0.6)_80%,transparent),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
          "text-primary-foreground"
        ),
        outline: cn(
          // Outline with background fill and visible border
          "ring-1 ring-border",
          "bg-[linear-gradient(hsl(var(--background)),hsl(var(--background))),linear-gradient(hsl(var(--background))_50%,hsl(var(--background)/0.6)_80%,transparent),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
          "text-foreground"
        ),
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rainbowButtonVariants> {
  asChild?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export { RainbowButton, rainbowButtonVariants, type RainbowButtonProps };
