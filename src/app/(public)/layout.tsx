import { LandingNav } from '@/components/landing'
import { getSession } from '@/lib/auth'
import React from 'react'

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 antialiased">
        <LandingNav session={session} />
        {children}
    </div>
  )
}
