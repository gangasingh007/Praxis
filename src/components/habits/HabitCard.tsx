"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Sparkles, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  completeHabit, 
  deleteHabit, 
  regenerateHabitRewardAction 
} from "@/actions/habit-actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { HabitReward } from "./HabitReward";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HabitProps {
  id: string;
  name: string;
  initialStreak: number;
  isCompletedToday: boolean;
  lastAiRewardText?: string | null;
}

export function HabitCard({ id, name, initialStreak, isCompletedToday, lastAiRewardText }: HabitProps) {
  const [completed, setCompleted] = useState(isCompletedToday);
  const [streak, setStreak] = useState(initialStreak);
  const [aiMessage, setAiMessage] = useState<string | null>(lastAiRewardText || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleComplete = async () => {
    if (completed) return;
    
    setIsLoading(true);
    try {
      const response = await completeHabit(id);
      if (response.success) {
        setCompleted(true);
        setStreak(response.habit?.currentStreak ?? (streak + 1));
        if (response.aiMessage) {
          setAiMessage(response.aiMessage);
        }
        toast.success(`Protocol executed: ${name}`);
      } else {
        toast.error(response.message || "Execution failed");
      }
    } catch (error) {
      toast.error("Signal lost during execution");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const response = await regenerateHabitRewardAction(id);
      if (response.success) {
        setAiMessage(response.message);
        toast.success("Intelligence recalibrated");
      } else {
        toast.error("Recalibration failed");
      }
    } catch (error) {
      toast.error("AI response timeout");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHabit(id);
      toast.success("Protocol terminated");
    } catch (error) {
      toast.error("Termination failed");
      setIsDeleting(false);
    }
  };

  const isHotStreak = streak >= 7;

  if (isDeleting) return null;

  return (
    <motion.div 
      layout
      className={cn(
        "group relative p-5 rounded-2xl border bg-card/50 backdrop-blur-md overflow-hidden transition-all duration-500",
        completed ? "border-border" : "border-border/50 hover:border-primary/30",
        isHotStreak && completed && "shadow-[0_0_20px_rgba(var(--primary),0.05)] border-primary/20"
      )}
    >
      {/* Background Glow */}
      {isHotStreak && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={cn(
              "text-lg font-bold tracking-tight transition-colors",
              completed ? "text-muted-foreground" : "text-foreground"
            )}>
              {name}
            </h3>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all duration-300">
                  <Trash2 className="w-3.5 h-3.5" />{}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Terminate Protocol?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the <strong>{name}</strong> habit and all associated telemetry. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Abort</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Confirm Termination
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground font-mono font-bold tracking-wider">
            <Flame className={cn("w-3.5 h-3.5", isHotStreak ? "text-primary animate-pulse" : "text-muted-foreground/50")} />
            <span className={cn(isHotStreak && "text-primary")}>{streak} DAY STREAK</span>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={completed || isLoading}
          size="icon"
          className={cn(
            "w-11 h-11 rounded-full transition-all duration-500 relative",
            completed 
              ? "bg-muted text-muted-foreground border border-border" 
              : "bg-primary text-primary-foreground hover:scale-105 shadow-lg shadow-primary/20"
          )}
        >
          {isLoading ? (
            <Sparkles className="w-5 h-5 animate-spin" />
          ) : completed ? (
            <Check className="w-5 h-5" />
          ) : (
            <>
              <Check className="w-5 h-5 relative z-10" />
              <div className="absolute inset-0 rounded-full bg-current animate-ping opacity-20" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {aiMessage && completed && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 20 }}
            exit={{ opacity: 0, height: 0 }}
            className="relative border-t border-border/50 pt-5"
          >
            <HabitReward 
              message={aiMessage}
              isRegenerating={isRegenerating}
              onRegenerate={handleRegenerate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
