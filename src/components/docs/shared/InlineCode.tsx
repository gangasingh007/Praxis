// src/components/docs/shared/InlineCode.tsx
import { cn } from "@/lib/utils";

interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "font-mono text-[0.875em] font-semibold",
        "text-foreground bg-primary/10 px-1.5 py-0.5",
        "rounded border border-primary/20",
        className
      )}
    >
      {children}
    </code>
  );
}