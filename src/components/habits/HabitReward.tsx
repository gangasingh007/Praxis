"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HabitRewardProps {
  message: string;
  isRegenerating: boolean;
  onRegenerate: () => void;
}

export function HabitReward({ message, isRegenerating, onRegenerate }: HabitRewardProps) {
  const [displayedMessage, setDisplayedMessage] = useState<string>("");

  useEffect(() => {
    setDisplayedMessage("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedMessage(message.slice(0, i + 1));
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="group/ai relative flex flex-col gap-4 p-5 rounded-2xl bg-muted/40 border border-border/40 backdrop-blur-md overflow-hidden ring-1 ring-inset ring-white/5 dark:ring-white/10">
      {/* AI Glow Effect */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">
            Neural Synthesis Engine
          </span>
        </div>

        <Button 
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onRegenerate();
          }}
          disabled={isRegenerating}
          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all opacity-0 group-hover/ai:opacity-100"
        >
          <RefreshCw className={cn("w-4 h-4", isRegenerating && "animate-spin")} />
        </Button>
      </div>
      
      <div className="relative">
        <p className="text-sm text-foreground/90 leading-relaxed font-mono font-medium min-h-[1.5rem] tracking-tight italic">
          <span className="text-primary/50 mr-1.5 font-bold">»</span>
          {displayedMessage}
          {displayedMessage.length < message.length && (
            <span className="inline-block w-2 h-4 bg-primary/40 ml-1 animate-pulse align-middle" />
          )}
        </p>
      </div>
    </div>
  );
}
