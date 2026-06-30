"use client";

import { UserPlus, FileText, ScrollText, Settings } from "lucide-react";
import Link from "next/link";

import { GlassCard } from "./glass-card";
import { AddEmployeeModal } from "@/components/employees/add-employee-modal";

const actions = [
  {
  icon: UserPlus,
  label: "Add Employee",
  desc: "Register a new face profile",
  accent: "text-primary",
  modal: true,
},
  {
    icon: FileText,
    label: 'View Employees',
    desc: 'Browse the full directory',
    accent: 'text-success',
    href: "/dashboard/employees",
  },
  {
    icon: ScrollText,
    label: 'View Logs',
    desc: 'Inspect access history',
    accent: 'text-warning',
    href: "/dashboard/recognition-logs",
  },
  {
    icon: Settings,
    label: 'Settings',
    desc: 'Configure detection rules',
    accent: 'text-chart-5',
    href: "/dashboard/settings",
  },
]

type QuickActionsProps = {
  onAddEmployee: () => void;
};

export function QuickActions({
  onAddEmployee,
}: QuickActionsProps) {
  return (
    <GlassCard tint="violet" className="flex w-full flex-col p-5">
      <h2 className="text-sm font-semibold">Quick Actions</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Common security tasks
      </p>

      <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
  const card = (
    <>
      <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        <action.icon className={`size-5 ${action.accent}`} />
      </span>

      <span className="text-sm font-medium">
        {action.label}
      </span>

      <span className="text-xs text-muted-foreground">
        {action.desc}
      </span>
    </>
  );

  if (action.modal) {
    return (
      <button
        key={action.label}
        onClick={onAddEmployee}
        className="
          group
          flex
          flex-col
          items-start
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          text-left
          transition-all
          hover:-translate-y-0.5
          hover:bg-white/10
        "
      >
        {card}
      </button>
    );
  }

  return (
    <Link
      key={action.label}
      href={action.href!}
      className="
        group
        flex
        flex-col
        items-start
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/5
        p-4
        text-left
        transition-all
        hover:-translate-y-0.5
        hover:bg-white/10
      "
    >
      {card}
    </Link>
  );
})}
      </div>
    </GlassCard>
  );
}
