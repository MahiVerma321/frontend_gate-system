'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Users } from 'lucide-react'
import { GlassCard } from './glass-card'
import { presenceSeed, type TimelinePoint } from '@/lib/dashboard-data'

const HEIGHT = 300
const PAD = { top: 24, right: 24, bottom: 36, left: 40 }

export function PresenceTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(720)
  const [hover, setHover] = useState<number | null>(null)
  const [data, setData] = useState<TimelinePoint[]>(presenceSeed)
  const [pulse, setPulse] = useState<'enter' | 'exit' | null>(null)

  // Track container width so points stay perfectly round and responsive.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Simulate live entries / exits updating the latest point.
  useEffect(() => {
    const id = setInterval(() => {
      const isEntry = Math.random() > 0.45
      setPulse(isEntry ? 'enter' : 'exit')
      setData((prev) => {
        const next = prev.map((p) => ({ ...p }))
        const last = next[next.length - 1]
        if (isEntry) {
          last.entries += 1
          last.inside = Math.min(last.inside + 1, 95)
        } else {
          last.exits += 1
          last.inside = Math.max(last.inside - 1, 20)
        }
        return next
      })
      setTimeout(() => setPulse(null), 700)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const { min, max, points, areaPath, linePath, yTicks } = useMemo(() => {
    const values = data.map((d) => d.inside)
    const rawMin = Math.min(...values)
    const rawMax = Math.max(...values)
    const min = Math.max(0, Math.floor((rawMin - 6) / 5) * 5)
    const max = Math.ceil((rawMax + 6) / 5) * 5
    const innerW = Math.max(width - PAD.left - PAD.right, 10)
    const innerH = HEIGHT - PAD.top - PAD.bottom

    const x = (i: number) =>
      PAD.left + (data.length === 1 ? 0 : (innerW * i) / (data.length - 1))
    const y = (v: number) =>
      PAD.top + innerH - (innerH * (v - min)) / (max - min || 1)

    const points = data.map((d, i) => ({ x: x(i), y: y(d.inside), d }))

    // Smooth cubic path through the points.
    const line = points
      .map((p, i, arr) => {
        if (i === 0) return `M ${p.x},${p.y}`
        const prev = arr[i - 1]
        const cx = (prev.x + p.x) / 2
        return `C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`
      })
      .join(' ')

    const base = PAD.top + innerH
    const areaPath = `${line} L ${points[points.length - 1].x},${base} L ${points[0].x},${base} Z`

    const ticks = 4
    const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
      const v = min + ((max - min) * i) / ticks
      return { v: Math.round(v), y: y(v) }
    })

    return { min, max, points, areaPath, linePath: line, yTicks }
  }, [data, width])

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left
    let nearest = 0
    let best = Infinity
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - px)
      if (dist < best) {
        best = dist
        nearest = i
      }
    })
    setHover(nearest)
  }

  const active = hover != null ? points[hover] : null
  const currentInside = data[data.length - 1].inside

  return (
    <GlassCard tint="cyan" className="p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Users className="size-4 text-primary" />
            Employee Presence Timeline
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Updates live as employees enter or exit
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-semibold tabular-nums leading-none">
              {currentInside}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Inside now</p>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
              pulse === 'enter'
                ? 'border-success/40 bg-success/15 text-success'
                : pulse === 'exit'
                  ? 'border-warning/40 bg-warning/15 text-warning'
                  : 'border-white/10 bg-white/5 text-muted-foreground'
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                pulse === 'exit' ? 'bg-warning' : 'bg-success'
              } ${pulse ? 'animate-ping' : ''}`}
            />
            {pulse === 'enter'
              ? 'Entry detected'
              : pulse === 'exit'
                ? 'Exit detected'
                : 'Live'}
          </span>
        </div>
      </div>

      <div ref={wrapRef} className="relative mt-4 w-full">
        <svg
          width={width}
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          className="touch-none select-none"
          onPointerMove={handleMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Employee presence over time. Currently ${currentInside} inside.`}
        >
          <defs>
            <linearGradient id="presenceArea" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Horizontal grid + y labels */}
          {yTicks.map((t) => (
            <g key={t.v}>
              <line
                x1={PAD.left}
                x2={width - PAD.right}
                y1={t.y}
                y2={t.y}
                stroke="currentColor"
                className="text-white/8"
                strokeDasharray="3 5"
              />
              <text
                x={PAD.left - 10}
                y={t.y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[10px] tabular-nums"
              >
                {t.v}
              </text>
            </g>
          ))}

          {/* Area + line */}
          <path d={areaPath} fill="url(#presenceArea)" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover guideline */}
          {active && (
            <line
              x1={active.x}
              x2={active.x}
              y1={PAD.top}
              y2={HEIGHT - PAD.bottom}
              stroke="var(--primary)"
              strokeOpacity="0.4"
              strokeWidth={1}
            />
          )}

          {/* Points + x labels */}
          {points.map((p, i) => {
            const isActive = hover === i
            return (
              <g key={p.d.label}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 6 : 4}
                  fill="var(--background)"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  className="transition-all"
                />
                {isActive && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={11}
                    fill="var(--primary)"
                    fillOpacity="0.18"
                  />
                )}
                <text
                  x={p.x}
                  y={HEIGHT - PAD.bottom + 20}
                  textAnchor="middle"
                  className={
                    isActive
                      ? 'fill-foreground text-[10px] font-medium'
                      : 'fill-muted-foreground text-[10px]'
                  }
                >
                  {p.d.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating glass tooltip */}
        {active && (
          <div
            className="glass pointer-events-none absolute z-10 w-44 rounded-xl p-3"
            style={{
              left: Math.min(Math.max(active.x - 88, 0), width - 176),
              top: Math.max(active.y - 118, 0),
            }}
          >
            <p className="text-xs font-semibold">
              {active.d.label.replace(/(AM|PM)/, ':00 $1')}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Employees Inside
              </span>
              <span className="text-sm font-semibold tabular-nums">
                {active.d.inside}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
              <span className="flex items-center gap-1 text-xs text-success">
                <ArrowUpRight className="size-3" /> Entries
              </span>
              <span className="text-xs font-medium tabular-nums text-success">
                +{active.d.entries}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-warning">
                <ArrowDownRight className="size-3" /> Exits
              </span>
              <span className="text-xs font-medium tabular-nums text-warning">
                {active.d.exits}
              </span>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
