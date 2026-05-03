// src/components/landing/shared/GlowOrb.tsx
import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  intensity?: "low" | "medium" | "high";
}

const sizeMap = {
  sm: "w-[300px] h-[200px]",
  md: "w-[500px] h-[350px]",
  lg: "w-[700px] h-[450px]",
  xl: "w-[900px] h-[600px]",
};

const intensityMap = {
  low: "bg-primary/5 blur-[80px]",
  medium: "bg-primary/10 blur-[120px]",
  high: "bg-primary/20 blur-[160px]",
};

export function GlowOrb({
  className,
  size = "lg",
  intensity = "medium",
}: GlowOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none -z-10",
        sizeMap[size],
        intensityMap[intensity],
        className
      )}
    />
  );
}