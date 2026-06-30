import { Users, DoorOpen, DoorClosed, TriangleAlert } from 'lucide-react'
import { GlassCard } from './glass-card'
import { cn } from '@/lib/utils'
import type { EmployeeListItem } from "@/types/employee";

type Stat = {
  label: string
  value: string
  trend: string
  up: boolean
  icon: typeof Users
  tint: 'cyan' | 'green' | 'amber' | 'red'
  iconColor: string
}

type Props = {
  employees: EmployeeListItem[];
};

export function StatCards({
  employees,
}: Props) {

  const totalEmployees = employees.length;

const currentlyInside = employees.filter(
  (employee) => employee.status === "inside"
).length;

const exitedToday = employees.filter(
  (employee) => employee.status === "outside"
).length;

const activeAlerts = employees.reduce(
  (total, employee) =>
    total + (employee.alertsGenerated ?? 0),
  0
);
//const activeAlerts = employees.reduce(
//  (total, employee) =>
//    total +
//    employee.alertHistory.filter(
//      (alert) =>
//        alert.type === "warning" ||
//        alert.type === "critical"
//    ).length,
//  0
//);

const stats: Stat[] = [
  {
    label: "Total Employees",
    value: totalEmployees.toString(),
    trend: `${currentlyInside} currently inside`,
    up: true,
    icon: Users,
    tint: "cyan",
    iconColor: "text-primary",
  },
  {
    label: "Currently Inside",
    value: currentlyInside.toString(),
    trend: `${totalEmployees - currentlyInside} outside`,
    up: true,
    icon: DoorOpen,
    tint: "green",
    iconColor: "text-success",
  },
  {
    label: "Outside",
    value: exitedToday.toString(),
    trend: "Live status",
    up: false,
    icon: DoorClosed,
    tint: "amber",
    iconColor: "text-warning",
  },
  {
    label: "Active Alerts",
    value: activeAlerts.toString(),
    trend: "Warnings + Critical",
    up: false,
    icon: TriangleAlert,
    tint: "red",
    iconColor: "text-destructive",
  },
];

  
  return (
    <section
      aria-label="Key metrics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <GlassCard key={stat.label} tint={stat.tint} className="p-5">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                'flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5',
                stat.iconColor,
              )}
            >
              <stat.icon className="size-5" />
            </div>
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-[11px] font-medium',
                stat.up
                  ? 'border-success/30 bg-success/10 text-success'
                  : 'border-white/10 bg-white/5 text-muted-foreground',
              )}
            >
              {stat.trend}
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
        </GlassCard>
      ))}
    </section>
  )
}
