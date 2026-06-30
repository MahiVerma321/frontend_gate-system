export type EmployeeTheme = {
  gradient: string;
  glass: string;
  icon: string;
  glow: string;
  border: string;
};

export const employeeThemes: EmployeeTheme[] = [
  // 1. Cyan
  {
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
    glass: "glass-cyan",
    icon: "text-cyan-300",
    glow: "bg-cyan-500/25",
    border: "border-cyan-400/30",
  },

  // 2. Emerald
  {
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    glass: "glass-green",
    icon: "text-emerald-300",
    glow: "bg-emerald-500/25",
    border: "border-emerald-400/30",
  },

  // 3. Violet
  {
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    glass: "glass-violet",
    icon: "text-violet-300",
    glow: "bg-violet-500/25",
    border: "border-violet-400/30",
  },

  // 4. Amber
  {
    gradient: "from-amber-500 via-orange-500 to-red-500",
    glass: "glass-amber",
    icon: "text-amber-300",
    glow: "bg-amber-500/25",
    border: "border-amber-400/30",
  },

  // 5. Rose
  {
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
    glass: "glass-red",
    icon: "text-rose-300",
    glow: "bg-rose-500/25",
    border: "border-rose-400/30",
  },

  // 6. Indigo
  {
    gradient: "from-indigo-500 via-blue-600 to-sky-500",
    glass: "glass-cyan",
    icon: "text-indigo-300",
    glow: "bg-indigo-500/25",
    border: "border-indigo-400/30",
  },

  // 7. Lime
  {
    gradient: "from-lime-400 via-green-500 to-emerald-600",
    glass: "glass-green",
    icon: "text-lime-300",
    glow: "bg-lime-500/25",
    border: "border-lime-400/30",
  },

  // 8. Magenta
  {
    gradient: "from-fuchsia-500 via-pink-500 to-violet-600",
    glass: "glass-violet",
    icon: "text-fuchsia-300",
    glow: "bg-fuchsia-500/25",
    border: "border-fuchsia-400/30",
  },

  // 9. Ice Blue
  {
    gradient: "from-sky-400 via-cyan-400 to-indigo-500",
    glass: "glass-cyan",
    icon: "text-sky-300",
    glow: "bg-sky-500/25",
    border: "border-sky-400/30",
  },

  // 10. Gold
  {
    gradient: "from-yellow-400 via-amber-500 to-orange-600",
    glass: "glass-amber",
    icon: "text-yellow-300",
    glow: "bg-yellow-500/25",
    border: "border-yellow-400/30",
  },

  // 11. Ruby
  {
    gradient: "from-red-500 via-rose-500 to-pink-600",
    glass: "glass-red",
    icon: "text-red-300",
    glow: "bg-red-500/25",
    border: "border-red-400/30",
  },

  // 12. Arctic
  {
    gradient: "from-cyan-300 via-blue-400 to-indigo-600",
    glass: "glass-cyan",
    icon: "text-cyan-200",
    glow: "bg-cyan-400/25",
    border: "border-cyan-300/30",
  },

  // 13. Mint
  {
    gradient: "from-teal-400 via-emerald-500 to-green-600",
    glass: "glass-green",
    icon: "text-teal-300",
    glow: "bg-teal-500/25",
    border: "border-teal-400/30",
  },

  // 14. Sunset
  {
    gradient: "from-orange-400 via-rose-500 to-pink-600",
    glass: "glass-red",
    icon: "text-orange-300",
    glow: "bg-orange-500/25",
    border: "border-orange-400/30",
  },

  // 15. Galaxy
  {
    gradient: "from-purple-500 via-indigo-500 to-blue-700",
    glass: "glass-violet",
    icon: "text-purple-300",
    glow: "bg-purple-500/25",
    border: "border-purple-400/30",
  },

  // 16. Neon
  {
    gradient: "from-cyan-400 via-violet-500 to-pink-500",
    glass: "glass-violet",
    icon: "text-cyan-300",
    glow: "bg-violet-500/25",
    border: "border-violet-400/30",
  },
];

export function getEmployeeTheme(employeeId: string) {
  let hash = 0;

  for (let i = 0; i < employeeId.length; i++) {
    hash = employeeId.charCodeAt(i) + ((hash << 5) - hash);
  }

  return employeeThemes[Math.abs(hash) % employeeThemes.length];
}