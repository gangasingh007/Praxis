"use client";

import { useState } from "react";
import { logoutAction } from "@/actions/auth-actions";
import { LogOut, User, Settings, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  user: {
    email: string;
    name?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 rounded-lg bg-white/60 border border-border flex items-center justify-center dark:text-background font-black text-[15px]  p-4 hover:bg-white/50 dark:hover:text-background transition-all duration-300 shadow-lg shadow-primary/10 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10">
          {(user.name?.[0] || user.email[0]).toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/5" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 z-50 mt-3 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Header */}
              <div className="px-4 py-3 bg-muted/30 border-b border-border">
                <p className="text-xs font-bold text-foreground truncate">{user.email}</p>
              </div>
              
              {/* Links */}
              <div className="p-2 space-y-0.5">
                <Link 
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all group"
                >
                  <User size={14} className="group-hover:text-primary transition-colors" />
                  <span className="uppercase tracking-widest">Profile Card</span>
                </Link>
                
                <Link 
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all group"
                >
                  <Settings size={14} className="group-hover:text-primary transition-colors" />
                  <span className="uppercase tracking-widest">Preferences</span>
                </Link>
              </div>
              
              <div className="h-px bg-border mx-2" />
              
              {/* Logout */}
              <div className="p-2">
                <form action={logoutAction}>
                  <button 
                    type="submit"
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500  hover:bg-red-500/10 rounded-xl transition-all group text-left"
                  >
                    <LogOut size={14} />
                    <span className="uppercase tracking-widest">Terminate Session</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
