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

export async function getMonthlyGoals(month?: number, year?: number) {
  const user = await getAuthenticatedUser();
  
  return await prisma.monthlyGoals.findMany({
    where: {
      userId: user.id,
      ...(month !== undefined && { month }),
      ...(year !== undefined && { year }),
    },
    include: {
      WeeklyGoals: true,
      DailyGoals: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createMonthlyGoal(data: {
  month: number;
  year: number;
  goal: string;
}) {
  const user = await getAuthenticatedUser();

  const monthlyGoal = await prisma.monthlyGoals.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/planner");
  revalidatePath("/insights");
  return monthlyGoal;
}

export async function updateMonthlyGoal(id: string, data: {
  goal?: string;
  month?: number;
  year?: number;
}) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.monthlyGoals.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existing || existing.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const monthlyGoal = await prisma.monthlyGoals.update({
    where: { id },
    data,
  });

  revalidatePath("/planner");
  revalidatePath("/insights");
  return monthlyGoal;
}

export async function deleteMonthlyGoal(id: string) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.monthlyGoals.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!existing || existing.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.monthlyGoals.delete({
    where: { id },
  });

  revalidatePath("/planner");
  revalidatePath("/insights");
}

export async function getWeeklyGoals(monthlyGoalId: string) {
  const user = await getAuthenticatedUser();

  const monthlyGoal = await prisma.monthlyGoals.findUnique({
    where: { id: monthlyGoalId },
    select: { userId: true },
  });

  if (!monthlyGoal || monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.weeklyGoals.findMany({
    where: { monthlyGoalId },
    orderBy: {
      week: "asc",
    },
  });
}

export async function createWeeklyGoal(data: {
  week: number;
  month: number;
  year: number;
  goal: string;
  monthlyGoalId: string;
}) {
  const user = await getAuthenticatedUser();

  const monthlyGoal = await prisma.monthlyGoals.findUnique({
    where: { id: data.monthlyGoalId },
    select: { userId: true },
  });

  if (!monthlyGoal || monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const weeklyGoal = await prisma.weeklyGoals.create({
    data,
  });

  revalidatePath("/planner");
  return weeklyGoal;
}

export async function updateWeeklyGoal(id: string, data: {
  goal?: string;
  week?: number;
  month?: number;
  year?: number;
}) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.weeklyGoals.findUnique({
    where: { id },
    include: { monthlyGoal: { select: { userId: true } } },
  });

  if (!existing || existing.monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const weeklyGoal = await prisma.weeklyGoals.update({
    where: { id },
    data,
  });

  revalidatePath("/planner");
  return weeklyGoal;
}

export async function deleteWeeklyGoal(id: string) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.weeklyGoals.findUnique({
    where: { id },
    include: { monthlyGoal: { select: { userId: true } } },
  });

  if (!existing || existing.monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.weeklyGoals.delete({
    where: { id },
  });

  revalidatePath("/planner");
}


export async function getDailyGoals(monthlyGoalId: string) {
  const user = await getAuthenticatedUser();

  const monthlyGoal = await prisma.monthlyGoals.findUnique({
    where: { id: monthlyGoalId },
    select: { userId: true },
  });

  if (!monthlyGoal || monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return await prisma.dailyGoals.findMany({
    where: { monthlyGoalId },
    orderBy: {
      day: "asc",
    },
  });
}

export async function createDailyGoal(data: {
  day: number;
  month: number;
  year: number;
  goal: string;
  monthlyGoalId: string;
}) {
  const user = await getAuthenticatedUser();

  const monthlyGoal = await prisma.monthlyGoals.findUnique({
    where: { id: data.monthlyGoalId },
    select: { userId: true },
  });

  if (!monthlyGoal || monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const dailyGoal = await prisma.dailyGoals.create({
    data,
  });

  revalidatePath("/planner");
  return dailyGoal;
}

export async function updateDailyGoal(id: string, data: {
  goal?: string;
  day?: number;
  month?: number;
  year?: number;
}) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.dailyGoals.findUnique({
    where: { id },
    include: { monthlyGoal: { select: { userId: true } } },
  });

  if (!existing || existing.monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const dailyGoal = await prisma.dailyGoals.update({
    where: { id },
    data,
  });

  revalidatePath("/planner");
  return dailyGoal;
}

export async function deleteDailyGoal(id: string) {
  const user = await getAuthenticatedUser();

  const existing = await prisma.dailyGoals.findUnique({
    where: { id },
    include: { monthlyGoal: { select: { userId: true } } },
  });

  if (!existing || existing.monthlyGoal.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.dailyGoals.delete({
    where: { id },
  });

  revalidatePath("/planner");
}
