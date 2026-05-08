"use client";

import { useState, useEffect } from "react";
import {  
  Plus, 
  Trash2, 
  Type, 
  AlignLeft, 
  Layers,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete?: (id: string) => void;
  task?: any;
  subjects?: any[];
}

export function TaskModal({ isOpen, onClose, onSave, onDelete, task, subjects = [] }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState<string>("none");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setSubjectId(task.subjectId || "none");
      setPriority(task.priority || "MEDIUM");
    } else {
      setTitle("");
      setDescription("");
      setSubjectId("none");
      setPriority("MEDIUM");
    }
  }, [task, isOpen]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ 
      title, 
      description, 
      subjectId: subjectId === "none" ? null : subjectId, 
      priority 
    });
  };

  const priorityConfig = {
    LOW: { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", icon: CheckCircle2 },
    MEDIUM: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: TrendingUp },
    HIGH: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", icon: AlertCircle },
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-background/95 backdrop-blur-xl">
        <DialogHeader className="px-6 py-5 border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl bg-primary/10 text-primary",
                task ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"
              )}>
                {task ? <Type size={18} /> : <Plus size={18} />}
              </div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                {task ? "Edit Task" : "Create New Task"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2.5">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Task Name
            </Label>
            <div className="relative">
              <Type className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Input
                id="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="pl-10 h-12 bg-muted/50 border-transparent focus-visible:border-primary/50 focus-visible:ring-primary/20 rounded-2xl transition-all text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Subject Select */}
            <div className="space-y-2.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Subject
              </Label>
              <Select value={subjectId} onValueChange={setSubjectId}>
                <SelectTrigger className="w-full h-11 bg-muted/50 border-transparent focus:ring-primary/20 rounded-xl px-4">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Select a subject" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-xl">
                  <SelectItem value="none" className="rounded-xl">No Subject</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id} className="rounded-xl">
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Selector */}
            <div className="space-y-2.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Priority
              </Label>
              <div className="flex p-1 bg-muted/50 rounded-xl border border-transparent">
                {["LOW", "MEDIUM", "HIGH"].map((p) => {
                  const Icon = priorityConfig[p as keyof typeof priorityConfig].icon;
                  const isActive = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200",
                        isActive 
                          ? p === "HIGH" 
                            ? "bg-destructive text-destructive-foreground shadow-sm scale-[1.02]" 
                            : p === "MEDIUM" 
                              ? "bg-amber-500 text-white shadow-sm scale-[1.02]" 
                              : "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      )}
                    >
                      <Icon size={12} />
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-2.5">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Description
            </Label>
            <div className="relative">
              <AlignLeft className="absolute left-3 top-3 size-4 text-muted-foreground" />
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details about this task..."
                className="pl-10 min-h-24 bg-muted/50 border-transparent focus-visible:border-primary/50 focus-visible:ring-primary/20 rounded-2xl transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-5 border-t border-border/50 bg-muted/30 flex sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            {task && onDelete && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-10 rounded-xl px-4 gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border-none transition-all"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Delete Task</span>
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-10 rounded-xl px-6 font-medium text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!title.trim()}
              className="h-10 rounded-xl px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

