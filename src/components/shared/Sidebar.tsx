"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  CheckCircle, 
  BarChart2, 
  Settings, 
  Timer, 
  UserIcon, 
  ChevronLeft, 
  Menu,
  X,
  ArrowUpRight,
  Info,
  InfoIcon,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { useEffect } from "react";
import { logoutAction } from "@/actions/auth-actions";

const navItems = [
  { name: "Planner", href: "/planner", icon: Calendar },
  { name: "Habits", href: "/habits", icon: CheckCircle },
  { name: "Focus", href: "/focus", icon: Timer },
  { name: "Insights", href: "/insights", icon: BarChart2 },
  { name: "Docs", href: "/docs", icon: InfoIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Learn More",href: "/learn-more", icon: InfoIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse, isOpen, setOpen } = useSidebar();

  // Close sidebar when clicking a link on mobile
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-background/70 backdrop-blur-xl border-r border-border transition-all duration-300 lg:static",
          isCollapsed ? "w-20" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <h1 className="text-3xl font-black tracking-tighter italic uppercase text-foreground">
                  Praxis<span className="text-primary">.</span>
                </h1>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Desktop Collapse Toggle */}
          <button 
            onClick={toggleCollapse}
            className="hidden lg:flex w-6 h-6 items-center justify-center cursor-pointer hovver:bg-accent transition-colors rounded-md border border-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft size={14} className={cn("transition-transform duration-300", isCollapsed && "rotate-180")} />
          </button>

          {/* Mobile Close Toggle */}
          <button 
            onClick={() => setOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                className="relative block group"
                title={isCollapsed ? item.name : undefined}
                aria-label={isCollapsed ? item.name : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className={cn(
                  "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  isCollapsed ? "justify-center px-0" : ""
                )}>
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && (
                    <span className="text-[10px] uppercase font-black tracking-widest truncate">{item.name}</span>
                  )}
                  {isCollapsed && isActive && (
                    <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer  */}
        <div className="mt-auto flex flex-col border-t border-border/50">
          <button
            onClick={handleLogout}
            className="p-4  cursor-pointer  transition-colors group text-left w-full"
            title={isCollapsed ? "Logout" : undefined}
          >
            <div className={cn(
              "p-3 rounded-2xl border border-destructive/20 flex items-center hover:bg-destructive/10 gap-3 transition-all ",
              isCollapsed && "justify-center px-0"
            )}>
              <LogOut size={16} className="text-destructive transition-transform group-hover:-translate-x-0.5" />
              {!isCollapsed && (
                <span className="text-[15px] font-mono font-bold text-destructive leading-none">Logout</span>
              )}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
