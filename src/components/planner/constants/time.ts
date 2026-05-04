// src/components/planner/constants/time.ts

export const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

/** Human-readable period labels anchored to specific hours */
export const PERIOD_LABELS: Partial<Record<TimeSlot, string>> = {
  "06:00": "Early",
  "07:00": "Morning",
  "12:00": "Midday",
  "13:00": "Afternoon",
  "17:00": "Evening",
  "20:00": "Night",
};

/** Derive the HH:00 string for any Date */
export function toHourSlot(date: Date): string {
  return `${date.getHours().toString().padStart(2, "0")}:00`;
}

/** Derive the HH:00 slot from a task's startTime ISO string */
export function taskTimeSlot(startTime: string | null | undefined): string | null {
  if (!startTime) return null;
  const d = new Date(startTime);
  return `${d.getHours().toString().padStart(2, "0")}:00`;
}