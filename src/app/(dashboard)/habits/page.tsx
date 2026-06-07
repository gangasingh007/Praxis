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
    <div className="max-w-5xl mx-auto p-6 md:p-10 h-full overflow-y-auto custom-scrollbar">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            Daily <span className="text-primary">Directives</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest max-w-md">
            Neural feedback loop engaged. Telemetry synced with Groq AI core.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-full font-bold px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              <Plus className="w-5 h-5 mr-2 stroke-[3px]" />
              NEW PROTOCOL
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase italic">
                Initialize <span className="text-primary text-3xl">/</span> Habit
              </DialogTitle>
            </DialogHeader>
            <form action={handleCreateHabit} className="space-y-6 py-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest ml-1">
                  Protocol Identifier
                </Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="e.g., QUANTUM_CODING_RUN" 
                  className="h-12 bg-muted/50 border-border focus:ring-primary/20 font-bold uppercase placeholder:opacity-30 tracking-tight"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-12 text-base font-black uppercase tracking-widest group">
                  Start Protocol
                  <Plus className="ml-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border/50 rounded-[32px] bg-muted/5 group hover:border-primary/20 transition-colors duration-500">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">No active protocols detected.</p>
          <p className="text-[10px] text-muted-foreground/50 uppercase mt-2 tracking-tighter">Waiting for user input...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
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