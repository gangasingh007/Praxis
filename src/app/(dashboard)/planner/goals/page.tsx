import { GoalDashboard } from "@/components/planner/GoalDashboard";
import { getMonthlyGoals } from "@/actions/goal-actions";

export default async function GoalsPage() {
  const currentDate = new Date();
  const initialGoals = await getMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());

  const transformedGoals = initialGoals.map(goal => ({
    ...goal,
    createdAt: goal.createdAt.toISOString(),
    WeeklyGoals: goal.WeeklyGoals.map(wg => ({ ...wg, createdAt: wg.createdAt.toISOString() })),
    DailyGoals: goal.DailyGoals.map(dg => ({ ...dg, createdAt: dg.createdAt.toISOString() })),
  }));

  return (
    <div className="h-full bg-background p-8 overflow-y-auto">
        <GoalDashboard initialGoals={transformedGoals} />
    </div>

  );
}
