"use client";

import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePomodoro } from "@/hooks/use-pomodoro";
import { MODES_CONFIG } from "./FocusTimer";
import { cn } from "@/lib/utils";

export function TimerControls() {
  const { isRunning, start, pause, reset, skipMode, mode, timeLeft } = usePomodoro();
  const config = MODES_CONFIG[mode];

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={reset}
        className="w-14 h-14 rounded-2xl border-border/50 hover:bg-muted/50 hover:text-foreground transition-all active:scale-95"
      >
        <RotateCcw size={20} className="text-muted-foreground" />
      </Button>

      <Button
        size="lg"
        onClick={isRunning ? pause : start}
        className={cn(
          "flex-1 h-14 rounded-2xl text-sm font-black uppercase tracking-widest relative overflow-hidden transition-all duration-300 active:scale-[0.98]",
          "shadow-xl"
        )}
        style={{
          backgroundColor: config.color,
          color: "white",
          boxShadow: isRunning ? `0 10px 30px -10px ${config.color}88` : 'none'
        }}
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          {isRunning ? (
            <>
              <Pause size={20} fill="white" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={20} fill="white" className="ml-1" />
              <span>{timeLeft === 0 ? "Restart" : "Start Focus"}</span>
            </>
          )}
        </div>
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={skipMode}
        className="w-14 h-14 rounded-2xl border-border/50 hover:bg-muted/50 hover:text-foreground transition-all active:scale-95"
      >
        <SkipForward size={20} className="text-muted-foreground" />
      </Button>
    </div>
  );
}
