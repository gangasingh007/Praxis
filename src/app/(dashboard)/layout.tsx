import { Sidebar } from "@/components/shared/Sidebar";
import { getSession } from "@/lib/auth";
import { UserMenu } from "@/components/auth/UserMenu";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const displayName = user.name || user.email.split("@")[0];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground ">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-mono text-muted-foreground">
              System Online <span className="text-primary">●</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground hidden sm:block">
                Welcome back, {displayName}
              </span>
              <ThemeToggle />
            </div>

          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-auto bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
