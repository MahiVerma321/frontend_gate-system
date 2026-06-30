"use client";

import {
  Pencil,
  RefreshCcw,
  UserX,
  Download,
  Trash2,
} from "lucide-react";

import { GlassCard } from "@/components/dashboard/glass-card";
import { ActionCard } from "@/components/ui/action-card";
import { useState } from "react";
import { EmployeeListItem } from "@/types/employee";
import { EditEmployeeModal } from "../modals/edit-employee-modal";
import { ReEnrollModal } from "../modals/reenroll-modal";
import { DeactivateModal } from "../modals/deactivate-modal";
import { DeleteModal } from "../modals/delete-modal";
import { DownloadReportModal } from "../modals/download-report-modal";

type Props = {
  employee: EmployeeListItem;
};

export function ActionCenter({
  employee,
}: Props) {
    type ModalType =
  | "edit"
  | "reenroll"
  | "deactivate"
  | "delete"
  | "download"
  | null;

const [activeModal, setActiveModal] =
  useState<ModalType>(null);
  return (
    <>
    
    <GlassCard
      tint="violet"
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Action Center
        </h2>

        <p className="mt-1 text-muted-foreground">
          Manage this employee profile
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <ActionCard
          title="Edit Employee"
          description="Update employee information and enrollment details."
          icon={Pencil}
          accent="cyan"
          iconColor="text-primary"
          onClick={() => setActiveModal("edit")}
        />

        <ActionCard
          title="Re-enroll Face"
          description="Generate new embeddings using a new enrollment video."
          icon={RefreshCcw}
          accent="green"
          iconColor="text-success"
          onClick={() => setActiveModal("reenroll")}
        />

        <ActionCard
          title="Download Profile"
          description="Export employee information and recognition history."
          icon={Download}
          accent="amber"
          iconColor="text-warning"
          onClick={() => setActiveModal("download")}
        />

        <ActionCard
          title="Deactivate Employee"
          description="Disable recognition while keeping historical records."
          icon={UserX}
          accent="violet"
          iconColor="text-chart-5"
          onClick={() => setActiveModal("deactivate")}
        />

      </div>

      <div className="mt-6">
        <ActionCard
          title="Delete Employee"
          description="Permanently remove this employee and all associated facial embeddings."
          icon={Trash2}
          accent="red"
          iconColor="text-destructive"
          onClick={() => setActiveModal("delete")}
        />
      </div>
    </GlassCard>
    <EditEmployeeModal
  employee={employee}
  open={activeModal === "edit"}
  onClose={() => setActiveModal(null)}
/>

<ReEnrollModal
  employee={employee}
  open={activeModal === "reenroll"}
  onClose={() => setActiveModal(null)}
/>

<DeactivateModal
    employee={employee}
    open={activeModal === "deactivate"}
    onClose={() => setActiveModal(null)}
/>

<DeleteModal
  employee={employee}
  open={activeModal === "delete"}
  onClose={() => setActiveModal(null)}
/>

<DownloadReportModal
    employee={employee}
    open={activeModal === "download"}
    onClose={() => setActiveModal(null)}
/>

      </>
  );
}