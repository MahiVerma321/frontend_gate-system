import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeeTable } from "@/components/employees/employee-table";

export default function EmployeesPage() {
  return (
    <DashboardShell>

      {/* Page Heading */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold">
          Employees
        </h1>

        <p className="mt-2 text-muted-foreground">
          All registered employees enrolled in SecureVision.
        </p>
      </div>

      {/* Employee Card */}
      <EmployeeTable />

    </DashboardShell>
  );
}