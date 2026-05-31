"use client";

import { useEffect, useRef, useMemo } from "react";
import { Brain, Coffee, Moon, Flame, Settings2, Target } from "lucide-react";
import { 
  usePomodoro, 
  TimerMode, 
  VARIATIONS, 
  PomodoroVariation 
} from "@/hooks/use-pomodoro";
import { useTasks } from "@/hooks/use-tasks";
import { recordPomodoroSession } from "@/actions/focus-actions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    setVariation,
    selectedTaskId,
    setSelectedTaskId
  } = usePomodoro();
  
  const today = useMemo(() => new Date(), []);
  const { tasks } = useTasks(today);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prevSessionsRef = useRef(sessions);

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

  // Record session on completion
  useEffect(() => {
    if (sessions > prevSessionsRef.current) {
      const duration = Math.floor(VARIATIONS[variation].durations.focus / 60);
      recordPomodoroSession({ 
        duration, 
        taskId: selectedTaskId || undefined 
      });
      prevSessionsRef.current = sessions;
    }
  }, [sessions, variation, selectedTaskId]);

  const config = MODES_CONFIG[mode];
  const total = VARIATIONS[variation].durations[mode];
  const progress = ((total - timeLeft) / total) * 100;

  const currentTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-background/50">
      {/* Background Immersive Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: isRunning 
            ? `radial-gradient(circle at 50% 50%, ${config.glow} 0%, transparent 70%)`
            : 'none',
          opacity: isRunning ? 1 : 0.2
        }}
      />

      {/* Decorative Grid or Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* HUD Top Bar */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-muted/50 border shadow-inner">
              <Settings2 size={16} className="text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Focus Protocol</span>
              <Select 
                value={variation} 
                onValueChange={(v) => setVariation(v as PomodoroVariation)}
              >
                <SelectTrigger className="h-6 p-0 bg-transparent border-none text-xs font-black uppercase tracking-widest focus:ring-0 shadow-none">
                  <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-2xl backdrop-blur-xl">
                  {(Object.keys(VARIATIONS) as PomodoroVariation[]).map((v) => (
                    <SelectItem key={v} value={v} className="rounded-xl text-[10px] font-bold uppercase tracking-widest">
                      {VARIATIONS[v].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Target Mission</span>
              <Select 
                value={selectedTaskId || "none"} 
                onValueChange={(v) => setSelectedTaskId(v === "none" ? null : v)}
              >
                <SelectTrigger className="h-6 p-0 bg-transparent border-none text-xs font-black uppercase tracking-widest focus:ring-0 text-right shadow-none">
                  <SelectValue placeholder="Select Task" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-2xl backdrop-blur-xl max-w-[240px]">
                  <SelectItem value="none" className="rounded-xl text-[10px] font-bold uppercase tracking-widest">
                    None (General Focus)
                  </SelectItem>
                  {tasks.filter(t => !t.isCompleted).map((t) => (
                    <SelectItem key={t.id} value={t.id} className="rounded-xl text-[10px] font-bold uppercase tracking-widest truncate">
                      {t.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="p-2 rounded-xl bg-muted/50 border shadow-inner">
              <Target size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

{/* Main Focus Terminal */}
      {/* FIX: Changed z-10 to z-50 and added pointer-events-auto to ensure all nested controls (tabs, buttons) are clickable */}
      <div className="relative z-50 flex flex-col items-center gap-12 max-w-2xl w-full px-4 animate-in fade-in zoom-in-95 duration-1000 pointer-events-auto">
        <Tabs 
          value={mode} 
          onValueChange={(v) => setMode(v as TimerMode)} 
          className="w-fit"
        >
          <TabsList className="bg-muted/20 backdrop-blur-xl p-1 h-auto rounded-[2rem] border border-border/20 shadow-2xl flex gap-1 relative">
            {(Object.keys(MODES_CONFIG) as TimerMode[]).map((m) => {
              const Icon = MODES_CONFIG[m].icon;
              const isActive = mode === m;
              const modeConfig = MODES_CONFIG[m];
              
              return (
                <TabsTrigger 
                  key={m} 
                  value={m}
                  className={cn(
                    "rounded-[1.5rem] px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] gap-3 transition-all duration-300 cursor-pointer",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg",
                    "hover:bg-muted/30 text-muted-foreground/60 data-[state=active]:text-foreground",
                    // Maintains solid hit area and prevents text highlighting on double-click
                    "flex items-center justify-center select-none"
                  )}
                >
                  <Icon 
                    size={14} 
                    className="transition-colors duration-300"
                    style={{ color: isActive ? modeConfig.color : 'currentColor' }} 
                  />
                  <span>{modeConfig.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Large Centered Timer */}
        <div className="relative scale-110 md:scale-150 transition-transform duration-1000">
           <TimerDisplay 
             timeLeft={timeLeft} 
             progress={progress} 
             mode={mode} 
             isRunning={isRunning} 
           />
        </div>

        {/* HUD Bottom Controls */}
        <div className="w-full max-w-md space-y-10">
          {/* Sessions Telemetry */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.3em] text-muted-foreground/60 transition-colors duration-500">
              <Flame size={14} className={cn(sessions > 0 && "text-orange-500")} />
              {currentTask ? `Mission: ${currentTask.title}` : `Focus Cycles: ${sessions}/${maxSessions}`}
            </div>
            <div className="flex gap-2">
              {Array.from({ length: maxSessions }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-1.5 rounded-full transition-all duration-700 relative overflow-hidden bg-muted/30 border border-border/10"
                >
                  {i < sessions && (
                    <div 
                      className="absolute inset-0 transition-all duration-1000"
                      style={{ 
                        backgroundColor: config.color,
                        boxShadow: `0 0 15px ${config.color}` 
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <TimerControls />
          </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-20 z-20 font-mono">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Engine State: Nominal</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-3 h-1 bg-foreground/50 rounded-full" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
             <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Auth Verified</p>
             <p className="text-[7px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">Praxis OS v2.4.0</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}
