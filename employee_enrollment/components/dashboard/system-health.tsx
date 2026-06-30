import { ScanFace, Cctv, Database, RefreshCw } from 'lucide-react'
import { GlassCard } from './glass-card'
import { systemHealth } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

const icons = {
  'Face Detection': ScanFace,
  'Camera Status': Cctv,
  Database: Database,
  'Edge Sync': RefreshCw,
} as const

const stateMeta = {
  online: { dot: 'bg-success', text: 'text-success' },
  healthy: { dot: 'bg-success', text: 'text-success' },
  connected: { dot: 'bg-primary', text: 'text-primary' },
  degraded: { dot: 'bg-warning', text: 'text-warning' },
} as const

export function SystemHealth() {
  return (
    <GlassCard tint="green" className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">System Health</h2>
        <span className="text-xs text-muted-foreground">Updated 12s ago</span>
      </div>

      <ul className="mt-4 flex flex-1 flex-col gap-2">
        {systemHealth.map((item) => {
          const Icon = icons[item.label as keyof typeof icons]
          const meta = stateMeta[item.state]
          return (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground">
                <Icon className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.metric}</p>
              </div>
              <span
                className={cn(
                  'flex items-center gap-1.5 text-xs font-medium',
                  meta.text,
                )}
              >
                <span
                  className={cn('size-2 rounded-full', meta.dot)}
                  aria-hidden
                />
                {item.status}
              </span>
            </li>
          )
        })}
      </ul>
    </GlassCard>
  )
}
