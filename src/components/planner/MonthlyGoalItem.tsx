"use client";

import { Target, Layers, Clock, Trash2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MonthlyGoal } from "@/types";

interface MonthlyGoalItemProps {
  goal: MonthlyGoal;
  isSelected: boolean;
  index: number;
  onSelect: (goal: MonthlyGoal) => void;
  onDelete: (id: string) => void;
}

export function MonthlyGoalItem({
  goal,
  isSelected,
  index,
  onSelect,
  onDelete,
}: MonthlyGoalItemProps) {
  const weekCount = goal.WeeklyGoals?.length || 0;
  const dailyCount = goal.DailyGoals?.length || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ delay: index * 0.03 }}
      onClick={() => onSelect(goal)}
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group overflow-hidden",
        isSelected
          ? "border-primary bg-primary/[0.04] shadow-[0_0_25px_hsl(var(--primary)/0.1)]"
          : "border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/50"
      )}
    >
      {/* active indicator bar */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
      )}

      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors border",
              isSelected
                ? "bg-primary/15 border-primary/30"
                : "bg-muted/50 border-border/50 group-hover:border-primary/20"
            )}
          >
            <Target
              size={14}
              className={cn(
                isSelected
                  ? "text-primary"
                  : "text-muted-foreground/50 group-hover:text-primary/60"
              )}
            />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "font-bold text-sm leading-tight truncate transition-colors",
                isSelected
                  ? "text-primary"
                  : "text-foreground/80 group-hover:text-foreground"
              )}
            >
              {goal.goal}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
                <Layers size={9} className="text-blue-400/60" />
                {weekCount}W
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
                <Clock size={9} className="text-amber-400/60" />
                {dailyCount}D
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(goal.id);
            }}
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground/40 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <ChevronRight
            size={14}
            className={cn(
              "transition-all",
              isSelected
                ? "text-primary opacity-100"
                : "text-muted-foreground/20 opacity-0 group-hover:opacity-100"
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}
