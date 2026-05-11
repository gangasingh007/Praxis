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
    <footer className="border-t border-border/40 pt-20 pb-12 bg-background/50">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1 space-y-5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-black tracking-tighter text-2xl uppercase italic group-hover:text-primary transition-colors">
              Praxis<span className="text-primary">.</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
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
                    className="text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Separator className="bg-border/40 mb-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground font-mono">
          © {new Date().getFullYear()} Praxis Protocol. All rights reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[11px] text-muted-foreground hover:text-foreground font-mono transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}