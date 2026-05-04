"use client";

import { User } from "lucide-react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface ProfileFormProps {
  initialName: string;
  email: string;
}

export function ProfileForm({ initialName, email }: ProfileFormProps) {
  async function handleSubmit(formData: FormData) {
    const result = await updateProfileAction(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Identity synchronized successfully!");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 border border-border/40 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 mb-8">
        Identity Configuration
      </h3>
      
      <form action={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <User size={12} className="text-primary" /> Full Operator Name
          </Label>
          <Input
            name="name"
            defaultValue={initialName}
            className="h-12 bg-background/50 border-border/50 rounded-xl px-4 font-mono text-sm focus-visible:ring-primary/30 transition-all placeholder:text-muted-foreground/30"
            placeholder="Identify yourself..."
          />
        </div>

        <div className="space-y-3">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 flex items-center gap-2">
            <User size={12} className="text-muted-foreground/20" /> Communication Channel (Email)
          </Label>
          <div className="relative">
            <Input
              disabled
              value={email}
              className="h-12 bg-muted/20 border-border/30 rounded-xl px-4 font-mono text-sm cursor-not-allowed opacity-50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40 bg-muted/30 px-2 py-1 rounded-md border border-border/20">
                LOCKED
              </span>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/40 font-mono uppercase tracking-widest">
            Email modifications require administrative override protocol.
          </p>
        </div>

        <div className="pt-6 border-t border-border/40">
          <SubmitButton />
        </div>
      </form>
    </motion.div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-primary text-background font-black uppercase italic tracking-tighter rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 relative overflow-hidden group"
    >
      <span className={pending ? "opacity-0" : "relative z-10"}>
        Synchronize Identity
      </span>
      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
    </Button>
  );
}
