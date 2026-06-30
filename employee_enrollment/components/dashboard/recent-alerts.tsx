import { ArrowRight, ShieldAlert, AlertTriangle, Info } from 'lucide-react'
import { GlassCard } from './glass-card'
import { recentAlerts } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

const levelMeta = {
  critical: {
    icon: ShieldAlert,
    color: 'text-destructive',
    chip: 'border-destructive/30 bg-destructive/10 text-destructive',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-warning',
    chip: 'border-warning/30 bg-warning/10 text-warning',
    label: 'Warning',
  },
  info: {
    icon: Info,
    color: 'text-primary',
    chip: 'border-primary/30 bg-primary/10 text-primary',
    label: 'Info',
  },
} as const

export function RecentAlerts() {
  return (
    <GlassCard tint="red" className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Recent Alerts</h2>
        <span className="rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
          {recentAlerts.length} new
        </span>
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {recentAlerts.map((alert) => {
          const meta = levelMeta[alert.level]
          return (
            <li
              key={alert.id}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-3 transition-colors hover:bg-white/10"
            >
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5',
                  meta.color,
                )}
              >
                <meta.icon className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{alert.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {alert.detail}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={cn(
                    'rounded-full border px-2 py-0.5 text-[11px] font-medium',
                    meta.chip,
                  )}
                >
                  {meta.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {alert.time}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
      >
        View All Alerts
        <ArrowRight className="size-4" />
      </button>
    </GlassCard>
  )
}
