"use client";

import { useEffect, useState, useRef, useCallback } from "react";


type TimerMode = "focus" | "short" | "long";

interface Track {
  name: string;
  genre: string;
  icon: string;
  color: string;
  dur: number;
  durLabel: string;
}


const MODES: Record<TimerMode, { label: string; duration: number }> = {
  focus: { label: "Focus", duration: 25 * 60 },
  short: { label: "Short break", duration: 5 * 60 },
  long: { label: "Long break", duration: 15 * 60 },
};

const RING_RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const TRACKS: Track[] = [
  { name: "Rain & Coffee", genre: "Ambient", icon: "☔", color: "#dbeafe", dur: 180, durLabel: "3:00" },
  { name: "Lo-Fi Study Beats", genre: "Lo-Fi Hip-Hop", icon: "🎧", color: "#ede9fe", dur: 240, durLabel: "4:00" },
  { name: "Forest Ambience", genre: "Nature Sounds", icon: "🌲", color: "#dcfce7", dur: 300, durLabel: "5:00" },
  { name: "Deep Space Drift", genre: "Synthwave", icon: "🪐", color: "#fef9c3", dur: 210, durLabel: "3:30" },
  { name: "Café Parisien", genre: "Jazz", icon: "🎷", color: "#fce7f3", dur: 195, durLabel: "3:15" },
];

const RING_COLORS: Record<TimerMode, string> = {
  focus: "hsl(var(--foreground))",
  short: "#22c55e",
  long: "#3b82f6",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function fmtSec(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PlayingBars() {
  return (
    <div className="flex items-end gap-0.5 h-3">
      {[0, 0.2, 0.4].map((delay, i) => (
        <div
          key={i}
          className="w-0.5 rounded-sm bg-foreground animate-[eq_0.8s_ease-in-out_infinite_alternate]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function FocusTimer() {
  // Timer state
  const [mode, setModeState] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Music state
  const [curTrack, setCurTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playPos, setPlayPos] = useState(0);
  const [vol, setVol] = useState(70);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ── Timer logic ──────────────────────────────────────────────────────────

  const clearTimerInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const setMode = useCallback((m: TimerMode) => {
    clearTimerInterval();
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
          setSessions((s) => Math.min(s + 1, 4));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const pauseTimer = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimerInterval();
    setIsRunning(false);
    setTimeLeft(MODES[mode].duration);
  }, [mode]);

  useEffect(() => () => clearTimerInterval(), []);


  const clearPlayInterval = () => {
    if (playIntervalRef.current) clearInterval(playIntervalRef.current);
  };

  const startPlayback = useCallback(() => {
    clearPlayInterval();
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
      else clearPlayInterval();
      return !prev;
    });
  }, [startPlayback]);

  const selectTrack = useCallback((i: number) => {
    clearPlayInterval();
    setCurTrack(i);
    setPlayPos(0);
    setIsPlaying(false);
  }, []);

  const prevTrack = useCallback(() => {
    clearPlayInterval();
    setCurTrack((t) => (t - 1 + TRACKS.length) % TRACKS.length);
    setPlayPos(0);
    setIsPlaying(false);
  }, []);

  const nextTrack = useCallback(() => {
    clearPlayInterval();
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

  useEffect(() => () => clearPlayInterval(), []);

  // Restart playback interval when curTrack changes while playing
  useEffect(() => {
    if (isPlaying) {
      clearPlayInterval();
      startPlayback();
    }

  }, [curTrack]);



  const total = MODES[mode].duration;
  const progress = total > 0 ? 1 - timeLeft / total : 0;
  const strokeOffset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
  const pct = Math.round(progress * 100);

  const playPct = TRACKS[curTrack].dur > 0 ? (playPos / TRACKS[curTrack].dur) * 100 : 0;
  const track = TRACKS[curTrack];

  const statusLabel = isRunning ? "Running" : timeLeft === 0 ? "Complete ✓" : "Standby";


  return (
    <>
     

      <div className="flex flex-col gap-4 w-5xl mx-auto p-4 bg-background text-foreground min-h-screen">
      {/* header section */}
        <div className="flex flex-col items-start ">
          <h2 className="text-3xl  font-bold tracking-tight">Pomodoro Timer</h2>
        </div>
        {/* ── Mode tabs ── */}
        <div className="flex gap-1.5 w-full bg-muted border border-border rounded-xl p-1.5">
          {(["focus", "short", "long"] as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                "ft-mono flex-1 py-2 w-full rounded-lg text-[11px] font-medium tracking-widest uppercase transition-all duration-200",
                mode === m
                  ? "bg-background text-foreground border border-border shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/40",
              ].join(" ")}
            >
              {m === "focus" ? "Deep work" : m === "short" ? "Short break" : "Long break"}
            </button>
          ))}
        </div>

        {/* ── Timer card ── */}
        <div className="bg-muted border border-border rounded-xl p-6 flex flex-col items-center gap-4">

          {/* Ring */}
          <div className="relative w-full h-52">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                cx="50" cy="50" r={RING_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-border"
              />
              {/* Progress */}
              <circle
                cx="50" cy="50" r={RING_RADIUS}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                className="ring-progress"
                style={{
                  stroke: RING_COLORS[mode],
                  strokeDasharray: CIRCUMFERENCE,
                  strokeDashoffset: strokeOffset,
                }}
              />
            </svg>

            {/* Inner content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <span className="ft-mono text-5xl font-light tracking-tight tabular-nums text-foreground leading-none">
                {fmtTime(timeLeft)}
              </span>
              <span className="ft-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {MODES[mode].label}
              </span>
              <span className="ft-mono text-[10px] bg-background border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                {pct}%
              </span>
            </div>
          </div>

          {/* Status row */}
          <div className="ft-mono flex items-center gap-2 w-full text-[11px] text-muted-foreground">
            <span>{statusLabel}</span>
            {isRunning && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            )}
            {/* Session pips */}
            <div className="ml-auto flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={[
                    "w-5 h-1 rounded-full transition-colors duration-300",
                    i <= sessions ? "bg-foreground" : "bg-border",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 w-full">
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className="flex-1 h-11 rounded-xl bg-foreground text-background ft-mono text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-opacity hover:opacity-85 active:opacity-70"
            >
              {isRunning ? (
                <>
                  <PauseIcon />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon />
                  {timeLeft === 0 ? "Restart" : "Start"}
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-transparent text-muted-foreground hover:bg-background hover:text-foreground transition-all active:scale-95"
            >{}
              <ResetIcon />
            </button>
          </div>
        </div>

        {/* ── Music card ── */}
        <div className="bg-muted border border-border rounded-xl p-4 flex flex-col gap-3">

          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="ft-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Focus music
            </span>
            <span className="ft-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
              simulated
            </span>
          </div>

          {/* Track list */}
          <div className="flex flex-col gap-1">
            {TRACKS.map((t, i) => (
              <button
                key={i}
                onClick={() => selectTrack(i)}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 border",
                  i === curTrack
                    ? "bg-background border-border"
                    : "border-transparent hover:bg-background/50",
                ].join(" ")}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-foreground truncate">{t.name}</div>
                  <div className="ft-mono text-[11px] text-muted-foreground mt-0.5">{t.genre}</div>
                </div>
                {i === curTrack && isPlaying ? (
                  <PlayingBars />
                ) : (
                  <span className="ft-mono text-[11px] text-muted-foreground flex-shrink-0">{t.durLabel}</span>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Player bar */}
          <div className="bg-background border border-border rounded-xl p-3.5 flex flex-col gap-2.5">

            {/* Now playing + controls */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                style={{ background: track.color }}
              >
                {track.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-foreground truncate">{track.name}</div>
                <div className="ft-mono text-[11px] text-muted-foreground">{track.genre}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={prevTrack}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >{}
                  <SkipBackIcon />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
                >
                  {isPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                </button>
                <button
                  onClick={nextTrack}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                >{}
                  <SkipForwardIcon />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2.5">
              <span className="ft-mono text-[10px] text-muted-foreground w-7">{fmtSec(playPos)}</span>
              <div
                className="flex-1 h-0.5 bg-border rounded-full relative cursor-pointer overflow-hidden"
                onClick={seekTrack}
              >
                <div
                  className="h-full bg-foreground rounded-full transition-[width] duration-1000 linear"
                  style={{ width: `${Math.round(playPct)}%` }}
                />
              </div>
              <span className="ft-mono text-[10px] text-muted-foreground w-7 text-right">{track.durLabel}</span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <VolumeIcon />
              <input
                type="range"
                placeholder={``}
                min={0}
                max={100}
                step={1}
                value={vol}
                onChange={(e) => setVol(Number(e.target.value))}
                className="flex-1 h-0.5 accent-foreground"
              />
              <span className="ft-mono text-[10px] text-muted-foreground w-7 text-right">{vol}%</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

function PlayIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 20L9 12l10-8v16z" />
      <path d="M5 4h2v16H5z" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 4l10 8-10 8V4z" />
      <path d="M17 4h2v16h-2z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground flex-shrink-0">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path
        d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}