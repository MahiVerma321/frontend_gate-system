"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EmployeeListItem } from "@/types/employee";

import { GlassCard } from "@/components/dashboard/glass-card";
import { ProfileAvatar } from "./profile-avatar";
import { AccountStatusBadge } from "../profile/account-status-badge";
import { cn } from "@/lib/utils";

type Props = {
  employee: EmployeeListItem;
};

export function EmployeeHeader({ employee }: Props) {
  return (
    <GlassCard
      tint="cyan"
      className="relative overflow-hidden rounded-[36px] px-10 py-6"
    >
      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Back Button */}

      <Link
        href="/dashboard/employees"
        className="relative z-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Employees
      </Link>

      {/* Main Hero */}

      <div className="relative z-10 mt-4 flex flex-col gap-20 lg:flex-row lg:items-center">

        {/* Left */}

        <div className="col-span-3 flex justify-center">
          <ProfileAvatar name={employee.name} />
        </div>

        {/* Right */}

        <div className="flex-1">

          {/* Name + Badge */}

          <div className="flex flex-wrap items-center gap-5">

            <h1 className="text-4xl xl:text-5xl
leading-none
font-bold font-black leading-none tracking-tight">
              {employee.name}
            </h1>

            <AccountStatusBadge
  status={employee.accountStatus}
/>
          </div>

          {/* Employee ID */}

          <div className="mt-4 flex items-center gap-4">

            <div className="h-2 w-2 rounded-full bg-cyan-400" />

            <span className="font-mono text-s tracking-[0.35em] text-white/65">
              {employee.id}
            </span>

          </div>

          {/* Info */}

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start">

            {/* Last Seen */}

            <div>

              <p className="text-sm font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Last Seen
              </p>

              <p className="mt-2 text-xl font-semibold">
                {employee.lastSeen}
              </p>

              <p className="mt-2 text-base text-muted-foreground">
                May 26, 2025
              </p>

            </div>

              {/* Divider */}
  <div className="h-24 mx-2 self-center hidden w-px bg-white/10 md:block" />

            {/* Status */}

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
    Current Status
  </p>

              <div className="inline-flex mt-3 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2">

    <div className="flex items-center gap-3">

      <div
        className={cn(
          "h-3 w-3 rounded-full",
          employee.status === "inside"
            ? "bg-emerald-400"
            : employee.status === "outside"
            ? "bg-amber-400"
            : "bg-red-400"
        )}
      />

      <span className="text-lg font-semibold capitalize">
        {employee.status}
      </span>

    </div>

  </div>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="relative z-10 mt-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    </GlassCard>
  );
}