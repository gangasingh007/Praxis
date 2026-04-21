"use client";

import { useState } from "react";
import { registerAction } from "@/actions/auth-actions";
import Link from "next/link";
import { ArrowRight, Loader2, User, Mail, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen flex items-center justify-center bg-background relative px-6 overflow-hidden">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="w-full max-w-[400px] space-y-8 relative">
        
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            Praxis<span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Join the elite force of high-performers
          </p>
        </div>

        {/* 🧾 Card */}
        <div className="bg-card/40 border border-border/50 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-500 delay-150">
          
          <form action={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="pl-10 h-12 bg-background/40 border-border/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="pl-10 h-12 bg-background/40 border-border/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Master Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-background/40 border-border/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-xs font-bold text-red-500 bg-red-500/5 border border-red-500/20 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-left-2">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 gap-2 text-sm text-card font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Initialize Account <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Access Command Center
          </Link>
        </p>
      </div>
    </div>
  );
}
