import { ReactNode } from "react";

type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  color?: "cyan" | "green" | "amber" | "red" | "violet";
};

type TimelineProps = {
  items: TimelineItem[];
};

const dotColors = {
  cyan: "bg-primary",
  green: "bg-success",
  amber: "bg-warning",
  red: "bg-destructive",
  violet: "bg-chart-5",
};

export function Timeline({
  items,
}: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex gap-5"
          >
            {/* Dot */}

            <div
              className={`relative z-10 mt-1 h-6 w-6 rounded-full border border-white/10 ${
                dotColors[item.color ?? "cyan"]
              } shadow-lg`}
            />

            {/* Content */}

            <div className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">
                  {item.title}
                </h4>

                {item.time && (
                  <span className="text-xs text-muted-foreground">
                    {item.time}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}