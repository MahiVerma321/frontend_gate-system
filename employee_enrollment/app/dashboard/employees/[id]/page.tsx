import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { EmployeeHeader } from "@/components/employees/profile/employee-header";
import { EmployeeInformation } from "@/components/employees/profile/employee-information";
import { AlertHistory } from "@/components/employees/profile/alert-history";
import { ActionCenter } from "@/components/employees/profile/action-center";
import { RecognitionStats } from "@/components/employees/profile/recognition-stats";
import { RecognitionHistory } from "@/components/employees/profile/recognition-history";
import { AttendanceHistory } from "@/components/employees/profile/attendance-history";
import { employees } from "@/lib/employee-data";
import { notFound } from "next/navigation";


export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const employee = employees.find(
    (e) => e.id.toLowerCase() === id.toLowerCase()
  );

  if (!employee) {
    notFound();
  }

  return (

    <DashboardShell>
      <div className="space-y-6">
        <EmployeeHeader employee={employee} />

        <EmployeeInformation employee={employee} />

        <RecognitionStats employee={employee} />

        <RecognitionHistory employee={employee} />

        <AttendanceHistory employee={employee} />

        <AlertHistory employee={employee} />

        <ActionCenter employee={employee} />
      </div>
    </DashboardShell>
  );
}