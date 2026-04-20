"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { usePomodoro } from "@/hooks/use-pomodoro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function FocusTimer() {
  const { timeLeft, isRunning, mode, start, pause, reset, setMode, tick } = usePomodoro();

  // Handle the interval ticking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      pause();
      toast.success(mode === 'focus' ? "Focus session complete! Take a break." : "Break is over. Back to work!");
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, tick, pause, mode]);

  // Format time (MM:SS)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/50 border border-zinc-800 rounded-2xl backdrop-blur-xl max-w-md mx-auto">
      
      {/* Mode Selector */}
      <div className="flex gap-2 mb-8 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
        {(['focus', 'shortBreak'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              mode === m ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {m === 'focus' ? 'Deep Work' : 'Rest'}
          </button>
        ))}
      </div>

      {/* The Digital Clock */}
      <div className="relative mb-8">
        {/* Subtle Cyberpunk Glow behind the timer when running */}
        {isRunning && (
          <motion.div 
            className="absolute inset-0 bg-zinc-500 blur-3xl opacity-20 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        <h2 className={cn(
          "text-8xl font-black tracking-tighter tabular-nums relative z-10 transition-colors duration-500",
          isRunning ? "text-zinc-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "text-zinc-500"
        )}>
          {formattedTime}
        </h2>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button 
          variant={isRunning ? "secondary" : "default"} 
          size="icon" 
          className={cn("w-14 h-14 rounded-full", !isRunning && "bg-zinc-100 text-black hover:bg-zinc-300")}
          onClick={isRunning ? pause : start}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="w-14 h-14 rounded-full border-zinc-800 hover:bg-zinc-900"
          onClick={reset}
        >
          <RotateCcw className="w-5 h-5 text-zinc-400" />
        </Button>
      </div>

    </div>
  );
}