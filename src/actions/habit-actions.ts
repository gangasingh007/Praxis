"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateHabitReward } from "./ai-actions";

async function getAuthenticatedUser() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function getHabits() {
  const user = await getAuthenticatedUser();
  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Check if streaks need to be reset
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const updatedHabits = await Promise.all(
    habits.map(async (habit) => {
      if (!habit.lastCompletedAt) return habit;

      const lastComp = new Date(habit.lastCompletedAt);
      lastComp.setHours(0, 0, 0, 0);

      // If last completed was before yesterday, reset current streak
      if (lastComp < yesterday) {
        return await prisma.habit.update({
          where: { id: habit.id },
          data: { currentStreak: 0 },
        });
      }
      return habit;
    })
  );

  return updatedHabits;
}

export async function createHabit(data: { name: string; description?: string }) {
  const user = await getAuthenticatedUser();

  const habit = await prisma.habit.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/habits");
  return habit;
}

export async function completeHabit(id: string) {
  const user = await getAuthenticatedUser();

  const habit = await prisma.habit.findUnique({
    where: { id },
  });

  if (!habit || habit.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  if (habit.lastCompletedAt) {
    const lastComp = new Date(habit.lastCompletedAt);
    lastComp.setHours(0, 0, 0, 0);
    if (lastComp.getTime() === today.getTime()) {
      return { success: false, message: "Already completed today" };
    }
  }

  // Calculate new streak
  let newStreak = 1;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (habit.lastCompletedAt) {
    const lastComp = new Date(habit.lastCompletedAt);
    lastComp.setHours(0, 0, 0, 0);
    if (lastComp.getTime() === yesterday.getTime()) {
      newStreak = habit.currentStreak + 1;
    }
  }

  // Generate AI Reward
  const aiReward = await generateHabitReward(habit.name, newStreak);

  const updatedHabit = await prisma.habit.update({
    where: { id },
    data: {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, habit.longestStreak),
      lastCompletedAt: now,
      lastAiRewardText: aiReward.success ? aiReward.message : habit.lastAiRewardText,
    },
  });

  revalidatePath("/habits");
  revalidatePath("/insights");
  
  return { 
    success: true, 
    habit: updatedHabit, 
    aiMessage: aiReward.success ? aiReward.message : null 
  };
}

export async function deleteHabit(id: string) {
  const user = await getAuthenticatedUser();

  const habit = await prisma.habit.findUnique({
    where: { id },
  });

  if (!habit || habit.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.habit.delete({
    where: { id },
  });

  revalidatePath("/habits");
  revalidatePath("/insights");
}

export async function regenerateHabitRewardAction(id: string) {
  const user = await getAuthenticatedUser();

  const habit = await prisma.habit.findUnique({
    where: { id },
  });

  if (!habit || habit.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  const aiReward = await generateHabitReward(habit.name, habit.currentStreak);

  if (aiReward.success) {
    await prisma.habit.update({
      where: { id },
      data: { lastAiRewardText: aiReward.message },
    });
  }

  revalidatePath("/habits");
  return aiReward;
}
