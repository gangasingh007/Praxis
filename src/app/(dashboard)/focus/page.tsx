import { FocusTimer } from "@/components/pomodoro/FocusTimer";

export const metadata = {
  title: "Focus | Praxis",
};

export default function FocusPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <FocusTimer />
    </div>
  );
}