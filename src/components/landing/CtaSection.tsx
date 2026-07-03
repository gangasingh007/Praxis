// src/components/landing/CtaSection.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlowOrb } from "./shared/GlowOrb";
import { ArrowRight, ShieldCheck } from "lucide-react";
import SectionLabel from "./shared/SectionalLabel";

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
      className="relative rounded-[2.5rem] border border-primary/20 bg-card/40 backdrop-blur-2xl p-14 sm:p-24 text-center overflow-hidden shadow-[0_20px_80px_rgba(var(--primary-rgb),0.1)]"
    >
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06)_0%,transparent_70%)] pointer-events-none" />

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

      <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <SectionLabel
          label="Ready to initialize?"
          icon={<ShieldCheck size={12} />}
        />

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground">
          Take command <br />
          <span className="text-muted-foreground/60 italic">of your time.</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-xl leading-relaxed max-w-xl mx-auto font-medium">
          Join thousands of operators who replaced passive planning with
          precision execution. Your first week is completely free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
          <Link href="/login" className="w-full sm:w-auto cursor-pointer">
            <Button
              size="lg"
              className="h-15 px-12 gap-3 rounded-2xl text-background font-mono font-black uppercase tracking-widest text-sm cursor-pointer
                bg-primary shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.6)]
                hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
            >
              Initialize System
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto cursor-pointer">
            <Button
              size="lg"
              variant="outline"
              className="h-15 px-10 font-mono rounded-2xl font-bold uppercase tracking-widest text-sm cursor-pointer
                border-border/60 hover:border-primary/50 hover:bg-primary/5
                hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 pt-2">
          {trustItems.map((item, idx) => (
            <div key={item} className="flex items-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-4">
                <ShieldCheck size={13} className="text-primary shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
              {idx < trustItems.length - 1 && (
                <div className="hidden sm:block w-px h-3 bg-border/60" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}