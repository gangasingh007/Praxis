"use client";

import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/actions/task-actions";
import { toast } from "sonner";

export function useTasks(date: Date) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTasks(date);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (data: { title: string; description?: string; priority?: any; subjectId?: string; startTime?: Date | null }) => {
    const tempId = `temp-${Date.now()}`;
    const previousTasks = [...tasks];

    const optimisticTask = {
      id: tempId,
      title: data.title,
      description: data.description || null,
      priority: data.priority || "MEDIUM",
      date,
      startTime: data.startTime || null,
      endTime: data.startTime ? new Date(data.startTime.getTime() + 60 * 60 * 1000) : null,
      subjectId: data.subjectId || null,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTasks((prev) => [...prev, optimisticTask]);

    try {
      const newTask = await createTask({
        title: data.title,
        description: data.description,
        priority: data.priority,
        date,
        startTime: data.startTime || null,
        endTime: data.startTime ? new Date(data.startTime.getTime() + 60 * 60 * 1000) : null,
        subjectId: data.subjectId || null,
      });
      
      // Replace optimistic task with real task from server
      setTasks((prev) => prev.map(t => t.id === tempId ? newTask : t));
      toast.success("Task created");
      return newTask;
    } catch (error) {
      setTasks(previousTasks);
      toast.error("Failed to create task");
    }
  };

  const updateTaskDetails = async (id: string, updates: any) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const moveTask = async (taskId: string, newTimeSlot: string | null) => {
    // Optimistic update
    const previousTasks = [...tasks];
    
    let startTime: Date | null = null;
    let endTime: Date | null = null;

    if (newTimeSlot && newTimeSlot !== "unscheduled") {
      const [hours, minutes] = newTimeSlot.split(":").map(Number);
      startTime = new Date(date);
      startTime.setHours(hours, minutes, 0, 0);
      endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, startTime, endTime }
          : t
      )
    );

    try {
      await updateTask(taskId, {
        startTime,
        endTime,
      });
      toast.success(newTimeSlot === "unscheduled" ? "Moved to inbox" : `Scheduled for ${newTimeSlot}`);
    } catch (error) {
      setTasks(previousTasks);
      toast.error("Failed to move task");
    }
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTaskDetails,
    removeTask,
    moveTask,
    refreshTasks: fetchTasks,
  };
}
