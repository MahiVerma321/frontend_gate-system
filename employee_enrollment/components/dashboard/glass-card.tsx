import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tint = 'cyan' | 'green' | 'amber' | 'red' | 'violet' | 'plain' | 'blue' | 'slate'
| 'indigo' | 'emerald' | 'rose'

const tintClass: Record<Tint, string> = {
  cyan: 'glass-cyan',
  green: 'glass-green',
  amber: 'glass-amber',
  red: 'glass-red',
  violet: 'glass-violet',
  plain: '',
  blue: 'glass-blue',
  slate: 'glass-slate',
  indigo: 'glass-indigo',
  emerald: 'glass-emerald',
  rose: 'glass-rose',
}

export function GlassCard({
  children,
  tint = 'plain',
  className,
}: {
  children: ReactNode
  tint?: Tint
  className?: string
}) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        tintClass[tint],
        'transition-shadow duration-300',
        className,
      )}
    >
      {children}
    </div>
  )
}
