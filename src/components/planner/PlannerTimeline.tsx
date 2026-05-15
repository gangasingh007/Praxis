// src/components/planner/PlannerTimeline.tsx
import { useMemo } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { TIME_SLOTS, taskTimeSlot } from "./constants/time";
import { TimeSlotRow } from "./timeline/TimeSlotRow";
import { TaskCard } from "./TaskCard";
import { calculateTaskLayout } from "@/lib/planner-utils";
import type { Task } from "../../types/index";

interface PlannerTimelineProps {
  tasks: Task[];
  currentHourSlot: string;
  currentMinute: number;
  onEditTask: (task: Task) => void;
  onUpdateTaskDuration?: (taskId: string, durationMinutes: number) => void;
}

export function PlannerTimeline({
  tasks,
  currentHourSlot,
  currentMinute,
  onEditTask,
  onUpdateTaskDuration,
}: PlannerTimelineProps) {
  // Calculate layout for all scheduled tasks
  const tasksWithPositions = useMemo(() => {
    return calculateTaskLayout(tasks);
  }, [tasks]);

  // Map to check if a slot has tasks starting in it
  const slotHasTasks = useMemo(() => {
    const map: Record<string, boolean> = {};
    tasks.forEach(task => {
      const slot = taskTimeSlot(task.startTime);
      if (slot) map[slot] = true;
    });
    return map;
  }, [tasks]);

  return (
    <main className="flex-1 overflow-y-auto relative scroll-smooth scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/20">
      {/* Sticky section header */}
      <div className="sticky top-0 z-30 px-6 pt-5 pb-3 bg-background/60 backdrop-blur-md border-b border-border/10 flex items-center justify-between">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/70">
          Day Timeline
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-widest">
            {TIME_SLOTS.length} blocks
          </span>
        </div>
      </div>

      <LayoutGroup>
        {/* Timeline Grid and Tasks */}
        <div className="px-6 pb-20 pt-8 relative">
          {/* Background Grid */}
          <div className="space-y-0">
            {TIME_SLOTS.map((time) => (
              <TimeSlotRow
                key={time}
                time={time}
                isCurrentHour={time === currentHourSlot}
                currentMinute={currentMinute}
                hasTasks={slotHasTasks[time]}
              />
            ))}
          </div>

          {/* Foreground Tasks Layer */}
          <div 
            className="absolute top-8 bottom-20 right-6"
            style={{ left: "calc(1.5rem + 48px + 12px + 16px + 12px)" }}
          >
            {tasksWithPositions.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                priority={task.priority?.toUpperCase() as any}
                subjectColor={task.subject?.colorCode}
                onClick={() => onEditTask(task)}
                onResizeEnd={(newDuration) => onUpdateTaskDuration?.(task.id, newDuration)}
                absoluteStyle={{
                  top: `${task.position.top}px`,
                  height: `${task.position.height}px`,
                  left: task.position.left,
                  width: task.position.width,
                }}
              />
            ))}
          </div>
        </div>
      </LayoutGroup>
    </main>
  );
}