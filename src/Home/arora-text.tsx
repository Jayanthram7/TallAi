"use client";

import { cn } from "./utils.ts";
import { motion, MotionProps } from "framer-motion";
import React from "react";

interface AuroraTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}: AuroraTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent className={cn("relative inline-flex", className)} {...props}>
      {/* The visible text */}
      <span className="relative z-10 text-white">{children}</span>
      
      {/* The aurora layer masked to the text */}
      <span
        className="absolute inset-0 pointer-events-none"
        // Using WebKit masking; note that browser support may vary.
        style={{
          WebkitMaskImage: "linear-gradient(white, white)",
          maskImage: "linear-gradient(white, white)",
        }}
      >
        <span className="absolute -top-1/2 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]" />
        <span className="absolute right-0 top-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[1rem]" />
        <span className="absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]" />
        <span className="absolute -bottom-1/2 right-0 h-[30vw] w-[30vw] animate-[aurora-border_6s_ease-in-out_infinite,aurora-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]" />
      </span>
    </MotionComponent>
  );
}
