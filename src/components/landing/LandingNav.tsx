// src/components/landing/LandingNav.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Layers } from "lucide-react";

const navLinks = [
  { label: "Features", href: "/landing#features" },
  { label: "Metrics", href: "/landing#metrics" },
  { label: "Testimonials", href: "/landing#testimonials" },
  { label: "Documentation", href: "/docs" },
];

export function LandingNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border/40 bg-background/60 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-black tracking-tighter text-lg uppercase italic">
            Praxis<span className="text-primary"> .</span>
          </span>
        </Link>

        {/* Center links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground font-mono text-xs uppercase tracking-widest font-bold"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/login" className="hidden sm:block">
            <Button
              size="sm"
              variant="outline"
              className="font-mono text-xs uppercase rounded-xl tracking-widest font-bold border-border/60 hover:border-primary/50 hover:bg-primary/5"
            >
              Sign In
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}