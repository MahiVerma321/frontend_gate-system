"use client";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Props = {
  result: string;
};

export function RecognitionResult({
  result,
}: Props) {
  const success =
    result.toLowerCase() === "recognized";

  if (success) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-sm font-medium text-success">
        <CheckCircle2 className="h-4 w-4" />
        Recognized
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
      <XCircle className="h-4 w-4" />
      Failed
    </span>
  );
}