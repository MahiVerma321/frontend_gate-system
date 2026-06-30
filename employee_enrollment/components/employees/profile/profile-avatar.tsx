"use client";

import { ShieldCheck } from "lucide-react";

export function ProfileAvatar({
  name,
}: {
  name: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="group relative flex h-44 w-44 items-center justify-center">

      {/* Outer Glow */}

      <div
  className="
    absolute
    inset-2
    rounded-full
    bg-cyan-500/20
    blur-3xl
    animate-avatar-pulse
    transition-all
duration-500
group-hover:opacity-80
  "
/>

      {/* Outer Ring */}

<div
  className="
    absolute
    inset-0
    rounded-full
    border
    border-cyan-400/20
    bg-[#09111d]
    overflow-hidden
  "
>
  <div
    className="
      absolute
      -inset-6
      animate-border
      rounded-full
      bg-[conic-gradient(from_0deg,transparent,rgba(34,211,238,.35),transparent)]
    "
  />
</div>

      {/* Second Ring */}

      <div
        className="
          absolute
          inset-3
          rounded-full
          border
          border-white/10
          bg-[#0b1422]
        "
      />

      {/* Main Orb */}

      <div
        className="
          absolute
          inset-6
          overflow-hidden
          rounded-full
          border
          border-cyan-400/15
          bg-gradient-to-br
          from-[#17263a]
          via-[#111827]
          to-[#0b1220]
        "
      >
        {/* Cyan Tint */}

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20" />

        {/* Glass Reflection */}

        <div className="absolute left-5 top-4 h-8 w-8 rounded-full bg-white/10 blur-lg" />

        {/* AI Scan Line */}

<div
  className="
    absolute
    left-0
    h-8
    w-full
    animate-scan-line
    bg-gradient-to-b
    from-transparent
    via-cyan-300/30
    to-transparent
    blur-md
  "
/>

        {/* Shield */}

        <ShieldCheck
          className="
            absolute
            left-1/2
            top-[42%]
            h-16
            w-16
            -translate-x-1/2
            -translate-y-1/2
            text-cyan-300/10
          "
        />

        {/* Initials */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-5xl
            font-black
            tracking-wide
            text-white
            drop-shadow-[0_0_12px_rgba(34,211,238,.4)]
          "
        >
          {initials}
        </div>
      </div>

      {/* Scan Corners */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-300/60" />

        <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cyan-300/60" />

        <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cyan-300/60" />

        <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-300/60" />

      </div>
    </div>
  );
}