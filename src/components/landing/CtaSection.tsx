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
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl p-10 sm:p-16 text-center overflow-hidden"
    >
      {/* Inner glow */}
      <GlowOrb
        size="lg"
        intensity="medium"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Decorative top border shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Ready to initialize?
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.92]">
          Take command <br />
          <span className="text-muted-foreground">of your time.</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Join thousands of operators who replaced passive planning with
          precision execution. Your first week is completely free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <Link href="/planner">
            <Button
              size="lg"
              className="h-13 px-10 gap-2.5 rounded-xl text-background font-mono font-bold uppercase tracking-widest text-sm
                shadow-[0_0_30px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_50px_hsl(var(--primary)/0.5)]
                hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
            >
              Initialize System
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="h-13 px-8 font-mono rounded-xl font-bold uppercase tracking-widest text-sm
                border-border/60 hover:border-primary/50 hover:bg-primary/5
                transition-all duration-200 w-full sm:w-auto"
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