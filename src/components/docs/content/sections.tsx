// src/components/docs/content/sections.tsx
import { BarChart2 } from "lucide-react";
import { DocBlockquote } from "../shared/DocBlockQuote";
import { DocStepList } from "../shared/DocStepList";
import { DocCallout } from "../shared/DocCallout";
import { DocActionButton } from "../shared/DocActionButton";
import { InlineCode } from "../shared/InlineCode";

export interface DocSection {
  id: string;
  title: string;
  icon: string;
  phase: string;
  summary: string;
  content: React.ReactNode;
}

export const SECTIONS: DocSection[] = [
  {
    id: "philosophy",
    title: "Core Philosophy",
    icon: "Target",
    phase: "00",
    summary: "The foundational principle behind Praxis.",
    content: (
      <div className="space-y-5 text-base leading-relaxed">
        <p>
          The fundamental flaw in standard productivity systems is that they
          treat all time as equal. Praxis is built on the principle of{" "}
          <InlineCode>Time_Blocking</InlineCode> — assigning every hour an
          explicit purpose before the day begins.
        </p>

        <DocBlockquote
          variant="accent"
          quote="A 40-hour time-blocked work week, I estimate, produces the same amount of output as a 60+ hour work week pursued without structure."
          author="Cal Newport — Deep Work"
        />

        <p>
          By deciding <em>what</em> you will do and <em>when</em> you will do
          it before the day begins, you remove the constant need to make choices
          throughout the day — preserving your cognitive energy for actual
          execution.
        </p>
      </div>
    ),
  },
  {
    id: "initialization",
    title: "Daily Initialization",
    icon: "Calendar",
    phase: "01",
    summary: "How to structure your day using the Planner.",
    content: (
      <div className="space-y-5 text-base leading-relaxed">
        <p>
          Your day must start in the <strong>Planner</strong>. This is where
          you map out mission parameters and assign specific hours to specific
          tasks — before a single distraction can reach you.
        </p>

        <DocStepList
          steps={[
            {
              index: "01",
              title: "Brain Dump",
              description:
                "Clear your working memory. List every task, obligation, and intention that needs to be addressed.",
            },
            {
              index: "02",
              title: "Categorize",
              description:
                "Assign color codes to visually distinguish Deep Work, Administrative, and Recovery blocks.",
            },
            {
              index: "03",
              title: "Time Block",
              description:
                "Drag tasks into the timeline. Enforce strict start/end boundaries and leave no gap unaccounted for.",
            },
          ]}
        />

        <DocBlockquote
          variant="default"
          quote="If you give yourself 30 days to clean your house, it will take 30 days. If you give yourself 3 hours, it will take 3 hours."
          author="Parkinson's Law"
        />

        <DocActionButton href="/planner" label="Open Planner" />
      </div>
    ),
  },
  {
    id: "execution",
    title: "Deep Focus Execution",
    icon: "Timer",
    phase: "02",
    summary: "Execute using the integrated Pomodoro focus terminal.",
    content: (
      <div className="space-y-5 text-base leading-relaxed">
        <p>
          Once your schedule is set, execute the plan using the{" "}
          <strong>Focus</strong> terminal. Praxis integrates the Pomodoro
          technique — 25 minutes of absolute, undivided focus followed by a
          5-minute recovery interval.
        </p>

        <DocCallout icon={BarChart2} label="Scientific Telemetry">
          <p>
            Empirical data demonstrates that structured Pomodoro intervals lead
            to approximately{" "}
            <strong className="text-foreground">
              20% lower cognitive fatigue
            </strong>
            , improved intrinsic motivation, and higher sustained task
            performance compared to self-paced, unstructured break schedules.
          </p>
        </DocCallout>

        <p>
          Furthermore, the timer lowers the barrier to entry. When you commit
          to just 25 minutes, daunting projects feel achievable — effectively
          bypassing the psychological triggers of chronic procrastination.
        </p>

        <DocActionButton href="/focus" label="Initialize Focus Mode" />
      </div>
    ),
  },
  {
    id: "consistency",
    title: "The Habit Protocol",
    icon: "CheckCircle",
    phase: "03",
    summary: "Build compounding consistency through tracked behaviors.",
    content: (
      <div className="space-y-5 text-base leading-relaxed">
        <p>
          Success is the sum of small, repeated actions. The{" "}
          <strong>Habits</strong> section tracks high-impact behaviors that
          don&apos;t fit into a single time block but are essential for
          compounding growth.
        </p>

        <DocBlockquote
          variant="accent"
          quote="A year from now you will wish you had started today."
          author="Karen Lamb"
        />

        <p>
          Aim for <InlineCode>Never_Miss_Twice</InlineCode>. Praxis uses
          adaptive AI to monitor your telemetry and deliver dynamic,
          contextual reinforcement when you complete a habit streak. Perfection
          is not the protocol — engineered consistency is.
        </p>

        <DocActionButton href="/habits" label="Track Habits" />
      </div>
    ),
  },
  {
    id: "refinement",
    title: "Performance Refinement",
    icon: "BarChart2",
    phase: "04",
    summary: "Review your telemetry and eliminate performance leaks.",
    content: (
      <div className="space-y-5 text-base leading-relaxed">
        <p>
          &ldquo;Until we can manage time, we can manage nothing else.&rdquo;
          At the end of each week, open the <strong>Insights</strong> dashboard
          to audit your performance telemetry.
        </p>

        <p>
          Analyze where your time actually went versus where you planned for it
          to go. Identify{" "}
          <InlineCode>performance_leaks</InlineCode> — such as spending 4 hours
          on low-leverage email instead of your allocated 1 — and recalibrate
          the following week&apos;s parameters for optimized throughput.
        </p>

        <DocCallout icon={BarChart2} label="Weekly Review Protocol">
          <ul className="space-y-1.5 list-none">
            {[
              "Compare planned vs actual time allocation per category",
              "Identify your top 3 performance leaks from the past week",
              "Adjust next week's time blocks based on observed drift",
              "Set a single compounding priority for the week ahead",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-start">
                <span className="text-primary mt-0.5 shrink-0">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </DocCallout>

        <DocActionButton href="/insights" label="View Telemetry" />
      </div>
    ),
  },
];