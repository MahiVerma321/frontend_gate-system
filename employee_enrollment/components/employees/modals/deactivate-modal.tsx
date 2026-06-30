"use client";

import { TriangleAlert } from "lucide-react";

import { BaseModal } from "@/components/ui/base-modal";
import { Employee } from "@/types/employee";

type Props = {
  employee: Employee;
  open: boolean;
  onClose: () => void;
};

export function DeactivateModal({
  employee,
  open,
  onClose,
}: Props) {
  function handleDeactivate() {
    // API call later

    onClose();
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      size="md"
      title="Deactivate Employee"
      description={`Disable facial recognition for ${employee.name}.`}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 hover:bg-white/[0.06]"
          >
            Cancel
          </button>

          <button
            onClick={handleDeactivate}
            className="
rounded-xl
bg-amber-500
px-6
py-2.5
font-medium
text-black
transition
hover:bg-amber-400
hover:scale-[1.02]
active:scale-95
"
          >
            Deactivate
          </button>
        </>
      }
    >
      <div className="text-center">

        <div className="flex items-center justify-center">

          <div className="mb-2 flex items-center justify-center gap-24">

  <div className="text-center">

    <div className="mx-auto mb-2 h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,.8)]" />

    <p className="font-semibold">
      Active
    </p>

  </div>

  <div className="text-3xl text-white/30">
    →
  </div>

  <div className="text-center">

    <div className="mx-auto mb-2 h-4 w-4 rounded-full bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,.8)]" />

    <p className="font-semibold">
      Inactive
    </p>

  </div>

</div>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
    Employee
  </p>

  <h3 className="mt-2 text-2xl font-bold">
    {employee.name}
  </h3>

  <p className="mt-1 text-muted-foreground">
    {employee.id}
  </p>

</div>

<div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <h3 className="mt-6 text-2xl font-semibold">

          Temporarily Disable Recognition

        </h3>

        <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">

          This employee will no longer be recognized by
          SecureVision until they are reactivated.

        </p>

        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">

          <p className="text-sm text-amber-300">

            This action is reversible.

          </p>

        </div>

      </div>
    </BaseModal>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]" />

      <span className="text-sm text-muted-foreground">
        {text}
      </span>

    </div>
  );
}