"use client";

import {
  Bell,
  ShieldCheck,
  PanelLeft,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/lib/logout";

export function TopNav({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState("Admin");
    useEffect(() => {

  const stored =
    localStorage.getItem("securevision-user");

  if (!stored) return;

  const user = JSON.parse(stored);

  setUserName(
  user.fullName ||
  user.email?.split("@")[0] ||
  "Admin"
);

}, []);

  const initials = userName
  .split(" ")
  .map((word) => word[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);

useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () =>
    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
}, []);

  return (
    <header className="glass sticky top-0 z-20 flex flex-col gap-4 rounded-none border-x-0 border-t-0 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          aria-pressed={sidebarOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <PanelLeft className="size-[18px]" />
        </button>
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-balance">
            Welcome back, {userName}! <span aria-hidden>👋</span>
          </h1>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="size-3.5 text-success" />
            Good evening — security systems operational.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">

        <Link
  href="/dashboard/notifications"
  aria-label="Notifications"
  className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
>
  <Bell className="size-[18px]" />

  <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
</Link>

      <div
  ref={menuRef}
  className="relative"
>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-white/10"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            {initials}
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-xs font-medium">{userName}</span>
            <span className="block text-[11px] text-muted-foreground">
              Admin
            </span>
          </span>
        </button>

        <div
  className={`
    absolute
    right-0
    top-14
    z-50
    w-52
    overflow-hidden
    rounded-2xl
    border
    border-violet-500/20
    bg-[#11151d]/95
    backdrop-blur-xl
    shadow-[0_10px_40px_rgba(0,0,0,0.45)]

    transition-all
    duration-200
    origin-top-right

    ${
      menuOpen
        ? "scale-100 opacity-100 pointer-events-auto"
        : "scale-95 opacity-0 pointer-events-none"
    }
  `}
>
    <Link
      href="/dashboard/settings"
      onClick={() => setMenuOpen(false)}
      className="
        flex
        items-center
        gap-3
        px-4
        py-3
        text-sm
        transition
        hover:bg-white/5
      "
    >
      <Settings className="h-4 w-4" />
      Settings
    </Link>

    <div className="border-t border-white/10" />

    <button
      type="button"
      onClick={logout}
      className="
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3
        text-left
        text-red-400
        transition
        hover:bg-red-500/10
      "
    >
     <LogOut className="h-4 w-4" />
      Logout
    </button>
  </div>
</div>
      </div>
    </header>
  )
}
