// src/components/docs/DocsFooter.tsx
import { Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DocsFooter() {
  return (
    <footer className="mt-8 pt-10 border-t border-border/30">
      {/* CTA block */}
      <div className="mb-12 p-8 rounded-2xl bg-card border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary">
            Protocol Complete
          </p>
          <p className="font-black text-xl uppercase tracking-tight">
            Ready to initialize?
          </p>
          <p className="text-sm text-muted-foreground max-w-xs">
            You have the parameters. Begin executing the Praxis system today.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href="/planner">
            <Button
              className="gap-2 font-mono text-xs uppercase tracking-widest font-bold
                shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.35)]
                hover:scale-[1.03] transition-all duration-200"
            >
              Begin Mission
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom meta */}
      <p className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.4em] flex items-center gap-3">
        <Terminal size={12} className="text-primary/40" />
        End of Protocol
        <span className="text-primary/40">///</span>
        Master Your Time
      </p>
    </footer>
  );
}