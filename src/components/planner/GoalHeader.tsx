"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GoalHeaderProps {
  monthName: string;
  year: number;
}

export function GoalHeader({ monthName, year }: GoalHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-start flex-col gap-2 mb-0.5">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/25 text-[12px] font-mono font-bold uppercase tracking-widest text-primary">
              {monthName} {year}
            </span>
            <h1 className="text-5xl font-black uppercase tracking-tight">
              Mission Control
            </h1>
          </div>
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
            Strategic Goal Architecture
          </p>
        </div>
      </div>
      <Link href="/planner">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-background/50 border-border/50 rounded-xl hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Planner
        </Button>
      </Link>
    </div>
  );
}
