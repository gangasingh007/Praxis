"use client";

import { Calendar, Target, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileStatsProps {
  taskCount: number;
  habitCount: number;
  focusCount: number;
  enlistedSince: string;
}

export function ProfileStats({
  taskCount,
  habitCount,
  focusCount,
  enlistedSince,
}: ProfileStatsProps) {
  const stats = [
    {
      label: "Tasks Completed",
      value: taskCount,
      icon: Target,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      label: "Active Habits",
      value: habitCount,
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
    },
    {
      label: "Focus Sessions",
      value: focusCount,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card/40 border border-border/40 rounded-3xl p-6 space-y-4 backdrop-blur-xl"
      >
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">
          Service Record
        </h3>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", stat.bg)}>
                  <stat.icon size={14} className={stat.color} />
                </div>
                <span className="text-xs font-medium text-muted-foreground/70">{stat.label}</span>
              </div>
              <span className={cn("text-lg font-mono font-black", stat.color)}>{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card/40 border border-border/40 rounded-3xl p-6 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 text-muted-foreground/50 mb-4">
          <Calendar size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Enlisted Since</span>
        </div>
        <p className="text-sm font-mono font-bold text-foreground">
          {enlistedSince}
        </p>
      </motion.div>
    </div>
  );
}
