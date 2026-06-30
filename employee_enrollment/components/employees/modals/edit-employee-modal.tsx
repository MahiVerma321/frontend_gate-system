"use client";

import { EmployeeListItem } from "@/types/employee";
import { toast } from "sonner";
import { BaseModal } from "@/components/ui/base-modal";
import {
  User,
  Mail,
  BadgeInfo,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import { InputField } from "@/components/ui/input-field";
import { useEffect, useState } from "react";
import { useEmployees } from "@/context/employee-context";

type Props = {
  employee: EmployeeListItem;

  open: boolean;

  onClose: () => void;

  onSave?: (employee: EmployeeListItem) => void;
};

export function EditEmployeeModal({
  employee,
  open,
  onClose,
  onSave,
}: Props) {
const [form, setForm] = useState<EmployeeListItem | null>(null);
const [errors, setErrors] = useState({
  name: "",
  email: "",
});
const [loading, setLoading] = useState(false);
const nameRegex = /^[A-Za-z\s'-]+$/;

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

useEffect(() => {
  if (employee) {
    setForm(employee);
    setErrors({ name:"", email:""});
  }
}, [employee]);

if (!form) return null;

  const updateStatus = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  setForm(prev => prev ? {
    ...prev,
    accountStatus: e.target.value as EmployeeListItem["accountStatus"],
  } : prev);
};

    const handleClose = () => {
  setErrors({
    name: "",
    email: "",
  });

  setForm(employee);

  onClose();
};

    const handleSave = async () => {
  setErrors({
    name: "",
    email: "",
  });

  if (!form.name.trim()) {
    setErrors(prev => ({
      ...prev,
      name: "Name is required.",
    }));
    return;
  }

  if (!nameRegex.test(form.name.trim())) {
    setErrors(prev => ({
      ...prev,
      name: "Only letters and spaces are allowed.",
    }));
    return;
  }

  if (!form.email.trim()) {
    setErrors(prev => ({
      ...prev,
      email: "Email is required.",
    }));
    return;
  }

  if (!emailRegex.test(form.email.trim())) {
    setErrors(prev => ({
      ...prev,
      email: "Enter a valid email address.",
    }));
    return;
  }

  setLoading(true);

   try {

    const res = await fetch(
      "/api/employees/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      employeeId: form.id,
      name: form.name.trim(),
      email: form.email.trim(),
      accountStatus: form.accountStatus,
        }),
      }
    );

    const data = await res.json();

if (!res.ok || !data.success) {
    toast.error(
        data.message ??
        "Failed to update employee."
    );
    return;
}

    toast.success("Employee updated successfully.");
    handleClose();
    
  } catch (error: any) {
    toast.error(
        error?.message ??
        "Failed to update employee."
    );

}
finally{

    setLoading(false);

}

//  const cleanedEmployee = {
//  ...form,
//  name: form.name.trim(),
//  email: form.email.trim(),
//};

//onSave?.(cleanedEmployee);
//toast.success("Employee updated successfully.");

//setForm(cleanedEmployee);

//handleClose();
//};

const hasChanges =
    form.name.trim() !==
        employee.name.trim() ||

    form.email.trim().toLowerCase() !==
        employee.email.trim().toLowerCase() ||

    form.accountStatus !==
        employee.accountStatus;

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Edit Employee"
      description="Update employee information."
      footer={
        <>
          <button
            onClick={handleClose}
           className="
rounded-xl
border border-white/10
bg-white/[0.03]
px-6
py-2.5
transition
hover:bg-white/[0.08]
"
          >
            Cancel
          </button>

          <button
  onClick={handleSave}
  disabled={
  !hasChanges ||
  !!errors.name ||
  !!errors.email ||
  loading
}

  className="
    rounded-xl
    bg-cyan-500
    px-6
    py-2.5
    font-semibold
    text-black
    transition
    hover:bg-cyan-400
    hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading ? "Saving..." : "Save Changes"}

</button>
        </>
      }
    >
      <div className="grid gap-6">

        {/* Name */}

        <InputField
  label="Full Name"
  icon={User}
  value={form.name}
  error={errors.name}
  onChange={(e) => {
  const value = e.target.value;

  setForm(prev =>
    prev
        ? {
              ...prev,
              name: value,
          }
        : prev
);

  if (!value.trim()) {
    setErrors(prev => ({
      ...prev,
      name: "Name is required.",
    }));
    return;
  }

  if (!nameRegex.test(value.trim())) {
    setErrors(prev => ({
      ...prev,
      name: "Only letters and spaces are allowed.",
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
  label="Email"
  icon={Mail}
  value={form.email}
  error={errors.email}
  onChange={(e) => {
  const value = e.target.value;

  setForm(prev =>
    prev
        ? {
              ...prev,
              email: value,
          }
        : prev
);

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

<div className="space-y-2">
  <InputField
    label="Employee ID"
    icon={BadgeInfo}
    value={form.id}
    disabled
  />

  <p className="px-3 text-sm text-muted-foreground">
    Employee IDs cannot be changed after registration.
  </p>
</div>

        {/* Account Status */}

<div>
  <label
  className="
    mb-2
    flex
    items-center
    gap-2
    text-xs
    uppercase
    tracking-[0.22em]
    font-semibold
    text-muted-foreground
  "
>
  <ShieldCheck className="h-4 w-4 text-cyan-400" />
  Account Status
</label>

  <div className="relative">
    <select
      value={form.accountStatus}
      onChange={updateStatus}
      className="
        appearance-none
        w-full
        rounded-2xl
        border
        border-white/10
        bg-[#101826]
        text-white
        px-5
        py-3.5
        pr-10
        outline-none
        transition-all
        hover:border-white/20
        focus:border-cyan-400
        focus:bg-[#121d2d]
      "
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    {/* Chevron Icon */}
    <ChevronDown
      className="
        pointer-events-none
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        h-4 w-4
        text-muted-foreground
      "
    />
  </div>
</div>

      </div>

    </BaseModal>
  );
}

type FieldProps = {
  label: string;

  value: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}}
