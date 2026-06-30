"use client";

import { Video } from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";
import { EmployeeListItem } from "@/types/employee";
import { useState } from "react";
import { ReEnrollModal } from "../modals/reenroll-modal";

export function EmployeeInformation({
  employee,
}: {
  employee: EmployeeListItem;
}) {
    const [openReEnroll, setOpenReEnroll] = useState(false);

  return (
    <>
    <GlassCard className="mt-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Employee Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Basic enrollment details
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Employee ID */}

        <InfoField
          label="Employee ID"
          value={employee.id}
        />

        {/* Name */}

        <InfoField
          label="Full Name"
          value={employee.name}
        />

        {/* Email */}

        <InfoField
          label="Email"
          value={employee.email}
        />

        {/* Video */}

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            Enrollment Video
          </p>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-medium">
                ********************.mp4
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Hidden for security
              </p>
            </div>

            <button
              onClick={() => setOpenReEnroll(true)}
              className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-primary/20
              bg-primary/10
              px-4
              py-2
              text-sm
              text-primary
              transition
              hover:bg-primary/20
            "
            >
              <Video className="h-4 w-4" />
              Update
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
    <ReEnrollModal
  employee={employee}
  open={openReEnroll}
  onClose={() => setOpenReEnroll(false)}
/>
</>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        {label}
      </p>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 font-medium">
        {value}
      </div>
    </div>
  );
}