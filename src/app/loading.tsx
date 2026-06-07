import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative">
        
        <div className="relative flex flex-col items-center gap-6">
        
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
            </div>
            
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary/80 ml-[0.4em]">
              Synchronizing
            </h2>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <span className="text-[8px] font-mono text-muted-foreground/30 uppercase tracking-[0.5em]">
          Praxis OS v2.4.0 // Telemetry Active
        </span>
      </div>
    </div>
  );
}
