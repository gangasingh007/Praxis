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
  },
  {
    value: "47min",
    label: "Daily Time Reclaimed",
    description: "Saved from decision fatigue and context switching",
  },
  {
    value: "91%",
    label: "Goal Completion Rate",
    description: "Versus 28% industry baseline for self-directed work",
  },
  {
    value: "12k+",
    label: "Active Operators",
    description: "Professionals running Praxis Protocol daily",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

export function StatsSection() {
  return (
    <section id="metrics" className="relative scroll-mt-20">
      <div className="text-center mb-14 space-y-4">
        <SectionLabel label="Performance Telemetry" icon={<BarChart2 size={12} />} />
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
          Numbers don&apos;t lie
        </h2>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="group relative p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all duration-500 overflow-hidden text-center"
          >
            {/* bg shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Top line shimmer */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-2">
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-foreground font-mono">
                {stat.value}
              </p>
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground leading-snug pt-1">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}