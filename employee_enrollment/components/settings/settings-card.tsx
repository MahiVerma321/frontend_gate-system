import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export function SettingsCard({
  title,
  description,
  icon: Icon,
  children,
}: Props) {
  return (
    <section
      className="
      rounded-2xl
      border
      border-violet-500/20
      bg-[#101826]
      p-5
      shadow-[0_0_40px_rgba(139,92,246,0.08)]
      transition-all
      duration-300
      hover:border-violet-500/30
    "
    >
      {/* Header */}

      <div className="flex items-start gap-3">

        <div
          className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          bg-violet-500/10
        "
        >
          <Icon className="h-6 w-6 text-violet-400" />
        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-5">
        {children}
      </div>

    </section>
  );
}