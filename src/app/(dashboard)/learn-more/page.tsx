export default function LearnMorePage() {
  return (
    <div className="max-w-[80%] mx-auto px-6 py-12 md:py-24 text-foreground/90 leading-relaxed">
      <article className="space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight italic">
            The Praxis<span className="text-primary">.</span> <br />Methodology
          </h1>
          <p className="text-xl text-muted-foreground font-medium italic">
            A System for Cognitive Management and High-Velocity Output
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            01. Introduction
          </h2>
          <p>
            The fundamental problem with modern productivity is not a lack of effort, but a lack of direction. Most people operate in a state of reactive chaos—responding to notifications, shifting between unrelated tasks, and falling victim to the latest emergency.
          </p>
          <p>
            Praxis is built to solve this by treating your attention as your most precious resource. It is a system designed to eliminate decision fatigue by separating "Planning" from "Execution."
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            02. The Core Philosophy
          </h2>
          <p>
            At the heart of Praxis is the concept of <strong>Time Blocking</strong>. Unlike a traditional to-do list, which only tells you <em>what</em> to do, time blocking tells you <em>when</em> you will do it.
          </p>
          <p>
            By assigning every minute of your work day to a specific task, you remove the constant need to make choices. When you finish one task, you don&apos;t ask &quot;What next?&quot;—you simply look at the schedule and begin the next block. This preserves your cognitive energy for the work itself, rather than the management of the work.
          </p>
          <p>
            We also leverage <strong>Deep Work</strong>—the ability to focus without distraction on a cognitively demanding task. Our Focus terminal is designed to facilitate this state by providing a visual anchor for your current mission.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            03. The Daily Initialization Ritual
          </h2>
          <p>
            Your day begins in the <strong>Planner</strong>. This is your mission control. The ritual follows a three-step process:
          </p>
          <p>
            <strong>The Brain Dump:</strong> Empty your mind of every obligation, idea, and worry. Write them down as tasks. Do not filter; just externalize.
          </p>
          <p>
            <strong>Categorization:</strong> Group tasks by their nature. Are they Deep Work (high concentration), Admin (low energy/quick), or Recovery (rest)? Assign them to subjects to see where your effort is distributed.
          </p>
          <p>
            <strong>Strategic Scheduling:</strong> Drag these tasks onto your timeline. Be realistic. If a task takes two hours, give it two hours. Ensure you have buffers for breaks and transition periods.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            04. High-Velocity Execution
          </h2>
          <p>
            Once the plan is set, you move into <strong>Execution Mode</strong>. This is where the Focus Terminal becomes essential.
          </p>
          <p>
            We utilize an advanced Pomodoro protocol: 25 minutes of intense, single-task focus followed by a 5-minute break. This rhythm is not arbitrary; it aligns with the brain&apos;s natural ultradian rhythms, allowing you to sustain high output for hours without burning out.
          </p>
          <p>
            During a focus session, your only goal is the task at hand. If a new idea or distraction pops up, quickly note it down and immediately return to the session.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            05. The Habit Protocol
          </h2>
          <p>
            Work is episodic, but habits are continuous. While the planner handles your specific projects, the <strong>Habits</strong> section manages your character.
          </p>
          <p>
            Success is not the result of one-off heroics, but the compounding interest of daily actions. Whether it&apos;s meditation, reading, or exercise, tracking these behaviors ensures you are building the foundation required to sustain your high-velocity work life.
          </p>
          <p>
            We encourage the &quot;Never Miss Twice&quot; rule. Missing one day is a lapse; missing two is the start of a new habit. Perfection isn&apos;t the goal—engineered consistency is.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-2">
            06. Telemetry and Refinement
          </h2>
          <p>
            Finally, we use <strong>Insights</strong> to close the feedback loop. Without data, you are just guessing.
          </p>
          <p>
            The Insights dashboard tracks your actual performance against your plan. It highlights where you over-scheduled, where you underestimated task duration, and how much deep work you actually achieved.
          </p>
          <p>
            Every Sunday, review this telemetry. Use it to adjust your parameters for the coming week. Over time, your planning will become more accurate, and your focus more lethal.
          </p>
        </section>

        <footer className="pt-12 border-t border-border/40">
          <p className="text-sm font-mono text-muted-foreground italic uppercase tracking-widest">
            End of Protocol. Now, return to the work.
          </p>
        </footer>
      </article>
    </div>
  );
}
