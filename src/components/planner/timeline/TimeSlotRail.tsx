// src/components/planner/timeline/TimeSlotRail.tsx
import { cn } from "@/lib/utils";

interface TimeSlotRailProps {
  isCurrentHour: boolean;
  hasTask: boolean;
}

export function TimeSlotRail({ isCurrentHour, hasTask }: TimeSlotRailProps) {
  return (
    <div className="relative shrink-0 flex flex-col items-center pt-2">
      {/* Vertical line */}
      <div
        className={cn(
          "w-px h-full min-h-[56px] transition-colors duration-200",
          isCurrentHour
            ? "bg-primary/30"
            : "bg-border/30 group-hover/slot:bg-border/50"
        )}
      />
      {/* Dot */}
      <div
        className={cn(
          "absolute top-[6px] w-2 h-2 rounded-full border-2 border-background",
          "transition-all duration-200",
          isCurrentHour
            ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
            : hasTask
              ? "bg-primary/60"
              : "bg-border group-hover/slot:bg-muted-foreground/40"
        )}
      />
    </div>
  );
}