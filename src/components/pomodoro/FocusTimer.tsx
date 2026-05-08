"use client";

import { useEffect, useRef } from "react";
import { Brain, Coffee, Moon, Flame, Settings2 } from "lucide-react";
import { 
  usePomodoro, 
  TimerMode, 
  VARIATIONS, 
  PomodoroVariation 
} from "@/hooks/use-pomodoro";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const MODES_CONFIG: Record<
  TimerMode,
  { label: string; icon: any; color: string; glow: string }
> = {
  focus: {
    label: "Focus",
    icon: Brain,
    color: "var(--primary)",
    glow: "rgba(var(--primary-rgb), 0.2)",
  },
  short: {
    label: "Short Break",
    icon: Coffee,
    color: "#10b981", // emerald-500
    glow: "rgba(16, 185, 129, 0.2)",
  },
  long: {
    label: "Long Break",
    icon: Moon,
    color: "#3b82f6", // blue-500
    glow: "rgba(59, 130, 246, 0.2)",
  },
};

export function FocusTimer() {
  const { 
    mode, 
    setMode, 
    tick, 
    isRunning, 
    sessions, 
    maxSessions, 
    timeLeft, 
    variation,
    setVariation
  } = usePomodoro();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, tick]);

  const config = MODES_CONFIG[mode];
  const total = VARIATIONS[variation].durations[mode];
  const progress = ((total - timeLeft) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Background Glow */}
      <div
        className="fixed inset-0 -z-10 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: isRunning 
            ? `radial-gradient(circle at 50% 50%, ${config.glow} 0%, transparent 70%)`
            : 'none',
          opacity: isRunning ? 1 : 0
        }}
      />

      <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl rounded-[2rem] overflow-hidden">
        {/* Animated Top Border */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-700"
          style={{ 
            backgroundColor: config.color,
            boxShadow: isRunning ? `0 0 20px ${config.color}` : 'none'
          }} 
        />

        <div className="space-y-6">
          {/* Protocol Selection */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-muted/50 text-muted-foreground">
                <Settings2 size={14} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Protocol</span>
            </div>
            <Select 
              value={variation} 
              onValueChange={(v) => setVariation(v as PomodoroVariation)}
            >
              <SelectTrigger className="w-[160px] h-8 bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border/50 shadow-2xl">
                {(Object.keys(VARIATIONS) as PomodoroVariation[]).map((v) => (
                  <SelectItem key={v} value={v} className="rounded-xl text-[10px] font-bold uppercase tracking-widest">
                    {VARIATIONS[v].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mode Selection */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as TimerMode)} className="w-full">
            <TabsList className="grid grid-cols-3 w-full p-1 h-12 bg-muted/50 rounded-2xl border border-border/30">
              {(Object.keys(MODES_CONFIG) as TimerMode[]).map((m) => {
                const Icon = MODES_CONFIG[m].icon;
                return (
                  <TabsTrigger 
                    key={m} 
                    value={m}
                    className="rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <Icon size={12} />
                    <span className="hidden sm:inline">{MODES_CONFIG[m].label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Timer Display */}
          <TimerDisplay 
            timeLeft={timeLeft} 
            progress={progress} 
            mode={mode} 
            isRunning={isRunning} 
          />

          {/* Sessions Tracker */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
              <Flame size={12} className={cn(sessions > 0 && "text-orange-500")} />
              Sessions: {sessions}/{maxSessions}
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: maxSessions }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i < sessions ? config.color : "var(--border)",
                    boxShadow: i < sessions ? `0 0 10px ${config.color}` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <TimerControls />
        </div>
      </Card>

      {/* Footer Branding */}
      <div className="flex items-center justify-between px-4 opacity-30">
        <p className="text-[9px] font-mono font-bold uppercase tracking-[0.3em]">Praxis Focus Engine v2</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.3em]">System Active</p>
        </div>
      </div>
    </div>
  );
}
