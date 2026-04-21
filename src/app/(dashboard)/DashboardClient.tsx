"use client";

import { UserMenu } from "@/components/auth/UserMenu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Menu } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
  children: React.ReactNode;
  user: any;
}

export function DashboardClient({ children, user }: DashboardClientProps) {
  const { toggleOpen } = useSidebar();
  const displayName = user.name || user.email.split("@")[0];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      {/* Top Header */}
      <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleOpen}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-accent transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex flex-col items-end mr-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">
               User Authorized
             </span>
             <span className="text-xs font-bold text-foreground leading-none">
               {displayName}
             </span>
          </div>
          
          <div className="flex items-center gap-2 h-9 px-1 rounded-xl bg-muted/30  border-border/50">
            <ThemeToggle />
            <div className="w-px h-4 bg-border/50 mx-1" />
            <UserMenu user={user} />
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 overflow-auto bg-muted/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />
        <div className="relative z-10 h-full">
           {children}
        </div>
      </main>
    </div>
  );
}
