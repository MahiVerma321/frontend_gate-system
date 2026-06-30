"use client";

import {
  Clock3,
  CheckCircle2,
} from "lucide-react";

type Props = {
  lastOut: string;
};

export function AttendanceStatus({
  lastOut,
}: Props) {
  const inside = lastOut === "--";

  if (inside) {
    return (
      <span
        className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-primary/20
        bg-primary/10
        px-3
        py-1
        text-sm
        font-medium
        text-primary
      "
      >
        <Clock3 className="h-4 w-4" />

        Inside
      </span>
    );
  }

  return (
    <span
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-success/20
      bg-success/10
      px-3
      py-1
      text-sm
      font-medium
      text-success
    "
    >
      <CheckCircle2 className="h-4 w-4" />

      Completed
    </span>
  );
}