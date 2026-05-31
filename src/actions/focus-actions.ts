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

export async function recordPomodoroSession(data: {
  duration: number; // minutes
  taskId?: string;
}) {
  const user = await getAuthenticatedUser();

  const session = await prisma.pomodoroSession.create({
    data: {
      duration: data.duration,
      taskId: data.taskId,
      userId: user.id,
    },
  });

  revalidatePath("/insights");
  revalidatePath("/profile");
  
  return session;
}
