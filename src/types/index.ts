// src/types/task.ts

// ─── Enums ────────────────────────────────────────────────────────────────────

/**
 * Task priority levels — ordered from lowest to highest urgency.
 * Stored as a string literal union so it serializes cleanly to/from
 * the database and remains readable in the UI without a lookup table.
 */
export type Priority = "low" | "medium" | "high" | "urgent";

/**
 * Lifecycle state of a task.
 * - `pending`     → created, not yet started
 * - `in_progress` → actively being worked on (e.g. a Focus session is running)
 * - `completed`   → marked done by the user
 * - `cancelled`   → explicitly abandoned
 */
export type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

/**
 * Broad category used for time-block color coding in the planner UI.
 * Mirrors the three core Praxis block types described in the docs.
 */
export type BlockType = "deep_work" | "admin" | "recovery" | "other";

// ─── Subject ─────────────────────────────────────────────────────────────────

/**
 * A subject (or project/area) that a task belongs to.
 * Subjects provide color-coded grouping in the planner timeline.
 */
export interface Subject {
  id: string;
  name: string;
  /** Hex color string, e.g. "#6366f1". Used for the task card accent. */
  colorCode: string;
  /** Optional emoji icon shown next to the subject name in the UI. */
  icon?: string;
  createdAt: string; // ISO 8601
}

// ─── Subtask ──────────────────────────────────────────────────────────────────

/**
 * A checklist item nested inside a parent Task.
 * Subtasks do not have their own scheduling — they inherit the
 * parent's time slot and are completed inline in the TaskModal.
 */
export interface Subtask {
  id: string;
  parentTaskId: string;
  title: string;
  isCompleted: boolean;
  /** Display order within the parent task's subtask list. */
  order: number;
  createdAt: string;
  completedAt?: string;
}

// ─── Task ─────────────────────────────────────────────────────────────────────

/**
 * Core task entity.
 *
 * Scheduling model:
 * - A task is "unscheduled" when `startTime` is null — it lives in the Inbox.
 * - A task is "scheduled" when `startTime` is an ISO string; the planner
 *   derives the HH:00 slot via `taskTimeSlot(task.startTime)`.
 * - `endTime` is optional and used for multi-hour blocks when provided.
 * - `durationMinutes` is the user-declared intended length, independent of
 *   the wall-clock difference between start/end (which may be unset).
 */
export interface Task {
  id: string;

  // ── Content ──────────────────────────────────────────────────────────
  title: string;
  description?: string;

  // ── Classification ────────────────────────────────────────────────────
  priority: Priority;
  status: TaskStatus;
  blockType: BlockType;

  /** The subject/project this task belongs to. Null = uncategorized. */
  subject?: Subject | null;

  // ── Scheduling ────────────────────────────────────────────────────────
  /** ISO 8601 datetime. Null means the task is unscheduled (in Inbox). */
  startTime: string | null;
  /** ISO 8601 datetime. Optional — only set for multi-hour blocks. */
  endTime?: string | null;
  /** Intended duration in minutes. Shown in the TaskModal. */
  durationMinutes?: number;
  /** Calendar date this task belongs to — "YYYY-MM-DD". */
  date: string;

  // ── Completion ────────────────────────────────────────────────────────
  isCompleted: boolean;
  completedAt?: string | null;

  // ── Subtasks ──────────────────────────────────────────────────────────
  subtasks?: Subtask[];

  // ── Recurrence (future-proof) ─────────────────────────────────────────
  /**
   * ISO 8601 recurrence rule string, e.g. "RRULE:FREQ=DAILY;INTERVAL=1".
   * Null for one-off tasks.
   */
  recurrenceRule?: string | null;

  // ── Meta ──────────────────────────────────────────────────────────────
  createdAt: string;
  updatedAt: string;
  /** Soft-delete flag — filtered out of all UI queries when true. */
  isDeleted?: boolean;
}

// ─── DTOs (Data Transfer Objects) ────────────────────────────────────────────

/**
 * Payload sent to `addTask()`.
 * `id`, `createdAt`, `updatedAt`, and `status` are assigned by the server.
 */
export type CreateTaskInput = Pick<
  Task,
  | "title"
  | "date"
  | "priority"
  | "blockType"
> &
  Partial<
    Pick<
      Task,
      | "description"
      | "startTime"
      | "endTime"
      | "durationMinutes"
      | "recurrenceRule"
    >
  > & {
    subjectId?: string | null;
    subtasks?: Pick<Subtask, "title" | "order">[];
  };

/**
 * Payload sent to `updateTaskDetails()`.
 * Every field is optional — the hook merges the patch with the existing task.
 */
export type UpdateTaskInput = Partial<
  Pick<
    Task,
    | "title"
    | "description"
    | "priority"
    | "status"
    | "blockType"
    | "startTime"
    | "endTime"
    | "durationMinutes"
    | "isCompleted"
    | "completedAt"
    | "recurrenceRule"
  >
> & {
  subjectId?: string | null;
  subtasks?: Pick<Subtask, "id" | "title" | "isCompleted" | "order">[];
};

/**
 * Minimal shape used by `moveTask()` — only the scheduling fields change.
 */
export type MoveTaskInput = {
  taskId: string;
  /** Null to unschedule (move back to Inbox). */
  startTime: string | null;
};

// ─── UI-layer helpers ─────────────────────────────────────────────────────────

/**
 * Lightweight shape used by TaskCard and the drag-and-drop layer.
 * Avoids passing the full Task graph to pure presentational components.
 */
export type TaskCardProps = {
  id: string;
  title: string;
  priority: Priority;
  status: TaskStatus;
  subjectColor?: string;
  isCompleted: boolean;
  onClick: () => void;
};

/**
 * The value stored in the DnD active/over context.
 * Typed explicitly so drag handlers don't have to cast `active.id`.
 */
export type DragPayload = {
  taskId: string;
  sourceSlot: string | "unscheduled";
};

// ─── Type guards ──────────────────────────────────────────────────────────────

/** Narrows an unknown value to Task — useful in server action responses. */
export function isTask(value: unknown): value is Task {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "date" in value &&
    "priority" in value &&
    "status" in value
  );
}

/** Returns true if the task has been placed on the timeline. */
export function isScheduled(task: Task): boolean {
  return task.startTime !== null;
}

/** Returns true if every subtask inside a task is completed. */
export function allSubtasksComplete(task: Task): boolean {
  if (!task.subtasks || task.subtasks.length === 0) return true;
  return task.subtasks.every((s) => s.isCompleted);
}

/**
 * Maps a Priority to a Tailwind text-color class.
 * Kept here so the mapping is defined once and shared across
 * TaskCard, TaskModal, and any future list views.
 */
export const PRIORITY_COLOR_MAP: Record<Priority, string> = {
  low: "text-sky-400",
  medium: "text-amber-400",
  high: "text-orange-400",
  urgent: "text-rose-500",
};

/**
 * Maps a Priority to a human-readable label.
 */
export const PRIORITY_LABEL_MAP: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

/**
 * Maps a BlockType to a human-readable label.
 */
export const BLOCK_TYPE_LABEL_MAP: Record<BlockType, string> = {
  deep_work: "Deep Work",
  admin: "Admin",
  recovery: "Recovery",
  other: "Other",
};

// ─── Goals ──────────────────────────────────────────────────────────────────

export interface MonthlyGoal {
  id: string;
  month: number;
  year: number;
  goal: string;
  userId: string;
  WeeklyGoals?: WeeklyGoal[];
  DailyGoals?: DailyGoal[];
  createdAt: string;
}

export interface WeeklyGoal {
  id: string;
  week: number;
  month: number;
  year: number;
  goal: string;
  monthlyGoalId: string;
  createdAt: string;
}

export interface DailyGoal {
  id: string;
  day: number;
  month: number;
  year: number;
  goal: string;
  monthlyGoalId: string;
  createdAt: string;
}