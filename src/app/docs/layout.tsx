import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/shared/Sidebar";
import { LandingNav } from "@/components/landing";
import { DashboardClient } from "../(dashboard)/DashboardClient";
import React from "react";

export default async function DocsLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    return (
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar />
        <DashboardClient user={session.user}>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </DashboardClient>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 antialiased">
      <LandingNav />
      {children}
    </div>
  );
}
