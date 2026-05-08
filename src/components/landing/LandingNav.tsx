// src/components/landing/LandingNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Menu, ArrowRight, Terminal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Features", href: "/landing#features" },
  { label: "Metrics", href: "/landing#metrics" },
  { label: "Testimonials", href: "/landing#testimonials" },
  { label: "Docs", href: "/docs" },
];

interface LandingNavProps {
  session?: any;
}

export function LandingNav({ session }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const isAuthenticated = !!session;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-border/40 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="font-black tracking-tighter text-xl uppercase italic">
            Praxis<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Center links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          <AnimatePresence>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 group"
              >
                <span
                  className={cn(
                    "relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-200",
                    hoveredLink === link.label
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {link.label}
                </span>
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </AnimatePresence>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/planner">
                <Button
                  size="sm"
                  className="h-9 px-5 gap-2 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-xl
                    shadow-primary/20 hover:shadow-primary/40
                    transition-all duration-300"
                >
                  Dashboard
                  <ArrowRight size={14} />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-mono text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="sm"
                    className="h-9 px-5 gap-2 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-xl
                      shadow-primary/20 hover:shadow-primary/40
                      transition-all duration-300"
                  >
                    Initialize
                    <ArrowRight size={14} />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="h-4 w-px bg-border/40 mx-1 hidden sm:block" />

          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background shrink-0 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:max-w-xs border-l border-border/40 bg-background/95 backdrop-blur-xl p-0 flex flex-col"
              >
                <SheetHeader className="p-6 text-left border-b border-border/40">
                  <SheetTitle>
                    <div className="flex items-center gap-2.5">
                      <span className="font-black tracking-tighter text-xl uppercase italic">
                        Praxis<span className="text-primary">.</span>
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 px-2">
                    Navigation
                  </p>
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between group py-3 px-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
                        >
                          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                          <ArrowRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary"
                          />
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-border/40 space-y-4">
                  {isAuthenticated ? (
                    <Link href="/planner" className="block w-full">
                      <Button className="w-full h-12 font-mono uppercase tracking-widest font-extrabold rounded-xl shadow-primary/20 text-background">
                        Go to Dashboard
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" className="block w-full">
                        <Button className="w-full h-12 font-mono uppercase tracking-widest font-extrabold rounded-xl shadow-primary/20 text-background">
                          Initialize System
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                      <Link href="/login" className="block w-full">
                        <Button
                          variant="outline"
                          className="w-full h-12 font-mono uppercase tracking-widest font-bold rounded-xl border-border/60 hover:bg-primary/5 transition-colors"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}