import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

// Helper for random numbers
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
// Helper for random elements
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
// Helper for dates
const subtractDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};
const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

async function main() {
  console.log("Starting diverse seed...");

  // Clean existing data in reverse order of dependencies
  await prisma.pomodoroSession.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.task.deleteMany();
  await prisma.dailyGoals.deleteMany();
  await prisma.weeklyGoals.deleteMany();
  await prisma.monthlyGoals.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleared.");

  const hashedPassword = await bcrypt.hash("123456789", 10);

  // ---------------------------------------------------------
  // 1. Create a Test User
  // ---------------------------------------------------------
  const user = await prisma.user.create({
    data: {
      email: "gangasingh1734@gmail.com",
      name: "Ganga Singh",
      password: hashedPassword,
    },
  });

  console.log(`User created: ${user.email}`);

  // ---------------------------------------------------------
  // 2. Create Diverse Subjects
  // ---------------------------------------------------------
  const subjectData = [
    { name: "Deep Work", colorCode: "#ef4444" }, // Red
    { name: "Health & Fitness", colorCode: "#22c55e" }, // Green
    { name: "Learning", colorCode: "#3b82f6" }, // Blue
    { name: "Personal", colorCode: "#f59e0b" }, // Amber
    { name: "Side Hustle", colorCode: "#8b5cf6" }, // Violet
    { name: "Finance", colorCode: "#14b8a6" }, // Teal
    { name: "Chores", colorCode: "#64748b" }, // Slate
    { name: "Networking", colorCode: "#ec4899" }, // Pink
  ];

  const subjects = [];
  for (const s of subjectData) {
    subjects.push(
      await prisma.subject.create({
        data: { ...s, userId: user.id },
      })
    );
  }
  console.log(`Created ${subjects.length} subjects.`);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentDay = new Date().getDate();

  // ---------------------------------------------------------
  // 3. Create Goals (Monthly, Weekly, Daily)
  // ---------------------------------------------------------
  const monthlyGoalData = [
    { goal: "Launch Cognitive OS Beta", focus: "Deep Work" },
    { goal: "Run a Half-Marathon (21km)", focus: "Health & Fitness" },
    { goal: "Read 3 Books on Systems Thinking", focus: "Learning" },
    { goal: "Reach $1k MRR on Side Project", focus: "Side Hustle" },
  ];

  const monthlyGoals = [];
  for (const mg of monthlyGoalData) {
    monthlyGoals.push(
      await prisma.monthlyGoals.create({
        data: {
          month: currentMonth,
          year: currentYear,
          goal: mg.goal,
          userId: user.id,
        },
      })
    );
  }

  // Add some weekly and daily goals tied to the Monthly goals
  const weeks = [1, 2, 3, 4];
  for (const mg of monthlyGoals) {
    // 2 weekly goals per monthly goal
    for (let i = 0; i < 2; i++) {
      await prisma.weeklyGoals.create({
        data: {
          week: randomElement(weeks),
          month: currentMonth,
          year: currentYear,
          goal: `Milestone ${i + 1} for: ${mg.goal.split(" ")[0]}`,
          monthlyGoalId: mg.id,
        },
      });
    }

    // 3 daily goals for the current day tied to random monthly goals
    for (let i = 0; i < 3; i++) {
      await prisma.dailyGoals.create({
        data: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
          goal: `Daily step ${i + 1} towards ${mg.goal.split(" ")[0]}`,
          monthlyGoalId: mg.id,
        },
      });
    }
  }
  console.log("Goals (Monthly, Weekly, Daily) created.");

  // ---------------------------------------------------------
  // 4. Create Habits
  // ---------------------------------------------------------
  const habitData = [
    { name: "Read 20 pages", desc: "Non-fiction reading before bed", cur: 12, max: 25 },
    { name: "Morning Workout", desc: "HIIT or Weightlifting", cur: 5, max: 30 },
    { name: "Meditate 10 mins", desc: "Mindfulness app", cur: 18, max: 18 },
    { name: "Drink 2L Water", desc: "Hydration tracking", cur: 45, max: 45 },
    { name: "Zero Inbox", desc: "Clear all emails", cur: 0, max: 14 },
    { name: "Journaling", desc: "End of day reflection", cur: 3, max: 10 },
    { name: "Stretch", desc: "Mobility work", cur: 1, max: 7 },
  ];

  const habits = [];
  for (const h of habitData) {
    habits.push(
      await prisma.habit.create({
        data: {
          name: h.name,
          description: h.desc,
          currentStreak: h.cur,
          longestStreak: h.max,
          lastCompletedAt: h.cur > 0 ? subtractDays(new Date(), randomInt(0, 1)) : null,
          lastAiRewardText: h.cur > 10 ? "Exceptional consistency. You are building unbreakable systems." : "Good start. Keep the momentum going.",
          userId: user.id,
        },
      })
    );
  }
  console.log(`Created ${habits.length} habits.`);

  // ---------------------------------------------------------
  // 5. Create Tasks (Past, Today, Future)
  // ---------------------------------------------------------
  const taskTitles = [
    "Review Pull Requests", "Design Database Schema", "Write API Endpoints", "Client Meeting",
    "Grocery Shopping", "Pay Bills", "Call Parents", "Dentist Appointment",
    "Read React Docs", "Implement Auth", "Deploy to Vercel", "Fix Bug #142",
    "Plan Q3 Strategy", "Update Resume", "Gym: Leg Day", "Gym: Push Day",
    "Meal Prep", "Reply to Emails", "Watch System Design Course", "Research Competitors"
  ];

  const tasks = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate 40 tasks distributed over the past 7 days, today, and next 7 days
  for (let i = 0; i < 40; i++) {
    const dayOffset = randomInt(-7, 7);
    const taskDate = addDays(today, dayOffset);
    const isPast = dayOffset < 0;
    const isCompleted = isPast ? Math.random() > 0.2 : (dayOffset === 0 ? Math.random() > 0.5 : false);
    
    // Some tasks have specific times
    let startTime = null;
    let endTime = null;
    if (Math.random() > 0.4) {
      const startHour = randomInt(8, 17);
      startTime = new Date(taskDate);
      startTime.setHours(startHour, 0, 0, 0);
      endTime = new Date(taskDate);
      endTime.setHours(startHour + randomInt(1, 2), 0, 0, 0);
    }

    const task = await prisma.task.create({
      data: {
        title: randomElement(taskTitles),
        description: `Auto-generated description for task ${i}`,
        isCompleted,
        priority: randomElement(["LOW", "MEDIUM", "HIGH"]),
        date: taskDate,
        startTime,
        endTime,
        durationMinutes: randomElement([30, 45, 60, 90, 120]),
        userId: user.id,
        subjectId: randomElement(subjects).id,
      },
    });
    tasks.push(task);
  }
  console.log(`Created ${tasks.length} tasks.`);

  // ---------------------------------------------------------
  // 6. Create Pomodoro Sessions (Historical Data)
  // ---------------------------------------------------------
  let pomodoroCount = 0;
  // Generate 50-80 random pomodoro sessions over the last 14 days
  const sessionCount = randomInt(50, 80);
  
  for (let i = 0; i < sessionCount; i++) {
    const dayOffset = randomInt(-14, 0);
    const sessionDate = addDays(today, dayOffset);
    const sessionHour = randomInt(8, 20);
    const sessionMinute = randomElement([0, 30]);
    sessionDate.setHours(sessionHour, sessionMinute, 0, 0);

    // Occasionally link to a past completed task
    const pastCompletedTasks = tasks.filter(t => t.isCompleted && t.date.getTime() === addDays(today, dayOffset).getTime());
    const linkedTaskId = pastCompletedTasks.length > 0 && Math.random() > 0.5 ? randomElement(pastCompletedTasks).id : null;

    await prisma.pomodoroSession.create({
      data: {
        duration: randomElement([25, 25, 25, 50]), // Mostly 25, sometimes 50
        completedAt: sessionDate,
        userId: user.id,
        taskId: linkedTaskId,
      },
    });
    pomodoroCount++;
  }
  console.log(`Created ${pomodoroCount} Pomodoro sessions for rich analytics.`);

  console.log("-----------------------------------------");
  console.log("DIVERSE SEED COMPLETED SUCCESSFULLY!");
  console.log(`Test User Email: gangasinggh1734@gmail.com`);
  console.log(`Test User Password: 123456789`);
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
