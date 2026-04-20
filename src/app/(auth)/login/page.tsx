"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth-actions";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";


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
    <div className="min-h-screen flex items-center justify-center bg-background relative px-6">
      
      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* 🧠 Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Praxis<span className="text-primary">.</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Log in to your command center
          </p>
        </div>

        {/* 🧾 Card */}
        <div className="bg-card/60 border border-border backdrop-blur-xl p-8 rounded-2xl shadow-xl">
          
          <form action={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="bg-background/60 border-border focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-primary transition"
                >
                  Forgot?
                </Link>
              </div>

              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-background/60 border-border focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-md">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2 shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}