import { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;

  value: string | number;

  subtitle?: string;

  icon: LucideIcon;

  accent?: "cyan" | "green" | "amber" | "red" | "violet";

  iconColor?: string;
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "cyan",
  iconColor = "text-primary",
}: MetricCardProps) {
  return (
    <GlassCard
      tint={accent}
      className="
        group
        overflow-hidden
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110",
            iconColor
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {subtitle && (
          <span className="text-xs text-muted-foreground">
            {subtitle}
          </span>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-bold tracking-tight">
          {value}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {title}
        </p>
      </div>
    </GlassCard>
  );
}