"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Brain,
  Coffee,
  Moon,
  Flame,
  Music2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type TimerMode = "focus" | "short" | "long";

interface Track {
  name: string;
  genre: string;
  emoji: string;
  color: string;
  dur: number;
  durLabel: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MODES: Record<
  TimerMode,
  { label: string; duration: number; icon: React.ElementType; accent: string; ring: string; glow: string }
> = {
  focus: {
    label: "Deep Work",
    duration: 25 * 60,
    icon: Brain,
    accent: "text-primary",
    ring: "#d97757",
    glow: "#d97757/30",
  },
  short: {
    label: "Short Break",
    duration: 5 * 60,
    icon: Coffee,
    accent: "text-emerald-400",
    ring: "rgb(52,211,153)",
    glow: "rgba(52,211,153,0.3)",
  },
  long: {
    label: "Long Break",
    duration: 15 * 60,
    icon: Moon,
    accent: "text-blue-400",
    ring: "rgb(96,165,250)",
    glow: "rgba(96,165,250,0.3)",
  },
};

const TRACKS: Track[] = [
  { name: "Rain & Coffee", genre: "Ambient", emoji: "☔", color: "#1e3a5f", dur: 180, durLabel: "3:00" },
  { name: "Lo-Fi Study Beats", genre: "Lo-Fi Hip-Hop", emoji: "🎧", color: "#2d1b69", dur: 240, durLabel: "4:00" },
  { name: "Forest Ambience", genre: "Nature Sounds", emoji: "🌲", color: "#14532d", dur: 300, durLabel: "5:00" },
  { name: "Deep Space Drift", genre: "Synthwave", emoji: "🪐", color: "#1a1a2e", dur: 210, durLabel: "3:30" },
  { name: "Café Parisien", genre: "Jazz", emoji: "🎷", color: "#3b1a1a", dur: 195, durLabel: "3:15" },
];

const RING_RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const MAX_SESSIONS = 4;

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function fmtSec(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

/* Animated equalizer bars */
function EqBars({ color }: { color?: string }) {
  return (
    <div className="flex items-end gap-[2px] h-3.5">
      {[0, 0.15, 0.3].map((delay, i) => (
        <div
          key={i}
          className="w-[3px] rounded-sm animate-[eq_0.7s_ease-in-out_infinite_alternate]"
          style={{
            animationDelay: `${delay}s`,
            backgroundColor: color ?? "hsl(var(--primary))",
          }}
        />
      ))}
    </div>
  );
}

/* Section label */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
      {children}
    </p>
  );
}

/* Icon button */
function IconBtn({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-xl border border-border/40 bg-background/30 text-muted-foreground/60",
        "hover:bg-background/60 hover:border-border/70 hover:text-foreground",
        "transition-all duration-200 active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function FocusTimer() {
  /* Timer state */
  const [mode, setModeState] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* Music state */
  const [curTrack, setCurTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playPos, setPlayPos] = useState(0);
  const [vol, setVol] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /* Panel toggle */
  const [showMusic, setShowMusic] = useState(true);

  // ── Timer ────────────────────────────────────────────────────────────────

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const setMode = useCallback((m: TimerMode) => {
    clearTimer();
    setModeState(m);
    setTimeLeft(MODES[m].duration);
    setIsRunning(false);
  }, []);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          setSessions((s) => Math.min(s + 1, MAX_SESSIONS));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(MODES[mode].duration);
  }, [mode]);

  useEffect(() => () => clearTimer(), []);

  // ── Music ────────────────────────────────────────────────────────────────

  const clearPlay = () => {
    if (playIntervalRef.current) clearInterval(playIntervalRef.current);
  };

  const startPlayback = useCallback(() => {
    clearPlay();
    playIntervalRef.current = setInterval(() => {
      setPlayPos((prev) => {
        if (prev >= TRACKS[curTrack].dur - 1) {
          setCurTrack((t) => (t + 1) % TRACKS.length);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  }, [curTrack]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev) startPlayback();
      else clearPlay();
      return !prev;
    });
  }, [startPlayback]);

  const selectTrack = useCallback((i: number) => {
    clearPlay();
    setCurTrack(i);
    setPlayPos(0);
    setIsPlaying(false);
  }, []);

  const prevTrack = useCallback(() => {
    clearPlay();
    setCurTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length);
    setPlayPos(0);
    setIsPlaying(false);
  }, []);

  const nextTrack = useCallback(() => {
    clearPlay();
    setCurTrack((t) => (t + 1) % TRACKS.length);
    setPlayPos(0);
    setIsPlaying(false);
  }, []);

  const seekTrack = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setPlayPos(Math.floor(pct * TRACKS[curTrack].dur));
    },
    [curTrack]
  );

  /* Restart playback when track changes while playing */
  useEffect(() => {
    if (isPlaying) {
      clearPlay();
      startPlayback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curTrack]);

  useEffect(() => () => clearPlay(), []);

  // ── Derived ──────────────────────────────────────────────────────────────

  const total = MODES[mode].duration;
  const progress = total > 0 ? 1 - timeLeft / total : 0;
  const strokeOffset = CIRCUMFERENCE * (1 - progress);
  const pct = Math.round(progress * 100);
  const playPct = TRACKS[curTrack].dur > 0 ? (playPos / TRACKS[curTrack].dur) * 100 : 0;
  const track = TRACKS[curTrack];
  const mConfig = MODES[mode];
  const ModeIcon = mConfig.icon;
  const effectiveVol = isMuted ? 0 : vol;

  const timerStatus = isRunning ? "Running" : timeLeft === 0 ? "Complete" : "Standby";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className=" w-full flex flex-col gap-4 font-sans">

      {/* ── ambient background ── */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 transition-all duration-1000"
        style={{
          background: isRunning
            ? `radial-gradient(600px circle at 50% 40%, ${mConfig.glow} 0%, transparent 70%)`
            : "none",
        }}
      />

      {/* ══════════════════════════════════════
          TIMER SECTION
      ══════════════════════════════════════ */}
      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl">

        {/* top accent line */}
        <div
          className="h-[2px] w-full transition-all duration-700"
          style={{
            background: isRunning
              ? `linear-gradient(to right, transparent, ${mConfig.ring}, transparent)`
              : "transparent",
          }}
        />

        <div className="p-5 flex flex-col gap-5">

          {/* ── Mode tabs ── */}
          <div className="flex gap-1 p-1 rounded-2xl bg-muted/50 border border-border/30">
            {(["focus", "short", "long"] as TimerMode[]).map((m) => {
              const cfg = MODES[m];
              const Icon = cfg.icon;
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300",
                    isActive
                      ? "bg-background text-foreground border border-border/60 shadow-sm"
                      : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-background/30"
                  )}
                >
                  <Icon size={11} />
                  <span className="hidden sm:inline">
                    {m === "focus" ? "Focus" : m === "short" ? "Short" : "Long"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Ring + clock ── */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <svg
                width="200"
                height="200"
                viewBox="0 0 120 120"
                className="-rotate-90"
              >
                {/* outer decorative ring */}
                <circle
                  cx="60" cy="60" r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/20"
                />
                {/* track */}
                <circle
                  cx="60" cy="60" r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-border/25"
                />
                {/* progress */}
                <circle
                  cx="60" cy="60" r={RING_RADIUS}
                  fill="none"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{
                    stroke: mConfig.ring,
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset: strokeOffset,
                    filter: isRunning ? `drop-shadow(0 0 6px ${mConfig.ring})` : "none",
                    transition: "stroke-dashoffset 1s linear, filter 0.5s ease",
                  }}
                />
                {/* inner track */}
                <circle
                  cx="60" cy="60" r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/10"
                />
              </svg>

              {/* center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                {/* mode chip */}
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-500",
                    isRunning
                      ? "border-current bg-current/10"
                      : "border-border/40 bg-muted/30 text-muted-foreground/50"
                  )}
                  style={{ color: isRunning ? mConfig.ring : undefined }}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isRunning ? "animate-pulse" : "opacity-30"
                    )}
                    style={{ backgroundColor: mConfig.ring }}
                  />
                  {timerStatus}
                </div>

                {/* clock */}
                <span
                  className="text-5xl font-black tracking-tighter tabular-nums transition-all duration-500"
                  style={{
                    color: isRunning ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    textShadow: isRunning ? `0 0 30px ${mConfig.glow}` : "none",
                  }}
                >
                  {fmtTime(timeLeft)}
                </span>

                {/* pct */}
                <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                  {pct}% elapsed
                </span>
              </div>
            </div>

            {/* session pips */}
            <div className="flex items-center gap-3">
              <SectionLabel>Sessions</SectionLabel>
              <div className="flex gap-1.5">
                {Array.from({ length: MAX_SESSIONS }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor:
                        i < sessions ? mConfig.ring : "hsl(var(--border))",
                      boxShadow:
                        i < sessions ? `0 0 6px ${mConfig.ring}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center gap-2">
            {/* Reset */}
            <IconBtn onClick={resetTimer} className="w-11 h-11">
              <RotateCcw size={15} />
            </IconBtn>

            {/* Play / Pause — main CTA */}
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className={cn(
                "flex-1 h-12 rounded-2xl flex items-center justify-center gap-2.5",
                "text-xs font-mono font-black uppercase tracking-widest",
                "transition-all duration-300 hover:-translate-y-px active:translate-y-0 relative overflow-hidden"
              )}
              style={{
                backgroundColor: mConfig.ring,
                color: "hsl(var(--primary))",
                boxShadow: `0 0 25px ${mConfig.glow}`,
              }}
            >
              {/* shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 pointer-events-none" />
              {isRunning ? (
                <>
                  <Pause size={15} className="relative z-10 text-background" />
                  <span className="relative z-10 text-background">Pause</span>
                </>
              ) : (
                <>
                  <Play size={15} className="ml-0.5 relative z-10 text-background" />
                  <span className="relative z-10 text-background">
                    {timeLeft === 0 ? "Restart" : "Start"}
                  </span>
                </>
              )}
            </button>

            {/* Skip mode */}
            <IconBtn
              onClick={() => {
                pauseTimer();
                const order: TimerMode[] = ["focus", "short", "long"];
                setMode(order[(order.indexOf(mode) + 1) % order.length]);
              }}
              className="w-11 h-11"
            >
              <SkipForward size={15} />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MUSIC SECTION
      ══════════════════════════════════════ */}
     

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-[9px] font-mono text-muted-foreground/25 uppercase tracking-[0.3em]">
          Praxis Focus Engine
        </p>
        <div className="flex items-center gap-1.5">
          <Flame size={9} className="text-primary/40" />
          <p className="text-[9px] font-mono text-muted-foreground/25 uppercase tracking-[0.3em]">
            {sessions}/{MAX_SESSIONS} sessions
          </p>
        </div>
      </div>

      {/* ── keyframes ── */}
      <style jsx global>{`
        @keyframes eq {
          0%  { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </div>
  );
}