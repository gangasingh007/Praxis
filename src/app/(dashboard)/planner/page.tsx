import { PlannerBoard } from "@/components/planner/PlannerBoard";

export const metadata = {
  title: "Planner | Praxis",
};

export default function PlannerPage() {
  return (
    <div className="h-full">
      <PlannerBoard />
    </div>
  );
}