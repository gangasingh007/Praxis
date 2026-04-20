import { FocusChart } from "@/components/insights/FocusChart";
import { Flame, Clock, Target } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="max-w-6xl mx-auto p-8 h-full overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter mb-2">Performance Analytics</h1>
        <p className="text-zinc-400 font-mono">System telemetry and focus metrics.</p>
      </header>

      {/* Top Level Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Focus Time" value="36.7h" icon={Clock} trend="+12% from last week" />
        <StatCard title="Longest Streak" value="14 Days" icon={Flame} trend="Active on 'System Design'" />
        <StatCard title="Task Completion" value="89%" icon={Target} trend="24 tasks completed" />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FocusChart />
        </div>
        
        {/* Placeholder for a breakdown chart (e.g., Donut chart of subjects) */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl flex flex-col items-center justify-center min-h-[350px]">
           <h3 className="text-lg font-bold tracking-tight text-zinc-100 mb-2">Subject Distribution</h3>
           <p className="text-sm font-mono text-zinc-500 text-center">
             (Subject Donut Chart UI Here)
           </p>
        </div>
      </div>
    </div>
  );
}

// Simple reusable internal component for the stat cards
function StatCard({ title, value, icon: Icon, trend }: any) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-md relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-32 h-32" />
      </div>
      <div className="flex items-center gap-3 mb-4 text-zinc-400 font-mono text-sm uppercase">
        <Icon className="w-4 h-4" />
        {title}
      </div>
      <div className="text-4xl font-black tracking-tighter mb-2 text-white">{value}</div>
      <div className="text-xs text-zinc-500 font-mono">{trend}</div>
    </div>
  );
}