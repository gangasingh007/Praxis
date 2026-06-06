import { HabitCard } from "@/components/habits/HabitCard";
import { getHabits, createHabit } from "@/actions/habit-actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Habits | Praxis",
};

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default async function HabitsPage() {
  const habits = await getHabits();
  const now = new Date();

  async function handleCreateHabit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) return;
    
    await createHabit({ name });
    revalidatePath("/habits");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 h-full overflow-y-auto">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Daily Directives</h1>
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Powered by Groq AI telemetry.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full font-bold px-6">
              <Plus className="w-4 h-4 mr-2" />
              NEW PROTOCOL
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-black tracking-tighter uppercase">Initialize New Habit</DialogTitle>
            </DialogHeader>
            <form action={handleCreateHabit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400 font-mono text-xs uppercase">Habit Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g., 100 Days of Code" 
                  className="bg-zinc-900 border-zinc-800 text-white focus:ring-zinc-700"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-tight">
                  Start Protocol
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl opacity-50">
          <p className="text-zinc-500 font-mono text-sm uppercase">No active protocols detected.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <HabitCard 
              key={habit.id}
              id={habit.id}
              name={habit.name}
              initialStreak={habit.currentStreak}
              isCompletedToday={habit.lastCompletedAt ? isSameDay(new Date(habit.lastCompletedAt), now) : false}
              lastAiRewardText={habit.lastAiRewardText}
            />
          ))}
        </div>
      )}
    </div>
  );
}