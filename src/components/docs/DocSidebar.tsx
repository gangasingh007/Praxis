// src/components/docs/DocsSidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import { DocSection } from "./content/sections";
import { motion, AnimatePresence } from "framer-motion";
import { getIcon } from "./icons";

interface DocsSidebarProps {
  sections: DocSection[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function DocsSidebar({
  sections,
  activeSection,
  onNavigate,
}: DocsSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 sticky top-24 h-[calc(100vh-7rem)]">
      {/* Label */}
      <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/60 mb-5 px-3">
        On This Page
      </p>

      {/* Nav rail */}
      <nav
        className="relative flex flex-col gap-0.5"
        aria-label="Documentation navigation"
      >
        {/* Vertical track */}
        <div className="absolute left-[14px] top-0 bottom-0 w-px bg-border/40" />

        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = getIcon(section.icon);

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex items-center gap-3.5 pl-3 pr-4 py-2.5 rounded-lg text-left",
                "transition-all duration-250 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isActive
                  ? "text-foreground translate-x-1"
                  : "text-muted-foreground hover:text-foreground/80 hover:translate-x-0.5"
              )}
            >
              {/* Track dot */}
              <span className="relative z-10 flex items-center justify-center w-[7px] h-[7px] shrink-0">
                <AnimatePresence>
                  {isActive ? (
                    <motion.span
                      key="active"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                    />
                  ) : (
                    <motion.span
                      key="inactive"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-[5px] h-[5px] rounded-full bg-border"
                    />
                  )}
                </AnimatePresence>
              </span>

              {/* Phase + title */}
              <span className="flex items-baseline gap-2 min-w-0">
                <span
                  className={cn(
                    "text-[10px] font-mono font-bold shrink-0 transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground/50"
                  )}
                >
                  {section.phase}
                </span>
                <span className="text-xs font-medium truncate">
                  {section.title}
                </span>
              </span>

              {/* Active indicator bar */}
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-lg bg-primary/8 border border-primary/15"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom meta */}
      <div className="mt-auto pt-6 px-3">
        <div className="p-3 rounded-xl bg-card border border-border/50 space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
            Protocol v1.0
          </p>
          <p className="text-[11px] text-muted-foreground leading-snug">
            5 phases · ~12 min read
          </p>
        </div>
      </div>
    </aside>
  );
}