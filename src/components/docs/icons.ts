// src/components/docs/icons.ts
import { Calendar, Target, Timer, BarChart2, CheckCircle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Calendar,
  Timer,
  CheckCircle,
  BarChart2,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Target; // fallback to Target
}