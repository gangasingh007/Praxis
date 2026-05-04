// src/components/planner/PlannerTimeline.tsx
import { TIME_SLOTS } from "./constants/time";
import { TimeSlotRow } from "./timeline/TimeSlotRow";
import type { Task } from "../../types/index";

interface PlannerTimelineProps {
  tasks: Task[];
  currentHourSlot: string;
  currentMinute: number;
  getTaskTimeSlot: (task: Task) => string | null;
  onEditTask: (task: Task) => void;
}

export function PlannerTimeline({
  tasks,
  currentHourSlot,
  currentMinute,
  getTaskTimeSlot,
  onEditTask,
}: PlannerTimelineProps) {
  return (
    <main className="flex-1 overflow-y-auto relative">
      {/* Sticky section header */}
      <div className="sticky top-0 z-20 px-6 pt-5 pb-3 bg-background/80 backdrop-blur-sm border-b border-border/30 flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
          Day Timeline
        </h2>
        <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
          {TIME_SLOTS.length} blocks
        </span>
      </div>

      {/* Slot list */}
      <div className="px-6 pb-16 pt-4 space-y-1">
        {TIME_SLOTS.map((time) => (
          <TimeSlotRow
            key={time}
            time={time}
            isCurrentHour={time === currentHourSlot}
            currentMinute={currentMinute}
            slotTasks={tasks.filter((t) => getTaskTimeSlot(t) === time)}
            onEditTask={onEditTask}
          />
        ))}
      </div>
    </main>
  );
}