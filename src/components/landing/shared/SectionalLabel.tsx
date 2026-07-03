// src/components/landing/shared/SectionLabel.tsx
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

interface SectionLabelProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ label, icon, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
        "bg-primary/10 border border-primary/20 text-primary",
        "ring-1 ring-inset ring-primary/10",
        "text-[11px] font-mono font-bold uppercase tracking-widest",
        "shadow-md shadow-primary/15",
        className
      )}
    >
      {icon ?? <Terminal size={12} />}
      <span className="text-primary/40 text-[9px] select-none" aria-hidden>·</span>
      {label}
    </div>
  );
}