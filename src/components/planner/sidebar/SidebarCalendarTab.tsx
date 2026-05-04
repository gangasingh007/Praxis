// src/components/planner/sidebar/SidebarCalendarTab.tsx
import { MiniCalendar } from "../MiniCalendar";
import { MonthlyGoalsManager } from "../MonthlyGoalsManager";

interface SidebarCalendarTabProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export function SidebarCalendarTab({
  currentDate,
  onDateSelect,
}: SidebarCalendarTabProps) {
  return (
    <div className="p-4 space-y-4">
      <MiniCalendar selectedDate={currentDate} onDateSelect={onDateSelect} />
      <MonthlyGoalsManager currentDate={currentDate} />
    </div>
  );
}