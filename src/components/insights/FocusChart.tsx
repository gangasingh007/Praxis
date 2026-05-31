"use client";

import { useTheme } from "next-themes";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface FocusChartProps {
  data: {
    day: string;
    focusHours: number;
    plannedHours: number;
    subject: string;
  }[];
}

export function FocusChart({ data }: FocusChartProps) {
  const { theme } = useTheme();
  
  const focusColor = "var(--primary)";
  const plannedColor = "var(--muted-foreground)";
  const gridColor = "var(--border)";

  return (
    <div className="w-full h-[400px] p-6 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-xl font-black tracking-tight">Focus Trends</h3>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Weekly deep work analysis</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
            <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/30 border border-muted-foreground/50" />
            <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest">Planned</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={focusColor} stopOpacity={0.15}/>
                <stop offset="95%" stopColor={focusColor} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={plannedColor} stopOpacity={0.05}/>
                <stop offset="95%" stopColor={plannedColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} opacity={0.5} />
            
            <XAxis 
              dataKey="day" 
              stroke="var(--muted-foreground)" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="var(--font-mono)"
              dy={10}
            />
            <YAxis 
              stroke="var(--muted-foreground)" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
              fontFamily="var(--font-mono)"
            />
            
            <Tooltip 
              cursor={{ stroke: gridColor, strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border text-popover-foreground p-4 rounded-2xl shadow-xl backdrop-blur-md space-y-3 min-w-[140px]">
                      <p className="text-muted-foreground font-mono text-[10px] font-bold uppercase tracking-widest border-b pb-2 mb-1">
                        {payload[0].payload.subject}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Actual</span>
                          <span className="text-lg font-black leading-none text-primary">
                            {payload[0].value}h
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Planned</span>
                          <span className="text-sm font-bold leading-none opacity-60">
                            {payload[1]?.value}h
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            <Area 
              type="monotone" 
              dataKey="focusHours" 
              stroke={focusColor} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorFocus)" 
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="plannedHours" 
              stroke={plannedColor} 
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorPlanned)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}