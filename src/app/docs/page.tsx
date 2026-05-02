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
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// 🚀 ENHANCEMENT: Rich, scraped data integrated directly into the component.
const SECTIONS = [
  { 
    id: "philosophy", 
    title: "Core Philosophy", 
    icon: Target, 
    phase: "00",
    content: (
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          The fundamental flaw in standard productivity systems is that they treat all time as equal. Praxis is built on the principle of <strong className="text-foreground font-mono bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">Time_Blocking</strong>.
        </p>
        
        <blockquote className="relative border-l-2 border-primary pl-6 py-4 my-8 italic text-foreground bg-primary/5 rounded-r-xl shadow-[inset_4px_0_0_hsl(var(--primary))]">
          <Quote className="absolute -left-3 -top-3 w-6 h-6 text-primary/40 fill-primary/20" />
          "A 40-hour time-blocked work week, I estimate, produces the same amount of output as a 60+ hour work week pursued without structure."
          <footer className="mt-2 text-sm font-mono text-muted-foreground not-italic">— Cal Newport, Author of Deep Work</footer>
        </blockquote>

        <p>
          By deciding <em>what</em> you will do and <em>when</em> you will do it before the day begins, you remove the constant need to make choices throughout the day, preserving your cognitive energy for actual execution.
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
          Your day must start in the <strong>Planner</strong>. This is where you map out your mission parameters and assign specific hours to specific tasks. 
        </p>
        
        <div className="grid gap-3 font-mono text-sm my-6">
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">01_</span>
            <div><span className="text-foreground font-bold">Brain Dump:</span> Clear your working memory. List everything that needs to be done.</div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">02_</span>
            <div><span className="text-foreground font-bold">Categorize:</span> Assign color codes to visually distinguish between Deep Work, Admin, and Rest.</div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50 items-start hover:border-primary/30 transition-colors">
            <span className="text-primary font-bold">03_</span>
            <div><span className="text-foreground font-bold">Time Block:</span> Drag tasks into the timeline. Enforce strict boundaries.</div>
          </div>
        </div>

        <blockquote className="border-l-2 border-border pl-5 py-2 my-6 italic text-muted-foreground">
          "If you give yourself 30 days to clean your house, it will take 30 days. If you give yourself 3 hours, it will take 3 hours." — Parkinson's Law
        </blockquote>

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
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Once your schedule is set, execute the plan using the <strong>Focus</strong> terminal. Praxis integrates the Pomodoro technique—invented by Francesco Cirillo—utilizing 25 minutes of absolute focus followed by a 5-minute break.
        </p>
        
        <div className="p-5 rounded-xl bg-card border border-border/50 space-y-3">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase font-bold tracking-widest mb-2">
            <BarChart2 size={14} /> Scientific Telemetry
          </div>
          <p className="text-sm text-muted-foreground">
            Empirical data demonstrates that structured Pomodoro intervals lead to approximately <strong className="text-foreground">20% lower cognitive fatigue</strong>, improved motivation, and higher sustained task performance compared to self-paced, unstructured break schedules.
          </p>
        </div>

        <p>
          Furthermore, the timer lowers the barrier to entry. When you commit to just 25 minutes, daunting projects feel achievable, effectively bypassing the psychological triggers of procrastination.
        </p>

        <div className="pt-2">
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
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Success is the sum of small, repeated actions. The <strong>Habits</strong> section tracks high-impact behaviors that don&apos;t fit into a single time block but are essential for compounding growth.
        </p>
        
        <blockquote className="border-l-2 border-primary pl-5 py-2 my-6 italic text-foreground bg-primary/5 rounded-r-xl shadow-[inset_4px_0_0_hsl(var(--primary))]">
          "A year from now you will wish you had started today." 
          <footer className="mt-1 text-xs font-mono text-primary/80 not-italic uppercase tracking-widest">— Karen Lamb</footer>
        </blockquote>

        <p>
          Aim for <strong className="text-foreground">Never Miss Twice</strong>. Praxis utilizes AI to monitor your telemetry and provide dynamic, contextual reinforcement when you complete a habit. Perfection isn&apos;t the goal; engineered consistency is.
        </p>

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
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          "Until we can manage time, we can manage nothing else." At the end of each week, access the <strong>Insights</strong> dashboard to review your telemetry.
        </p>
        <p>
          Analyze where your time actually went versus where you planned for it to go. Identify <span className="text-foreground font-mono bg-zinc-800/50 px-1.5 py-0.5 rounded border border-border">"performance leaks"</span> (e.g., spending 4 hours on email instead of 1) and adjust your next week&apos;s parameters for optimized efficiency.
        </p>
        <div className="pt-2">
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

  // Track active section on scroll utilizing IntersectionObserver
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

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto p-6 py-12 md:py-24 font-sans flex flex-col md:flex-row gap-12 relative items-start selection:bg-primary/30"
    >
      {/* 🧭 Sticky Sidebar (Table of Contents) */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-24 space-y-8 h-[calc(100vh-8rem)] z-10">
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
      <main className="flex-1 space-y-24 min-w-0 relative z-10">
        
        {/* Header */}
        <header className="space-y-6 relative">
          <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-card border border-border text-primary text-[10px] font-mono font-bold uppercase tracking-widest shadow-sm">
            <Terminal size={12} /> System Documentation
          </div>
          
          <h1 className="italic text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            Praxis<span className="not-italic text-primary">.</span> <br />
            <span className="not-italic text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/40 drop-shadow-sm">
              Parameters
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Praxis is a methodology for cognitive management. This manual outlines the exact, scientifically-backed protocols required to eliminate decision fatigue.
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

              {/* Unique Content rendered directly from the object */}
              <div className="pl-6 md:pl-20 text-muted-foreground border-l border-transparent group-hover:border-border/40 transition-colors duration-500 py-2">
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