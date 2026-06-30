"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { BaseModal } from "@/components/ui/base-modal";
import { Employee } from "@/types/employee";

type Props = {
  employee: Employee;
  open: boolean;
  onClose: () => void;
};

export function DeleteModal({
  employee,
  open,
  onClose,
}: Props) {
  const [confirmation, setConfirmation] = useState("");
  const [checked, setChecked] = useState(false);
const confirmationText = `DELETE ${employee.id}`;

  const canDelete =
  confirmation.trim().toUpperCase() ===
    confirmationText.toUpperCase() &&
  checked;

  function handleDelete() {
    // Backend later

    onClose();

    setConfirmation("");
    setChecked(false);
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      size="md"
      title="Delete Employee"
      description="Permanently remove this employee from SecureVision."
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 hover:bg-white/[0.06]"
          >
            Cancel
          </button>

          <button
            disabled={!canDelete}
            onClick={handleDelete}
            className="
              rounded-xl
              bg-red-500
              px-6
              py-2.5
              font-medium
              text-white
              transition
              disabled:cursor-not-allowed
              disabled:opacity-40
              hover:bg-red-400
            "
          >
            Delete Employee
          </button>
        </>
      }
    >
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-6">

  <div className="flex items-center gap-4">

    <div className="rounded-xl bg-red-500/10 p-4">

      <Trash2 className="h-8 w-8 text-red-400" />

    </div>

    <div>

      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
        Employee
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        {employee.name}
      </h3>

      <p className="mt-1 font-mono text-sm text-white/60">
        {employee.id}
      </p>

    </div>

  </div>

</div>

<div className="my-8 rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-5">

  <p className="text-sm leading-7 text-red-200">

    This action permanently removes the employee,
    facial embeddings, enrollment video and all
    associated recognition records.

    This action cannot be undone.

  </p>

</div>

<div>

  <p className="mb-3 text-sm font-medium">
  Type{" "}
  <span className="font-bold text-red-400">
    {confirmationText}
  </span>{" "}
  to continue
</p>

  <input
    value={confirmation}
    onChange={(e) =>
      setConfirmation(e.target.value)
    }
    placeholder={confirmationText}
    className="
      w-full
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      px-4
      py-3
      outline-none
      transition
      focus:border-red-400
    "
  />

</div>

<label className="mt-6 flex cursor-pointer items-center gap-3">

  <input
    type="checkbox"
    checked={checked}
    onChange={(e) =>
      setChecked(e.target.checked)
    }
  />

  <span className="text-sm text-muted-foreground">

    I understand this action cannot be undone.

  </span>

</label>

    </BaseModal>
  );
}