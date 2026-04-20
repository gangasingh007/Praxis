"use client";

import { useState, useEffect } from "react";

export function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate day progress (e.g., from 6 AM to 10 PM)
  const startHour = 6;
  const endHour = 22;
  const currentHour = time.getHours();
  const currentMinute = time.getMinutes();
  
  const totalMinutes = (endHour - startHour) * 60;
  const passedMinutes = Math.max(0, Math.min(totalMinutes, (currentHour - startHour) * 60 + currentMinute));
  const progress = (passedMinutes / totalMinutes) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <span className="text-4xl font-bold tracking-tighter tabular-nums text-foreground">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
        </span>
        <span className="text-muted-foreground font-medium">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Day Progress Bar */}
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(var(--primary),0.5)]" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <div className="flex justify-between w-64 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
        <span>6 AM</span>
        <span>Day Progress</span>
        <span>10 PM</span>
      </div>
    </div>
  );
}