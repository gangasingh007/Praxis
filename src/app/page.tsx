import Link from "next/link";
import { ArrowRight, Zap, Target, BarChart3 } from "lucide-react";
import { getSession } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30 overflow-x-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-black to-black z-0 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center font-black italic">P</div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Praxis</span>
          </div>
          
          <div className="flex items-center gap-6">
            {session ? (
              <Link href="/planner" className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2">
                Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">Sign In</Link>
                <Link href="/register" className="px-5 py-2 text-sm font-bold bg-white text-black rounded-full hover:bg-zinc-200 transition-all">
                  Join Praxis
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-xs font-bold uppercase tracking-widest">
            <Zap size={14} /> The Ultimate Productivity Protocol
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
            Master your <span className="text-primary-600">time.</span><br />
            Command your <span className="text-zinc-600">destiny.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-zinc-400 font-medium">
            A tactical time-blocking system designed for high-performers. Praxis blends advanced planning, habit tracking, and deep focus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {session ? (
              <Link href="/planner" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-black uppercase italic tracking-tighter rounded-xl hover:bg-primary-500 transition-all shadow-2xl shadow-primary-600/20 flex items-center justify-center gap-2">
                Go to Dashboard <ArrowRight size={20} />
              </Link>
            ) : (
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white font-black uppercase italic tracking-tighter rounded-xl hover:bg-primary-500 transition-all shadow-2xl shadow-primary-600/20 flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
            )}
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-black uppercase italic tracking-tighter rounded-xl border border-zinc-800 hover:bg-zinc-800 transition-all">
              View Protocol
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Target className="text-primary-500" />}
            title="Time Blocking"
            description="Drag-and-drop tactical scheduling with a precision timeline and deep work indicators."
          />
          <FeatureCard 
            icon={<Zap className="text-yellow-500" />}
            title="Habit Protocols"
            description="Build unstoppable momentum with streak tracking and AI-powered reward systems."
          />
          <FeatureCard 
            icon={<BarChart3 className="text-emerald-500" />}
            title="Deep Insights"
            description="Visualize your performance data to optimize your workflows and reclaim your focus."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all group backdrop-blur-sm">
      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black uppercase italic tracking-tighter mb-3">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed font-medium">{description}</p>
    </div>
  );
}
