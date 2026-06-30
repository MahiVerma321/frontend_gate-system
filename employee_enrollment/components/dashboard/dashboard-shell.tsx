'use client'

import { useState, type ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNav } from '@/components/dashboard/top-nav'
import { cn } from '@/lib/utils'

export function DashboardShell({ children }: { children: ReactNode }) {
  // Sidebar is open by default on large screens, closed on small screens.
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Backdrop for mobile / overlay mode */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-out',
          open ? 'lg:pl-64' : 'lg:pl-0',
        )}
      >
        <TopNav onToggleSidebar={() => setOpen((v) => !v)} sidebarOpen={open} />

        <main className="flex flex-col gap-4 p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}
