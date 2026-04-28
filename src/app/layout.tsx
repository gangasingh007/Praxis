import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Praxis | Daily Planner",
  description: "Advanced time-blocking and habit tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-background text-foreground`}>
         <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* Sonner Toaster configured for a sleek, minimal look */}
          <Toaster 
            theme="system" 
            toastOptions={{
              className: 'font-mono border-zinc-800 bg-primary text-zinc-100',
            }} 
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
