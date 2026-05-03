import { LandingNav } from '@/components/landing'
import React from 'react'

export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 antialiased">
        <LandingNav />
        {children}
    </div>
  )
}
