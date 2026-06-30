"use client";

import { cn } from "@/lib/utils";
import { getEmployeeTheme } from "@/lib/themes/employee-theme";

type Props = {
  employeeId: string;
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: {
    container: "h-11 w-11",
    text: "text-sm",
  },

  md: {
    container: "h-14 w-14",
    text: "text-lg",
  },

  lg: {
    container: "h-20 w-20",
    text: "text-2xl",
  },
};

export function EmployeeAvatar({
  employeeId,
  name,
  size = "md",
}: Props) {
  const theme = getEmployeeTheme(employeeId);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const s = sizes[size];

  return (
    <div className="relative flex items-center justify-center">

      {/* Soft Glow */}

      <div
        className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-35",
          theme.glow
        )}
      />

      {/* Avatar */}

      <div
        className={cn(
          s.container,

          "relative overflow-hidden rounded-full",

          "border border-white/10",

          "bg-[#0f173ba]",

          "shadow-lg"
        )}
      >
        {/* Theme Tint */}

        <div
          className={cn(
            "absolute inset-0 opacity-60 bg-gradient-to-br",
            theme.gradient
          )}
        />

        <div
    className={cn(
        "absolute inset-2 rounded-full opacity-20 blur-md",
        "bg-white"
    )}
/>

        {/* Glass Highlight */}

        <div
          className="
            absolute
            left-2
            top-2
            h-3
            w-3
            rounded-full
            bg-white/20
            blur-sm
          "
        />

        {/* Initials */}

        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",

            "font-bold",

            "tracking-wide",

            "text-white/95",

            s.text
          )}
        >
          {initials}
        </div>
      </div>

    </div>
  );
}