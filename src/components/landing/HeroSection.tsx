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
    <section className="relative flex flex-col items-center text-center pt-20 pb-12 px-4 overflow-hidden">
      {/* Glow orbs */}
      <GlowOrb
        size="xl"
        intensity="medium"
        className="top-[-120px] left-1/2 -translate-x-1/2"
      />
      <GlowOrb
        size="sm"
        intensity="low"
        className="bottom-0 right-0 translate-x-1/3"
      />

      {/* Badge */}
      <motion.div {...fadeUp(STAGGER_BASE * 0)} className="mb-8">
        <SectionLabel
          label="Cognitive OS v1.0"
          icon={<Terminal size={12} />}
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(STAGGER_BASE * 1)}
        className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-black tracking-tighter uppercase leading-[0.88] max-w-5xl"
      >
        Stop Managing.{" "}
        <br className="hidden sm:block" />
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-primary/40">
            Start Executing.
          </span>
          {/* Underline accent */}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/80 to-primary/10 rounded-full origin-left"
          />
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        {...fadeUp(STAGGER_BASE * 2)}
        className="mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium"
      >
        A precision productivity engine built for operators who refuse to
        leave performance on the table. Plan with intent. Execute with clarity.
        Compound results over time.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        {...fadeUp(STAGGER_BASE * 3)}
        className="mt-10 flex flex-col sm:flex-row gap-3 items-center"
      >
        <Link href="/login">
          <Button
            size="lg"
            className="h-13 px-8 gap-2.5 text-background font-mono font-extrabold uppercase tracking-widest text-sm rounded-xl
              shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_45px_hsl(var(--primary)/0.45)]
              hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
          >
            Begin Mission
          </Button>
        </Link>
        <Link href="#features">
          <Button
            size="lg"
            variant="ghost"
            className="h-13 px-8 gap-2.5 font-mono font-bold uppercase tracking-widest text-sm rounded-xl
              text-muted-foreground hover:text-foreground hover:bg-accent/60
              transition-all duration-200 w-full sm:w-auto"
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