"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

async function getAuthenticatedUser() {
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function getInsightsData() {
  const user = await getAuthenticatedUser();
  const userId = user.id;

  // 1. Total Focus Time (Pomodoro sessions)
  const pomodoroSessions = await prisma.pomodoroSession.findMany({
    where: { userId },
  });
  
  const totalFocusMinutes = pomodoroSessions.reduce((acc, s) => acc + s.duration, 0);
  const totalFocusHours = (totalFocusMinutes / 60).toFixed(1);

  // 2. Task Completion
  const totalTasksCount = await prisma.task.count({ where: { userId } });
  const completedTasksCount = await prisma.task.count({ where: { userId, isCompleted: true } });
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // 3. Weekly Focus Trends (Last 7 days)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const nextDay = new Date(d);
    nextDay.setDate(d.getDate() + 1);

    const daySessions = await prisma.pomodoroSession.findMany({
      where: {
        userId,
        completedAt: {
          gte: d,
          lt: nextDay,
        },
      },
      include: {
        task: {
          include: { subject: true }
        }
      }
    });

    const dayTasks = await prisma.task.findMany({
      where: {
        userId,
        date: {
          gte: d,
          lt: nextDay,
        },
      },
    });

    const dayFocusMinutes = daySessions.reduce((acc, s) => acc + s.duration, 0);
    const dayPlannedMinutes = dayTasks.reduce((acc, t) => acc + (t.durationMinutes || 0), 0);
    const daySubjects = new Set(daySessions.map(s => s.task?.subject?.name).filter(Boolean));

    chartData.push({
      day: days[d.getDay()],
      focusHours: Number((dayFocusMinutes / 60).toFixed(1)),
      plannedHours: Number((dayPlannedMinutes / 60).toFixed(1)),
      subject: Array.from(daySubjects).slice(0, 2).join(', ') || 'General'
    });
  }

  // 4. Subject Distribution (Based on completed tasks duration)
  const subjects = await prisma.subject.findMany({
    where: { userId },
    include: {
      tasks: {
        where: { isCompleted: true },
        select: { durationMinutes: true }
      }
    }
  });

  const subjectDistribution = subjects.map(s => ({
    name: s.name,
    value: s.tasks.reduce((acc, t) => acc + (t.durationMinutes || 0), 0),
    color: s.colorCode
  })).filter(s => s.value > 0);

  // 5. Streaks (Focus Streak based on Pomodoro or Task completion)
  const allActivities = await Promise.all([
    prisma.pomodoroSession.findMany({
      where: { userId },
      select: { completedAt: true }
    }),
    prisma.task.findMany({
      where: { userId, isCompleted: true },
      select: { updatedAt: true }
    })
  ]);

  const activityDates = new Set(
    [...allActivities[0].map(s => new Date(s.completedAt).toDateString()),
     ...allActivities[1].map(t => new Date(t.updatedAt).toDateString())]
  );

  let currentStreak = 0;
  let longestStreak = 0;
  
  // Calculate Current Streak
  let checkDate = new Date();
  checkDate.setHours(0,0,0,0);
  
  // If no activity today, check if there was activity yesterday to maintain the streak
  if (!activityDates.has(checkDate.toDateString())) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (activityDates.has(checkDate.toDateString())) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Calculate Longest Streak
  const sortedDates = Array.from(activityDates)
    .map(d => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());
    
  let tempStreak = 0;
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const diffDays = Math.round((sortedDates[i-1].getTime() - sortedDates[i].getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        tempStreak++;
      } else if (diffDays > 1) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    totalFocusTime: `${totalFocusHours}h`,
    longestStreak: `${longestStreak} Days`,
    currentStreak: `${currentStreak} Days`,
    taskCompletion: `${completionRate}%`,
    completedTasksCount,
    chartData,
    subjectDistribution
  };
}
