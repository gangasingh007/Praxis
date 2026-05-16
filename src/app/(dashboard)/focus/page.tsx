import { FocusTimer } from "@/components/pomodoro/FocusTimer";

export const metadata = {
  title: "Focus | Praxis",
};

export default function FocusPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 md:p-8">
      {/* <div className="mb-8 md:mb-12 text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Stay in the <span className="text-primary italic">Flow</span>
        </h1>
      </div> */}
      
      <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-300">
        <FocusTimer />
      </div>
    </div>
  );
}