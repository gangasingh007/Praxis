"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Target,
  Timer,
  BarChart2,
  CheckCircle,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { 
    id: "philosophy", 
    title: "Core Philosophy", 
    icon: Target, 
    phase: "00",
    content: (
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          The fundamental problem with most productivity systems is that they treat all time as equal. Praxis is built on the principle of <strong className="text-foreground font-mono bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">Time_Blocking</strong>—the practice of scheduling specific tasks into specific time slots.
        </p>
        <p>
          By deciding <em>what</em> you will do and <em>when</em> you will do it before the day begins, you remove the constant need to make choices throughout the day, preserving your cognitive energy for actual deep work.
        </p>
      </div>
    )
  },
  { 
    id: "initialization", 
    title: "Daily Initialization", 
    icon: Calendar, 
    phase: "01",
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Your day should start (or the previous night should end) in the <strong>Planner</strong>. This is where you map out your mission parameters.
        </p>
        
        <div className="grid gap-3 font-mono text-sm">
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">01_</span>
            <div><span className="text-foreground font-bold">Brain Dump:</span> List everything that needs to be done. Keep it raw.</div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">02_</span>
            <div><span className="text-foreground font-bold">Categorize:</span> Assign color codes to tasks to visually distinguish work states.</div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">03_</span>
            <div><span className="text-foreground font-bold">Time Block:</span> Drag tasks into the daily schedule. Enforce realistic boundaries.</div>
          </div>
        </div>

        <div className="pt-2">
          <Link href="/planner">
            <Button variant="outline" className="gap-2 font-mono uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
              Open Planner <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    )
  },
  { 
    id: "execution", 
    title: "Deep Focus Execution", 
    icon: Timer, 
    phase: "02",
    content: (
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          Once your schedule is set, stop thinking about the &quot;what&quot; and focus entirely on the &quot;now.&quot; Use the <strong>Focus</strong> terminal to execute your plan.
        </p>
        <p>
          Praxis integrates an advanced Pomodoro technique—25 minutes of absolute focus followed by a 5-minute break. This rhythm prevents burnout and keeps your neural pathways fresh for sustained, high-velocity effort.
        </p>
        <div className="pt-4">
          <Link href="/focus">
            <Button variant="outline" className="gap-2 font-mono uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
              Initialize Focus Mode <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    )
  },
  { 
    id: "consistency", 
    title: "The Habit Protocol", 
    icon: CheckCircle, 
    phase: "03",
    content: (
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          Success is the sum of small, repeated actions. The <strong>Habits</strong> section is designed to track high-impact behaviors that don&apos;t necessarily fit into a single time block but are essential for long-term compounding growth.
        </p>
        <blockquote className="border-l-2 border-primary pl-5 py-2 my-6 italic text-foreground bg-primary/5 rounded-r-xl shadow-[inset_4px_0_0_hsl(var(--primary))]">
          "Aim for Never Miss Twice. Perfection isn&apos;t the goal; engineered consistency is."
        </blockquote>
        <div className="pt-2">
          <Link href="/habits">
            <Button variant="outline" className="gap-2 font-mono uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
              Track Habits <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    )
  },
  { 
    id: "refinement", 
    title: "Performance Refinement", 
    icon: BarChart2, 
    phase: "04",
    content: (
      <div className="space-y-4 text-lg leading-relaxed">
        <p>
          At the end of each week, access the <strong>Insights</strong> dashboard. Analyze where your time actually went versus where you planned for it to go.
        </p>
        <p>
          Use this telemetry data to identify <span className="text-foreground font-mono bg-zinc-800/50 px-1.5 py-0.5 rounded border border-border">"performance leaks"</span> and adjust your next week&apos;s parameters for optimized efficiency. The AI will assist in finding patterns in your work habits.
        </p>
        <div className="pt-4">
          <Link href="/insights">
            <Button variant="outline" className="gap-2 font-mono uppercase tracking-widest hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
              View Telemetry <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    )
  },
];

export default function DocumentationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("philosophy");

  useEffect(() => {
    const sections = document.querySelectorAll(".doc-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto p-6 py-12 md:py-24 font-mono flex flex-col md:flex-row gap-12 relative items-start"
    >
    
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-24 space-y-8 h-[calc(100vh-8rem)]">
        <nav className="flex flex-col gap-1 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[1px] before:bg-border/50">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "relative flex items-center gap-4 py-2.5 px-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 text-left",
                  isActive
                    ? "text-primary translate-x-2"
                    : "text-muted-foreground hover:text-zinc-300 hover:translate-x-1"
                )}
              >
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full z-10 transition-all duration-300",
                    isActive
                      ? "bg-primary shadow-[0_0_10px_hsl(var(--primary))] scale-150"
                      : "bg-border"
                  )}
                />
                <span className="font-mono text-xs opacity-50">
                  {section.phase}
                </span>
                {section.title}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 📄 Main Content */}
      <main className="flex-1 space-y-24 min-w-0">
        
        {/* Header */}
        <header className="space-y-6 relative">
          <div className="absolute -top-32 -left-20 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          <h1 className="italic text-6xl md:text-8xl text-foreground font-medium tracking-tight uppercase leading-[0.9]">
            Praxis<span className="not-italic text-primary">.</span> <br />
            <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40 drop-shadow-sm">
              Parameters
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Praxis is a methodology for cognitive management. This guide helps
            you reclaim focus, analyze telemetry, and eliminate decision fatigue.
          </p>
        </header>

        <div className="h-px w-full bg-gradient-to-r from-border/50 via-border/20 to-transparent" />

        {/* Dynamic Sections mapped from the array */}
        {SECTIONS.map((section) => {
          const Icon = section.icon;

          return (
            <section
              key={section.id}
              id={section.id}
              className="doc-section scroll-mt-32 space-y-6 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500 shadow-sm">
                  <Icon className="text-primary w-6 h-6" />
                </div>

                <div>
                  <div className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold mb-1 opacity-80">
                    Phase {section.phase}
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-foreground/90">
                    {section.title}
                  </h2>
                </div>
              </div>

              {/* Unique Content rendered from the object */}
              <div className="pl-18 md:pl-20 text-muted-foreground border-l border-transparent group-hover:border-border/40 transition-colors duration-500 py-2">
                {section.content}
              </div>
            </section>
          );
        })}

        {/* Footer */}
        <footer className="pt-16 pb-8 border-t border-border/30 text-left md:pl-20 mt-12">
          <p className="text-[10px] font-mono font-bold text-muted-foreground/50 uppercase tracking-[0.4em] flex items-center gap-4">
            <Terminal size={14} className="text-primary/50" /> End of Protocol{" "}
            <span className="text-primary mx-2">///</span> Master Your Time
          </p>
        </footer>
      </main>
    </div>
  );
}