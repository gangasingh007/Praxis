"use client";

import { 
  X, 
  Edit2, 
  Trash2, 
  Type, 
  AlignLeft, 
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Clock,
  Calendar,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRIORITY_LABEL_MAP, PRIORITY_COLOR_MAP } from "@/types";
import type { Task } from "@/types";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete?: (id: string) => void;
  task: Task | null;
}

export function TaskDetailModal({ 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete, 
  task 
}: TaskDetailModalProps) {
  if (!task) return null;

  const priorityConfig = {
    low: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", icon: CheckCircle2 },
    medium: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: TrendingUp },
    high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", icon: AlertCircle },
    urgent: { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: Zap },
  };

  const priorityKey = (task.priority?.toLowerCase() || "medium") as keyof typeof priorityConfig;
  const config = priorityConfig[priorityKey] || priorityConfig.medium;
  const Icon = config.icon;

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: any) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-background/95 backdrop-blur-xl">
        <DialogHeader className="px-6 py-6 border-b border-border/50 bg-muted/30 relative">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-2xl shadow-sm",
              config.bg,
              config.color
            )}>
              <Icon size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border",
                  config.bg,
                  config.color,
                  config.border
                )}>
                  {PRIORITY_LABEL_MAP[priorityKey] || priorityKey}
                </span>
                {task.subject && (
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-muted/50 text-muted-foreground border-border/50 flex items-center gap-1.5"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: task.subject.colorCode }} 
                    />
                    {task.subject.name}
                  </span>
                )}
              </div>
              <DialogTitle className="text-2xl font-bold tracking-tight text-foreground truncate">
                {task.title}
              </DialogTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full h-8 w-8 text-muted-foreground hover:bg-muted"
          >
            <X size={18} />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Status & Time Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
              <div className="p-2 rounded-xl bg-background shadow-sm text-muted-foreground">
                <Calendar size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="text-sm font-semibold truncate">{formatDate(task.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/40">
              <div className="p-2 rounded-xl bg-background shadow-sm text-muted-foreground">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Duration</p>
                <p className="text-sm font-semibold">
                  {task.startTime ? (
                    <>{formatTime(task.startTime)} - {formatTime(task.endTime)}</>
                  ) : (
                    <>{task.durationMinutes || 0} mins</>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlignLeft size={16} />
                <h4 className="text-xs font-bold uppercase tracking-[0.15em]">Description</h4>
              </div>
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/30 text-foreground/80 leading-relaxed text-sm whitespace-pre-wrap">
                {task.description}
              </div>
            </div>
          )}

          {!task.description && (
            <div className="flex flex-col items-center justify-center py-8 px-4 rounded-2xl border border-dashed border-border/50 bg-muted/5 opacity-60">
              <AlignLeft className="size-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs font-medium text-muted-foreground">No description provided</p>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-6 border-t border-border/50 bg-muted/30 flex sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-11 rounded-xl px-5 gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border-none transition-all font-bold"
              >
                <Trash2 size={18} />
                <span>Delete</span>
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-11 rounded-xl px-6 font-medium text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => onEdit(task)}
              className="h-11 rounded-xl px-8 gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
            >
              <Edit2 size={18} />
              Edit Task
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
