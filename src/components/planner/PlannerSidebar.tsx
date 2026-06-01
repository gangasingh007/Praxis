// src/components/planner/PlannerSidebar.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SidebarTabStrip, SidebarTab } from "./sidebar/SidebarTabStrip";
import { SidebarCalendarTab } from "./sidebar/SidebarCalendarTab";
import { SidebarInboxTab } from "./sidebar/SidebarInboxTab";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Task } from "../../types";

interface PlannerSidebarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  unscheduledTasks: Task[];
  onClickTask: (task: Task) => void;
}

export function PlannerSidebar({
  currentDate,
  onDateSelect,
  unscheduledTasks,
  onClickTask,
}: PlannerSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>("calendar");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative flex h-full shrink-0">
      {/* Toggle Button - Floating on the edge */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -left-4 top-1/2 -translate-y-1/2 z-50 h-8 w-8 rounded-full border border-border/50 bg-background shadow-md transition-all duration-300",
          "hover:bg-accent hover:text-accent-foreground group",
          isCollapsed ? "rotate-180" : "rotate-0"
        )}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <ChevronRight size={16} className="transition-transform group-hover:scale-110" />
      </Button>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 0 : 320,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-full border-l border-border/50 bg-muted/20 backdrop-blur-sm flex flex-col overflow-hidden relative"
        )}
        aria-label="Planner sidebar"
      >
        <div className="w-[320px] h-full flex flex-col shrink-0">
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
                onClickTask={onClickTask}
              />
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}