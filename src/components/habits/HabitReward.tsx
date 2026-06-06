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
    <div className="group/ai relative flex flex-col gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover/ai:opacity-100 transition-opacity">
        <Button 
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            onRegenerate();
          }}
          disabled={isRegenerating}
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", isRegenerating && "animate-spin")} />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
        <Sparkles className="w-3 h-3" />
        AI REWARD SYSTEM
      </div>
      
      <p className="text-sm text-foreground/80 leading-relaxed font-mono min-h-[1.5rem]">
        {displayedMessage}
        {displayedMessage.length < message.length && (
          <span className="inline-block w-1.5 h-3.5 bg-primary/50 ml-1 animate-pulse" />
        )}
      </p>
    </div>
  );
}
