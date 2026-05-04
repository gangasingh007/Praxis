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
  slotTasks: Task[];
  onEditTask: (task: Task) => void;
}

export function TimeSlotRow({
  time,
  isCurrentHour,
  currentMinute,
  slotTasks,
  onEditTask,
}: TimeSlotRowProps) {
  const periodLabel = PERIOD_LABELS[time as keyof typeof PERIOD_LABELS];

  return (
    <div>
      {/* Period boundary label */}
      {periodLabel && <PeriodLabel label={periodLabel} />}

      <div className="relative group/slot">
        {/* Live time rule */}
        {isCurrentHour && (
          <CurrentTimeIndicator minuteOffset={currentMinute} />
        )}

        <div
          className={cn(
            "flex items-start gap-3 rounded-xl p-1 transition-all duration-200",
            isCurrentHour ? "bg-primary/[0.03]" : "hover:bg-muted/30"
          )}
        >
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
            hasTask={slotTasks.length > 0}
          />

          {/* Drop zone + tasks */}
          <div className="flex-1 min-w-0 pb-1">
            <TimeBlock id={time} timeLabel={time}>
              {slotTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  priority={task.priority?.toUpperCase() as "LOW" | "MEDIUM" | "HIGH" | undefined}
                  subjectColor={task.subject?.colorCode}
                  onClick={() => onEditTask(task)}
                />
              ))}
            </TimeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}