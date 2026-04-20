"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface TimeBlockProps {
  id: string; 
  timeLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export function TimeBlock({ id, timeLabel, children, className }: TimeBlockProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const isInbox = !timeLabel;

  return (
    <div 
      className={cn(
        "flex gap-4 group",
        isInbox ? "h-full w-full" : "h-[80px]",
        className
      )}
    >
      {/* Time Label - Only show if provided */}
      {timeLabel && (
        <div className="w-16 text-right pt-2 shrink-0">
          <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
            {timeLabel}
          </span>
        </div>
      )}

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-xl transition-all duration-200",
          isInbox 
            ? "bg-transparent min-h-[150px]" 
            : "border border-dashed border-border p-2 hover:border-muted-foreground/30",
          isOver && "bg-primary/10 border-primary/50 ring-2 ring-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)]",
          isInbox && isOver && "bg-accent/40"
        )}
      >
        <div className={cn(
          "flex gap-2 h-full",
          isInbox ? "flex-col p-1" : "flex-wrap"
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}