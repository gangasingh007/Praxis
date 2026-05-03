// src/components/landing/LandingFooter.tsx
import Link from "next/link";
import { Layers } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Product: ["Planner", "Focus", "Habits", "Analytics"],
  Resources: ["Documentation", "Changelog", "Status"],
  Company: ["About", "Blog", "Contact"],
};

export function LandingFooter() {
  return (
    <footer className="border-t border-border/40 pt-14 pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-1 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black tracking-tighter text-lg uppercase italic">
              Praxis<span className="text-primary"> .</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
            Cognitive OS for high-performance individuals.
          </p>
        </div>

        {/* Link groups */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="space-y-3">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              {group}
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
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