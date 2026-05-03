// src/components/docs/shared/DocBlockquote.tsx
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocBlockquoteProps {
  quote: string;
  author?: string;
  variant?: "default" | "accent";
  className?: string;
}

export function DocBlockquote({
  quote,
  author,
  variant = "default",
  className,
}: DocBlockquoteProps) {
  const isAccent = variant === "accent";

  return (
    <blockquote
      className={cn(
        // Base
        "relative my-8 rounded-r-xl text-base italic leading-relaxed",
        "transition-all duration-300",
        // Padding
        "pl-6 py-4 pr-5",
        // Accent variant
        isAccent && [
          "border-l-2 border-primary",
          "text-foreground",
          "bg-gradient-to-r from-primary/[0.06] to-transparent",
          "shadow-[inset_3px_0_0_hsl(var(--primary)/0.5)]",
        ],
        // Default variant
        !isAccent && [
          "border-l-2 border-border/60",
          "text-muted-foreground",
          "bg-gradient-to-r from-muted/30 to-transparent",
        ],
        className
      )}
    >
      {/* Decorative quote icon — accent only */}
      {isAccent && (
        <Quote
          className="absolute -left-3 -top-2.5 w-5 h-5 text-primary/40 fill-primary/15"
          aria-hidden="true"
        />
      )}

      {/* Quote text */}
      <p className="leading-relaxed">{quote}</p>

      {/* Author attribution */}
      {author && (
        <footer
          className={cn(
            "mt-3 text-xs font-mono not-italic uppercase tracking-widest",
            "flex items-center gap-2",
            isAccent ? "text-primary/70" : "text-muted-foreground/60"
          )}
        >
          {/* Em dash accent */}
          <span
            className={cn(
              "inline-block w-4 h-px",
              isAccent ? "bg-primary/50" : "bg-border"
            )}
            aria-hidden="true"
          />
          {author}
        </footer>
      )}
    </blockquote>
  );
}