"use client";

import { Target, TrendingUp, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalStatsProps {
  monthlyCount: number;
  weeklyCount: number;
  dailyCount: number;
}

export function GoalStats({
  monthlyCount,
  weeklyCount,
  dailyCount,
}: GoalStatsProps) {
  const stats = [
    {
      icon: Target,
      label: "Monthly",
      value: monthlyCount,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      icon: TrendingUp,
      label: "Weekly",
      value: weeklyCount,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      icon: Crosshair,
      label: "Daily",
      value: dailyCount,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ icon: Icon, label, value, color, bg, border }) => (
        <div
          key={label}
          className={cn(
            "flex items-center gap-3 p-3.5 rounded-2xl border bg-card/40 backdrop-blur-sm transition-colors hover:bg-card/60",
            border
          )}
        >
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              bg
            )}
          >
            <Icon size={16} className={color} />
          </div>
          <div>
            <p className={cn("text-xl font-black", color)}>{value}</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
