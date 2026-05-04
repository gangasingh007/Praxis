"use client";

import {
  Target,
  Calendar,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Layers,
  Crosshair,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MonthlyGoal } from "@/types";
import GoalPanel from "./GoalPanel";

interface SelectedGoalViewProps {
  selectedMonthly: MonthlyGoal | null;
  monthName: string;
  year: number;
  newWeeklyText: string;
  setNewWeeklyText: (v: string) => void;
  newDailyText: string;
  setNewDailyText: (v: string) => void;
  handleAddWeekly: (e: React.FormEvent) => void;
  handleAddDaily: (e: React.FormEvent) => void;
  handleDeleteGoal: (type: "weekly" | "daily", id: string) => void;
}

export function SelectedGoalView({
  selectedMonthly,
  monthName,
  year,
  newWeeklyText,
  setNewWeeklyText,
  newDailyText,
  setNewDailyText,
  handleAddWeekly,
  handleAddDaily,
  handleDeleteGoal,
}: SelectedGoalViewProps) {
  return (
    <AnimatePresence mode="wait">
      {selectedMonthly ? (
        <motion.div
          key={selectedMonthly.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* ── header card ── */}
          <div className="relative p-6 md:p-8 rounded-3xl bg-card/50 border border-border/40 backdrop-blur-xl overflow-hidden">
            {/* ambient glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {/* watermark icon */}
            <div className="absolute top-4 right-4 opacity-[0.04]">
              <Target className="w-28 h-28" />
            </div>

            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
                <Crosshair className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-primary">
                    Parent Objective
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-mono font-bold text-primary uppercase">
                    Active
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                  {selectedMonthly.goal}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={10} />
                    {monthName} {year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers size={10} />
                    {selectedMonthly.WeeklyGoals?.length || 0} weekly
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={10} />
                    {selectedMonthly.DailyGoals?.length || 0} daily
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── breakdown grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoalPanel
              type="weekly"
              title="Weekly Milestones"
              icon={TrendingUp}
              color="blue"
              items={selectedMonthly.WeeklyGoals || []}
              inputValue={newWeeklyText}
              onInputChange={setNewWeeklyText}
              onSubmit={handleAddWeekly}
              onDelete={(id) => handleDeleteGoal("weekly", id)}
              placeholder="Add weekly milestone..."
              emptyText="No milestones yet"
            />

            <GoalPanel
              type="daily"
              title="Daily Targets"
              icon={Crosshair}
              color="amber"
              items={selectedMonthly.DailyGoals || []}
              inputValue={newDailyText}
              onInputChange={setNewDailyText}
              onSubmit={handleAddDaily}
              onDelete={(id) => handleDeleteGoal("daily", id)}
              placeholder="Add daily target..."
              emptyText="No targets yet"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full min-h-[400px] flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-border/20 rounded-3xl bg-muted/5"
        >
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-3xl bg-muted/20 border border-border/30 flex items-center justify-center">
              <Target className="w-10 h-10 text-muted-foreground/15" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-muted/30 border border-border/30 flex items-center justify-center">
              <ChevronRight size={12} className="text-muted-foreground/30" />
            </div>
          </div>
          <p className="text-sm font-bold text-muted-foreground/40">
            Select a monthly objective
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/25 uppercase tracking-widest mt-1">
            to architect its breakdown
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
