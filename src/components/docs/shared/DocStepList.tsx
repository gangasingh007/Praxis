// src/components/docs/shared/DocStepList.tsx
interface Step {
  index: string;
  title: string;
  description: string;
}

interface DocStepListProps {
  steps: Step[];
}

export function DocStepList({ steps }: DocStepListProps) {
  return (
    <div className="grid gap-2.5 my-6">
      {steps.map((step) => (
        <div
          key={step.index}
          className="group/step flex gap-4 p-4 rounded-xl bg-background/60 border border-border/50 items-start hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300"
        >
          <span className="text-primary font-mono font-bold text-sm shrink-0 pt-0.5">
            {step.index}_
          </span>
          <div className="min-w-0">
            <span className="text-foreground font-bold text-sm">
              {step.title}:{" "}
            </span>
            <span className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}