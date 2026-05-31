import { create } from 'zustand';

export type TimerMode = 'focus' | 'short' | 'long';
export type PomodoroVariation = 'classic' | 'desktime' | 'ultradian' | 'flexible';

interface VariationConfig {
  label: string;
  durations: Record<TimerMode, number>;
}

export const VARIATIONS: Record<PomodoroVariation, VariationConfig> = {
  classic: {
    label: 'Classic (25/5)',
    durations: { focus: 25 * 60, short: 5 * 60, long: 15 * 60 }
  },
  desktime: {
    label: '52/17 Method',
    durations: { focus: 52 * 60, short: 17 * 60, long: 17 * 60 }
  },
  ultradian: {
    label: 'Ultradian (90m)',
    durations: { focus: 90 * 60, short: 20 * 60, long: 20 * 60 }
  },
  flexible: {
    label: 'Flexible (50/10)',
    durations: { focus: 50 * 60, short: 10 * 60, long: 10 * 60 }
  }
};

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  variation: PomodoroVariation;
  sessions: number;
  maxSessions: number;
  selectedTaskId: string | null;
  
  start: () => void;
  pause: () => void;
  reset: () => void;
  setMode: (mode: TimerMode) => void;
  setVariation: (variation: PomodoroVariation) => void;
  setSelectedTaskId: (taskId: string | null) => void;
  tick: () => void;
  completeSession: () => void;
  skipMode: () => void;
}

export const usePomodoro = create<PomodoroState>((set, get) => ({
  variation: 'classic',
  timeLeft: VARIATIONS.classic.durations.focus,
  isRunning: false,
  mode: 'focus',
  sessions: 0,
  maxSessions: 4,
  selectedTaskId: null,
  
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => set((state) => ({ 
    timeLeft: VARIATIONS[state.variation].durations[state.mode], 
    isRunning: false 
  })),
  setMode: (mode) => set((state) => ({
    mode,
    timeLeft: VARIATIONS[state.variation].durations[mode],
    isRunning: false
  })),
  setVariation: (variation) => set((state) => ({
    variation,
    timeLeft: VARIATIONS[variation].durations[state.mode],
    isRunning: false
  })),
  setSelectedTaskId: (selectedTaskId) => set({ selectedTaskId }),
  tick: () => set((state) => {
    if (state.timeLeft <= 1) {
      if (state.mode === 'focus') {
        state.completeSession();
      }
      return { isRunning: false, timeLeft: 0 };
    }
    return { timeLeft: state.timeLeft - 1 };
  }),
  completeSession: () => set((state) => ({
    sessions: Math.min(state.sessions + 1, state.maxSessions)
  })),
  skipMode: () => {
    const { mode, setMode } = get();
    const modes: TimerMode[] = ['focus', 'short', 'long'];
    const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIndex]);
  }
}));