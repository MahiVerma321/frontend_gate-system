"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatCards } from "@/components/dashboard/stat-cards";
import { LiveActivity } from "@/components/dashboard/live-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentAlerts } from "@/components/dashboard/recent-alerts";
import { SystemHealth } from "@/components/dashboard/system-health";
import { PresenceTimeline } from "@/components/dashboard/presence-timeline";
import { useEmployees } from "@/context/employee-context";
import { AddEmployeeModal } from "@/components/employees/add-employee-modal";
import { useState } from "react";

export default function DashboardPage() {
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const { employees } = useEmployees();
  
  return (
    <>
    <DashboardShell>
      <StatCards employees={employees} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveActivity />
        </div>

        <QuickActions
        onAddEmployee={() => setOpenAddEmployee(true)}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <RecentAlerts />
        <SystemHealth />
      </div>

      <PresenceTimeline />
    </DashboardShell>
    <AddEmployeeModal
        open={openAddEmployee}
        onClose={() => setOpenAddEmployee(false)}
      />
    </>
  );
}
