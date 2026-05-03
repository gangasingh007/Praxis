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
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-primary/10 border border-primary/20 text-primary",
        "text-xs font-mono font-bold uppercase tracking-widest",
        "shadow-[0_0_20px_hsl(var(--primary)/0.15)]",
        className
      )}
    >
      {icon ?? <Terminal size={12} />}
      {label}
    </div>
  );
}