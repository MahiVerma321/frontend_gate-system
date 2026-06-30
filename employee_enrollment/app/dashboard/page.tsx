"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { AddEmployeeModal } from "@/components/employees/add-employee-modal";
import { useState } from "react";

export default function DashboardPage() {
  const [openAddEmployee, setOpenAddEmployee] = useState(false);

  return (
    <>
    <DashboardShell>
      <div className="flex w-full flex-1">
        <QuickActions
        onAddEmployee={() => setOpenAddEmployee(true)}
        />
      </div>
    </DashboardShell>
     <AddEmployeeModal
        open={openAddEmployee}
        onClose={() => setOpenAddEmployee(false)}
       />
    </>
  );
}
