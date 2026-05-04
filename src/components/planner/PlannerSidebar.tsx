// src/components/planner/PlannerSidebar.tsx
"use client";

import { useState } from "react";
import { SidebarTabStrip, SidebarTab } from "./sidebar/SidebarTabStrip";
import { SidebarCalendarTab } from "./sidebar/SidebarCalendarTab";
import { SidebarInboxTab } from "./sidebar/SidebarInboxTab";
import type { Task } from "../../types";

interface PlannerSidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  unscheduledTasks: Task[];
  onEditTask: (task: Task) => void;
}

export function PlannerSidebar({
  currentDate,
  onDateSelect,
  unscheduledTasks,
  onEditTask,
}: PlannerSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("calendar");

  return (
    <aside
      className="w-[300px] xl:w-[320px] border-l border-border/50 bg-muted/20 backdrop-blur-sm flex flex-col overflow-hidden"
      aria-label="Planner sidebar"
    >
      <SidebarTabStrip
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unscheduledCount={unscheduledTasks.length}
      />

      <div className="flex-1 overflow-y-auto" role="tabpanel">
        {activeTab === "calendar" && (
          <SidebarCalendarTab
            currentDate={currentDate}
            onDateSelect={onDateSelect}
          />
        )}
        {activeTab === "inbox" && (
          <SidebarInboxTab
            unscheduledTasks={unscheduledTasks}
            onEditTask={onEditTask}
          />
        )}
      </div>
    </aside>
  );
}