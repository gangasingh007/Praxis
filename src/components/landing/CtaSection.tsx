// src/components/landing/CtaSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "./shared/GlowOrb";
import { ArrowRight, ShieldCheck } from "lucide-react";

const trustItems = [
  "No credit card required",
  "Free tier available",
  "Cancel anytime",
];

export function CtaSection() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[2.5rem] border border-primary/20 bg-card/40 backdrop-blur-2xl p-10 sm:p-20 text-center overflow-hidden shadow-[0_20px_80px_rgba(var(--primary-rgb),0.1)]"
    >
      {/* Dynamic background light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Inner glow */}
      <GlowOrb
        size="xl"
        intensity="medium"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
      />

      {/* Decorative shimmers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <ShieldCheck size={12} className="text-primary" />
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-primary">
            Ready to initialize?
          </p>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
          Take command <br />
          <span className="text-muted-foreground/60 italic">of your time.</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-xl mx-auto font-medium">
          Join thousands of operators who replaced passive planning with
          precision execution. Your first week is completely free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="h-15 px-12 gap-3 rounded-2xl text-background font-mono font-black uppercase tracking-widest text-sm
                bg-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.6)]
                hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
            >
              Initialize System
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="h-15 px-10 font-mono rounded-2xl font-bold uppercase tracking-widest text-sm
                border-border/60 hover:border-primary/50 hover:bg-primary/5
                transition-all duration-300 w-full sm:w-auto"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <ShieldCheck size={12} className="text-primary shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}