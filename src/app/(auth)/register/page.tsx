"use client";

import { useState } from "react";
import { registerAction } from "@/actions/auth-actions";
import Link from "next/link";
import { ArrowRight, Loader2, Zap } from "lucide-react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await registerAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Praxis<span className="text-primary-600">.</span>
          </h1>
          <p className="text-zinc-500 font-medium">Join the elite force of high-performers.</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
              <input
                name="name"
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Master Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Initialize Account <Zap size={18} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Already a member?{" "}
          <Link href="/login" className="text-primary-500 font-bold hover:text-primary-400 transition-colors">
            Access Command Center.
          </Link>
        </p>
      </div>
    </div>
  );
}
