"use client";

import { motion } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GlassCard } from "@/components/dashboard/glass-card";
//import { useEmployees } from "@/context/employee-context";
import { EmployeeAvatar } from "@/components/employees/avatar";
import { getRelativeTime } from "@/lib/time";
import { useEffect, useState } from "react";

export default function LiveActivityPage() {
//        const { employees } = useEmployees();
//  const todayActivity = employees
//    .filter((employee) =>
//      employee.lastSeen.includes("Today")
//    )
//    .sort((a, b) =>
//      b.lastSeen.localeCompare(a.lastSeen)
//    );

type Activity = {
  employeeId: string;
  name: string;
  confidence: number;
  result: "Recognized" | "Failed";
  createdAt: string;
};

const [todayActivity, setTodayActivity] =
  useState<Activity[]>([]);

  useEffect(() => {
  async function loadActivity() {
    try {
      const response = await fetch(
        "/api/live-activity"
      );

      const data = await response.json();

      if (data.success) {
        setTodayActivity(data.activity);
      }
    } catch (err) {
      console.error(err);
    }
  }

  loadActivity();
}, []);

  return (
    <DashboardShell>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Live Activity
          </h1>

          <p className="mt-2 text-muted-foreground">
            Today's employee entry and exit events.
          </p>
        </div>

        <GlassCard className="p-5">

          <div className="space-y-4">

            {todayActivity.map((activity, index) => (

            <motion.div
  key={`${activity.employeeId}-${activity.createdAt}`}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.35,
    delay: index * 0.06,
  }}
  whileHover={{
    scale: 1.01,
  }}
  className={`
    group
    relative
    overflow-hidden

    flex
    items-center
    justify-between

    rounded-2xl

    border
    bg-white/[0.03]

    px-5
    py-3

    transition-all
    duration-200
  
    ${
  activity.result === "Recognized"
    ? `
      border-green-500/20
      hover:border-green-400/40
      hover:shadow-[0_0_30px_rgba(34,197,94,0.12)]
    `
    : `
      border-amber-500/20
      hover:border-amber-400/40
      hover:shadow-[0_0_30px_rgba(251,191,36,0.12)]
    `
}
`}
>

  {/* Left glowing bar */}

  <div
    className={`

      absolute

      left-0
      top-3
      bottom-3

      w-1.5
group-hover:w-2
transition-all
duration-300

      rounded-r-full

      ${
        activity.result === "Recognized"
          ? "bg-green-400"
          : "bg-amber-400"
      }

    `}
  />

{/* LEFT SIDE */}

<div className="flex items-center gap-4">

  <motion.div
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.2 }}
  >
    <EmployeeAvatar
      employeeId={activity.employeeId}
      name={activity.name}
      size="sm"
    />
  </motion.div>

  <div>
    <h3 className="text-sm font-semibold">
      {activity.name}
    </h3>

    <p className="text-xs text-muted-foreground">
      {activity.employeeId}
    </p>
  </div>

</div>

  {/* RIGHT SIDE */}

  <div className="flex flex-col items-end gap-1">

    <span
      className={`

        inline-flex
        items-center

        rounded-full

        px-2.5
        py-0.5

        text-xs
        font-medium
        transition-all
        duration-300

        ${
          activity.result === "Recognized"
            ? "bg-green-500/15 text-green-400 group-hover:bg-green-500/20"
            : "bg-amber-500/15 text-amber-400 group-hover:bg-amber-500/20"
        }

      `}
    >
      {activity.result === "Recognized"
        ? "Recognized"
        : "Failed"}
    </span>

    <p className="text-xs text-muted-foreground">
      {getRelativeTime(activity.createdAt)}
    </p>

  </div>

</motion.div>
            ))}

          </div>

        </GlassCard>

      </div>
    </DashboardShell>
    
  );
}