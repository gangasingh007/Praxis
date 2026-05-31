import { FocusChart } from "@/components/insights/FocusChart";
import { SubjectDistribution } from "@/components/insights/SubjectDistribution";
import { Flame, Clock, Target, TrendingUp } from "lucide-react";
import { getInsightsData } from "@/actions/insights-actions";
import { cn } from "@/lib/utils";

export default async function InsightsPage() {
  const data = await getInsightsData();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground font-mono text-sm tracking-tight">
          System telemetry and focus metrics.
        </p>
      </header>

      {/* Top Level Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <StatCard 
          title="Total Focus" 
          value={data.totalFocusTime} 
          icon={Clock} 
          trend="Cumulative deep work" 
          className="bg-primary/5 border-primary/20"
          iconColor="text-primary"
        />
        <StatCard 
          title="Focus Streak" 
          value={data.currentStreak} 
          icon={Flame} 
          trend={`Longest: ${data.longestStreak}`}
          className="bg-orange-500/5 border-orange-500/20"
          iconColor="text-orange-500"
        />
        <StatCard 
          title="Task Rate" 
          value={data.taskCompletion} 
          icon={Target} 
          trend={`${data.completedTasksCount} tasks finished`}
          className="bg-blue-500/5 border-blue-500/20"
          iconColor="text-blue-500"
        />
        <StatCard 
          title="Efficiency" 
          value="High" 
          icon={TrendingUp} 
          trend="Optimized throughput"
          className="bg-emerald-500/5 border-emerald-500/20"
          iconColor="text-emerald-500"
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        <div className="lg:col-span-2">
          <FocusChart data={data.chartData} />
        </div>
        
        <div>
          <SubjectDistribution data={data.subjectDistribution} />
        </div>
      </div>
    </div>
  );
}

// Reusable internal component for the stat cards
function StatCard({ title, value, icon: Icon, trend, className, iconColor }: any) {
  return (
    <div className={cn(
      "p-5 md:p-6 rounded-3xl border bg-card text-card-foreground shadow-sm relative overflow-hidden group transition-all hover:shadow-md hover:-translate-y-1",
      className
    )}>
      <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
        <Icon className="w-32 h-32" />
      </div>
      
      <div className="flex items-center gap-3 mb-4 text-muted-foreground font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold">
        <div className={cn("p-2 rounded-xl bg-background border shadow-inner", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
        {title}
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl md:text-4xl font-black tracking-tighter">{value}</div>
        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider font-medium">{trend}</div>
      </div>
    </div>
  );
}