// src/components/landing/shared/GlowOrb.tsx
"use client";

import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "low" | "medium" | "high";
  color?: "primary" | "accent" | "muted";
}

const sizeMap = {
  sm: "w-[300px] h-[200px]",
  md: "w-[500px] h-[350px]",
  lg: "w-[700px] h-[450px]",
  xl: "w-[900px] h-[600px]",
};

const intensityMap = {
  low: "blur-[80px]",
  medium: "blur-[120px]",
  high: "blur-[160px]",
};

const colorIntensityMap = {
  primary: { low: "bg-primary/5", medium: "bg-primary/10", high: "bg-primary/20" },
  accent: { low: "bg-accent/10", medium: "bg-accent/20", high: "bg-accent/30" },
  muted: { low: "bg-muted/20", medium: "bg-muted/30", high: "bg-muted/40" },
};

export function GlowOrb({
  className,
  size = "lg",
  intensity = "medium",
  color = "primary",
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none -z-10",
        "animate-[glow-drift_8s_ease-in-out_infinite]",
        sizeMap[size],
        intensityMap[intensity],
        colorIntensityMap[color][intensity],
        className
      )}
      style={{
        animation: "glow-drift 8s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes glow-drift {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.08) translateY(-8px);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}