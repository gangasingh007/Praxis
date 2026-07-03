// src/components/landing/StatsSection.tsx
"use client";

import { motion } from "framer-motion";
import  SectionLabel  from "./shared/SectionalLabel";
import { BarChart2 } from "lucide-react";

const stats = [
  {
    value: "3.2×",
    label: "Productivity Multiplier",
    description: "Average output increase reported after 30-day usage",
    accentColor: "bg-primary",
  },
  {
    value: "47min",
    label: "Daily Time Reclaimed",
    description: "Saved from decision fatigue and context switching",
    accentColor: "bg-chart-1",
  },
  {
    value: "91%",
    label: "Goal Completion Rate",
    description: "Versus 28% industry baseline for self-directed work",
    accentColor: "bg-chart-2",
  },
  {
    value: "12k+",
    label: "Active Operators",
    description: "Professionals running Praxis Protocol daily",
    accentColor: "bg-chart-5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

export function StatsSection() {
  return (
    <section id="metrics" className="relative scroll-mt-20">
      {/* Subtle background treatment */}
      <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 rounded-3xl bg-muted/30 -z-10" />

      <div className="text-center mb-16 space-y-5">
        <SectionLabel label="Performance Telemetry" icon={<BarChart2 size={12} />} />
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
          Numbers don&apos;t lie
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="group relative p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:translate-y-[-2px] cursor-pointer transition-all duration-300 overflow-hidden text-center"
          >
            {/* bg shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Distinctive top accent line — always visible */}
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${stat.accentColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative z-10 space-y-3">
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-foreground font-mono bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed pt-1">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}