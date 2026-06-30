"use client";

import { useState } from "react";
import { NotificationStats } from "@/components/notifications/notifications-stats";
import { notifications } from "@/components/notifications/notifications-list";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GlassCard } from "@/components/dashboard/glass-card";

import { NotificationsToolbar } from "@/components/notifications/notifications-toolbar";
import { NotificationsList } from "@/components/notifications/notifications-list";
import {
  notifications as initialNotifications,
} from "@/components/notifications/notifications-list";

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] =
  useState(initialNotifications);

const [sortOrder, setSortOrder] =
  useState<"Newest" | "Oldest">("Newest");
const handleMarkRead = (id: number) => {
    setNotifications(prev =>
        prev.map(notification =>
            notification.id === id
                ? {
                      ...notification,
                      unread: false,
                  }
                : notification
        )
    );
};
const handleMarkAllRead = () => {
    setNotifications(prev =>
        prev.map(notification => ({
            ...notification,
            unread: false,
        }))
    );
};

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* Page Heading */}
        <div>
          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-muted-foreground">
            Stay updated with employee activity, recognition events and security alerts.
          </p>
        </div>

        <NotificationStats notifications={notifications} />

        {/* Glass Container */}
        <GlassCard
          tint="indigo"
          className="rounded-[32px] p-8"
        >
          <NotificationsToolbar
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
  onMarkAllRead={handleMarkAllRead}
/>

          <NotificationsList
    notifications={notifications}
    search={search}
    filter={filter}
    sortOrder={sortOrder}
    onMarkRead={handleMarkRead}
/>
        </GlassCard>

      </div>
    </DashboardShell>
  );
}