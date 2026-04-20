"use client";

import { useState } from "react";
import { logoutAction } from "@/actions/auth-actions";
import { LogOut, User, Settings } from "lucide-react";
import Link from "next/link";

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
        className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs hover:bg-primary-500 transition-colors shadow-lg shadow-primary-600/20"
      >
        {user.name?.[0] || user.email[0].toUpperCase()}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 z-500 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2  animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-2 border-b border-zinc-800 mb-1">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Account</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
            
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-left"
            >
              <User size={16} />
              Profile
            </Link>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors text-left">
              <Settings size={16} />
              Settings
            </button>
            
            <div className="h-px bg-zinc-800 my-1" />
            
            <form action={logoutAction}>
              <button 
                type="submit"
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
