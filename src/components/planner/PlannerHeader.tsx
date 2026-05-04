// src/components/planner/PlannerHeader.tsx
import { Plus } from "lucide-react";
import { CurrentTime } from "./CurrentTime";

interface PlannerHeaderProps {
  onAddTask: () => void;
}

export function PlannerHeader({ onAddTask }: PlannerHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-border/60 bg-background/70 backdrop-blur-xl shrink-0">
      <div className="flex items-center justify-between gap-4">
        <CurrentTime />

        <button
          onClick={onAddTask}
          aria-label="Add new task"
          className="group flex items-center gap-2 px-4 py-2 rounded-xl
            bg-muted/50 border border-border/50
            hover:border-primary/40 hover:bg-primary/5
            transition-all duration-200
            text-sm font-bold uppercase tracking-wider"
        >
          <Plus
            size={14}
            className="text-primary transition-transform duration-200 group-hover:rotate-90"
            aria-hidden="true"
          />
          <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground transition-colors">
            Add Task
          </span>
        </button>
      </div>
    </header>
  );
}