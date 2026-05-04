"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ProfileSecurity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 group hover:border-red-500/20 transition-all backdrop-blur-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <ShieldCheck size={120} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/70 flex items-center gap-2">
          <ShieldCheck size={14} /> Security Lockdown
        </h3>
      </div>
      
      <p className="text-xs text-muted-foreground/60 font-mono uppercase tracking-widest mb-6 max-w-md">
        Request a tactical password reset if your credentials have been compromised or require rotation.
      </p>

      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:text-red-400 transition-colors group/btn">
        Initialize Protocol Reset 
        <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
      </button>
    </motion.div>
  );
}
