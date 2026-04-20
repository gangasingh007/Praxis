"use client";

import { useTheme } from "next-themes";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data reflecting heavy study/dev sessions
const data = [
  { day: "Mon", focusHours: 4.5, subject: "Algorithms" },
  { day: "Tue", focusHours: 6.0, subject: "OS & DBMS" },
  { day: "Wed", focusHours: 3.5, subject: "Next.js Build" },
  { day: "Thu", focusHours: 7.2, subject: "System Design" },
  { day: "Fri", focusHours: 5.0, subject: "Algorithms" },
  { day: "Sat", focusHours: 8.5, subject: "Mock Exams" },
  { day: "Sun", focusHours: 2.0, subject: "Rest & Review" },
];

export function FocusChart() {
  const { theme } = useTheme();
  
  // High-contrast neon/zinc color palette
  const strokeColor = theme === "dark" ? "#e4e4e7" : "#18181b"; // zinc-200 / zinc-900

  return (
    <div className="w-full h-[350px] p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-lg font-bold tracking-tight text-zinc-100">Focus Trends</h3>
        <p className="text-sm font-mono text-zinc-500">Weekly deep work analysis</p>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="day" 
            stroke="#52525b" // zinc-600
            fontSize={12}
            tickLine={false}
            axisLine={false}
            fontFamily="var(--font-mono)"
          />
          <YAxis 
            stroke="#52525b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            fontFamily="var(--font-mono)"
          />
          
          {/* Custom Tooltip for the Luxury Feel */}
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-2xl">
                    <p className="text-zinc-400 font-mono text-xs uppercase mb-1">
                      {payload[0].payload.subject}
                    </p>
                    <p className="text-white font-bold text-xl">
                      {payload[0].value} <span className="text-sm text-zinc-500">hours</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="focusHours" 
            stroke={strokeColor} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorFocus)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}