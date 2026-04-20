import { create } from 'zustand';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  focusDuration: number;
  breakDuration: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setMode: (mode: TimerMode) => void;
  tick: () => void;
}

const DEFAULT_FOCUS = 25 * 60;
const DEFAULT_BREAK = 5 * 60;  

export const usePomodoro = create<PomodoroState>((set) => ({
  timeLeft: DEFAULT_FOCUS,
  isRunning: false,
  mode: 'focus',
  focusDuration: DEFAULT_FOCUS,
  breakDuration: DEFAULT_BREAK,
  
  start: () => set({ isRunning: true }),
  pause: () => set({ isRunning: false }),
  reset: () => set((state) => ({ 
    timeLeft: state.mode === 'focus' ? state.focusDuration : state.breakDuration, 
    isRunning: false 
  })),
  setMode: (mode) => set((state) => ({
    mode,
    timeLeft: mode === 'focus' ? state.focusDuration : state.breakDuration,
    isRunning: false
  })),
  tick: () => set((state) => {
    if (state.timeLeft > 0) {
      return { timeLeft: state.timeLeft - 1 };
    }
    return { isRunning: false, timeLeft: 0 };
  }),
}));