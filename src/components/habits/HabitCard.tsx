"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateHabitReward } from "@/actions/ai-actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HabitProps {
  id: string;
  name: string;
  initialStreak: number;
  isCompletedToday: boolean;
}

export function HabitCard({ id, name, initialStreak, isCompletedToday }: HabitProps) {
  const [completed, setCompleted] = useState(isCompletedToday);
  const [streak, setStreak] = useState(initialStreak);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (completed) return;
    
    setIsLoading(true);
    setCompleted(true);
    setStreak((prev) => prev + 1);
    
    // Play a satisfying sound here if desired
    toast.success(`${name} completed!`);

    // Fetch AI Reward
    const response = await generateHabitReward(name, streak + 1);
    if (response.success) {
      setAiMessage(response.message);
    }
    
    setIsLoading(false);
    // TODO: Call a separate Server Action to update the Prisma Database
  };

  // Calculate glow based on streak (Max glow at 10+ days)
  const isHotStreak = streak >= 7;

  return (
    <motion.div 
      layout
      className={cn(
        "relative p-5 rounded-xl border bg-zinc-950/80 backdrop-blur-md overflow-hidden transition-all duration-500",
        completed ? "border-zinc-800" : "border-zinc-700 hover:border-zinc-500",
        isHotStreak && completed && "shadow-[0_0_15px_rgba(255,255,255,0.05)] border-zinc-500"
      )}
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className={cn(
            "text-lg font-bold tracking-tight transition-colors",
            completed ? "text-zinc-300" : "text-white"
          )}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500 font-mono">
            <Flame className={cn("w-4 h-4", isHotStreak ? "text-zinc-200" : "text-zinc-600")} />
            <span>{streak} Day Streak</span>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={completed || isLoading}
          size="icon"
          className={cn(
            "w-12 h-12 rounded-full transition-all duration-300",
            completed 
              ? "bg-zinc-800 text-zinc-500" 
              : "bg-white text-black hover:bg-zinc-200 hover:scale-105"
          )}
        >
          {isLoading ? (
            <Sparkles className="w-5 h-5 animate-pulse" />
          ) : (
            <Check className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* AI Reward Message Dropdown */}
      <AnimatePresence>
        {aiMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            className="border-t border-zinc-800/50 pt-4"
          >
            <div className="flex gap-3 text-sm text-zinc-400 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50 leading-relaxed font-mono">
              <Sparkles className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <p>{aiMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}