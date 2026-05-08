"use client";

import { cn } from "@/lib/utils";
import { MODES_CONFIG } from "./FocusTimer";
import { TimerMode } from "@/hooks/use-pomodoro";

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
  isRunning: boolean;
}

export function TimerDisplay({ timeLeft, progress, mode, isRunning }: TimerDisplayProps) {
  const config = MODES_CONFIG[mode];
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      <div className="relative w-64 h-64">
        {/* Progress Circle SVG */}
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
          {/* Background Track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/20"
          />
          {/* Active Progress */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: isRunning ? strokeDashoffset : circumference,
              transition: isRunning ? "stroke-dashoffset 1s linear" : "stroke-dashoffset 0.5s ease-out",
              filter: isRunning ? `drop-shadow(0 0 8px ${config.color})` : "none"
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div 
            className={cn(
              "px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-widest mb-2 transition-all duration-500",
              isRunning ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted/30 border-border/50 text-muted-foreground/50"
            )}
            style={isRunning ? { color: config.color, borderColor: `${config.color}33`, backgroundColor: `${config.color}11` } : {}}
          >
            {isRunning ? "Running" : "Ready"}
          </div>
          
          <span 
            className="text-6xl font-black tracking-tighter tabular-nums"
            style={{ 
              color: isRunning ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
              transition: 'color 0.5s ease'
            }}
          >
            {timeString}
          </span>
          
          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-2">
            {Math.round(progress)}% Complete
          </div>
        </div>
      </div>
    </div>
  );
}
