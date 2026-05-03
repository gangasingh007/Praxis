// src/components/docs/DocsHeader.tsx
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { GlowOrb } from "../landing/shared/GlowOrb";

export function DocsHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative space-y-7 pb-2"
    >
      <GlowOrb
        size="lg"
        intensity="low"
        className="-top-32 -left-24 pointer-events-none"
      />

      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/60 text-primary text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
        <Terminal size={11} />
        System Documentation
      </div>

      {/* Headline */}
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.88]">
        <span className="italic">Praxis</span>
        <span className="text-primary not-italic">.</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/35">
          Parameters
        </span>
      </h1>

      {/* Description */}
      <p className="text-lg text-muted-foreground max-w-xl font-medium leading-relaxed">
        A complete methodology for cognitive management. Scientifically-backed
        protocols engineered to eliminate decision fatigue and compound daily
        execution.
      </p>

      {/* Meta strip */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
        {[
          { label: "Phases", value: "5" },
          { label: "Read time", value: "~12 min" },
          { label: "Version", value: "1.0.0" },
        ].map((meta) => (
          <div key={meta.label} className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              {meta.label}
            </span>
            <span className="text-[10px] font-mono font-bold text-foreground/70">
              {meta.value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-border/60 via-border/20 to-transparent mt-2" />
    </motion.header>
  );
}