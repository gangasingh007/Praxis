-- CreateTable
CREATE TABLE "MonthlyGoals" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlyGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyGoals" (
    "id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "monthlyGoalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyGoals" (
    "id" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "monthlyGoalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyGoals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyGoals_goal_key" ON "MonthlyGoals"("goal");

-- CreateIndex
CREATE UNIQUE INDEX "DailyGoals_goal_monthlyGoalId_key" ON "DailyGoals"("goal", "monthlyGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyGoals_goal_monthlyGoalId_key" ON "WeeklyGoals"("goal", "monthlyGoalId");

-- AddForeignKey
ALTER TABLE "MonthlyGoals" ADD CONSTRAINT "MonthlyGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyGoals" ADD CONSTRAINT "DailyGoals_monthlyGoalId_fkey" FOREIGN KEY ("monthlyGoalId") REFERENCES "MonthlyGoals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyGoals" ADD CONSTRAINT "WeeklyGoals_monthlyGoalId_fkey" FOREIGN KEY ("monthlyGoalId") REFERENCES "MonthlyGoals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
