// src/components/planner/sidebar/SidebarInboxTab.tsx
import { CheckCircle2, Inbox, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskCard } from "../TaskCard";
import { TimeBlock } from "../TimeBlock";
import type { Task } from "../../../types/index";

interface SidebarInboxTabProps {
  unscheduledTasks: Task[];
  onEditTask: (task: Task) => void;
}

export function SidebarInboxTab({
  unscheduledTasks,
  onEditTask,
}: SidebarInboxTabProps) {
  const count = unscheduledTasks.length;
  const isEmpty = count === 0;

  return (
    <div className="p-4 flex flex-col gap-3 h-full">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Inbox size={13} className="text-muted-foreground/60" aria-hidden="true" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            Unscheduled
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 border border-border/40">
          <span className="text-[10px] font-black text-foreground">{count}</span>
          <span className="text-[10px] font-mono text-muted-foreground/50">tasks</span>
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={cn(
          "flex-1 min-h-[200px] rounded-2xl border-2 border-dashed",
          "transition-all duration-300 p-2",
          !isEmpty
            ? "border-border/40 bg-background/30 hover:border-primary/20 hover:bg-primary/[0.02]"
            : "border-border/20 bg-background/10"
        )}
      >
        <TimeBlock id="unscheduled">
          {unscheduledTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              priority={task.priority?.toUpperCase() as "LOW" | "MEDIUM" | "HIGH" | undefined}
              subjectColor={task.subject?.colorCode}
              onClick={() => onEditTask(task)}
            />
          ))}

          {isEmpty && <InboxEmptyState />}
        </TimeBlock>
      </div>

      {/* Drag hint */}
      <p className="text-[11px] font-mono text-muted-foreground/50 leading-relaxed tracking-wide px-1">
        Drag tasks onto a time slot to schedule them.
      </p>
    </div>
  );
}

function InboxEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-4 text-center p-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.08)]">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" aria-hidden="true" />
        </div>
        {/* Zap badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
          <Zap size={8} className="text-emerald-400" aria-hidden="true" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-black uppercase tracking-widest text-foreground/60">
          Inbox Clear
        </p>
        <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
          All tasks scheduled
        </p>
      </div>
    </div>
  );
}