// src/components/landing/FeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Timer,
  CheckCircle,
  BarChart2,
  BrainCircuit,
  Workflow,
} from "lucide-react";
import  SectionLabel  from "./shared/SectionalLabel";
import { AnimatedCard } from "./shared/AnimatedCard";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Dynamic Planner",
    description:
      "Advanced time-blocking engine that reclaims your schedule and eliminates decision fatigue before the day begins.",
    icon: Calendar,
    badge: "Core",
    span: "md:col-span-2", // wide card
    size: "lg",
  },
  {
    title: "Deep Focus",
    description:
      "Integrated Pomodoro tech that shields your cognitive resources from distractions during high-value deep work sessions.",
    icon: Timer,
    badge: "Focus",
    span: "",
    size: "md",
  },
  {
    title: "Habit Protocol",
    description:
      "Engineered consistency. Track high-impact behaviors with AI-driven reinforcement that compounds over time.",
    icon: CheckCircle,
    badge: "Habit",
    span: "",
    size: "md",
  },
  {
    title: "Neural Insights",
    description:
      "Analyze your productivity telemetry and optimize performance with precision metrics and adaptive recommendations.",
    icon: BarChart2,
    badge: "Analytics",
    span: "",
    size: "md",
  },
  {
    title: "Workflow Engine",
    description:
      "Automate repetitive planning decisions with intelligent templates that adapt to your unique rhythms.",
    icon: Workflow,
    badge: "Automation",
    span: "",
    size: "md",
  },
  {
    title: "Cognitive Load AI",
    description:
      "Smart task sequencing that matches mental effort to your biological energy peaks throughout the day.",
    icon: BrainCircuit,
    badge: "AI",
    span: "md:col-span-2",
    size: "lg",
  },
];

const badgeColorMap: Record<string, string> = {
  Core: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Focus: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Habit: "bg-green-500/10 text-green-500 border-green-500/20",
  Analytics: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  Automation: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  AI: "bg-primary/10 text-primary border-primary/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface FeatureCardProps {
  feature: (typeof features)[number];
}

function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;
  const isLarge = feature.size === "lg";

  return (
    <AnimatedCard className={cn("p-7", isLarge && "p-8", feature.span)}>
      <div
        className={cn(
          "flex gap-6",
          isLarge ? "flex-col sm:flex-row items-start" : "flex-col"
        )}
      >
        {/* Icon block */}
        <div
          className={cn(
            "shrink-0 rounded-xl border border-border/60 bg-background",
            "flex items-center justify-center",
            "group-hover:bg-primary/10 group-hover:border-primary/25",
            "transition-all duration-300",
            isLarge ? "w-14 h-14" : "w-12 h-12"
          )}
        >
          <Icon
            className={cn(
              "text-primary",
              isLarge ? "w-7 h-7" : "w-5 h-5"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Badge + title row */}
          <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-widest border",
                badgeColorMap[feature.badge] ??
                  "bg-muted text-muted-foreground border-border"
              )}
            >
              {feature.badge}
            </span>
          </div>

          <h3
            className={cn(
              "font-black uppercase tracking-tight text-card-foreground mb-2",
              isLarge ? "text-2xl" : "text-xl"
            )}
          >
            {feature.title}
          </h3>

          <p
            className={cn(
              "text-muted-foreground leading-relaxed",
              isLarge ? "text-base max-w-lg" : "text-sm"
            )}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </AnimatedCard>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative scroll-mt-20">
      {/* Section header */}
      <div className="text-center mb-16 space-y-4">
        <SectionLabel label="System Architecture" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Built for{" "}
          <span className="text-muted-foreground">peak operators</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          Every module is engineered to eliminate friction and amplify your
          capacity for deep, meaningful work.
        </p>
        {/* Accent line */}
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      {/* Masonry-style grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </motion.div>
    </section>
  );
}