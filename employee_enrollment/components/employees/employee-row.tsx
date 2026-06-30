"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { EmployeeAvatar } from "./avatar";
import { StatusBadge } from "./status-badge";
import { Employee } from "@/types/employee";

export function EmployeeRow({
  employee,
}: {
  employee: Employee;
}) {
  const router = useRouter();

  return (
    <tr 
      onClick={() =>
        router.push(`/dashboard/employees/${employee.id}`)
      }
      className="group cursor-pointer border-b border-white/5 duration-300 transition hover:bg-white/5"
    >
      <td className="px-6 py-4">
        <EmployeeAvatar
    employeeId={employee.id}
    name={employee.name}
    size="sm"
/>
      </td>

      <td>{employee.id}</td>

      <td className="font-medium">{employee.name}</td>

      <td className="text-muted-foreground">
        {employee.email}
      </td>

      <td>
        <StatusBadge status={employee.status} />
      </td>

      <td className="text-muted-foreground">
        {employee.lastSeen}
      </td>

      <td>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </td>
    </tr>
  );
}