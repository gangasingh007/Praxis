import { HabitCard } from "@/components/habits/HabitCard";

const DUMMY_HABITS = [
  { id: "1", name: "100 Days of Code", initialStreak: 14, isCompletedToday: false },
  { id: "2", name: "Read System Design Documentation", initialStreak: 3, isCompletedToday: true },
  { id: "3", name: "Morning Exercise", initialStreak: 8, isCompletedToday: false },
];

export const metadata = {
  title: "Habits | Praxis",
};

export default function HabitsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8 h-full overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Daily Directives</h1>
        <p className="text-zinc-400 font-mono">Powered by Groq AI telemetry.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DUMMY_HABITS.map((habit) => (
          <HabitCard 
            key={habit.id}
            id={habit.id}
            name={habit.name}
            initialStreak={habit.initialStreak}
            isCompletedToday={habit.isCompletedToday}
          />
        ))}
      </div>
    </div>
  );
}