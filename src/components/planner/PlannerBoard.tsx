"use client";

import { useState, useEffect, useCallback } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useTasks } from "@/hooks/use-tasks";
import { getSubjects } from "@/actions/task-actions";
import { TaskModal } from "./TaskModal";
import { TaskDetailModal } from "./TaskDetailModal";
import { PlannerHeader } from "./PlannerHeader";
import { PlannerTimeline } from "./PlannerTimeline";
import { PlannerSidebar } from "./PlannerSidebar";
import { PlannerLoadingState } from "./PlannerLoadingState";
import { taskTimeSlot, toHourSlot } from "./constants/time";
import type { Task } from "../../types";

export function PlannerBoard() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks, moveTask, addTask, updateTaskDetails, removeTask, isLoading } =
    useTasks(currentDate);

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const [subjects, setSubjects] = useState<any[]>([]);
  useEffect(() => {
    getSubjects()
      .then(setSubjects)
      .catch((err) => console.error("Failed to fetch subjects:", err));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openAddModal = useCallback(() => {
    setSelectedTask(null);
    setIsModalOpen(true);
    setIsDetailModalOpen(false);
  }, []);

  const openDetailModal = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
    setIsModalOpen(false);
  }, []);

  const openEditModal = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setIsDetailModalOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedTask(null);
  }, []);

  const handleEditFromDetail = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  }, []);

  const handleSaveTask = useCallback(
    async (data: any) => {
      try {
        if (selectedTask) {
          await updateTaskDetails(selectedTask.id, data);
        } else {
          await addTask(data);
        }
      } finally {
        closeModal();
      }
    },
    [selectedTask, updateTaskDetails, addTask, closeModal]
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      await removeTask(id);
      closeModal();
    },
    [removeTask, closeModal]
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) return;
      const taskId = active.id as string;
      const slot = over.id as string;
      moveTask(taskId, slot === "unscheduled" ? null : slot);
    },
    [moveTask]
  );

  const handleUpdateTaskDuration = useCallback(
    async (taskId: string, durationMinutes: number) => {
      const task = tasks.find(t => t.id === taskId);
      if (!task || !task.startTime) return;

      const startTime = new Date(task.startTime);
      const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

      await updateTaskDetails(taskId, {
        durationMinutes,
        endTime,
      });
    },
    [tasks, updateTaskDetails]
  );

  const currentHourSlot = toHourSlot(currentTime);
  const currentMinute = currentTime.getMinutes();
  const unscheduledTasks = tasks.filter((t) => !t.startTime);

  if (isLoading && tasks.length === 0) {
    return <PlannerLoadingState />;
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full overflow-hidden bg-background">

        <PlannerHeader onAddTask={openAddModal} />

        <div className="flex flex-1 overflow-hidden">
          <PlannerTimeline
            tasks={tasks}
            currentHourSlot={currentHourSlot}
            currentMinute={currentMinute}
            onClickTask={openDetailModal}
            onUpdateTaskDuration={handleUpdateTaskDuration}
          />

          <PlannerSidebar
            currentDate={currentDate}
            onDateSelect={setCurrentDate}
            unscheduledTasks={unscheduledTasks}
            onClickTask={openDetailModal}
          />
        </div>
      </div>

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={closeModal}
        onEdit={handleEditFromDetail}
        onDelete={handleDeleteTask}
        task={selectedTask}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={selectedTask}
        subjects={subjects}
      />
    </DndContext>
  );
}