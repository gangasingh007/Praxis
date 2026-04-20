"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="bg-card/50 border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-foreground">
          {monthName} {year}
        </h3>
        <div className="flex gap-1 items-center">
          <button
            onClick={goToToday}
            className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
          >
            Today
          </button>
          <div className="w-px h-3 bg-border mx-1" />
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
          >{}
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-accent rounded-md transition-colors text-muted-foreground hover:text-foreground"
          >{}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {padding.map((p) => (
          <div key={`p-${p}`} />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onDateSelect(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
            className={`h-7 w-7 text-xs flex items-center justify-center rounded-md transition-colors ${
              isSelected(day)
                ? "bg-primary text-primary-foreground font-bold"
                : isToday(day)
                ? "bg-muted text-primary font-bold"
                : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
