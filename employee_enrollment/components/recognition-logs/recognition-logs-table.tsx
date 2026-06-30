"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { useEmployees } from "@/context/employee-context";
import { EmployeeAvatar } from "@/components/employees/avatar";
import { ConfidenceBadge } from "@/components/employees/utils/confidence-badge";
import { RecognitionResult } from "@/components/employees/utils/recognition-result";
import React, { useMemo, useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  BarChart3,
  ScanFace,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatRecognitionTime }
from "@/components/employees/utils/format-recognition-time";

export function RecognitionLogsTable() {
    const router = useRouter();
    const { employees } = useEmployees();
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [timeFilter, setTimeFilter] = useState<
  "All Time" |
  "Today" |
  "Yesterday" |
  "Last 7 Days" |
  "This Month"
>("All Time");
const [currentPage, setCurrentPage] = useState(1);

const rowsPerPage = 10;
    const logs = useMemo(() => {

        const now = new Date();

const today = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate()
);

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const last7Days = new Date(today);
last7Days.setDate(today.getDate() - 6);

const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
);
    
  return employees
    .flatMap(employee =>
      employee.recognitionHistory.map(record => ({
        employee,
        ...record,
      }))
    )
    .sort(
  (a, b) =>
    new Date(b.timestamp).getTime() -
    new Date(a.timestamp).getTime()
)
    .filter((log) => {

        const logDate = new Date(log.timestamp);

  const matchesSearch =
    log.employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTime =
  timeFilter === "All Time"
    ? true

    : timeFilter === "Today"
    ? logDate >= today

    : timeFilter === "Yesterday"
    ? logDate >= yesterday &&
      logDate < today

    : timeFilter === "Last 7 Days"
    ? logDate >= last7Days

    : timeFilter === "This Month"
    ? logDate >= startOfMonth

    : true;

return matchesSearch && matchesTime;

});

}, [search, timeFilter]);

const totalLogs = logs.length;

const recognizedCount = logs.filter(
  (log) => log.result === "Recognized"
).length;

const failedCount = totalLogs - recognizedCount;

const averageConfidence =
  totalLogs === 0
    ? 0
    : logs.reduce(
        (sum, log) => sum + log.confidence,
        0
      ) / totalLogs;

const totalPages = Math.ceil(logs.length / rowsPerPage);

const paginatedLogs = logs.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);

useEffect(() => {
  setCurrentPage(1);
}, [search, timeFilter]);

const exportCSV = () => {
  const headers = [
    "Employee ID",
    "Employee Name",
    "Time",
    "Confidence",
    "Result",
  ];

  const rows = logs.map((log) => [
    log.employee.id,
    log.employee.name,
    log.timestamp,
    log.confidence,
    log.result,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  const today = new Date().toISOString().split("T")[0];

link.download = `RecognitionLogs_${today}.csv`;

  link.click();

  URL.revokeObjectURL(url);
};

  return (

    <GlassCard tint="blue" className="overflow-hidden">

        <div className="border-b border-white/10 p-6 space-y-5">

  <div className="flex items-center justify-between flex-wrap gap-4">

    <div>

      <h2 className="text-lg font-semibold">
        Recognition Events
      </h2>

      <p className="text-sm text-muted-foreground">
        {totalLogs} recognition events found
      </p>

    </div>

<div className="flex items-center gap-3">

  <input
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    placeholder="Search employee..."
    className="
      w-64
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-4
      py-2
      text-sm
      outline-none
      focus:border-cyan-500
    "
  />

  {/* Export Button */}
  <button
    onClick={exportCSV}
    className="
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-cyan-500/30
      bg-cyan-500/10
      px-4
      py-2
      text-sm
      text-cyan-300
      transition
      hover:bg-cyan-500/20
    "
  >
    <Download className="h-4 w-4" />
    Export CSV
  </button>

  <div className="relative">

    <button
      onClick={() => setShowFilters(!showFilters)}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/5
        px-4
        py-2
        text-sm
        transition
        hover:bg-white/10
      "
    >
      <Filter className="h-4 w-4"/>

      {timeFilter}

      <ChevronDown className="h-4 w-4"/>

    </button>

    {showFilters && (

<div
  className="
    absolute
    right-0
    mt-2
    w-56
    rounded-2xl
    border
    border-white/10
    bg-[#101828]
    p-3
    shadow-xl
    z-50
  "
>

  <p className="mb-3 text-xs uppercase text-muted-foreground">
    Time Range
  </p>

  {[
    "All Time",
    "Today",
    "Yesterday",
    "Last 7 Days",
    "This Month",
  ].map((option) => (

    <button
      key={option}
      onClick={() => {
    setTimeFilter(option as any);
    setShowFilters(false);
}}
      className={`
        mb-1
        w-full
        rounded-lg
        px-3
        py-2
        text-left
        text-sm

        ${
          option===timeFilter
          ? "bg-cyan-500/15 text-cyan-400"
          : "hover:bg-white/5"
        }
      `}
    >
      {option}
    </button>

  ))}

</div>

)}

</div>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

    <StatPill
      icon={<ScanFace className="h-4 w-4" />}
      title="Total Logs"
      value={totalLogs}
      color="cyan"
    />

    <StatPill
      icon={<CheckCircle2 className="h-4 w-4" />}
      title="Recognized"
      value={recognizedCount}
      color="green"
    />

    <StatPill
      icon={<XCircle className="h-4 w-4" />}
      title="Failed"
      value={failedCount}
      color="red"
    />

    <StatPill
      icon={<BarChart3 className="h-4 w-4" />}
      title="Avg Confidence"
      value={`${averageConfidence.toFixed(1)}%`}
      color="cyan"
    />

  </div>
  </div>

</div>

<div className="px-6 pb-6">
  <table className="w-full">

        <thead className="bg-white/5">

          <tr className="text-left text-sm text-muted-foreground">

            <th className="px-16 py-4">
              Employee
            </th>

            <th className="px-7 py-4">
                Time
            </th>

            <th className="px py-4">
                Confidence
            </th>

            <th className="px-9 py-4">
                Result
            </th>

            <th className="w-10"></th>

          </tr>

        </thead>

        <tbody>

          {paginatedLogs.map((log, index) => (

            <tr
  key={index}
  onClick={() =>
    router.push(`/dashboard/employees/${log.employee.id}`)
  }
  className="
  group
    cursor-pointer
    border-t
    border-white/5
    transition-all
    duration-200
    hover:bg-cyan-500/5
    hover:translate-x-1
  "
>

              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <EmployeeAvatar
                    employeeId={log.employee.id}
                    name={log.employee.name}
                    size="sm"
                  />

                  <div>

                    <p className="font-medium">
                      {log.employee.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {log.employee.id}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-4 py-5">
  {formatRecognitionTime(log.timestamp)}
</td>

              <td>

                <ConfidenceBadge
                  confidence={log.confidence}
                />

              </td>

              <td>

                <RecognitionResult
                  result={log.result}
                />

              </td>

              <td className="pr-6 text-right">

  <ChevronRight
    className="
      h-4
      w-4
      text-muted-foreground
      opacity-0
      transition
      group-hover:opacity-100
    "
  />

</td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="mt-6 flex items-center justify-between">

  <p className="text-sm text-muted-foreground">
    Showing{" "}
    {(currentPage - 1) * rowsPerPage + 1}
    {" - "}
    {Math.min(currentPage * rowsPerPage, logs.length)}
    {" of "}
    {logs.length}
    {" logs"}
  </p>

  <div className="flex items-center gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((p) => p - 1)
      }
      className="
        rounded-lg
        border
        border-white/10
        px-3
        py-2
        text-sm
        disabled:opacity-40
      "
    >
      Previous
    </button>

    <span className="px-3 text-sm">
      {currentPage} / {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((p) => p + 1)
      }
      className="
        rounded-lg
        border
        border-white/10
        px-3
        py-2
        text-sm
        disabled:opacity-40
      "
    >
      Next
    </button>

  </div>

</div>

      </div>

    </GlassCard>

  );
}

function StatPill({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "green" | "red" | "cyan";
}) {

  const colors = {
    green:
      "border-green-500/20 bg-green-500/10 text-green-400",

    red:
      "border-red-500/20 bg-red-500/10 text-red-400",

    cyan:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
  };

  return (

    <div
      className={`
        w-full
        rounded-xl
        border
        p-5
        ${colors[color]}
      `}
    >

      <div className="flex items-center gap-2 text-xs uppercase tracking-wide">

        {icon}

        {title}

      </div>

      <div className="mt-2 text-2xl font-bold">

        {value}

      </div>

    </div>

  );

}