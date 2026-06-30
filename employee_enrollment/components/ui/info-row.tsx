import { ReactNode } from "react";

type InfoRowProps = {
  label: string;
  value: ReactNode;
  action?: ReactNode;
};

export function InfoRow({
  label,
  value,
  action,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-4 last:border-b-0">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>
      </div>

      {action}
    </div>
  );
}