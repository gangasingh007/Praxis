// src/components/docs/DocsSectionRenderer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DocSection } from "./content/sections";
import { cn } from "@/lib/utils";
import { getIcon } from "./icons";

interface DocsSectionRendererProps {
  sections: DocSection[];
  activeSection: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────

interface SectionHeaderProps {
  section: DocSection;
  isActive: boolean;
}

function SectionHeader({ section, isActive }: SectionHeaderProps) {
  const Icon = getIcon(section.icon);

  return (
    <div className="flex items-start gap-4 mb-8">
      {/* Icon container */}
      <div
        className={cn(
          "shrink-0 w-12 h-12 rounded-xl border",
          "flex items-center justify-center",
          "transition-all duration-500",
          isActive
            ? [
                "bg-primary/10 border-primary/30",
                "shadow-[0_0_24px_hsl(var(--primary)/0.12)]",
              ]
            : [
                "bg-card border-border/60",
                "group-hover:bg-primary/5",
                "group-hover:border-primary/20",
              ]
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 transition-colors duration-300",
            isActive
              ? "text-primary"
              : "text-muted-foreground group-hover:text-primary"
          )}
          aria-hidden="true"
        />
      </div>

      {/* Title + phase */}
      <div className="pt-0.5 space-y-1.5 min-w-0 flex-1">
        {/* Phase row */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            Phase {section.phase}
          </span>

          {/* Active pip — animates in/out */}
          <AnimatePresence>
            {isActive && (
              <motion.span
                key="pip"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <h2
          className={cn(
            "text-2xl sm:text-3xl font-black uppercase tracking-tight",
            "transition-colors duration-300",
            isActive ? "text-foreground" : "text-foreground/80"
          )}
        >
          {section.title}
        </h2>
      </div>
    </div>
  );
}

interface SectionContentProps {
  children: React.ReactNode;
  isActive: boolean;
}

function SectionContent({ children, isActive }: SectionContentProps) {
  return (
    <div
      className={cn(
        // Indent — smaller on mobile, wider on sm+
        "ml-4 sm:ml-16",
        // Left border accent
        "pl-5 sm:pl-8 py-1",
        "border-l-2 transition-colors duration-500",
        isActive ? "border-primary/25" : "border-border/25"
      )}
    >
      {/* Prose wrapper — scopes typography to muted default */}
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export function DocsSectionRenderer({
  sections,
  activeSection,
}: DocsSectionRendererProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-20"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <motion.section
            key={section.id}
            id={section.id}
            variants={sectionVariants}
            // Allows IntersectionObserver in DocsLayout to target these
            className="doc-section scroll-mt-28 group"
            aria-current={isActive ? "true" : undefined}
          >
            <SectionHeader section={section} isActive={isActive} />
            <SectionContent isActive={isActive}>
              {section.content}
            </SectionContent>

            {/* Inter-section divider — hidden on last item */}
            {section !== sections[sections.length - 1] && (
              <div
                className={cn(
                  "mt-16 ml-4 sm:ml-16 h-px",
                  "bg-gradient-to-r from-border/50 via-border/20 to-transparent",
                  "transition-opacity duration-500",
                  isActive ? "opacity-60" : "opacity-30"
                )}
                aria-hidden="true"
              />
            )}
          </motion.section>
        );
      })}
    </motion.div>
  );
}