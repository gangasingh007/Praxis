import { FocusTimer } from "@/components/pomodoro/FocusTimer";

export const metadata = {
  title: "Focus | Praxis",
};

export default function FocusPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Deep Work Protocol</h1>
        <p className="text-zinc-500 font-mono text-sm">Eliminate distractions. Execute.</p>
      </div>
      
      <FocusTimer />
    </div>
  );
}