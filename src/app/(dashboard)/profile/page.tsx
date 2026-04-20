import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { User, Mail, Calendar, ShieldCheck } from "lucide-react";
import { updateProfileAction } from "@/actions/auth-actions";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          tasks: true,
          habits: true,
          pomodoroSessions: true,
        },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-end justify-between border-b border-zinc-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">User Profile</h1>
          <p className="text-zinc-500 font-medium font-mono text-sm">Tactical Operator Identity</p>
        </div>
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-primary-600/20 italic">
          {user.name?.[0] || user.email[0].toUpperCase()}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Account Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Service Record</h3>
            <div className="space-y-4">
              <StatItem label="Tasks Completed" value={user._count.tasks} color="text-primary-500" />
              <StatItem label="Active Habits" value={user._count.habits} color="text-emerald-500" />
              <StatItem label="Focus Sessions" value={user._count.pomodoroSessions} color="text-amber-500" />
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 text-zinc-400 mb-4">
              <Calendar size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Enlisted Since</span>
            </div>
            <p className="text-sm font-mono font-bold text-zinc-200">
              {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Identity Configuration</h3>
            
            <form  className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                  <User size={12} className="text-primary-500" /> Full Operator Name
                </label>
                <input
                  name="name"
                  defaultValue={user.name || ""}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-medium"
                  placeholder="Identify yourself..."
                />
              </div>

              <div className="space-y-2 opacity-50">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                  <Mail size={12} className="text-zinc-500" /> Communication Channel (Email)
                </label>
                <input
                  disabled
                  value={user.email}
                  placeholder={``}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm cursor-not-allowed font-medium"
                />
                <p className="text-[10px] text-zinc-600 font-medium italic">Email modifications require administrative override.</p>
              </div>

              <div className="pt-4 border-t border-zinc-800/50">
                <button
                  type="submit"
                  className="w-full bg-white text-black font-black uppercase italic tracking-tighter py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
                >
                  Synchronize Identity
                </button>
              </div>
            </form>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 group hover:border-red-500/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-red-500/70 flex items-center gap-2">
                <ShieldCheck size={14} /> Security Lockdown
              </h3>
            </div>
            <p className="text-xs text-zinc-500 font-medium mb-4">Request a tactical password reset if your credentials have been compromised.</p>
            <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
              Initialize Protocol Reset →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-zinc-500">{label}</span>
      <span className={`text-sm font-mono font-black ${color}`}>{value}</span>
    </div>
  );
}
