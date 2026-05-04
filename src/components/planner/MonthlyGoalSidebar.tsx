"use client";

import { Flag, Plus, Target } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MonthlyGoal } from "@/types";
import { MonthlyGoalItem } from "./MonthlyGoalItem";

interface MonthlyGoalSidebarProps {
  goals: MonthlyGoal[];
  selectedMonthly: MonthlyGoal | null;
  setSelectedMonthly: (goal: MonthlyGoal) => void;
  newMonthlyText: string;
  setNewMonthlyText: (text: string) => void;
  handleAddMonthly: (e: React.FormEvent) => void;
  handleDeleteMonthly: (id: string) => void;
}

export function MonthlyGoalSidebar({
  goals,
  selectedMonthly,
  setSelectedMonthly,
  newMonthlyText,
  setNewMonthlyText,
  handleAddMonthly,
  handleDeleteMonthly,
}: MonthlyGoalSidebarProps) {
  const [isAddingMonthly, setIsAddingMonthly] = useState(false);

  return (
    <div className="space-y-4">
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
            onSubmit={(e) => {
              handleAddMonthly(e);
              setIsAddingMonthly(false);
            }}
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
          {goals.map((goal, i) => (
            <MonthlyGoalItem
              key={goal.id}
              goal={goal}
              index={i}
              isSelected={selectedMonthly?.id === goal.id}
              onSelect={setSelectedMonthly}
              onDelete={handleDeleteMonthly}
            />
          ))}
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
  );
}
