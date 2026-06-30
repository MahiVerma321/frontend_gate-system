"use client";

import { useState } from "react";
import {
  User,
  Mail,
  IdCard,
  Video,
} from "lucide-react";
import { BaseModal } from "@/components/ui/base-modal";
import { InputField } from "@/components/ui/input-field";
import { useEmployees } from "@/context/employee-context";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AddEmployeeModal({
  open,
  onClose,
}: Props) {
  const [employeeId, setEmployeeId] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [videoUrl, setVideoUrl] = useState("");
const { employees, loadEmployees } = useEmployees();
const [loading, setLoading] = useState(false);
//const themes = ["cyan", "blue", "purple", "green", "amber", "violet"] as const;
const idRegex = /^[A-Za-z0-9_-]+$/;
const nameRegex = /^[A-Za-z\s'-]+$/;
const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//const avatarTheme =
//  themes[Math.floor(Math.random() * themes.length)];

const [errors, setErrors] = useState({
  employeeId: "",
  name: "",
  email: "",
  videoUrl: "",
});

const isFormValid =
  employeeId.trim() &&
  name.trim() &&
  email.trim() &&
  videoUrl.trim() &&
  !errors.employeeId &&
  !errors.name &&
  !errors.email &&
  !errors.videoUrl;

function resetForm() {
  setEmployeeId("");
  setName("");
  setEmail("");
  setVideoUrl("");

  setErrors({
    employeeId: "",
    name: "",
    email: "",
    videoUrl: "",
  });
}

const handleSubmit = async () => {
  setErrors({
    employeeId: "",
    name: "",
    email: "",
    videoUrl: "",
  });


if (!idRegex.test(employeeId.trim())) {
  setErrors(prev => ({
    ...prev,
    employeeId:
      "Only letters, numbers, '-' and '_' are allowed."
  }));
  return;
}

  if (!name.trim()) {
  setErrors(prev => ({
    ...prev,
    name: "Name is required."
  }));
  return;
}

if (!nameRegex.test(name.trim())) {
  setErrors(prev => ({
    ...prev,
    name: "Only letters and spaces are allowed."
  }));
  return;
}

if (!email.trim()) {
  setErrors(prev => ({
    ...prev,
    email: "Email is required."
  }));
  return;
}

if (!emailRegex.test(email.trim())) {
  setErrors(prev => ({
    ...prev,
    email: "Enter a valid email address."
  }));
  return;
}

if (!videoUrl.trim()) {
  setErrors(prev => ({
    ...prev,
    videoUrl: "Video URL is required."
  }));
  return;
}

try {
  new URL(videoUrl);
} catch {
  setErrors(prev => ({
    ...prev,
    videoUrl: "Enter a valid URL."
  }));
  return;
}

  if (
    employees.some(
      e =>
        e.id.toLowerCase() ===
        employeeId.trim().toLowerCase()
    )
  ) {
    setErrors(prev => ({
      ...prev,
      employeeId: "Employee ID already exists."
    }));
    return;
  }
  setLoading(true);

//const newEmployee: EmployeeListItem = {
//  id: employeeId.trim(),
//  name: name.trim(),
//  email: email.trim(),

//  status: "outside",

//  lastEvent: "registered",

//  accountStatus: "active",

//  lastSeen: "Just now",

//  avatarTheme,

//  videoUrl: videoUrl.trim(),

//  registeredOn: new Date().toLocaleDateString("en-GB", {
//    day: "numeric",
//    month: "long",
//    year: "numeric",
//  }),

//  totalRecognitions: 0,

//  attendanceToday: "Not Marked",

//  alertsGenerated: 0,

//  recognitionHistory: [],

//  attendanceHistory: [],

//  alertHistory: [],
//};

  try {

  const response = await fetch("/api/employees/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    employeeId: employeeId.trim(),
    name: name.trim(),
    email: email.trim(),
    videoUrl: videoUrl.trim(),
//    accountStatus: "active",
  }),
}
);

const data = await response.json();

if (!response.ok || !data.success) {
  toast.error(
    data.message ??
      "Failed to create employee."
  );
  return;
}

await loadEmployees();
  resetForm();
  toast.success(`${name.trim()} has been registered successfully.`);
  
  onClose();

  } catch (error: any) {
  toast.error(
    error?.message ??
      "Failed to create employee."
  );
} finally{
  setLoading(false);

}
};

  return (
    <BaseModal
    open={open}
    onClose={onClose}
    title="Add Employee"
    description="Register a new employee."
    footer={
  <>
    <button
      onClick={onClose}
      className="
        rounded-xl
        border
        border-white/10
        px-5
        py-2
        transition
        hover:bg-white/5
      "
    >
      Cancel
    </button>

    <button
  onClick={handleSubmit}
disabled={loading || !isFormValid}
  className="
    rounded-xl
    bg-cyan-500
    px-5
    py-2
    font-medium
    text-black
    transition
    hover:bg-cyan-400
    disabled:bg-cyan-500/30
disabled:text-white/50
disabled:cursor-not-allowed
  "
>
  {loading ? "Creating..." : "Add Employee"}
</button>
  </>
}
    >

        <div className="space-y-5">

  <InputField
    label="Employee ID"
    icon={IdCard}
    error={errors.employeeId}
    value={employeeId}
    onChange={(e) => {
  const value = e.target.value;

  setEmployeeId(value);

  if (!value.trim()) {
    setErrors(prev => ({
      ...prev,
      employeeId: "Employee ID is required.",
    }));
    return;
  }

  if (!idRegex.test(value.trim())) {
    setErrors(prev => ({
      ...prev,
      employeeId:
        "Only letters, numbers, '-' and '_' are allowed.",
    }));
    return;
  }

  if (
    employees.some(
      emp =>
        emp.id.toLowerCase() ===
        value.trim().toLowerCase()
    )
  ) {
    setErrors(prev => ({
      ...prev,
      employeeId: "Employee ID already exists.",
    }));
    return;
  }

  setErrors(prev => ({
    ...prev,
    employeeId: "",
  }));
}}
  />

  <InputField
    label="Full Name"
    icon={User}
    error={errors.name}
    value={name}
    onChange={(e) => {
  const value = e.target.value;

  setName(value);

  if (!value.trim()) {
    setErrors(prev => ({
      ...prev,
      name: "Name is required.",
    }));
    return;
  }

  if (!nameRegex.test(value)) {
    setErrors(prev => ({
      ...prev,
      name: "Only letters are allowed.",
    }));
    return;
  }

  setErrors(prev => ({
    ...prev,
    name: "",
  }));
}}
  />

  <InputField
  label="Email Address"
  icon={Mail}
  type="email"
  error={errors.email}
  value={email}
  onChange={(e) => {
  const value = e.target.value;

  setEmail(value);

  if (!value.trim()) {
    setErrors(prev => ({
      ...prev,
      email: "Email is required.",
    }));
    return;
  }

  if (!emailRegex.test(value.trim())) {
    setErrors(prev => ({
      ...prev,
      email: "Enter a valid email.",
    }));
    return;
  }

  setErrors(prev => ({
    ...prev,
    email: "",
  }));
}}
/>

  <InputField
  label="Video URL"
  icon={Video}
  error={errors.videoUrl}
  value={videoUrl}
  onChange={(e) => {
  const value = e.target.value;

  setVideoUrl(value);

  if (!value.trim()) {
    setErrors(prev => ({
      ...prev,
      videoUrl: "Video URL is required.",
    }));
    return;
  }

  try {
    new URL(value);

    setErrors(prev => ({
      ...prev,
      videoUrl: "",
    }));
  } catch {
    setErrors(prev => ({
      ...prev,
      videoUrl: "Enter a valid URL.",
    }));
  }
}}
/>

</div>

    </BaseModal>
  );
}