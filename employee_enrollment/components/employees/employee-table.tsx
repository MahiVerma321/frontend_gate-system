"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/dashboard/glass-card";
import { useEmployees } from "@/context/employee-context";
import { EmployeeRow } from "./employee-row";

export function EmployeeTable() {
  const { employees } = useEmployees();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
const [statusFilter, setStatusFilter] = useState<
  "All" | "inside" | "outside"
>("All");      

const [currentPage, setCurrentPage] = useState(1);

const ITEMS_PER_PAGE = 10;

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

const filteredEmployees = useMemo(() => {

  return employees.filter((employee) => {
      const query = debouncedSearch.toLowerCase().trim();
    const matchesSearch =
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.id.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      employee.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}, [employees, debouncedSearch, statusFilter]);

const totalPages = Math.max(
  1,
  Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)
);

const paginatedEmployees = filteredEmployees.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

  return (
    <GlassCard className="overflow-hidden">

  <div className="border-b border-white/10 p-6 space-y-5">

    <div className="flex flex-wrap items-center justify-between gap-4">

      <div>

        <h2 className="text-lg font-semibold">
          Registered Employees
        </h2>

        <p className="text-sm text-muted-foreground">
          {filteredEmployees.length} employees found
        </p>

      </div>

      <div className="flex items-center gap-3">

                  {/* Search */}

        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
              placeholder="Search employee..."
              className="
              h-11
              w-72
              rounded-xl
              border
              border-white/10
              bg-white/5
              pl-10
              pr-4
              text-sm
              outline-none
              transition
              focus:border-primary/50
              focus:bg-white/10
            "
            />
          </div>

          {/* Filter */}

          <select
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(
      e.target.value as
        | "All"
        | "inside"
        | "outside"
    );

    setCurrentPage(1);
  }}
  className="
      h-11
      rounded-xl
      border
      border-white/10
      bg-[#171c24]
      px-4
      text-sm
      text-white
      outline-none
  "
>
  <option value="All" className="bg-[#171c24] text-white">
    All
  </option>
  <option value="inside" className="bg-[#171c24] text-white">
    Inside
  </option>
  <option value="outside" className="bg-[#171c24] text-white">
    Outside
  </option>
  
</select>
              </div>
  </div>
</div>

        <div className="p-6">

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="px-6 py-4">Avatar</th>

                <th>Employee ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Status</th>

                <th>Last Seen</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {paginatedEmployees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

            {/* Footer */}

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing
{" "}
{filteredEmployees.length === 0
  ? 0
  : (currentPage - 1) * ITEMS_PER_PAGE + 1}
-
{Math.min(
  currentPage * ITEMS_PER_PAGE,
  filteredEmployees.length
)}
{" "}
of {filteredEmployees.length} employees
        </span>

        <div className="flex gap-2">
          <button
  disabled={currentPage === 1}
  onClick={() =>
    setCurrentPage((p) => p - 1)
  } className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/5 disabled:opacity-40
disabled:cursor-not-allowed">
            Previous
          </button>

          <div className="flex gap-2">
  {Array.from(
    { length: totalPages },
    (_, index) => (
      <button
        key={index}
        onClick={() =>
          setCurrentPage(index + 1)
        }
        className={
          currentPage === index + 1
            ? "rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary"
            : "rounded-lg border border-white/10 px-3 py-2 hover:bg-white/5"
        }
      >
        {index + 1}
      </button>
    )
  )}
</div>

          <button
  disabled={currentPage === totalPages}
  onClick={() =>
    setCurrentPage((p) => p + 1)
  } className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/5 disabled:opacity-40
disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>

      </div>
    </GlassCard>
  );
}