"use client";

import { useState } from "react";
import { BaseModal } from "@/components/ui/base-modal";
import { EmployeeListItem } from "@/types/employee";
import {
  Shield,
  CheckCircle2,
  Loader2,
  Circle,
  FileText,
} from "lucide-react";
import { generateEmployeeReport } from "@/lib/pdf/generateEmployeeReport";

type Props = {
  employee: EmployeeListItem;
  open: boolean;
  onClose: () => void;
};

export function DownloadReportModal({
  employee,
  open,
  onClose,
}: Props) {
    const [generating, setGenerating] = useState(false);

const [completed, setCompleted] = useState(false);
const [finalizing, setFinalizing] = useState(false);
const [progress, setProgress] = useState(0);

const [currentStep, setCurrentStep] = useState(0);

const steps = [
  "Collecting employee information",
  "Generating recognition statistics",
  "Compiling attendance history",
  "Embedding verification QR code",
  "Rendering SecureVision PDF",
];

async function generateReport() {
  setGenerating(true);

  for (let i = 0; i < steps.length; i++) {
    setCurrentStep(i);

setProgress((i / steps.length) * 100);

await new Promise((resolve) =>
  setTimeout(resolve, 900)
);

setProgress(((i + 1) / steps.length) * 100);
  }

  setFinalizing(true);

await new Promise((resolve) =>
  setTimeout(resolve, 700)
);

setFinalizing(false);

setCompleted(true);
}

function resetModal() {
  setGenerating(false);
  setCompleted(false);
  setProgress(0);
  setCurrentStep(0);
}

function handleClose() {
  resetModal();
  onClose();
}

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      size="md"
      title="Generate Security Report"
      description={`Create an official SecureVision report for ${employee.name}.`}
      footer={
  completed ? (
    <>
      <button
        onClick={handleClose}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 hover:bg-white/[0.06]"
      >
        Close
      </button>

      <button
        onClick={ async () =>{ await generateEmployeeReport(employee)}}
        className="rounded-xl bg-cyan-500 px-6 py-2.5 font-medium text-black hover:bg-cyan-400"
      >
        Download PDF
      </button>
    </>
  ) : (
    <>
      <button
        onClick={handleClose}
        disabled={generating}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 hover:bg-white/[0.06] disabled:opacity-50"
      >
        Cancel
      </button>

      <button
        onClick={generateReport}
        disabled={generating}
        className="rounded-xl bg-cyan-500 px-6 py-2.5 font-medium text-black hover:bg-cyan-400 disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate Report"}
      </button>
    </>
  )
}
    >
        {!generating ? (
          <>
      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] p-6">

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-7">

  <div className="flex items-center gap-4">

    <div className="flex h-16 w-28 items-center justify-center rounded-2xl bg-cyan-500/15">

      {/* Later we'll replace this with your logo */}

      <Shield className="h-8 w-8 text-cyan-400" />

    </div>

    <div>

      <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">
        SecureVision
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        Employee Security Report
      </h3>

      <p className="mt-2 text-white/70">
        A professionally formatted PDF containing employee
    information, recognition statistics and activity logs.
      </p>

    </div>

  </div>

</div>


</div>

<div className="mt-8">

  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
    Included Sections
  </p>

  <div className="space-y-4">

    <ReportItem text="Employee Information" />

    <ReportItem text="Recognition Statistics" />

    <ReportItem text="Recognition History" />

    <ReportItem text="Attendance History" />

    <ReportItem text="Alert History" />

  </div>

</div>

<div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

  <div className="flex justify-between">

    <span className="text-muted-foreground">
      File Name
    </span>

    <span className="font-mono">
      employee_{employee.id}.pdf
    </span>

  </div>

  <div className="mt-4 flex justify-between">

    <span className="text-muted-foreground">
      Estimated Size
    </span>

    <span>~300 KB</span>

  </div>

  <div className="mt-4 flex justify-between">

    <span className="text-muted-foreground">
      Format
    </span>

    <span>PDF</span>

  </div>

  </div>
  </>
 ) : (

<div className="py-8">

  <div className="mb-8 text-center">

    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
      {finalizing ? (

      <FileText className="h-10 w-10 animate-pulse text-cyan-400" />
      ) : (

    <FileText className="h-10 w-10 animate-pulse text-cyan-400" />

  )}
    </div>

    <h3 className="text-2xl font-semibold">

      Generating Security Report

    </h3>

    <p className="mt-2 text-muted-foreground">

      Please wait while SecureVision prepares your report...

    </p>

    <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">

  <div
    className="h-full rounded-full bg-cyan-400 transition-all duration-700"
    style={{
      width: `${progress}%`,
    }}
  />

</div>

<p className="mt-3 text-center text-sm text-cyan-300">

  {Math.round(progress)}%

</p>

<div className="mt-8 space-y-4">

  {finalizing && (

<div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 animate-in fade-in duartion-500">

  <div className="flex items-center gap-3">

    <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />

    <p className="font-medium">

      Finalizing SecureVision report...

    </p>

  </div>

</div>

)}

  {steps.map((step, index) => (

    <div
      key={step}
      className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all"
    >

      {/* Icon */}

      {completed || index < currentStep ? (

  <CheckCircle2 className="h-6 w-6 text-emerald-400" />

) : index === currentStep ? (

  <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />

) : (

  <Circle className="h-6 w-6 text-white/25" />

)}

      {/* Step text */}

      <div className="flex-1">

        <p
          className={`font-medium ${
            index <= currentStep
              ? "text-white"
              : "text-white/40"
          }`}
        >
          {step}
        </p>

      </div>

    </div>

  ))}

</div>

  </div>

</div>

)}

    </BaseModal>
  );
}

function ReportItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">

        <div className="h-2 w-2 rounded-full bg-emerald-400" />

      </div>

      <span>{text}</span>

    </div>
  );
}