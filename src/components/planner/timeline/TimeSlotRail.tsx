// src/components/planner/timeline/TimeSlotRail.tsx
import { cn } from "@/lib/utils";

interface TimeSlotRailProps {
  isCurrentHour: boolean;
  hasTask: boolean;
}

export function TimeSlotRail({ isCurrentHour, hasTask }: TimeSlotRailProps) {
  return (
    <div className="relative shrink-0 flex flex-col items-center pt-2 w-4">
      {/* Vertical line */}
      <div
        className={cn(
          "w-px h-full min-h-[56px] transition-all duration-300",
          isCurrentHour
            ? "bg-primary/40 shadow-[0_0_8px_rgba(var(--primary),0.2)]"
            : "bg-border/20 group-hover/slot:bg-border/40"
        )}
      />
      {/* Dot */}
      <div
        className={cn(
          "absolute top-[10px] w-2.5 h-2.5 rounded-full border-2 border-background",
          "transition-all duration-500",
          isCurrentHour
            ? "bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)] scale-110"
            : hasTask
              ? "bg-primary/50 group-hover/slot:bg-primary/70"
              : "bg-border group-hover/slot:bg-muted-foreground/30"
        )}
      />
    </div>
  );
}