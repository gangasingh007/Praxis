"use client";

import { useState } from "react";
import {
  Plus,
  Target,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Trash2,
  ArrowLeft,
  Zap,
  TrendingUp,
  Layers,
  Crosshair,
  Flag,
  Clock,
} from "lucide-react";
import {
  createMonthlyGoal,
  deleteMonthlyGoal,
  createWeeklyGoal,
  deleteWeeklyGoal,
  createDailyGoal,
  deleteDailyGoal,
} from "@/actions/goal-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import GoalPanel from "./GoalPanel";

export function GoalDashboard({ initialGoals }: { initialGoals: any[] }) {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedMonthly, setSelectedMonthly] = useState<any>(
    initialGoals[0] || null
  );
  const [newMonthlyText, setNewMonthlyText] = useState("");
  const [newWeeklyText, setNewWeeklyText] = useState("");
  const [newDailyText, setNewDailyText] = useState("");
  const [isAddingMonthly, setIsAddingMonthly] = useState(false);

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const handleAddMonthly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonthlyText.trim()) return;
    try {
      const result = await createMonthlyGoal({
        month,
        year,
        goal: newMonthlyText.trim(),
      });
      setGoals([result, ...goals]);
      setNewMonthlyText("");
      setIsAddingMonthly(false);
      if (!selectedMonthly) setSelectedMonthly(result);
      toast.success("Monthly objective created!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAddWeekly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeeklyText.trim() || !selectedMonthly) return;
    try {
      const result = await createWeeklyGoal({
        week: 1,
        month,
        year,
        goal: newWeeklyText.trim(),
        monthlyGoalId: selectedMonthly.id,
      });
      const updatedGoals = goals.map((g) =>
        g.id === selectedMonthly.id
          ? { ...g, WeeklyGoals: [...(g.WeeklyGoals || []), result] }
          : g
      );
      setGoals(updatedGoals);
      setSelectedMonthly(
        updatedGoals.find((g) => g.id === selectedMonthly.id)
      );
      setNewWeeklyText("");
      toast.success("Weekly milestone set!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAddDaily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDailyText.trim() || !selectedMonthly) return;
    try {
      const result = await createDailyGoal({
        day: currentDate.getDate(),
        month,
        year,
        goal: newDailyText.trim(),
        monthlyGoalId: selectedMonthly.id,
      });
      const updatedGoals = goals.map((g) =>
        g.id === selectedMonthly.id
          ? { ...g, DailyGoals: [...(g.DailyGoals || []), result] }
          : g
      );
      setGoals(updatedGoals);
      setSelectedMonthly(
        updatedGoals.find((g) => g.id === selectedMonthly.id)
      );
      setNewDailyText("");
      toast.success("Daily target locked!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (
    type: "monthly" | "weekly" | "daily",
    id: string
  ) => {
    try {
      if (type === "monthly") {
        await deleteMonthlyGoal(id);
        const remaining = goals.filter((g) => g.id !== id);
        setGoals(remaining);
        if (selectedMonthly?.id === id)
          setSelectedMonthly(remaining[0] || null);
      } else if (type === "weekly") {
        await deleteWeeklyGoal(id);
        const updated = {
          ...selectedMonthly,
          WeeklyGoals: selectedMonthly.WeeklyGoals.filter(
            (w: any) => w.id !== id
          ),
        };
        setSelectedMonthly(updated);
        setGoals(
          goals.map((g) => (g.id === selectedMonthly.id ? updated : g))
        );
      } else if (type === "daily") {
        await deleteDailyGoal(id);
        const updated = {
          ...selectedMonthly,
          DailyGoals: selectedMonthly.DailyGoals.filter(
            (d: any) => d.id !== id
          ),
        };
        setSelectedMonthly(updated);
        setGoals(
          goals.map((g) => (g.id === selectedMonthly.id ? updated : g))
        );
      }
      toast.success("Cleared!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const totalWeekly = goals.reduce(
    (a, g) => a + (g.WeeklyGoals?.length || 0),
    0
  );
  const totalDaily = goals.reduce(
    (a, g) => a + (g.DailyGoals?.length || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-start flex-col gap-2 mb-0.5">
              <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-[12px] font-mono font-bold uppercase tracking-widest text-primary">
                {monthName} {year}
              </span>
              <h1 className="text-5xl font-black uppercase tracking-tight">
                Mission Control
              </h1>
            </div>
            <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
              Strategic Goal Architecture
            </p>
          </div>
        </div>
        <Link href="/planner">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-background/50 border-border/50 rounded-xl hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Planner
          </Button>
        </Link>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: Target,
            label: "Monthly",
            value: goals.length,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20",
          },
          {
            icon: TrendingUp,
            label: "Weekly",
            value: totalWeekly,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
          },
          {
            icon: Crosshair,
            label: "Daily",
            value: totalDaily,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
          },
        ].map(({ icon: Icon, label, value, color, bg, border }) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flag size={13} className="text-primary" />
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                Monthly Targets
              </h2>
            </div>
            {!isAddingMonthly && (
              <button
                onClick={() => setIsAddingMonthly(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/25 text-[10px] font-mono font-bold uppercase tracking-widest text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus size={10} /> Add
              </button>
            )}
          </div>

          {/* add form */}
          <AnimatePresence>
            {isAddingMonthly && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleAddMonthly}
                className="overflow-hidden"
              >
                <div className="flex gap-2 pb-2">
                  <Input
                    autoFocus
                    value={newMonthlyText}
                    onChange={(e) => setNewMonthlyText(e.target.value)}
                    placeholder="Key monthly focus..."
                    className="rounded-xl border-primary/30 bg-primary/5 placeholder:text-muted-foreground/30 font-mono text-sm focus-visible:ring-primary/30"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setIsAddingMonthly(false);
                        setNewMonthlyText("");
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-xl shrink-0 shadow-[0_0_15px_hsl(var(--primary)/0.25)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* goal list */}
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {goals.map((goal, i) => {
                const isSelected = selectedMonthly?.id === goal.id;
                const weekCount = goal.WeeklyGoals?.length || 0;
                const dailyCount = goal.DailyGoals?.length || 0;

                return (
                  <motion.div
                    key={goal.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedMonthly(goal)}
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
                            handleDelete("monthly", goal.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground/40 transition-all"
                        >{}
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
              })}
            </AnimatePresence>

            {goals.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-border/30 rounded-2xl bg-muted/5 text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-muted/30 border border-border/40 flex items-center justify-center">
                  <Target className="w-6 h-6 text-muted-foreground/30" />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground/60">
                    No objectives yet
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest mt-1">
                    Create your first monthly target
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
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
                    onDelete={(id) => handleDelete("weekly", id)}
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
                    onDelete={(id) => handleDelete("daily", id)}
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
                    <ChevronRight
                      size={12}
                      className="text-muted-foreground/30"
                    />
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
        </div>
      </div>
    </div>
  );
}

