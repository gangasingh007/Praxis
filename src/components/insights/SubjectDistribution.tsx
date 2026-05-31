"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SubjectDistributionProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function SubjectDistribution({ data }: SubjectDistributionProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] p-6 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-black tracking-tight mb-2">Subject Distribution</h3>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest leading-relaxed">
          No completed tasks<br/>to analyze distribution
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] p-6 rounded-3xl border bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-black tracking-tight">Subject Distribution</h3>
        <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Allocation across domains</p>
      </div>

      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border text-popover-foreground p-3 rounded-xl shadow-xl backdrop-blur-md">
                      <p className="text-xs font-bold font-mono uppercase tracking-widest mb-1">
                        {payload[0].name}
                      </p>
                      <p className="text-lg font-black leading-none">
                        {payload[0].value} <span className="text-[10px] text-muted-foreground">min</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-[0.2em]">Total</span>
          <span className="text-2xl font-black tracking-tighter">
            {data.reduce((acc, curr) => acc + curr.value, 0)}m
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 max-h-[100px] overflow-y-auto custom-scrollbar pr-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 group cursor-default">
            <div 
              className="w-2.5 h-2.5 rounded-full shadow-sm transition-transform group-hover:scale-125" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] font-bold font-mono text-muted-foreground uppercase tracking-widest truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
