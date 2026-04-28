"use client";

import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { TimeBlock } from "./TimeBlock";
import { CurrentTime } from "./CurrentTime";
import { MiniCalendar } from "./MiniCalendar";
import { MonthlyGoalsManager } from "./MonthlyGoalsManager";
import { useTasks } from "@/hooks/use-tasks";
import { TaskModal } from "./TaskModal";
import { getSubjects } from "@/actions/task-actions";
import {
  Plus,
  Share2,
  Inbox,
  CheckCircle2,
  Loader2,
  CalendarDays,
  Zap,
  ChevronRight,
  LayoutGrid,
  Loader,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00","23:00","00:00","01:00","02:00","03:00",
  "04:00", "05:00"
];

const HOUR_LABELS: Record<string, string> = {
  "06:00": "Early",
  "07:00": "Morning",
  "12:00": "Midday",
  "13:00": "Afternoon",
  "17:00": "Evening",
  "20:00": "Night",
};

export function PlannerBoard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks, moveTask, addTask, updateTaskDetails, removeTask, isLoading } =
    useTasks(currentDate);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [sidebarTab, setSidebarTab] = useState<"calendar" | "inbox">("calendar");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newTimeSlot = over.id as string;
    moveTask(taskId, newTimeSlot === "unscheduled" ? null : newTimeSlot);
  };

  const handleSaveTask = async (data: any) => {
    try {
      if (selectedTask) {
        await updateTaskDetails(selectedTask.id, data);
      } else {
        await addTask(data);
      }
    } catch (_) {
      // handled by hook
    } finally {
      setIsModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await removeTask(id);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const timeString = `${currentHour.toString().padStart(2, "0")}:00`;

  const getTaskTimeSlot = (task: any) => {
    if (!task.startTime) return null;
    const d = new Date(task.startTime);
    return `${d.getHours().toString().padStart(2, "0")}:00`;
  };

  const unscheduledCount = tasks.filter((t) => !t.startTime).length;
  if (isLoading && tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
       <Loader2 size={48} className="text-primary animate-spin" /> 
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full overflow-hidden bg-background">

        <header className="px-6 py-4 border-b border-border/60 bg-background/70 backdrop-blur-xl shrink-0 relative overflow-hidden">
          {/* subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-[2px] " />

          <div className="flex items-center justify-between gap-4">
            {/* left: brand + live clock */}
            <div className="flex items-center gap-4">
              <CurrentTime />
            </div>
            {/* right: action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-sm font-bold uppercase tracking-wider"
              >
                <Plus size={14} className="text-primary  transition-transform duration-200" />
                <span className="hidden sm:inline text-muted-foreground group-hover:text-foreground transition-colors">
                  Add Task
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">

          {/* ── Main Timeline ── */}
          <main className="flex-1 overflow-y-auto relative">
            {/* sticky section label */}
            <div className="sticky top-0 z-20 px-6 pt-5 pb-3 bg-background/80 backdrop-blur-sm border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
                  Day Timeline
                </h2>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                
                {TIME_SLOTS.length} blocks
              </div>
            </div>

            <div className="px-6 pb-16 pt-4 space-y-1">
              {TIME_SLOTS.map((time, idx) => {
                const isCurrentHour = time === timeString;
                const slotTasks = tasks.filter((t) => getTaskTimeSlot(t) === time);
                const label = HOUR_LABELS[time];
                const showLabel = !!label;

                return (
                  <div key={time}>
                    {/* period label */}
                    {showLabel && (
                      <div className="flex items-center gap-3 pt-4 pb-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/70">
                          {label}
                        </span>
                        <div className="flex-1 h-px bg-border/20" />
                      </div>
                    )}

                    <div className="relative group/slot">
                      {/* current time indicator */}
                      {isCurrentHour && (
                        <div
                          className="absolute left-0 right-0 z-20 pointer-events-none"
                          style={{ top: `${(currentMinute / 60) * 72}px` }}
                        >
                          <div className="flex items-center">
                            <div className="ml-14 flex items-center gap-0 flex-1">
                              {/* pulsing dot */}
                              <div className="relative shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-40" />
                              </div>
                              <div className="flex-1 h-px bg-gradient-to-r from-rose-500/70 to-transparent" />
                            </div>
                            {/* NOW badge */}
                            <span className="absolute left-14 -top-3 text-[9px] font-black uppercase tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/25 px-1.5 py-0.5 rounded-md">
                              Now
                            </span>
                          </div>
                        </div>
                      )}

                      {/* time slot row */}
                      <div
                        className={cn(
                          "flex items-start gap-3 rounded-xl transition-all duration-200 p-1",
                          isCurrentHour && "bg-primary/[0.03]",
                          "hover:bg-muted/30"
                        )}
                      >
                        {/* time label */}
                        <div className="w-12 shrink-0 pt-2 text-right">
                          <span
                            className={cn(
                              "text-xs font-mono font-bold tabular-nums",
                              isCurrentHour
                                ? "text-primary"
                                : "text-muted-foreground/40 group-hover/slot:text-muted-foreground/60 transition-colors"
                            )}
                          >
                            {time}
                          </span>
                        </div>

                        {/* vertical rail */}
                        <div className="relative shrink-0 flex flex-col items-center pt-2">
                          <div
                            className={cn(
                              "w-[1px] h-full min-h-[56px] transition-colors duration-200",
                              isCurrentHour
                                ? "bg-primary/30"
                                : "bg-border/30 group-hover/slot:bg-border/50"
                            )}
                          />
                          {/* rail dot */}
                          <div
                            className={cn(
                              "absolute top-[6px] w-2 h-2 rounded-full border-2 border-background transition-all duration-200",
                              isCurrentHour
                                ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
                                : slotTasks.length > 0
                                ? "bg-primary/60"
                                : "bg-border group-hover/slot:bg-muted-foreground/40"
                            )}
                          />
                        </div>

                        {/* drop zone + tasks */}
                        <div className="flex-1 min-w-0 pb-1">
                          <TimeBlock id={time} timeLabel={time}>
                            {slotTasks.map((task) => (
                              <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                priority={task.priority}
                                subjectColor={task.subject?.colorCode}
                                onClick={() => openEditModal(task)}
                              />
                            ))}
                          </TimeBlock>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <aside className="w-[300px] xl:w-[320px] border-l border-border/50 bg-muted/20 backdrop-blur-sm flex flex-col overflow-hidden">

            {/* sidebar tab strip */}
            <div className="shrink-0 flex border-b border-border/50 bg-background/40">
              {(["calendar", "inbox"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSidebarTab(tab)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-200",
                    sidebarTab === tab
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground/50 hover:text-muted-foreground border-b-2 border-transparent"
                  )}
                >
                  {tab === "calendar" ? <CalendarDays size={12} /> : <Inbox size={12} />}
                  {tab}
                  {tab === "inbox" && unscheduledCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-px rounded-full bg-amber-400/15 text-amber-400 text-[9px] font-black border border-amber-400/25">
                      {unscheduledCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* tab content */}
            <div className="flex-1 overflow-y-auto">

              {sidebarTab === "calendar" && (
                <div className="p-4 space-y-4">
                  <MiniCalendar
                    selectedDate={currentDate}
                    onDateSelect={setCurrentDate}
                  />
                  <MonthlyGoalsManager currentDate={currentDate} />
                </div>
              )}

              {sidebarTab === "inbox" && (
                <div className="p-4 flex flex-col gap-3 h-full">
                  {/* inbox header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Inbox size={13} className="text-muted-foreground/60" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                        Unscheduled
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted/50 border border-border/40">
                      <span className="text-[10px] font-black text-foreground">
                        {unscheduledCount}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/50">
                        tasks
                      </span>
                    </div>
                  </div>

                  {/* drop zone */}
                  <div
                    className={cn(
                      "flex-1 min-h-[200px] rounded-2xl border-2 border-dashed transition-all duration-300 p-2",
                      unscheduledCount > 0
                        ? "border-border/40 bg-background/30 hover:border-primary/20 hover:bg-primary/[0.02]"
                        : "border-border/20 bg-background/10"
                    )}
                  >
                    <TimeBlock id="unscheduled">
                      {tasks
                        .filter((t) => !t.startTime)
                        .map((task) => (
                          <TaskCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            priority={task.priority}
                            subjectColor={task.subject?.colorCode}
                            onClick={() => openEditModal(task)}
                          />
                        ))}

                      {unscheduledCount === 0 && (
                        <div className="flex flex-col items-center justify-center h-48 text-center p-4 gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.1)]">
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center">
                              <Zap size={8} className="text-emerald-400" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-black uppercase tracking-widest text-foreground/60">
                              Inbox Clear
                            </p>
                            <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                              All tasks scheduled
                            </p>
                          </div>
                        </div>
                      )}
                    </TimeBlock>
                  </div>

                  {/* tip */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
                    <p className="text-[12px] font-mono text-muted-foreground leading-relaxed tracking-wide">
                      Drag tasks onto a time slot to schedule them
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={selectedTask}
        subjects={subjects}
      />
    </DndContext>
  );
}