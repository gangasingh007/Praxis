import { Task } from "@/types";

export const HOUR_HEIGHT = 80;
export const MINUTES_PER_HOUR = 60;
export const PIXELS_PER_MINUTE = HOUR_HEIGHT / MINUTES_PER_HOUR;

// The timeline starts at 06:00 as per src/components/planner/constants/time.ts
export const START_HOUR = 6;

export interface TaskPosition {
  top: number;
  height: number;
  left: string;
  width: string;
}

export type TaskWithPosition = Task & { position: TaskPosition };

/**
 * Calculates the absolute position (top, height, left, width) for a set of tasks
 * to be displayed in a calendar-style grid.
 */
export function calculateTaskLayout(tasks: Task[]): TaskWithPosition[] {
  // Only process scheduled tasks
  const scheduledTasks = tasks.filter((t) => t.startTime);

  // 1. Sort tasks by start time and then by duration (longer first)
  const sortedTasks = [...scheduledTasks].sort((a, b) => {
    const startA = new Date(a.startTime!).getTime();
    const startB = new Date(b.startTime!).getTime();
    if (startA !== startB) return startA - startB;
    
    const durationA = getDurationMinutes(a);
    const durationB = getDurationMinutes(b);
    return durationB - durationA;
  });

  // 2. Group tasks into overlapping sets
  const groups: Task[][] = [];
  let currentGroup: Task[] = [];
  let currentGroupEnd = 0;

  for (const task of sortedTasks) {
    const start = new Date(task.startTime!).getTime();
    const end = start + getDurationMinutes(task) * 60 * 1000;

    if (start >= currentGroupEnd) {
      if (currentGroup.length > 0) groups.push(currentGroup);
      currentGroup = [task];
      currentGroupEnd = end;
    } else {
      currentGroup.push(task);
      currentGroupEnd = Math.max(currentGroupEnd, end);
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  // 3. For each group, calculate column positions
  const results: TaskWithPosition[] = [];

  for (const group of groups) {
    const columns: Task[][] = [];
    
    for (const task of group) {
      let placed = false;
      const taskStart = new Date(task.startTime!).getTime();

      for (let i = 0; i < columns.length; i++) {
        const lastTaskInCol = columns[i][columns[i].length - 1];
        const lastTaskEnd = new Date(lastTaskInCol.startTime!).getTime() + getDurationMinutes(lastTaskInCol) * 60 * 1000;
        
        if (taskStart >= lastTaskEnd) {
          columns[i].push(task);
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([task]);
      }
    }

    const colCount = columns.length;
    for (let i = 0; i < colCount; i++) {
      for (const task of columns[i]) {
        results.push({
          ...task,
          position: {
            top: calculateTop(task.startTime!),
            height: calculateHeight(task),
            left: `${(i / colCount) * 100}%`,
            width: `${(1 / colCount) * 100}%`,
          },
        });
      }
    }
  }

  return results;
}

function getDurationMinutes(task: Task): number {
  if (task.durationMinutes) return task.durationMinutes;
  if (task.startTime && task.endTime) {
    const diff = new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
    return Math.floor(diff / (60 * 1000));
  }
  return 60; // Default 1 hour
}

function calculateTop(startTimeIso: string): number {
  const d = new Date(startTimeIso);
  const hour = d.getHours();
  const minutes = d.getMinutes();

  // Adjust for 06:00 start
  let adjustedHour = hour - START_HOUR;
  if (adjustedHour < 0) adjustedHour += 24; // Handle wrap-around if needed

  return (adjustedHour * 60 + minutes) * PIXELS_PER_MINUTE;
}

function calculateHeight(task: Task): number {
  const duration = getDurationMinutes(task);
  return Math.max(duration * PIXELS_PER_MINUTE, 40); // Min height 40px for visibility
}
