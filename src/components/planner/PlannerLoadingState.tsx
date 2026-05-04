// src/components/planner/PlannerLoadingState.tsx
import { Loader2 } from "lucide-react";

export function PlannerLoadingState() {
  return (
    <div
      className="h-full flex items-center justify-center bg-background"
      aria-label="Loading planner"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2
          size={40}
          className="text-primary animate-spin"
          aria-hidden="true"
        />
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">
          Loading timeline…
        </p>
      </div>
    </div>
  );
}