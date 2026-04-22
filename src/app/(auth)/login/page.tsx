"use client";

import { useState, useRef, useEffect } from "react";
import { loginAction } from "@/actions/auth-actions";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Terminal,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* ── tiny typed-text for the tagline ── */
function TypedTagline({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className="font-mono">
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-px animate-pulse" />
      )}
    </span>
  );
}

/* ── floating particle ── */
function Particle({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute w-px h-px rounded-full bg-primary/60 animate-ping pointer-events-none"
      style={style}
    />
  );
}

const PARTICLES = [
  { top: "15%", left: "8%", animationDelay: "0s", animationDuration: "3s" },
  { top: "70%", left: "5%", animationDelay: "1.2s", animationDuration: "4s" },
  { top: "30%", right: "6%", animationDelay: "0.5s", animationDuration: "3.5s" },
  { top: "80%", right: "10%", animationDelay: "2s", animationDuration: "2.8s" },
  { top: "50%", left: "12%", animationDelay: "1.8s", animationDuration: "5s" },
  { top: "20%", right: "15%", animationDelay: "0.9s", animationDuration: "3.2s" },
];

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [success, setSuccess] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  const passwordValid = passwordValue.length >= 6;

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
      {/* ── layered background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-55 dark:opacity-95" />

        {/* blobs */}
        {/* <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full animate-pulse" /> */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[700px] h-[700px]  blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />

        {/* scan line */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            top: "40%",
            animation: "scanline 8s linear infinite",
          }}
        />

        {/* particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0px hsl(var(--primary)/0); }
          50% { box-shadow: 0 0 20px hsl(var(--primary)/0.15); }
        }
      `}</style>

      <div className="w-full max-w-[420px] space-y-6 relative">

        {/* ── brand header ── */}
        <div
          className="text-center space-y-4"
          style={{
            animation: "fadeSlideDown 0.7s ease both",
          }}
        >
         

          <div>
            <h1 className="text-5xl italic font-black tracking-tighter uppercase">
              Praxis
              <span className="text-primary drop-shadow-[0_0_12px_hsl(var(--primary)/0.8)]">
                .
              </span>
            </h1>
            <p className="text-muted-foreground/70 text-sm mt-2 h-5">
              <TypedTagline text="Initialize your command center" />
            </p>
          </div>
        </div>

        {/* ── main card ── */}
        <div
          className="relative"
          style={{ animation: "fadeScaleIn 0.6s ease 0.2s both" }}
        >
          {/* glow ring */}
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-card via-transparent to-card pointer-events-none" />

          <div className="relative bg-card/50 border border-border/40 backdrop-blur-2xl p-8 rounded-[26px] shadow-2xl overflow-hidden">
            {/* top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* inner corner dots */}
            <div className="absolute top-3 left-3 w-1 h-1 rounded-full bg-primary/30" />
            <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-primary/30" />

            {success ? (
              /* ── success state ── */
              <div className="py-8 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <p className="font-black uppercase tracking-tight text-lg">
                    Access Granted
                  </p>
                  <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mt-1">
                    Redirecting to command center…
                  </p>
                </div>
                <Loader2 className="w-4 h-4 animate-spin text-primary/60" />
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-1 mb-2">
                  <h2 className="text-lg font-black uppercase tracking-tight">
                    Sign In
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
                    Enter your credentials to proceed
                  </p>
                </div>

                {/* ── email ── */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Email Address
                    </label>
                    {emailValue && (
                      <span
                        className={cn(
                          "text-[10px] font-mono uppercase tracking-widest transition-colors",
                          emailValid ? "text-emerald-400" : "text-rose-400/70"
                        )}
                      >
                        {emailValid ? "✓ Valid" : "Invalid format"}
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "relative rounded-xl transition-all duration-300",
                      focusedField === "email" &&
                        "shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
                    )}
                  >
                    <Mail
                      className={cn(
                        "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 pointer-events-none",
                        focusedField === "email"
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      )}
                    />
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="operator@domain.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "pl-10 pr-10 h-12 bg-background/30 border-border/40 rounded-xl font-mono text-sm placeholder:text-muted-foreground/25 transition-all duration-300",
                        "focus:border-primary/50 focus:bg-background/50",
                        emailValue && emailValid && "border-emerald-500/30",
                        emailValue && !emailValid && "border-rose-500/20"
                      )}
                    />
                    {/* validation icon */}
                    {emailValue && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        {emailValid ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-rose-400/50" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── password ── */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors duration-200"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div
                    className={cn(
                      "relative rounded-xl transition-all duration-300",
                      focusedField === "password" &&
                        "shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
                    )}
                  >
                    <Lock
                      className={cn(
                        "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 pointer-events-none",
                        focusedField === "password"
                          ? "text-primary"
                          : "text-muted-foreground/50"
                      )}
                    />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "pl-10 pr-10 h-12 bg-background/30 border-border/40 rounded-xl font-mono text-sm placeholder:text-muted-foreground/25 transition-all duration-300",
                        "focus:border-primary/50 focus:bg-background/50"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* password strength bar */}
                  {/* {passwordValue && (
                    <div className="space-y-1 pt-0.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((seg) => {
                          const strength = Math.min(
                            4,
                            Math.floor(passwordValue.length / 3)
                          );
                          return (
                            <div
                              key={seg}
                              className={cn(
                                "h-[3px] flex-1 rounded-full transition-all duration-500",
                                seg <= strength
                                  ? strength <= 1
                                    ? "bg-rose-400"
                                    : strength <= 2
                                    ? "bg-amber-400"
                                    : strength <= 3
                                    ? "bg-blue-400"
                                    : "bg-emerald-400"
                                  : "bg-border/30"
                              )}
                            />
                          );
                        })}
                      </div>
                      <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                        {passwordValue.length < 4
                          ? "Weak — keep going"
                          : passwordValue.length < 7
                          ? "Fair — almost there"
                          : passwordValue.length < 10
                          ? "Strong — good to go"
                          : "Maximum — excellent"}
                      </p>
                    </div>
                  )} */}
                </div>

                {/* ── error ── */}
                {error && (
                  <div className="flex items-start gap-3 text-xs font-mono text-rose-400 bg-rose-500/8 border border-rose-500/20 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-0.5 shrink-0 animate-pulse" />
                    <span className="uppercase tracking-wide">{error}</span>
                  </div>
                )}

                {/* ── submit ── */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "relative w-full h-12 gap-2 text-sm font-black uppercase tracking-widest rounded-xl overflow-hidden",
                    "bg-primary text-background transition-all duration-300",
                    "hover:-translate-y-0.5 active:translate-y-0",
                    "shadow-[0_0_20px_hsl(var(--primary)/0.3)]",
                    "hover:shadow-[0_0_40px_hsl(var(--primary)/0.55)]",
                    "disabled:opacity-60 disabled:pointer-events-none"
                  )}
                >
                  {/* shimmer sweep */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="font-mono text-xs tracking-widest">
                        Authenticating…
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 relative z-10">
                      Access System
                      <ArrowRight size={16} />
                    </span>
                  )}
                </Button>

                {/* divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border/30" />
                  <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                    Or
                  </span>
                  <div className="flex-1 h-px bg-border/30" />
                </div>

                {/* OAuth placeholder */}
                <button
                  type="button"
                  className="w-full h-11 rounded-xl border border-border/40 bg-background/20 hover:bg-background/40 hover:border-border/60 transition-all duration-300 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {/* Google "G" SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      opacity=".7"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      opacity=".5"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      opacity=".3"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      opacity=".9"
                    />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── footer ── */}
        <div
          className="space-y-4"
          style={{ animation: "fadeSlideUp 0.7s ease 0.35s both" }}
        >
          <p className="text-center text-sm text-muted-foreground">
            New to Praxis?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all"
            >
              Create Account
            </Link>
          </p>

          <p className="text-center text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.3em]">
            Praxis OS v0.1.0{" "}
            <span className="text-primary/50 mx-1">///</span> Secure Auth
          </p>
        </div>
      </div>

      {/* global keyframes */}
      <style jsx global>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}