"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionLabel from "./shared/SectionalLabel";

const testimonials = [
  {
    quote:
      "Praxis didn't just improve my workflow — it rewired how I think about time. The clarity I have each morning is worth every cent.",
    author: "Sarah K.",
    role: "Founder, Nimbus Labs",
    rating: 5,
    accent: "from-chart-1/10",
    starFill: "fill-chart-1 text-chart-1",
  },
  {
    quote:
      "I've tried every productivity app. Praxis is the first one that actually respects my cognitive capacity instead of just adding noise.",
    author: "Marcus J.",
    role: "Principal Engineer, Apex Systems",
    rating: 5,
    accent: "from-primary/10",
    starFill: "fill-primary text-primary",
  },
  {
    quote:
      "The habit protocol alone changed how I approach consistency. 60 days in and I haven't missed a single priority block.",
    author: "Lena R.",
    role: "Creative Director",
    rating: 5,
    accent: "from-chart-2/10",
    starFill: "fill-chart-2 text-chart-2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 16 },
  },
};

export function TestimonialSection() {
  return (
    <section id="testimonials" className="relative scroll-mt-20">
      <div className="text-center mb-16 space-y-4">
        <SectionLabel
          label="Operator Reports"
          icon={<MessageSquare size={12} />}
        />
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
          From the field
        </h2>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.author}
            variants={itemVariants}
            className="group relative p-8 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col gap-5 cursor-pointer"
          >
            {/* Accent bg */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                t.accent
              )}
            />
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-4 flex-1">
              {/* Opening quote decoration */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 text-primary/15 group-hover:text-primary/25 transition-colors duration-300 -mb-1"
                aria-hidden="true"
              >
                <path
                  d="M10 8H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8Zm10 0h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8Z"
                  fill="currentColor"
                />
                <path
                  d="M10 14c0 2-1 4-4 5m14-5c0 2-1 4-4 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={t.starFill}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base leading-relaxed text-card-foreground flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-primary">
                    {t.author[0]}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {t.author}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}