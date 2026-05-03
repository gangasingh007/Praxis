// src/app/page.tsx
import {
  LandingNav,
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialSection,
  CtaSection,
  LandingFooter,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 antialiased">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-32 pb-24">
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