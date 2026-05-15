// src/components/planner/timeline/TimeSlotRow.tsx
import { cn } from "@/lib/utils";
import { TaskCard } from "../TaskCard";
import { TimeBlock } from "../TimeBlock";
import { TimeSlotRail } from "./TimeSlotRail";
import { CurrentTimeIndicator } from "./CurrentTimeIndicator";
import { PeriodLabel } from "./PeriodLabel";
import { PERIOD_LABELS } from "../constants/time";
import type { Task } from "../../../types";

interface TimeSlotRowProps {
  time: string;
  isCurrentHour: boolean;
  currentMinute: number;
  hasTasks?: boolean;
}

export function TimeSlotRow({
  time,
  isCurrentHour,
  currentMinute,
  hasTasks = false,
}: TimeSlotRowProps) {
  const periodLabel = PERIOD_LABELS[time as keyof typeof PERIOD_LABELS];

  return (
    <div className="relative group/slot h-[80px]">
      {/* Period boundary label - rendered absolute to not shift grid */}
      {periodLabel && (
        <PeriodLabel 
          label={periodLabel} 
          className="absolute -top-6 left-0 right-0 z-10 pointer-events-none" 
        />
      )}

      {/* Live time rule */}
      {isCurrentHour && (
        <CurrentTimeIndicator minuteOffset={currentMinute} />
      )}

        <div
          className={cn(
            "flex items-start gap-3 h-full transition-all duration-300 border-b border-border/5 relative overflow-hidden",
            isCurrentHour ? "bg-primary/[0.04]" : "hover:bg-muted/20"
          )}
        >
          {/* Subtle background glow for current hour */}
          {isCurrentHour && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          )}
          {/* Hour label */}
          <div className="w-12 shrink-0 pt-2 text-right">
            <span
              className={cn(
                "text-xs font-mono font-bold tabular-nums transition-colors duration-200",
                isCurrentHour
                  ? "text-primary"
                  : "text-muted-foreground/40 group-hover/slot:text-muted-foreground/60"
              )}
            >
              {time}
            </span>
          </div>

          {/* Rail */}
          <TimeSlotRail
            isCurrentHour={isCurrentHour}
            hasTask={hasTasks}
          />

          {/* Drop zone */}
          <div className="flex-1 min-w-0 pb-1">
            <TimeBlock id={time} timeLabel={time} hideLabel />
          </div>
        </div>
    </div>
  );
}