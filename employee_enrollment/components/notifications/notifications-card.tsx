"use client";

import {
  BellRing,
  UserPlus,
  UserPen,
  UserRoundX,
  ScanFace,
  TriangleAlert,
  ShieldAlert,
  Clock3,
} from "lucide-react";
import { GlassCard } from "@/components/dashboard/glass-card";

type NotificationType =
  | "employee-added"
  | "employee-updated"
  | "employee-deleted"
  | "employee-reenrolled"
  | "recognition-success"
  | "recognition-unknown"
  | "alert"
  | "account";

type Props = {
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  onMarkRead: () => void;
};

export function NotificationCard({
  type,
  title,
  description,
  time,
  unread = false,
  onMarkRead,
}: Props) {

    const styles = {
  "employee-added": {
    icon: UserPlus,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },

  "employee-updated": {
    icon: UserPen,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },

  "employee-deleted": {
    icon: UserRoundX,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },

  "employee-reenrolled": {
    icon: ScanFace,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },

  "recognition-success": {
    icon: ScanFace,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },

  "recognition-unknown": {
    icon: ShieldAlert,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },

  alert: {
    icon: TriangleAlert,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },

  account: {
    icon: BellRing,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
};

const Item = styles[type];
const Icon = Item.icon;
const tintMap = {
  "employee-added": "blue",
  "employee-updated": "violet",
  "employee-deleted": "rose",
  "employee-reenrolled": "emerald",
  "recognition-success": "green",
  "recognition-unknown": "amber",
  alert: "red",
  account: "slate",
} as const;

return (
  <GlassCard
  tint={unread ? tintMap[type] : "plain"}
  className="p-6 rounded-3xl"
>

    <div className="flex items-start justify-between">
            <div className="flex gap-4">
               <div
  className={`
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-2xl
    ${Item.bg}
  `}
>
  <Icon
    className={`h-6 w-6 ${Item.color}`}
  />
</div>

<div>

<h3 className="font-semibold text-white">
  {title}
</h3>

<p className="mt-2 text-sm leading-6 text-muted-foreground">
  {description}
</p>

</div>

    </div>

    <div className="flex flex-col items-end gap-2">
    {unread && (
  <button
    onClick={onMarkRead}
    className="
      h-3
      w-3
      rounded-full
      bg-violet-500
      transition
      hover:scale-125
    "
    title="Mark as read"
  />
)}

<div className="flex items-center gap-2 text-xs text-muted-foreground">

<Clock3 className="h-3.5 w-3.5" />

<span>{time}</span>

</div>

    </div>
    </div>
    </GlassCard>
)}