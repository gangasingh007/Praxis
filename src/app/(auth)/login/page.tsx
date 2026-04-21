"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth-actions";
import Link from "next/link";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-6 overflow-hidden">
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="w-full max-w-[400px] space-y-8 relative">
    
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-top-4 duration-700">
     
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            Praxis<span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Access your productivity command center
          </p>
        </div>
        <div className="bg-card/40 border border-border/50 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-500 delay-150">
          
          <form action={handleSubmit} className="space-y-5">
            
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

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground hover:text-primary transition"
                >
                  Forgot Password?
                </Link>
              </div>

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

            {error && (
              <div className="text-xs font-bold text-red-500 bg-red-500/5 border border-red-500/20 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-left-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 gap-2 text-sm text-card font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 rounded-xl"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          New to Praxis?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
