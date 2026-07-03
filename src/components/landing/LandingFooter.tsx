// src/components/landing/LandingFooter.tsx
import Link from "next/link";
import { Layers } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: [
    { label: "Planner", href: "#features" },
    { label: "Focus", href: "#features" },
    { label: "Habits", href: "#features" },
    { label: "Analytics", href: "#metrics" }
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" }
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" }
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative border-t border-border/40 pt-24 pb-12 bg-background/50">
      {/* Subtle gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-muted/30 to-transparent pointer-events-none" />

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-16 mb-20">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1 space-y-5">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-black tracking-tighter text-2xl uppercase italic group-hover:text-primary transition-colors duration-200">
              Praxis<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-[220px]">
            The cognitive operating system for high-performance individuals. Precision engineered for clarity.
          </p>
        </div>

        {/* Link groups */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="space-y-5">
            <p className="text-xs font-mono font-black uppercase tracking-[0.2em] text-foreground/80">
              {group}
            </p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-border/40 mb-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-muted-foreground font-mono">
          © {new Date().getFullYear()} Praxis Protocol. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[11px] text-muted-foreground hover:text-primary font-mono transition-colors duration-200 cursor-pointer"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}