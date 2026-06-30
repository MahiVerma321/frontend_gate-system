"use client";

import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: LucideIcon;
  error?: string;
};

export function InputField({
  label,
  icon: Icon,
  error,
  className,
  ...props
}: Props) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-xs
uppercase
tracking-[0.22em]
font-semibold font-medium text-muted-foreground">

        {Icon && (
          <Icon className="h-4 w-4 text-cyan-400" />
        )}

        {label}

      </label>

      <input
        {...props}
        className={cn(
  "w-full rounded-2xl",
  "border",
   error
   ? "border-red-500" 
   : "border-white/10",
  "bg-white/[0.025]",
  "px-5 py-3.5",
  "text-white",
  "placeholder:text-white/30",
  "transition-all duration-200",
  "outline-none",
  "hover:border-white/20",
  error
  ? "focus-border-red-500"
  : "focus:border-cyan-400",
  "focus:bg-white/[0.04]",
  "focus:shadow-[0_0_20px_rgba(34,211,238,0.08)]",
  className
)}
      />

     {error && (
  <p className="mt-2 text-sm text-red-400">
    {error}
  </p>
)} 

    </div>
  );
}