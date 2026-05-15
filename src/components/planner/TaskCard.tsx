"use client";

import { useState, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskProps {
  id: string;
  title: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  subjectColor?: string;
  onClick?: () => void;
  absoluteStyle?: React.CSSProperties;
  onResizeEnd?: (newDurationMinutes: number) => void;
}

export function TaskCard({ 
  id, 
  title, 
  priority = "MEDIUM", 
  subjectColor, 
  onClick,
  absoluteStyle,
  onResizeEnd
}: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { title, subjectColor, priority },
  });

  const [isResizing, setIsResizing] = useState(false);
  const [resizeHeight, setResizeHeight] = useState<number | null>(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    ...absoluteStyle,
  };

  if (resizeHeight !== null) {
    style.height = `${resizeHeight}px`;
    style.zIndex = 50;
  }

  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startY.current = e.clientY;
    startHeight.current = resizeHeight || (typeof absoluteStyle?.height === 'number' ? absoluteStyle.height : 0);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleResizeMove = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const deltaY = e.clientY - startY.current;
    // Snap to 15-minute increments (20px per 15 mins at 80px/hr)
    const rawHeight = startHeight.current + deltaY;
    const snappedHeight = Math.max(40, Math.round(rawHeight / 20) * 20);
    setResizeHeight(snappedHeight);
  };

  const handleResizeEnd = (e: React.PointerEvent) => {
    if (!isResizing) return;
    setIsResizing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    if (onResizeEnd && resizeHeight !== null) {
      const duration = Math.round((resizeHeight / 80) * 60);
      onResizeEnd(duration);
    }
    setResizeHeight(null);
  };

  const priorityColors = {
    URGENT: "border-rose-500/30 bg-rose-500/5 shadow-[0_4px_12px_rgba(244,63,94,0.1)]",
    HIGH: "border-destructive/30 bg-destructive/5 shadow-[0_4px_12px_rgba(var(--destructive),0.1)]",
    MEDIUM: "border-amber-500/30 bg-amber-500/5 shadow-[0_4px_12px_rgba(245,158,11,0.08)]",
    LOW: "border-primary/30 bg-primary/5 shadow-[0_4px_12px_rgba(var(--primary),0.05)]",
  };

  const priorityBadge = {
    URGENT: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    HIGH: "bg-destructive/10 text-destructive border-destructive/20",
    MEDIUM: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    LOW: "bg-primary/10 text-primary border-primary/20",
  };

  const durationLabel = absoluteStyle?.height 
    ? `${Math.round((Number(absoluteStyle.height) / 80) * 60)}m`
    : "";

  return (
    <motion.div
      layoutId={id}
      initial={false}
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex flex-col p-2 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300",
        !absoluteStyle && "h-16 min-w-[160px] max-w-[220px]",
        priorityColors[priority as keyof typeof priorityColors] || priorityColors.MEDIUM,
        isDragging && "opacity-40 ring-4 ring-primary/20 shadow-2xl z-50 scale-[1.02] rotate-1",
        isResizing && "ring-2 ring-primary/40 shadow-xl z-50",
        "hover:bg-accent/10 hover:border-accent/40 hover:shadow-lg",
        absoluteStyle && "absolute"
      )}
      onClick={onClick}
    >
      {/* Top Bar with Accent and Drag Handle */}
      <div className="flex items-center gap-2 mb-1.5 shrink-0">
        <div 
          className="w-2.5 h-1 rounded-full shrink-0" 
          style={{ backgroundColor: subjectColor || "grey" }} 
        />
        <div 
          {...listeners} 
          {...attributes}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-foreground/5 rounded-md transition-colors shrink-0 opacity-0 group-hover:opacity-100"
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
        
        <div className="flex-1" />

        {durationLabel && (
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5 rounded-full border border-border/20">
            <Clock size={8} />
            {durationLabel}
          </div>
        )}
      </div>

      {/* Title and Badge */}
      <div className="flex flex-col flex-1 min-w-0 text-left overflow-hidden">
        <span className="text-[13px] font-bold truncate tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
          {title}
        </span>
        <div className="flex items-center gap-2 mt-auto pb-1">
          <span className={cn(
            "text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider border",
            priorityBadge[priority as keyof typeof priorityBadge] || priorityBadge.MEDIUM
          )}>
            {priority}
          </span>
        </div>
      </div>

      {/* Resize Handle */}
      {absoluteStyle && (
        <div
          className="absolute bottom-0 left-0 right-0 h-4 flex items-center justify-center cursor-ns-resize z-20 group/handle"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
        >
          <div className="w-8 h-1 rounded-full bg-border/20 group-hover/handle:bg-primary/40 transition-colors" />
        </div>
      )}

      {/* Gradient Overlay for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />
    </motion.div>
  );
}
