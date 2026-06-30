"use client";

import { cn } from "@/lib/utils";

type Props = {
  status: "active" | "inactive";
};

export function AccountStatusBadge({
  status,
}: Props) {
  const active = status === "active";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-4 py-2",
        active
          ? "border-emerald-500/20 bg-emerald-500/10"
          : "border-red-500/20 bg-red-500/10"
      )}
    >
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          active
            ? "bg-emerald-400"
            : "bg-red-400"
        )}
      />

      <span
        className={cn(
          "text-xs font-semibold tracking-[0.25em] uppercase",
          active
            ? "text-emerald-200"
            : "text-red-200"
        )}
      >
        {status}
      </span>
    </div>
  );
}