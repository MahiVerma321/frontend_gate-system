"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { EmployeeListItem } from "@/types/employee";
import { AttendanceStatus } from "../utils/attendance-ststus";
import { calculateDuration } from "../utils/calculate-duration";
import { LiveDuration } from "../utils/live-duration";

type Props = {
  employee: EmployeeListItem;
};

export function AttendanceHistory({
  employee,
}: Props) {
  return (
    <GlassCard
      tint="green"
      className="overflow-hidden p-0"
    >
      {/* Header */}

      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold">
          Attendance History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recent employee attendance
        </p>
      </div>

      <table className="w-full">
        <thead className="bg-white/5">
  <tr className="text-left text-sm text-muted-foreground">

    <th className="px-6 py-4">
      Date
    </th>

    <th>First In</th>

    <th>Last Out</th>

    <th>Duration</th>

    <th>Status</th>

  </tr>
</thead>

        <tbody>
          {employee.attendanceHistory.map(
            (record, index) => (
              <tr
  key={index}
  className="border-t border-white/5 transition hover:bg-white/5"
>
  <td className="px-6 py-4 font-medium">
    {record.date}
  </td>

  <td>{record.firstIn}</td>

  <td>{record.lastOut}</td>

  <td>
    <span
      className="
      rounded-lg
      border
      border-white/10
      bg-white/5
      px-3
      py-1.5
      text-sm
      font-medium
    "
    >
      {record.lastOut === "--" ? (
  <LiveDuration
    firstIn={record.firstIn}
    lastOut={record.lastOut}
  />
) : (
  calculateDuration(
    record.firstIn,
    record.lastOut
  )
)}
    </span>
  </td>

  <td>
    <AttendanceStatus
      lastOut={record.lastOut}
    />
  </td>
</tr>
            )
          )}
        </tbody>
      </table>
    </GlassCard>
  );
}