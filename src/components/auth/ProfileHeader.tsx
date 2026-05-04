"use client";

import { motion } from "framer-motion";

interface ProfileHeaderProps {
  name: string | null;
  email: string;
}

export function ProfileHeader({ name, email }: ProfileHeaderProps) {
  const initials = name?.[0] || email[0].toUpperCase();

  return (
    <div className="flex flex-col md:flex-row items-start font-mono md:items-end justify-between gap-6 pb-8 border-b border-border/40">
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-black uppercase tracking-tight italic"
        >
          User Profile
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-mono text-muted-foreground/50 uppercase tracking-[0.3em]"
        >
          Tactical Operator Identity
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-colors" />
        <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-[2rem] flex items-center justify-center text-background text-4xl font-black shadow-2xl shadow-primary/20 italic border border-white/10 overflow-hidden">
          {initials}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-background" />
      </motion.div>
    </div>
  );
}
