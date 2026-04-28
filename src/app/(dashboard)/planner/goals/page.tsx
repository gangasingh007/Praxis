
import { GoalDashboard } from "@/components/planner/GoalDashboard";
import { getMonthlyGoals } from "@/actions/goal-actions";

export default async function GoalsPage() {
  const currentDate = new Date();
  const initialGoals = await getMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());

  return (
    <div className="h-full bg-background p-8 overflow-y-auto">
        <GoalDashboard initialGoals={initialGoals} />
    </div>

  );
}
