"use client";

import { useState } from "react";
import {
  createMonthlyGoal,
  deleteMonthlyGoal,
  createWeeklyGoal,
  deleteWeeklyGoal,
  createDailyGoal,
  deleteDailyGoal,
} from "@/actions/goal-actions";
import { toast } from "sonner";
import { MonthlyGoal } from "@/types";
import { GoalHeader } from "./GoalHeader";
import { GoalStats } from "./GoalStats";
import { MonthlyGoalSidebar } from "./MonthlyGoalSidebar";
import { SelectedGoalView } from "./SelectedGoalView";

export function GoalDashboard({ initialGoals }: { initialGoals: MonthlyGoal[] }) {
  const [goals, setGoals] = useState<MonthlyGoal[]>(initialGoals);
  const [selectedMonthly, setSelectedMonthly] = useState<MonthlyGoal | null>(
    initialGoals[0] || null
  );
  const [newMonthlyText, setNewMonthlyText] = useState("");
  const [newWeeklyText, setNewWeeklyText] = useState("");
  const [newDailyText, setNewDailyText] = useState("");

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const handleAddMonthly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonthlyText.trim()) return;
    try {
      const result = (await createMonthlyGoal({
        month,
        year,
        goal: newMonthlyText.trim(),
      })) as unknown as MonthlyGoal;
      
      setGoals([result, ...goals]);
      setNewMonthlyText("");
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
      ) as MonthlyGoal[];
      
      setGoals(updatedGoals);
      setSelectedMonthly(
        updatedGoals.find((g) => g.id === selectedMonthly.id) || null
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
      ) as MonthlyGoal[];
      
      setGoals(updatedGoals);
      setSelectedMonthly(
        updatedGoals.find((g) => g.id === selectedMonthly.id) || null
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
        if (!selectedMonthly) return;
        
        const updated = {
          ...selectedMonthly,
          WeeklyGoals: (selectedMonthly.WeeklyGoals || []).filter(
            (w) => w.id !== id
          ),
        };
        setSelectedMonthly(updated);
        setGoals(
          goals.map((g) => (g.id === selectedMonthly.id ? updated : g))
        );
      } else if (type === "daily") {
        await deleteDailyGoal(id);
        if (!selectedMonthly) return;
        
        const updated = {
          ...selectedMonthly,
          DailyGoals: (selectedMonthly.DailyGoals || []).filter(
            (d) => d.id !== id
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
      <GoalHeader monthName={monthName} year={year} />
      
      <GoalStats 
        monthlyCount={goals.length} 
        weeklyCount={totalWeekly} 
        dailyCount={totalDaily} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <MonthlyGoalSidebar
            goals={goals}
            selectedMonthly={selectedMonthly}
            setSelectedMonthly={setSelectedMonthly}
            newMonthlyText={newMonthlyText}
            setNewMonthlyText={setNewMonthlyText}
            handleAddMonthly={handleAddMonthly}
            handleDeleteMonthly={(id) => handleDelete("monthly", id)}
          />
        </div>

        <div className="lg:col-span-8">
          <SelectedGoalView
            selectedMonthly={selectedMonthly}
            monthName={monthName}
            year={year}
            newWeeklyText={newWeeklyText}
            setNewWeeklyText={setNewWeeklyText}
            newDailyText={newDailyText}
            setNewDailyText={setNewDailyText}
            handleAddWeekly={handleAddWeekly}
            handleAddDaily={handleAddDaily}
            handleDeleteGoal={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
