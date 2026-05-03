// src/components/docs/shared/DocBlockquote.tsx
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocBlockquoteProps {
  quote: string;
  author?: string;
  variant?: "default" | "accent";
}

export function DocBlockquote({
  quote,
  author,
  variant = "default",
}: DocBlockquoteProps) {
  const isAccent = variant === "accent";

  return (
    <blockquote
      className={cn(
        "relative my-8 pl-6 py-4 pr-4 rounded-r-xl text-base italic leading-relaxed",
        isAccent
          ? [
              "border-l-2 border-primary text-foreground",
              "bg-primary/5",
              "shadow-[inset_3px_0_0_hsl(var(--primary)/0.6)]",
            ]
          : ["border-l-2 border-border/60 text-muted-foreground"]
      )}
    >
      {isAccent && (
        <Quote className="absolute -left-3 -top-3 w-5 h-5 text-primary/50 fill-primary/15" />
      )}
      <p>{quote}</p>
      {author && (
        <footer
          className={cn(
            "mt-2 text-xs font-mono not-italic uppercase tracking-widest",
            isAccent ? "text-primary/70" : "text-muted-foreground/70"
          )}
        >
          — {author}
        </footer>
      )}
    </blockquote>
  );
}