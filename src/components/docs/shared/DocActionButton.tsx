// src/components/docs/shared/DocActionButton.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface DocActionButtonProps {
  href: string;
  label: string;
}

export function DocActionButton({ href, label }: DocActionButtonProps) {
  return (
    <div className="pt-3">
      <Link href={href}>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 font-mono text-xs uppercase tracking-widest font-bold
            border-border/60 hover:border-primary/50 hover:bg-primary/5
            hover:text-primary transition-all duration-200 group/btn"
        >
          {label}
          <ArrowRight
            size={13}
            className="group-hover/btn:translate-x-0.5 transition-transform duration-200"
          />
        </Button>
      </Link>
    </div>
  );
}