"use client";

import {
  BellRing,
  CircleAlert,
  ScanFace,
  MailOpen,
} from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";

type Notification = {
  unread: boolean;
  category: string;
};

type Props = {
  notifications: Notification[];
};

export function NotificationStats({
  notifications,
}: Props) {
  const total = notifications.length;

  const unread = notifications.filter(
    (n) => n.unread
  ).length;

  const recognition = notifications.filter(
    (n) => n.category === "Recognition"
  ).length;

  const alerts = notifications.filter(
    (n) => n.category === "Alerts"
  ).length;

  const cards = [
    {
      title: "Total",
      value: total,
      icon: BellRing,
      tint: "violet" as const,
    },
    {
      title: "Unread",
      value: unread,
      icon: MailOpen,
      tint: "blue" as const,
    },
    {
      title: "Recognition",
      value: recognition,
      icon: ScanFace,
      tint: "emerald" as const,
    },
    {
      title: "Alerts",
      value: alerts,
      icon: CircleAlert,
      tint: "rose" as const,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <GlassCard
            key={card.title}
            tint={card.tint}
            className="p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-white/5 p-3">
                <Icon className="h-7 w-7 text-violet-300" />
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}