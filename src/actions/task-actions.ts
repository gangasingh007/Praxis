"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getAuthenticatedUser() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function getTasks(date: Date) {
  const user = await getAuthenticatedUser();

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.task.findMany({
    where: {
      userId: user.id,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      subject: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

import { Priority } from "@/generated/prisma";

export async function createTask(data: {
  title: string;
  description?: string;
  priority?: Priority;
  date: Date;
  startTime?: Date | null;
  endTime?: Date | null;
  subjectId?: string | null;
}) {
  const user = await getAuthenticatedUser();

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      priority: data.priority || "MEDIUM",
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      subjectId: data.subjectId,
      userId: user.id,
    },
    include: {
      subject: true,
    },
  });

  revalidatePath("/planner");
  return task;
}

export async function updateTask(id: string, data: {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  priority?: Priority;
  startTime?: Date | null;
  endTime?: Date | null;
  date?: Date;
  subjectId?: string | null;
}) {
  const user = await getAuthenticatedUser();

  // Verify ownership
  const existingTask = await prisma.task.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!existingTask || existingTask.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...data,
    },
    include: {
      subject: true,
    }
  });

  revalidatePath("/planner");
  return task;
}

export async function deleteTask(id: string) {
  const user = await getAuthenticatedUser();

  // Verify ownership
  const existingTask = await prisma.task.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!existingTask || existingTask.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/planner");
}

export async function getSubjects() {
  const user = await getAuthenticatedUser();

  return await prisma.subject.findMany({
    where: { userId: user.id },
  });
}
