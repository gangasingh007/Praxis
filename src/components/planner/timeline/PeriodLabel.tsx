import { cn } from "@/lib/utils";

interface PeriodLabelProps {
  label: string;
  className?: string;
}

export function PeriodLabel({ label, className }: PeriodLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 pt-5 pb-2", className)}>
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/50">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/25" />
    </div>
  );
}