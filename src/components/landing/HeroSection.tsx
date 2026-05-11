// src/components/landing/HeroSection.tsx
"use client";

import { motion, Easing } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import  SectionLabel from "./shared/SectionalLabel";
import { GlowOrb } from "./shared/GlowOrb";
import { ArrowRight, Zap, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STAGGER_BASE = 0.1;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

// Floating stat pills displayed beneath the headline
const statPills = [
  { value: "4.9★", label: "User Rating" },
  { value: "12k+", label: "Active Operators" },
  { value: "98%", label: "Retention" },
];

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center text-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Glow orbs */}
      <GlowOrb
        size="xl"
        intensity="medium"
        className="top-[-120px] left-1/2 -translate-x-1/2 opacity-50"
      />
      <GlowOrb
        size="sm"
        intensity="low"
        className="bottom-0 right-0 translate-x-1/3 opacity-30"
      />

      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <SectionLabel
          label="Cognitive OS v1.0"
          icon={<Terminal size={12} />}
        />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative"
      >
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter uppercase leading-[0.85] max-w-5xl">
          Stop Managing.{" "}
          <br className="hidden sm:block" />
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/40">
              Start Executing.
            </span>
            {/* Animated accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
              className="absolute -bottom-2 left-0 h-[4px] bg-primary/30 rounded-full"
            />
          </span>
        </h1>
        {/* Subtle top light */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-primary/20 blur-md rounded-full" />
      </motion.div>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-10 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium"
      >
        A precision productivity engine built for operators who refuse to
        leave performance on the table. Plan with intent. Execute with clarity.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex flex-col sm:flex-row gap-4 items-center"
      >
        <Link href="/login" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="h-14 px-10 gap-3 text-background font-mono font-black uppercase tracking-widest text-sm rounded-2xl
              bg-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.5)]
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full"
          >
            Begin Mission
            <Zap size={16} fill="currentColor" />
          </Button>
        </Link>
        <Link href="#features" className="w-full sm:w-auto">
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-10 gap-3 font-mono font-bold uppercase tracking-widest text-sm rounded-2xl
              border-border/60 hover:border-primary/40 hover:bg-primary/5
              transition-all duration-300 w-full"
          >
            Explore System
            <ArrowRight size={16} />
          </Button>
        </Link>
      </motion.div>

      {/* Stat pills */}
      <motion.div
        {...fadeUp(STAGGER_BASE * 4)}
        className="mt-12 flex flex-wrap items-center justify-center gap-3"
      >
        {statPills.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card border border-border/60 shadow-sm"
          >
            <span className="text-sm font-black text-foreground font-mono">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {stat.label}
            </span>
          </div>
        ))}
        <Badge
          variant="secondary"
          className="px-3 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wide bg-primary/10 text-primary border-primary/20"
        >
          Free to Start
        </Badge>
      </motion.div>
    </section>
  );
}