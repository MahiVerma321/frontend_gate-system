"use client";

import { useEffect, useState } from "react";

type Props = {
  firstIn: string;
  lastOut: string;
};

function calculate(firstIn: string) {
  const now = new Date();

  const [hour, minute] = firstIn
    .split(":")
    .map(Number);

  const start = new Date();

  start.setHours(hour);
  start.setMinutes(minute);
  start.setSeconds(0);

  const diff = now.getTime() - start.getTime();

  const totalMinutes = Math.floor(diff / 60000);

  const hours = Math.floor(totalMinutes / 60);

  const mins = totalMinutes % 60;

  return `${hours}h ${mins}m`;
}

export function LiveDuration({
  firstIn,
  lastOut,
}: Props) {
  const [duration, setDuration] = useState(
    lastOut === "--"
      ? calculate(firstIn)
      : ""
  );

  useEffect(() => {
    if (lastOut !== "--") return;

    const interval = setInterval(() => {
      setDuration(calculate(firstIn));
    }, 60000);

    return () => clearInterval(interval);
  }, [firstIn, lastOut]);

  if (lastOut !== "--")
    return null;

  return (
    <div
  className="
  inline-flex
  items-center
  gap-2
  rounded-full
  border
  border-primary/20
  bg-primary/10
  px-3
  py-1.5
  text-sm
  font-medium
  text-primary
"
>
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
  </span>

  {duration}
</div>
  );
}