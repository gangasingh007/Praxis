// src/components/docs/shared/DocCallout.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DocCalloutProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function DocCallout({
  icon: Icon,
  label,
  children,
  className,
}: DocCalloutProps) {
  return (
    <div
      className={cn(
        "my-6 p-5 rounded-xl bg-card border border-border/60 space-y-2.5",
        className
      )}
    >
      <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase font-bold tracking-widest">
        <Icon size={13} />
        {label}
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}