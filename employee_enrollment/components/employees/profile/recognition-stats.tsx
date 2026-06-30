"use client";

import {
  Eye,
  CheckCircle2,
  TriangleAlert,
  CalendarDays,
} from "lucide-react";

import { EmployeeListItem } from "@/types/employee";
import { MetricCard } from "@/components/ui/metric-card";

type Props = {
  employee: EmployeeListItem;
};

export function RecognitionStats({
  employee,
}: Props) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Total Recognitions"
        value={employee.totalRecognitions}
        subtitle="Face detections"
        icon={Eye}
        accent="cyan"
        iconColor="text-primary"
      />

      <MetricCard
        title="Attendance Today"
        value={employee.attendanceToday}
        subtitle="Current status"
        icon={CheckCircle2}
        accent="green"
        iconColor="text-success"
      />

      <MetricCard
        title="Alerts Generated"
        value={employee.alertsGenerated}
        subtitle="Security events"
        icon={TriangleAlert}
        accent="red"
        iconColor="text-destructive"
      />

      <MetricCard
        title="Registered On"
        value={employee.registeredOn}
        subtitle="Enrollment date"
        icon={CalendarDays}
        accent="violet"
        iconColor="text-chart-5"
      />
    </section>
  );
}