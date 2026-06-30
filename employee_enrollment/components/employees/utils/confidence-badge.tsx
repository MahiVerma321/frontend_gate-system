"use client";

import { cn } from "@/lib/utils";

type Props = {
  confidence: number;
};

export function ConfidenceBadge({
  confidence,
}: Props) {
  let classes =
    "border-primary/20 bg-primary/10 text-primary";

  if (confidence >= 99) {
    classes =
      "border-success/20 bg-success/10 text-success";
  } else if (confidence >= 97) {
    classes =
      "border-primary/20 bg-primary/10 text-primary";
  } else if (confidence >= 95) {
    classes =
      "border-warning/20 bg-warning/10 text-warning";
  } else {
    classes =
      "border-destructive/20 bg-destructive/10 text-destructive";
  }

  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-sm font-medium transition",
        classes
      )}
    >
      {confidence.toFixed(1)}%
    </span>
  );
}