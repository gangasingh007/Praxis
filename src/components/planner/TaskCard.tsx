"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskProps {
  id: string;
  title: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  subjectColor?: string;
  onClick?: () => void;
}

export function TaskCard({ id, title, priority = "MEDIUM", subjectColor, onClick }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { title, subjectColor, priority },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priorityColors = {
    HIGH: "border-destructive/50 shadow-[0_0_10px_rgba(var(--destructive),0.2)]",
    MEDIUM: "border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    LOW: "border-primary/50 shadow-[0_0_10px_rgba(var(--primary),0.05)]",
  };

  const priorityLabels = {
    HIGH: "bg-destructive text-destructive-foreground",
    MEDIUM: "bg-amber-500 text-white",
    LOW: "bg-primary text-primary-foreground",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 p-2 rounded-lg border bg-card/80 backdrop-blur-sm cursor-pointer transition-all",
        "h-14 min-w-[140px] max-w-[200px]",
        priorityColors[priority],
        isDragging && "opacity-50 ring-2 ring-ring shadow-2xl z-50 scale-105",
        "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <div 
        className="w-1.5 h-full rounded-full shrink-0" 
        style={{ backgroundColor: subjectColor || "var(--muted)" }} 
      />
      <div 
        {...listeners} 
        {...attributes}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded transition-colors"
      >
        <GripVertical className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
      </div>
      <div className="flex flex-col flex-1 min-w-0 text-left">
        <span className="text-xs font-bold truncate leading-tight text-foreground">{title}</span>
        <span className={cn(
          "text-[8px] font-black px-1 rounded-sm w-fit mt-1 uppercase tracking-tighter",
          priorityLabels[priority]
        )}>
          {priority}
        </span>
      </div>
    </div>
  );
}
