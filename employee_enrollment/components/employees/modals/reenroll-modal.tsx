"use client";

import { useRef, useState } from "react";
import { Upload, Video, X } from "lucide-react";

import { BaseModal } from "@/components/ui/base-modal";
import { EmployeeListItem } from "@/types/employee";

type Props = {
  employee: EmployeeListItem;
  open: boolean;
  onClose: () => void;
};

export function ReEnrollModal({
  employee,
  open,
  onClose,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState("");
  const [file, setFile] = useState<File | null>(null);
   const [dragging, setDragging] = useState(false);
   const [processing, setProcessing] = useState(false);
const [progress, setProgress] = useState(0);
const [currentStep, setCurrentStep] = useState(0);
const [completed, setCompleted] = useState(false);

  function chooseFile() {
    inputRef.current?.click();
  }

  function validateVideo(file: File) {
  const allowedTypes = [
    "video/mp4",
    "video/quicktime", // mov
    "video/x-msvideo", // avi
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Only MP4, MOV and AVI videos are supported.";
  }

  const maxSize = 100 * 1024 * 1024;

  if (file.size > maxSize) {
    return "Maximum allowed size is 100 MB.";
  }

  return "";
}

const steps = [
  "Uploading video",
  "Detecting face",
  "Extracting facial embeddings",
  "Updating employee profile",
  "Finalizing enrollment",
];

function handleClose() {
  setFile(null);
  setFileError("");
  setDragging(false);
  setProcessing(false);
  setProgress(0);
  setCurrentStep(0);
  setCompleted(false);

  onClose();

  if (inputRef.current) {
  inputRef.current.value = "";
}

}

  function handleChange(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const selected = e.target.files?.[0];

  if (!selected) return;

  const validation = validateVideo(selected);

  if (validation) {
      if (inputRef.current) {
  inputRef.current.value = "";
}
    setFile(null);
    setFileError(validation);
    return;
  }

  setFileError("");
  setFile(selected);
  setDragging(false);
}

  function handleDrop(
  e: React.DragEvent<HTMLDivElement>
) {
  e.preventDefault();

  setDragging(false);

  const selected = e.dataTransfer.files?.[0];

  if (!selected) return;

const validation = validateVideo(selected);

if (validation) {
  setFile(null);
  setFileError(validation);
  return;
}

setFileError("");
setFile(selected);
setDragging(false);

}

async function startEnrollment() {
  if (!file) return;
  setProcessing(true);

  for (let i = 0; i < steps.length; i++) {
    setCurrentStep(i);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setProgress(((i + 1) / steps.length) * 100);
  }

  setCompleted(true);

  setTimeout(() => {
    handleClose();
  }, 1800);
}

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      size="md"
      title="Re-enroll Employee"
      description={`Upload a new enrollment video for ${employee.name}.`}
      footer={
        processing
        ? null
        : (
        <>
          <button
            onClick={handleClose}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 hover:bg-white/[0.06]"
          >
            Cancel
          </button>

          <button
    disabled={!file || processing}
    onClick={startEnrollment}

            className="
              rounded-xl
              bg-cyan-500
              px-6
              py-2.5
              font-medium
              text-black
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Start Re-enrollment
          </button>
        </>
        )
      }
    >
        {!processing ? (
            <>
        <div
  onClick={chooseFile}
  onDragOver={(e) => {
    e.preventDefault();
    setDragging(true);
  }}
  onDragLeave={() => setDragging(false)}
  onDrop={handleDrop}
  className={`
cursor-pointer
rounded-3xl
border-2
border-dashed
p-12
text-center
transition-all
duration-300

${
  dragging
    ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
    : "border-cyan-500/30 bg-cyan-500/[0.03] hover:border-cyan-400 hover:bg-cyan-500/[0.05]"
}
`}

>
    
  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">
    <Upload className="h-10 w-10 text-cyan-400" />
  </div>

  <h3 className="mt-6 text-xl font-semibold">
    Drop Enrollment Video Here
  </h3>

  <p className="mt-2 text-muted-foreground">
    or click to browse
  </p>

<div className="mt-6 space-y-2 text-sm text-muted-foreground">

    <p>Supported Formats: MP4 • MOV • AVI</p>

    <p>Recommended Length: 10-15 seconds</p>

    <p>Maximum Size: 100 MB</p>

</div>

  <input
    ref={inputRef}
    hidden
    type="file"
    accept="video/*"
    onChange={handleChange}
  />
</div>

{fileError && (
  <p className="mt-4 text-sm text-red-400">
    {fileError}
  </p>
)}

{file && (
  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="rounded-xl bg-cyan-500/10 p-3">
          <Video className="h-6 w-6 text-cyan-400" />
        </div>

        <div>

          <p className="font-medium">
            {file.name}
          </p>

          <p className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <p className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
  Ready for processing
</p>

        </div>

      </div>

      <button
        onClick={() => {
  setFile(null);
  setFileError("");

  if (inputRef.current) {
    inputRef.current.value = "";
  }
}}
        className="rounded-lg p-2 hover:bg-white/5"
      >
        <X className="h-5 w-5" />
      </button>

    </div>

  </div>
)}
</>
) : (
    <div className="py-8">

  <div className="mb-8 text-center">

    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

      <Video className="h-10 w-10 animate-pulse text-cyan-400" />

    </div>

    <h3 className="text-2xl font-semibold">

      {completed
        ? "Enrollment Complete"
        : "Processing Video"}

    </h3>

    <p className="mt-2 text-muted-foreground">

      {completed
        ? "Employee successfully re-enrolled."
        : "Preparing AI recognition pipeline..."}

    </p>

  </div>

  <div className="mb-8 h-3 overflow-hidden rounded-full bg-white/10">

    <div
      className="h-full rounded-full bg-cyan-400 transition-all duration-700"
      style={{
        width: `${progress}%`,
      }}
    />

  </div>

  <div className="space-y-4">

    {steps.map((step, index) => (

      <div
        key={step}
        className="flex items-center justify-between"
      >

        <span>{step}</span>

        {index < currentStep && (
          <span className="text-emerald-400">
            ✓
          </span>
        )}

        {index === currentStep && !completed && (
          <span className="animate-pulse text-cyan-400">
            ●
          </span>
        )}

      </div>

    ))}

  </div>

</div>
)}

</BaseModal>
  );
}