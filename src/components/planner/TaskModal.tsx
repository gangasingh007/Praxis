"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
  const [subjectId, setSubjectId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setSubjectId(task.subjectId || "");
      setPriority(task.priority || "MEDIUM");
    } else {
      setTitle("");
      setDescription("");
      setSubjectId("");
      setPriority("MEDIUM");
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold tracking-tight text-card-foreground">
            {task ? "Edit Task" : "New Task"}
          </h2>
          <button onClick={onClose} className="p-2 border border-input hover:bg-accent/10 cursor-pointer hover:border-border  rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />{}
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
              <select
                title={``}
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none text-foreground"
              >
                <option value="">No Subject</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Priority</label>
              <div className="flex p-1 bg-background border border-input rounded-xl">
                {["LOW", "MEDIUM", "HIGH"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                      priority === p 
                        ? p === "HIGH" ? "bg-destructive text-destructive-foreground" : p === "MEDIUM" ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              rows={3}
              className="w-full bg-background border border-input rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none text-foreground"
            />
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/50 flex items-center justify-between gap-3">
          {task && onDelete ? (
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 text-sm font-medium border border-destructive/40 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
            >
              Delete
            </button>
          ) : (
            <div />
          )}
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-input rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({ 
                title, 
                description, 
                subjectId: subjectId === "" ? null : subjectId, 
                priority 
              })}
              disabled={!title.trim()}
              className="px-6 py-2 text-sm font-bold bg-primary text-background hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
