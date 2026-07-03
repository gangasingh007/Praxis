// src/app/page.tsx
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialSection,
  CtaSection,
  LandingFooter,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 antialiased overflow-x-hidden">
      {/* Subtle Dot Grid Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.025] dark:opacity-[0.04]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.10] dark:opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-36 pb-32 relative">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialSection />
        <CtaSection />
      </main>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LandingFooter />
      </div>
    </div>
  );
}