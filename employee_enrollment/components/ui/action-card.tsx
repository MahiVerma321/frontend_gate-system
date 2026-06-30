"use client";

import { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";
import { cn } from "@/lib/utils";

type ActionCardProps = {
  title: string;
  description: string;

  icon: LucideIcon;

  accent?: "cyan" | "green" | "amber" | "red" | "violet";

  iconColor?: string;

  onClick?: () => void;
};

export function ActionCard({
  title,
  description,
  icon: Icon,
  accent = "cyan",
  iconColor = "text-primary",
  onClick,
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <GlassCard
        tint={accent}
        className="
        h-full
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
      "
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5",
            iconColor
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </GlassCard>
    </button>
  );
}