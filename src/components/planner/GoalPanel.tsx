import { cn } from "@/lib/utils";
import { AnimatePresence ,motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function GoalPanel({
  type,
  title,
  icon: Icon,
  color,
  items,
  inputValue,
  onInputChange,
  onSubmit,
  onDelete,
  placeholder,
  emptyText,
}: {
  type: string;
  title: string;
  icon: any;
  color: "blue" | "amber";
  items: any[];
  inputValue: string;
  onInputChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: (id: string) => void;
  placeholder: string;
  emptyText: string;
}) {
  const [isAdding, setIsAdding] = useState(false);

  const colorMap = {
    blue: {
      dot: "bg-blue-400",
      icon: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      input: "border-blue-500/30 bg-blue-500/5",
      ring: "focus-visible:ring-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/25",
      hover: "hover:border-blue-500/30",
    },
    amber: {
      dot: "bg-amber-400",
      icon: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      input: "border-amber-500/30 bg-amber-500/5",
      ring: "focus-visible:ring-amber-500/30",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      hover: "hover:border-amber-500/30",
    },
  };

  const c = colorMap[color];

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card/30 backdrop-blur-sm overflow-hidden transition-colors",
        c.border,
        c.hover
      )}
    >
      {/* panel header */}
      <div className="px-5 py-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center",
              c.bg
            )}
          >
            <Icon size={13} className={c.icon} />
          </div>
          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-muted-foreground">
            {title}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-md border text-[9px] font-mono font-bold uppercase",
              c.badge
            )}
          >
            {items.length}
          </span>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className={cn(
                "p-1 rounded-md transition-colors",
                c.bg,
                "hover:opacity-80"
              )}
            >{}
              <Plus size={12} className={c.icon} />
            </button>
          )}
        </div>
      </div>

      {/* panel body */}
      <div className="p-4 space-y-2">
        {/* add form */}
        <AnimatePresence>
          {isAdding && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={(e) => {
                onSubmit(e);
                setIsAdding(false);
              }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 pb-2">
                <Input
                  autoFocus
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={placeholder}
                  className={cn(
                    "rounded-xl font-mono text-sm placeholder:text-muted-foreground/25",
                    c.input,
                    c.ring
                  )}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsAdding(false);
                      onInputChange("");
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="secondary"
                  className="rounded-xl shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* items */}
        <AnimatePresence mode="popLayout">
          {items.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12, scale: 0.95 }}
              transition={{ delay: i * 0.02 }}
              className="group flex items-center gap-3 p-3 rounded-xl bg-background/40 border border-border/30 hover:border-border/60 transition-all"
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  c.dot
                )}
              />
              <span className="flex-1 text-sm font-medium truncate text-foreground/80">
                {item.goal}
              </span>
              <button
                onClick={() => onDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground/30 transition-all"
              >{}
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* empty state */}
        {items.length === 0 && !isAdding && (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                c.bg
              )}
            >
              <Icon size={16} className={cn(c.icon, "opacity-40")} />
            </div>
            <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
              {emptyText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}