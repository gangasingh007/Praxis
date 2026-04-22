"use client";

import { useState, useEffect } from "react";
import { Target, ArrowUpRight } from "lucide-react";
import { getMonthlyGoals } from "@/actions/goal-actions";
import Link from "next/link";

interface MonthlyGoalsManagerProps {
  currentDate: Date;
}

export function MonthlyGoalsManager({ currentDate }: MonthlyGoalsManagerProps) {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const data = await getMonthlyGoals(month, year);
        setGoals(data);
      } catch (error) {
        console.error("Failed to fetch monthly goals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, [month, year]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <Target className="w-3 h-3" />
          Monthly Objectives
        </h3>
        <Link 
          href="/planner/goals"
          className="p-1 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-primary"
          title="Manage Goals"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : goals.length === 0 ? (
          <Link href="/planner/goals" className="block p-4 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors group">
            <p className="text-[10px] text-muted-foreground italic text-center group-hover:text-primary transition-colors">
              No objectives set. <br/>Click to architect.
            </p>
          </Link>
        ) : (
          <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-hide pr-1">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                className="group p-3 rounded-xl bg-background/40 border border-border/50 hover:border-primary/30 hover:bg-background/60 transition-all"
              >
                <p className="text-[11px] font-bold leading-relaxed line-clamp-2">
                  {goal.goal}
                </p>
                <div className="mt-2 flex gap-3 opacity-60">
                   <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter">
                      <div className="w-1 h-1 rounded-full bg-blue-500" /> {goal.WeeklyGoals?.length || 0}W
                   </div>
                   <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-tighter">
                      <div className="w-1 h-1 rounded-full bg-orange-500" /> {goal.DailyGoals?.length || 0}D
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
