import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProfileHeader } from "@/components/auth/ProfileHeader";
import { ProfileStats } from "@/components/auth/ProfileStats";
import { ProfileForm } from "@/components/auth/ProfileForm";
import { ProfileSecurity } from "@/components/auth/ProfileSecurity";

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

  const enlistedSince = new Date(user.createdAt).toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10">
      <ProfileHeader name={user.name} email={user.email} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats */}
        <div className="lg:col-span-4">
          <ProfileStats 
            taskCount={user._count.tasks}
            habitCount={user._count.habits}
            focusCount={user._count.pomodoroSessions}
            enlistedSince={enlistedSince}
          />
        </div>

        {/* Right Column: Identity & Security */}
        <div className="lg:col-span-8 space-y-8">
          <ProfileForm 
            initialName={user.name || ""} 
            email={user.email} 
          />
          
          <ProfileSecurity />
        </div>
      </div>
    </div>
  );
}
