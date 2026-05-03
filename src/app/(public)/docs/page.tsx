// src/app/docs/page.tsx
import { DocsLayout } from "@/components/docs/DocsLayout";
import { SECTIONS } from "@/components/docs/content/sections";

export const metadata = {
  title: "Praxis · Parameters",
  description:
    "A complete methodology for cognitive management. Scientifically-backed protocols to eliminate decision fatigue.",
};

export default function DocsPage() {
  return <DocsLayout sections={SECTIONS} />;
}