// src/components/docs/DocsMobileNav.tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DocSection } from "./content/sections";
import { AnimatePresence, motion } from "framer-motion";
import { getIcon } from "./icons";

interface DocsMobileNavProps {
  sections: DocSection[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function DocsMobileNav({
  sections,
  activeSection,
  onNavigate,
}: DocsMobileNavProps) {
  const [open, setOpen] = useState(false);
  const active = sections.find((s) => s.id === activeSection);

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <div className="md:hidden sticky top-16 z-40 mb-8 -mx-4 px-4 py-2.5 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full gap-3 py-1"
        aria-label="Toggle documentation navigation"
      >{}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest shrink-0">
            {active?.phase}
          </span>
          <span className="text-sm font-bold truncate text-foreground">
            {active?.title}
          </span>
        </div>
        <div className="shrink-0 text-muted-foreground">
          {open ? <X size={16} /> : <Menu size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1 flex flex-col gap-0.5">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                const Icon = getIcon(section.icon);
                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-foreground border border-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon
                      size={14}
                      className={isActive ? "text-primary" : ""}
                    />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest">
                      {section.phase}
                    </span>
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}