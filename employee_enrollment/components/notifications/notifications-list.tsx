"use client";

import { NotificationCard } from "./notifications-card";

type Props = {
    notifications: Notification[];
    search: string;
    filter: string;
    sortOrder: "Newest" | "Oldest";
    onMarkRead: (id: number) => void;
};

type Notification = {
  id: number;
  type:
    | "employee-added"
    | "employee-updated"
    | "employee-reenrolled"
    | "recognition-success"
    | "recognition-unknown"
    | "alert"
    | "account";
  title: string;
  description: string;
  time: string;
  unread: boolean;
  timestamp: number;
  category:
    | "Employees"
    | "Recognition"
    | "Alerts"
    | "Account";
};

export const notifications: Notification[] = [
  {
    id: 1,
    type: "employee-added",
    title: "New Employee Registered",
    description: "John Doe has been successfully added to the system.",
    time: "2 mins ago",
    unread: true,
    timestamp: new Date("2026-06-29T14:10:00").getTime(),
    category: "Employees",
  },

  {
    id: 2,
    type: "employee-updated",
    title: "Employee Information Updated",
    description: "Jane Smith's details were updated.",
    time: "15 mins ago",
    unread: false,
    timestamp: new Date("2026-06-29T13:55:00").getTime(),
    category: "Employees",
  },

  {
    id: 3,
    type: "employee-reenrolled",
    title: "Employee Re-enrolled",
    description: "Michael Brown completed facial re-enrollment.",
    time: "35 mins ago",
    unread: true,
    timestamp: new Date("2026-06-29T13:35:00").getTime(),
    category: "Recognition",
  },

  {
    id: 4,
    type: "recognition-success",
    title: "Face Recognized",
    description: "Emma Wilson checked in successfully.",
    time: "1 hour ago",
    unread: false,
    timestamp: new Date("2026-06-29T13:10:00").getTime(),
    category: "Recognition",
  },

  {
    id: 5,
    type: "recognition-unknown",
    title: "Unknown Face Detected",
    description: "Camera 2 detected an unrecognized person.",
    time: "3 hours ago",
    unread: true,
    timestamp: new Date("2026-06-29T11:10:00").getTime(),
    category: "Alerts",
  },

  {
    id: 6,
    type: "alert",
    title: "Camera Offline",
    description: "Entrance Camera lost connection.",
    time: "Yesterday",
    unread: true,
    timestamp: new Date("2026-06-28T14:10:00").getTime(),
    category: "Alerts",
  },

  {
    id: 7,
    type: "account",
    title: "Password Changed",
    description: "Your administrator password was updated.",
    time: "Yesterday",
    unread: false,
    timestamp: new Date("2026-06-28T14:00:00").getTime(),
    category: "Account",
  },
];

export function NotificationsList({
  notifications,
  search,
  filter,
  sortOrder,
  onMarkRead,
}: Props) {
    const sortedNotifications = [...notifications].sort((a, b) => {
  if (sortOrder === "Newest") {
    return b.timestamp - a.timestamp;
  }

  return a.timestamp - b.timestamp;
});

const filteredNotifications = sortedNotifications.filter((item) => {
  const matchesSearch =
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" ||
    item.category === filter;

  return matchesSearch && matchesFilter;
});

if (filteredNotifications.length === 0) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-16 text-center">
      <h3 className="text-lg font-semibold">
        No notifications found
      </h3>

      <p className="mt-2 text-muted-foreground">
        Try changing your search or filter.
      </p>
    </div>
  );
}

return (
  <div className="space-y-5">
    {filteredNotifications.map((notification) => (
  <NotificationCard
    key={notification.id}
    type={notification.type}
    title={notification.title}
    description={notification.description}
    time={notification.time}
    unread={notification.unread}
    onMarkRead={() => onMarkRead(notification.id)}
  />
))}
  </div>
);
}
