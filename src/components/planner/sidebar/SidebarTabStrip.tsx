// src/components/planner/sidebar/SidebarTabStrip.tsx
import { cn } from "@/lib/utils";
import { CalendarDays, Inbox } from "lucide-react";

export type SidebarTab = "calendar" | "inbox";

const TABS = [
  { id: "calendar" as const, label: "Calendar", icon: CalendarDays },
  { id: "inbox" as const, label: "Inbox", icon: Inbox },
] as const;

interface SidebarTabStripProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  unscheduledCount: number;
}

export function SidebarTabStrip({
  activeTab,
  onTabChange,
  unscheduledCount,
}: SidebarTabStripProps) {
  return (
    <div role="tablist" className="shrink-0 flex border-b border-border/50 bg-background/40">
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            role="tab"
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3",
              "text-[10px] font-mono font-bold uppercase tracking-widest",
              "transition-all duration-200 border-b-2",
              isActive
                ? "text-primary border-primary bg-primary/5"
                : "text-muted-foreground/50 border-transparent hover:text-muted-foreground"
            )}
          >
            <Icon size={12} />
            {label}
            {/* Unscheduled badge on inbox tab */}
            {id === "inbox" && unscheduledCount > 0 && (
              <span className="ml-0.5 px-1.5 py-px rounded-full bg-amber-400/15 text-amber-400 text-[9px] font-black border border-amber-400/25">
                {unscheduledCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}