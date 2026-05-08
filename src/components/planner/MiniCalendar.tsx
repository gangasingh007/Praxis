"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function MiniCalendar({ selectedDate, onDateSelect }: MiniCalendarProps) {
  const [viewDate, setViewDate] = useState(selectedDate);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const days = Array.from({ length: daysInMonth(viewDate) }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth(viewDate) }, (_, i) => i);
  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const year = viewDate.getFullYear();

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      viewDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const goToToday = () => {
    const today = new Date();
    setViewDate(today);
    onDateSelect(today);
  };

  return (
    <div className="bg-background/40 border border-border/50 rounded-2xl p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground/80">
            {monthName}
          </h3>
          <span className="text-[10px] font-mono text-muted-foreground/60">{year}</span>
        </div>
        
        <div className="flex gap-1 items-center bg-muted/30 p-1 rounded-lg border border-border/40">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-background hover:text-primary rounded-md transition-all text-muted-foreground/60"
            title="Previous Month"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={goToToday}
            className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest hover:bg-background hover:text-primary rounded-md transition-all text-muted-foreground/50"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-background hover:text-primary rounded-md transition-all text-muted-foreground/60"
            title="Next Month"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 mb-3 px-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {padding.map((p) => (
          <div key={`p-${p}`} className="h-8 w-8" />
        ))}
        {days.map((day) => {
          const selected = isSelected(day);
          const today = isToday(day);
          
          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
              className={cn(
                "h-8 w-8 text-[11px] font-mono flex items-center justify-center rounded-lg transition-all duration-300 relative group",
                selected
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 scale-110 z-10"
                  : today
                  ? "bg-primary/10 text-primary font-bold border border-primary/20"
                  : "hover:bg-muted text-muted-foreground/70 hover:text-foreground"
              )}
            >
              {day}
              {today && !selected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

