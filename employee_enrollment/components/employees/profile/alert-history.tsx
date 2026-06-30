"use client";

import {
  AlertTriangle,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";
import { EmployeeListItem } from "@/types/employee";

type Props = {
  employee: EmployeeListItem;
};

export function AlertHistory({
  employee,
}: Props) {
  return (
    <GlassCard
      tint="amber"
      className="p-0 overflow-hidden"
    >
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold">
          Alert History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Security events related to this employee
        </p>
      </div>

      <div className="px-6 py-6">
        <div className="space-y-8">
          {employee.alertHistory.map((alert, index) => (
  <TimelineItem
    key={index}
    date={alert.date}
    type={alert.type}
    title={alert.title}
    description={alert.description}
  />
))}
        </div>
      </div>
    </GlassCard>
  );
}

type TimelineProps = {
  date: string;
  type: "warning" | "critical" | "success";
  title: string;
  description: string;
};

function TimelineItem({
  date,
  type,
  title,
  description,
}: TimelineProps) {
  const Icon =
    type === "critical"
      ? AlertTriangle
      : type === "warning"
      ? ShieldCheck
      : RefreshCcw;

  const color =
    type === "critical"
      ? "text-destructive"
      : type === "warning"
      ? "text-warning"
      : "text-success";

  const glow =
    type === "critical"
      ? "shadow-destructive/20"
      : type === "warning"
      ? "shadow-warning/20"
      : "shadow-success/20";

  return (
    <div className="relative flex gap-5">

      {/* Timeline */}

      <div className="flex flex-col items-center">

        <div
          className={`
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/5
          shadow-lg
          ${glow}
          ${color}
        `}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="mt-2 h-full w-px bg-white/10" />

      </div>

      {/* Content */}

      <div className="pb-8">

        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {date}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>

      </div>
    </div>
  );
}