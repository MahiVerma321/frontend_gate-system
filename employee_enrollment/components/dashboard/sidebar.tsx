'use client'

import {
  LayoutDashboard,
  Users,
  ScrollText,
  Bell,
  Cctv,
  Settings,
  ShieldCheck,
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/logout";

const nav = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    label: "Employees",
    href: "/dashboard/employees",
  },
  {
    icon: Cctv,
    label: "Cameras",
    href: "#",
  },
  {
    icon: Bell,
    label: "Alerts",
    href: "#",
  },
  {
    icon: ScrollText,
    label: "Recognition Logs",
    href: "/dashboard/recognition-logs",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'glass fixed left-0 top-0 z-40 flex h-screen w-64 flex-col rounded-none border-y-0 border-l-0 transition-transform duration-300 ease-out',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <ShieldCheck className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-wide">SecureVision</p>
          <p className="text-xs text-muted-foreground">Security Suite</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Hide sidebar"
          className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <X className="size-[18px]" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {nav.map((item) => {
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.label}
      href={item.href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/15 text-foreground"
          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
      )}
    >
      <item.icon
        className={cn(
          "size-[18px] transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />

      {item.label}

      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
})}
      </nav>

      <div className="px-3 pb-6">
        <div className="glass glass-green mb-3 rounded-xl px-4 py-3">
          <p className="text-xs font-medium text-success">All Systems Secure</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Last scan 12s ago
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          <LogOut className="size-[18px]" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
