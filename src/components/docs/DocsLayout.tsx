// src/components/docs/DocsLayout.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { DocsSidebar } from "./DocSidebar";
import { DocsHeader } from "./DocHeader";
import { DocsSectionRenderer } from "./DocsSectionRenderer";
import { DocsFooter } from "./DocFooter";
import { DocSection } from "./content/sections";
import { DocsMobileNav } from "./DocsMobileNav";

interface DocsLayoutProps {
  sections: DocSection[];
}

export function DocsLayout({ sections }: DocsLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({
      top: element.offsetTop - 112,
      behavior: "smooth",
    });
  }, []);

  // IntersectionObserver — isolated in layout so children stay pure
  useEffect(() => {
    const sectionEls = document.querySelectorAll(".doc-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => sectionEls.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-24 selection:bg-primary/20"
    >
      {/* Mobile sticky nav */}
      <DocsMobileNav
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <div className="flex gap-10 lg:gap-16 items-start">
        {/* Sidebar */}
        <DocsSidebar
          sections={sections}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        {/* Main content column */}
        <main className="flex-1 min-w-0 space-y-16">
          <DocsHeader />
          <DocsSectionRenderer
            sections={sections}
            activeSection={activeSection}
          />
          <DocsFooter />
        </main>
      </div>
    </div>
  );
}