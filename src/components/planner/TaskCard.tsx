"use client";

import { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useSpring } from "framer-motion";

interface TaskProps {
  id: string;
  title: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  subjectColor?: string;
  onClick?: () => void;
  absoluteStyle?: React.CSSProperties;
  onResizeEnd?: (newDurationMinutes: number) => void;
  isOverlay?: boolean;
}

export function TaskCard({ 
  id, 
  title, 
  priority = "MEDIUM", 
  subjectColor, 
  onClick,
  absoluteStyle,
  onResizeEnd,
  isOverlay = false
}: TaskProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { title, subjectColor, priority },
    disabled: isOverlay
  });

  const [isResizing, setIsResizing] = useState(false);
  const [visualHeight, setVisualHeight] = useState<number | null>(null);
  const startY = useRef(0);
  const startHeight = useRef(0);

  // Smooth spring for the snapped height preview
  const springSnapHeight = useSpring(Number(absoluteStyle?.height) || 0, {
    stiffness: 300,
    damping: 30,
  });

  const currentHeight = visualHeight !== null ? visualHeight : (Number(absoluteStyle?.height) || 0);
  const snappedHeightPreview = Math.round(currentHeight / 20) * 20;

  useEffect(() => {
    springSnapHeight.set(snappedHeightPreview);
  }, [snappedHeightPreview, springSnapHeight]);

  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startY.current = e.clientY;
    startHeight.current = Number(absoluteStyle?.height) || 0;
    setVisualHeight(startHeight.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = 'ns-resize';
  };

  const handleResizeMove = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const deltaY = e.clientY - startY.current;
    const newRawHeight = Math.max(40, startHeight.current + deltaY);
    setVisualHeight(newRawHeight);
  };

  const handleResizeEnd = (e: React.PointerEvent) => {
    if (!isResizing) return;
    setIsResizing(false);
    document.body.style.cursor = '';
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    
    if (onResizeEnd && visualHeight !== null) {
      // Snap on end
      const snappedHeight = Math.round(visualHeight / 20) * 20;
      const duration = Math.round((snappedHeight / 80) * 60);
      onResizeEnd(duration);
    }
    setVisualHeight(null);
  };

  const style: React.CSSProperties = {
    transform: isOverlay ? undefined : CSS.Translate.toString(transform),
    ...absoluteStyle,
  };

  const priorityStyles = {
    URGENT: {
      container: "border-rose-500/30 bg-rose-500/5 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100 shadow-rose-500/10",
      badge: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
    },
    HIGH: {
      container: "border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10 text-orange-900 dark:text-orange-100 shadow-orange-500/10",
      badge: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
    },
    MEDIUM: {
      container: "border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 text-amber-900 dark:text-amber-100 shadow-amber-500/10",
      badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    },
    LOW: {
      container: "border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100 shadow-blue-500/10",
      badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    },
  };

  const currentPriorityStyle = priorityStyles[priority as keyof typeof priorityStyles] || priorityStyles.MEDIUM;

  // const currentHeight = visualHeight !== null ? visualHeight : (Number(absoluteStyle?.height) || 0);
  // const snappedHeightPreview = Math.round(currentHeight / 20) * 20;
  const durationMinutes = Math.round((currentHeight / 80) * 60);
  const durationLabel = `${durationMinutes}m`;

  return (
    <motion.div
      layoutId={isOverlay ? undefined : id}
      initial={false}
      ref={setNodeRef}
      style={{
        ...style,
        height: isResizing ? visualHeight! : style.height,
        zIndex: isResizing || isDragging ? 50 : style.zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
        mass: 0.8
      }}
      className={cn(
        "group flex flex-col p-2.5 rounded-xl border cursor-pointer relative overflow-hidden backdrop-blur-sm",
        !absoluteStyle && "h-16 min-w-[160px] max-w-[220px]",
        currentPriorityStyle.container,
        isDragging && "opacity-20 ring-4 ring-primary/20 shadow-2xl scale-[1.02]",
        isResizing && "ring-2 ring-primary/40 shadow-2xl z-50 transition-none",
        isOverlay && "opacity-100 shadow-2xl scale-105 rotate-1 cursor-grabbing ring-2 ring-primary border-primary z-[100]",
        !isDragging && !isResizing && !isOverlay && "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30",
        absoluteStyle && !isOverlay && "absolute"
      )}
      onClick={onClick}
    >
      {/* Premium shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Snap Indicator Ghost (while resizing) */}
      {isResizing && (
        <motion.div 
          className="absolute inset-x-0 top-0 bg-primary/10 border-b-2 border-primary/30 pointer-events-none z-0"
          style={{ height: springSnapHeight }}
        />
      )}

      {/* Top Bar with Accent and Drag Handle */}
      <div className="flex items-center gap-2 mb-2 shrink-0 relative z-10">
        <div 
          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ring-2 ring-background" 
          style={{ backgroundColor: subjectColor || "var(--muted)" }} 
        />
        <div 
          {...listeners} 
          {...attributes}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-foreground/5 rounded-md transition-colors shrink-0 opacity-0 group-hover:opacity-100"
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
        
        <div className="flex-1" />

        {absoluteStyle && (
          <motion.div 
            layout="position"
            className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground bg-background/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-foreground/5 shadow-sm"
          >
            <Clock size={10} className="text-primary/70" />
            {durationLabel}
          </motion.div>
        )}
      </div>

      {/* Title and Badge */}
      <div className="flex flex-col flex-1 min-w-0 text-left overflow-hidden relative z-10">
        <span className="text-[13px] font-semibold truncate tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </span>
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className={cn(
            "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm transition-colors duration-300",
            currentPriorityStyle.badge
          )}>
            {priority}
          </span>
        </div>
      </div>

      {/* Resize Handle */}
      {absoluteStyle && (
        <div
          className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center cursor-ns-resize z-30 group/handle pb-1.5"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
        >
          <div className={cn(
            "w-12 h-1.5 rounded-full bg-foreground/10 transition-all duration-300",
            "group-hover/handle:bg-primary/50 group-hover/handle:w-20 group-hover/handle:h-2",
            isResizing && "bg-primary w-24 h-2 shadow-lg"
          )} />
          
          {/* Snap pulses */}
          {isResizing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-primary/10 animate-pulse" />
            </div>
          )}
        </div>
      )}

      {/* Duration Tooltip (Visible only when resizing) */}
      <AnimatePresence>
        {isResizing && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-[100] px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[11px] font-black shadow-xl flex items-center gap-2"
          >
            <Clock size={12} className="animate-pulse" />
            {durationLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
