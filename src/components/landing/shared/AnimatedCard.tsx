// src/components/landing/shared/AnimatedCard.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

export function AnimatedCard({
  children,
  className,
  variants = defaultVariants,
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={variants}
      className={cn(
        "group relative rounded-2xl bg-card border border-border/60",
        "hover:border-primary/40 backdrop-blur-xl",
        "transition-all duration-500",
        "shadow-sm hover:shadow-[0_8px_40px_hsl(var(--primary)/0.08)]",
        "overflow-hidden",
        className
      )}
    >
      {/* Inner hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Top edge shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}