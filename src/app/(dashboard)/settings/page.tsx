"use client";

import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Monitor, 
  Moon, 
  Sun, 
  Trash2,
  Lock,
  Mail,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 py-12 space-y-10 font-sans">
      
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase tracking-[0.2em]">
          <Settings size={14} /> System Parameters
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight">Configuration</h1>
        <p className="text-muted-foreground text-lg">
          Calibrate your operational environment and security protocols.
        </p>
      </header>

      <Tabs defaultValue="account" className="space-y-8">
        <TabsList className="bg-muted/30 border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="account" className="rounded-lg px-6 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <User size={14} /> Account
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-lg px-6 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Monitor size={14} /> Interface
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg px-6 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Bell size={14} /> Alerts
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg px-6 gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Shield size={14} /> Protocol
          </TabsTrigger>
        </TabsList>

        {/* 👤 Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border/50">
              <CardTitle className="text-xl uppercase font-bold tracking-tight">Identity Parameters</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Modify your primary authorization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Alias</Label>
                  <Input id="name" defaultValue="Agent Zero" className="bg-background/50 border-border/50 focus:border-primary/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Authorized Email</Label>
                  <Input id="email" defaultValue="agent@praxis.io" disabled className="bg-muted/20 border-border/50 opacity-60" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Operational Directive</Label>
                <Input id="bio" placeholder="Primary objective: Maximum cognitive output." className="bg-background/50 border-border/50 focus:border-primary/50 transition-all" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/30 bg-muted/10">
              <Button size="sm" className="font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 text-background">Update Identity</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 💻 Interface Settings */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl uppercase font-bold tracking-tight">Visual Spectrum</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Adjust the interface aesthetics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold uppercase tracking-tight">Dynamic Dark Mode</Label>
                  <p className="text-xs text-muted-foreground font-mono">Toggle low-luminance interface protocol</p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold uppercase tracking-tight">High Contrast Telemetry</Label>
                  <p className="text-xs text-muted-foreground font-mono">Increase visibility of data visualizations</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/30">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold uppercase tracking-tight">Reduced Animation Velocity</Label>
                  <p className="text-xs text-muted-foreground font-mono">Minimize interface motion transitions</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🔔 Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl uppercase font-bold tracking-tight">Transmission Filters</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Control outbound and inbound signal alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-primary" />
                    <div>
                      <Label className="text-sm font-bold uppercase tracking-tight">Email Status Reports</Label>
                      <p className="text-xs text-muted-foreground font-mono">Receive weekly performance summaries</p>
                    </div>
                  </div>
                  <Switch checked />
                </div>
                <Separator className="bg-border/30" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-primary" />
                    <div>
                      <Label className="text-sm font-bold uppercase tracking-tight">Push Focus Alerts</Label>
                      <p className="text-xs text-muted-foreground font-mono">Notifications for focus block transitions</p>
                    </div>
                  </div>
                  <Switch checked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🛡 Security & Privacy */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm border-destructive/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]">
            <CardHeader>
              <CardTitle className="text-xl uppercase font-bold tracking-tight text-destructive">Termination Protocol</CardTitle>
              <CardDescription className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Permanent deletion of all neural data and profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Once executed, this action cannot be reversed. All mission parameters, telemetry, and habit data will be purged from the server.
              </p>
              <Button variant="destructive" className="w-full md:w-auto font-mono uppercase tracking-widest gap-2">
                <Trash2 size={16} /> Delete Authorization
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <footer className="pt-12 border-t border-border/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono font-bold text-muted-foreground/40 uppercase tracking-[0.4em]">
            Praxis OS v0.1.0 <span className="text-primary mx-2">///</span> Authored for High-Performance
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[10px] font-mono font-bold text-muted-foreground/60 hover:text-primary transition-colors uppercase tracking-widest">Privacy Policy</Link>
            <Link href="#" className="text-[10px] font-mono font-bold text-muted-foreground/60 hover:text-primary transition-colors uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
