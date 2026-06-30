import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsHeader } from "@/components/settings/settings-header";
import { AdminProfileCard } from "@/components/settings/admin-profile-card";
import { ChangePasswordCard } from "@/components/settings/change-password-card";
import { NotificationPreferencesCard } from "@/components/settings/notification-card";
import { LogoutCard } from "@/components/settings/logout-card";
import { GlassCard } from "@/components/dashboard/glass-card";

export default function SettingsPage() {
  return (
    <DashboardShell>
        <GlassCard tint="indigo" className="p-6" >
      <SettingsHeader />

      <div className="mt-6 space-y-5">
        <AdminProfileCard />

        <ChangePasswordCard />

        <NotificationPreferencesCard />

        <LogoutCard />
      </div>
      </GlassCard>
    </DashboardShell>
  );
}