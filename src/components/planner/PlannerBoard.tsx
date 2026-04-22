"use client";

import { useState, useEffect } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { TimeBlock } from "./TimeBlock";
import { CurrentTime } from "./CurrentTime";
import { MiniCalendar } from "./MiniCalendar";
import { useTasks } from "@/hooks/use-tasks";
import { TaskModal } from "./TaskModal";
import { getSubjects } from "@/actions/task-actions";

const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", 
  "20:00", "21:00", "22:00"
];

export function PlannerBoard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks, moveTask, addTask, updateTaskDetails, removeTask, isLoading } = useTasks(currentDate);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);

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
    } catch (error) {
      // Errors are already handled by the hook
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
  const timeString = `${currentHour.toString().padStart(2, '0')}:00`;

  const getTaskTimeSlot = (task: any) => {
    if (!task.startTime) return null;
    const date = new Date(task.startTime);
    return `${date.getHours().toString().padStart(2, '0')}:00`;
  };

  if (isLoading && tasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading your planner...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full overflow-hidden bg-background">
        
        {/* Top Header Section */}
        <header className="px-8 py-6 border-b border-border flex items-end justify-between bg-background/50 backdrop-blur-sm shrink-0">
          <CurrentTime />
          <div className="flex gap-4">
            <button 
              onClick={() => { setSelectedTask(null); setIsModalOpen(true); }}
              className="px-4 py-2 text-sm font-bold bg-secondary text-secondary-foreground border border-input rounded-xl hover:bg-secondary/80 transition-all active:scale-95"
            >
              Add Task
            </button>
            <button className="px-4 py-2 text-sm font-bold bg-primary text-background rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Share Plan
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          {/* Main Timeline Column */}
          <main className="flex-1 overflow-y-auto p-8 scrollbar-hide relative">
            <h2 className="text-xl font-bold mb-8 tracking-tight flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Day Timeline
            </h2>
            
            <div className="space-y-3 pb-12 relative">
              {TIME_SLOTS.map((time) => {
                const isCurrentHour = time === timeString;
                return (
                  <div key={time} className="relative">
                    {isCurrentHour && (
                      <div 
                        className="absolute left-0 right-0 z-10 pointer-events-none" 
                        style={{ top: `${(currentMinute / 60) * 80}px` }}
                      >
                        <div className="relative flex items-center">
                          <div className="absolute left-0 w-16 text-right pr-2">
                            <span className="text-[10px] font-bold text-destructive bg-background border border-destructive/20 px-1 rounded shadow-sm">
                              NOW
                            </span>
                          </div>
                          <div className="flex-1 h-px bg-destructive/50" />
                          <div className="w-2 h-2 bg-destructive rounded-full -ml-1 shadow-[0_0_8px_rgba(var(--destructive),0.8)]" />
                        </div>
                      </div>
                    )}
                    <TimeBlock id={time} timeLabel={time}>
                      {tasks
                        .filter((task) => getTaskTimeSlot(task) === time)
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
                    </TimeBlock>
                  </div>
                );
              })}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="w-[320px] border-l border-border bg-muted/30 p-6 flex flex-col gap-6 overflow-y-auto">
            
            <MiniCalendar selectedDate={currentDate} onDateSelect={setCurrentDate} />

            <div className="flex-1 flex flex-col min-h-0">
              <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-widest flex items-center justify-between">
                Unscheduled Inbox
                <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground font-bold">
                  {tasks.filter(t => !t.startTime).length}
                </span>
              </h3>
              
              <div className="flex-1 overflow-y-auto scrollbar-hide border-2 border-dashed border-border rounded-2xl bg-background/50 p-2 transition-colors hover:border-muted-foreground/20">
                <TimeBlock id="unscheduled">
                  {tasks
                    .filter((task) => !task.startTime)
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
                  {tasks.filter((t) => !t.startTime).length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                      <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mb-3">
                        <span className="text-muted-foreground text-sm">✓</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium italic">
                        Inbox is clear.
                      </p>
                    </div>
                  )}
                </TimeBlock>
              </div>
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
