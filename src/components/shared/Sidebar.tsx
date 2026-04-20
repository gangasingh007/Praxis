"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, BarChart2, Settings, Timer , UserIcon} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Planner", href: "/planner", icon: Calendar },
  { name: "Habits", href: "/habits", icon: CheckCircle },
  { name: "Focus", href: "/focus", icon: Timer },
  { name: "Insights", href: "/insights", icon: BarChart2 },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-border bg-card/50 backdrop-blur-md flex flex-col p-4 hidden md:flex">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-black tracking-tighter italic uppercase text-foreground">
          Praxis<span className="text-primary">.</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative block group">
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-accent rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                isActive ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <span className="text-sm uppercase tracking-widest font-bold text-[10px]">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-muted/30 rounded-2xl border border-border/50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Status</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-foreground">Operational</span>
        </div>
      </div>
    </aside>
  );
}
