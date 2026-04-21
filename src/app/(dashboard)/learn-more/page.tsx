"use client";

import { useEffect, useRef } from "react";
import { 
  Calendar, 
  CheckCircle, 
  Timer, 
  BarChart2, 
  Zap, 
  Shield, 
  Target,
  ArrowRight,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const features = [
  {
    title: "Dynamic Planner",
    description: "The core of Praxis. Use advanced time-blocking to reclaim your schedule and eliminate decision fatigue.",
    icon: Calendar,
  },
  {
    title: "Habit Protocol",
    description: "Engineered consistency. Track high-impact behaviors and build neural pathways for long-term success.",
    icon: CheckCircle,
  },
  {
    title: "Deep Focus",
    description: "Integrated Pomodoro tech. Shield your cognitive resources from distractions during high-value deep work sessions.",
    icon: Timer,
  },
  {
    title: "Neural Insights",
    description: "Data-driven growth. Analyze your productivity patterns and optimize your performance with precision metrics.",
    icon: BarChart2,
  }
];

const protocols = [
  { step: "01", title: "Analyze", detail: "Review your long-term goals and break them into actionable daily blocks." },
  { step: "02", title: "Initialize", detail: "Set your daily mission in the Planner before the chaos of the day begins." },
  { step: "03", title: "Execute", detail: "Use the Focus Timer to maintain absolute concentration on one block at a time." },
  { step: "04", title: "Refine", detail: "Log habits and review Insights to identify and eliminate performance leaks." }
];

export default function LearnMorePage() {
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-24 py-20 font-sans overflow-hidden">
      
      {/* 🚀 Hero Section */}
      <section className="hero-section text-center space-y-6 relative py-16">
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
        
        <div className="hero-text flex flex-col items-center justify-center space-y-8 relative z-10">
       
          
          <h1 className="text-6xl text-shadow-secondary-foreground md:text-8xl font-black tracking-tighter uppercase">
            Master the <br/>
            <span className="text-foreground italic bg-clip-text bg-gradient-to-br from-primary to-primary/50 drop-shadow-lg">
              Praxis<span className="text-primary">.</span>
            </span> Protocol
          </h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Praxis isn&apos;t just a planner—it&apos;s a cognitive operating system designed for high-performers who demand absolute control over their time.
          </p>
        </div>
      </section>

      {/* 🛠 Feature Grid */}
      <section className="feature-grid grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="feature-card group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 hover:bg-card/80 backdrop-blur-xl transition-colors duration-500 shadow-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-primary/10">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-card-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* 🧬 Protocol Steps */}
      <section className="protocol-section space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tight">The Operational Flow</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {protocols.map((p, i) => (
            <div key={p.title} className="protocol-step relative space-y-4 group">
              <div className="text-7xl font-black text-primary/5 absolute -top-8 -left-4 select-none transition-colors group-hover:text-primary/10">
                {p.step}
              </div>
              <div className="relative z-10 pt-4">
                <h4 className="text-xl font-bold uppercase tracking-tight text-primary mb-2">
                  {p.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                  {p.detail}
                </p>
              </div>
              {i < protocols.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 translate-y-[-50%] text-border/50 group-hover:text-primary/50 transition-colors">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🛡 Security & Core Values */}
      <section className="security-banner bg-card/40 border border-primary/20 rounded-[2.5rem] p-8 md:p-14 overflow-hidden relative shadow-[0_0_50px_hsl(var(--primary)/0.05)] backdrop-blur-sm">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 text-primary font-mono font-bold uppercase tracking-[0.2em] text-xs">
              <Shield size={16} /> Data Sovereignty
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter leading-[1.1]">
              Your data. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Your command.
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-lg">
              We believe productivity shouldn&apos;t come at the cost of privacy. Praxis uses industry-standard encryption to ensure your schedules, habits, and neural insights remain strictly under your authorization.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/planner">
                <Button size="lg" className="h-14 gap-2 font-mono font-bold uppercase tracking-widest px-8 bg-primary text-background hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-105 transition-all">
                  Begin Mission
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="p-8 rounded-3xl bg-transparent border border-border/50 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors">
              <Target className="text-primary w-8 h-8" />
              <h5 className="font-bold text-sm uppercase tracking-widest text-card-foreground">Precision</h5>
              <p className="text-xs text-muted-foreground uppercase leading-relaxed font-mono">Zero-margin scheduling accuracy.</p>
            </div>
            <div className="p-8 rounded-3xl bg-transparent border border-border/50 backdrop-blur-sm space-y-4 hover:border-primary/40 transition-colors translate-y-6">
              <Zap className="text-primary w-8 h-8" />
              <h5 className="font-bold text-sm uppercase tracking-widest text-card-foreground">Velocity</h5>
              <p className="text-xs text-muted-foreground uppercase leading-relaxed font-mono">Optimized for rapid mental context-switching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📄 Footer Note */}
      <footer className="text-center pt-12 border-t border-border/30">
        <p className="text-xs font-mono font-bold text-muted-foreground/60 uppercase tracking-[0.4em]">
          Praxis OS v0.1.0 <span className="text-primary mx-2">///</span> Authored for the High-Performer
        </p>
      </footer>
    </div>
  );
}