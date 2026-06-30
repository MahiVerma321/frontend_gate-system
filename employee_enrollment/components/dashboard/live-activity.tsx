import { GlassCard } from "./glass-card";
//import { useEmployees } from "@/context/employee-context";
import { cn } from "@/lib/utils";
import { ArrowRight, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { EmployeeAvatar } from "@/components/employees/avatar";
import { useEffect, useState } from "react";

import type { LiveActivityItem } from "@/types/live-activity";

export function LiveActivity() {
//  const { employees } = useEmployees();

const [liveActivity, setLiveActivity] =
  useState<LiveActivityItem[]>([]);
  useEffect(() => {
  loadActivity();
}, []);

async function loadActivity() {
  try {
    const response = await fetch(
      "/api/dashboard/live-activity"
    );

    const data = await response.json();

    if (data.success) {
      setLiveActivity(data.activity);
    }
  } catch (error) {
    console.error(error);
  }
}

  return (
    <GlassCard tint="cyan" className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>

          <h2 className="text-sm font-semibold">
            Live Activity
          </h2>
        </div>

        <span className="text-xs text-muted-foreground">
          Real-time feed
        </span>
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {liveActivity.length === 0 ? (
    <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
      No recognition activity yet.
    </div>
  ) : (
        liveActivity.map((activity) => {
          const recognized =
            activity.result === "Recognized";

          return (
            <li
  key={`${activity.employeeId}-${activity.createdAt}`}
  className="
    group
    flex
    items-center
    justify-between

    rounded-xl

    border
    border-white/10

    bg-white/[0.03]

    px-4
    py-2.5

    transition-all
    duration-300

    hover:border-cyan-500/40
    hover:bg-white/[0.05]
  "
>

  {/* LEFT */}

  <div className="flex items-center gap-2.5">

    <div className="transition-transform duration-300 group-hover:scale-105">

      <EmployeeAvatar
    employeeId={activity.employeeId}
    name={activity.name}
    size="sm"
/>

    </div>

    <div>

      <p className="text-sm font-semibold">
        {activity.name}
      </p>

      <p className="text-xs text-muted-foreground">
        {activity.confidence.toFixed(1)}% confidence
      </p>

    </div>

  </div>

  {/* RIGHT */}

  <div className="flex flex-col items-end">

    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium",

        recognized
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      )}
    >
      {recognized
        ? "Recognized"
        : "Failed"}
    </span>

    <span className="mt-1 text-[11px] text-muted-foreground">
      {new Date(activity.createdAt)
  .toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
    </span>

  </div>

</li>
          );
        })
      )}
      </ul>

      <Link
  href="/dashboard/live-activity"
  className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
>
  View All
  <ArrowRight className="size-4" />
</Link>

    </GlassCard>
  );
}
