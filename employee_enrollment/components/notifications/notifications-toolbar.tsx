"use client";

import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  filter: string;
  setFilter: (value: string) => void;

  sortOrder: "Newest" | "Oldest";
  setSortOrder: (value: "Newest" | "Oldest") => void;

  onMarkAllRead: () => void;
};

export function NotificationsToolbar({
  search,
  setSearch,
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  onMarkAllRead,
}: Props) {
  const filters = [
    "All",
    "Employees",
    "Recognition",
    "Alerts",
    "Account",
  ];

  return (
    <div className="mb-8 flex flex-col gap-5">

      {/* Search */}

      <div className="relative flex-1">
        <Search
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            h-5
            w-5
            text-muted-foreground
          "
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notifications..."
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            py-3
            pl-12
            pr-4
            text-white
            outline-none
            transition
            focus:border-violet-500
          "
        />
      </div>

      {/* Filters + Actions */}

      <div className="flex flex-wrap items-center gap-3">

        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              transition
              ${
                filter === item
                  ? "bg-indigo-500 text-white"
                  : "bg-white/[0.03] text-muted-foreground hover:bg-white/[0.08]"
              }
            `}
          >
            {item}
          </button>
        ))}

        <button
          onClick={onMarkAllRead}
          className="
            rounded-xl
            border
            border-violet-500/30
            bg-violet-500/10
            px-5
            py-2.5
            text-sm
            font-medium
            text-violet-300
            transition
            hover:bg-violet-500/20
          "
        >
          Mark All Read
        </button>

        <select
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value as "Newest" | "Oldest")
  }
  className="
    rounded-xl
    border
    border-white/10
    bg-[#111827]
    px-5
    py-2.5
    text-sm
    text-white
    outline-none
    hover:border-violet-500/40
    focus:border-violet-500
  "
>
  <option value="Newest" className="bg-[#111827] text-white">
    Newest
  </option>
  <option value="Oldest" className="bg-[#111827] text-white">
    Oldest
  </option>
</select>

      </div>
    </div>
  );
}