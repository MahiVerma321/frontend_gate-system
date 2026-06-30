import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/dashboard/glass-card";

type ActionButtonProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: "cyan" | "green" | "amber" | "red" | "violet";
  onClick?: () => void;
};

export function ActionButton({
  title,
  description,
  icon: Icon,
  accent = "cyan",
  onClick,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
    >
      <GlassCard
        tint={accent}
        className={cn(
          "group p-5 transition-all duration-300",
          "hover:-translate-y-1 hover:scale-[1.02]",
          "active:scale-[0.98]"
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold">
              {title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </GlassCard>
    </button>
  );
}