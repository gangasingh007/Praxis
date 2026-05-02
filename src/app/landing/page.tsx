"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Timer, 
  CheckCircle, 
  BarChart2, 
  Zap, 
  ArrowRight,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const features = [
  {
    title: "Dynamic Planner",
    description: "The core engine. Use advanced time-blocking to reclaim your schedule and eliminate decision fatigue before the day begins.",
    icon: Calendar,
  },
  {
    title: "Deep Focus",
    description: "Integrated Pomodoro tech. Shield your cognitive resources from distractions during high-value deep work execution.",
    icon: Timer,
  },
  {
    title: "Habit Protocol",
    description: "Engineered consistency. Track high-impact behaviors and build neural pathways with AI-driven reinforcement.",
    icon: CheckCircle,
  },
  {
    title: "Neural Insights",
    description: "Data-driven growth. Analyze your productivity telemetry and optimize your performance with precision metrics.",
    icon: BarChart2,
  }
];

// Stagger variants for the feature grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
      
      {/* 🌌 Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/15 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* 🗺️ Minimal Navigation */}
      <nav className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black tracking-tighter text-xl italic uppercase">
            Praxis<span className="text-primary">.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-mono text-xs font-bold uppercase tracking-widest hidden sm:flex">
                Access Terminal
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 space-y-32">
        
        {/* 🚀 Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8 relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
          >
            <Terminal size={14} /> Cognitive OS v1.0
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
          >
            Master the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 drop-shadow-sm">
              Praxis Protocol.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed"
          >
            A cognitive operating system designed for high-performers. Stop planning passively. Start executing with zero-margin accuracy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link href="/planner">
              <Button size="lg" className="h-14 px-8 gap-2 font-mono font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_hsl(var(--primary)/0.25)] hover:scale-105 transition-all w-full sm:w-auto">
                Begin Mission <Zap size={18} />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="h-14 px-8 gap-2 font-mono font-bold uppercase tracking-widest bg-background/50 backdrop-blur-md hover:bg-accent hover:text-accent-foreground border-border hover:border-primary/50 transition-all w-full sm:w-auto">
                Read Documentation <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* 🛠️ Feature Grid */}
        <section className="relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">System Architecture</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/50 backdrop-blur-xl transition-all duration-500 shadow-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.05)] relative overflow-hidden"
              >
                {/* Subtle hover gradient inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 🏁 Footer CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] bg-card/40 border border-primary/20 p-12 text-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Take Command.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Your time is your most vital asset. Stop leaking cognitive energy and initialize the Praxis protocol today.
          </p>
          <Link href="/planner">
            <Button size="lg" className="h-14 px-10 font-mono font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-primary-foreground shadow-2xl hover:scale-105 transition-all">
              Initialize System
            </Button>
          </Link>
        </motion.section>

      </main>
    </div>
  );
}