"use client";

import { useState } from "react";

import {
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";

import { SettingsCard } from "./settings-card";
import { InputField } from "@/components/ui/input-field";

export function ChangePasswordCard() {
const [form, setForm] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const [show, setShow] = useState({
  current: false,
  new: false,
  confirm: false,
});

const [saving, setSaving] = useState(false);

const [errors, setErrors] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const handleSave = async () => {
  setErrors({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  if (!form.currentPassword) {
    setErrors(prev => ({
      ...prev,
      currentPassword: "Current password is required.",
    }));
    return;
  }

  if (!passwordRegex.test(form.newPassword)) {
    setErrors(prev => ({
      ...prev,
      newPassword:
        "Minimum 8 characters and at least one number.",
    }));
    return;
  }

  if (
    form.currentPassword ===
    form.newPassword
  ) {
    setErrors(prev => ({
      ...prev,
      newPassword:
        "New password must be different.",
    }));
    return;
  }

  if (
    form.newPassword !==
    form.confirmPassword
  ) {
    setErrors(prev => ({
      ...prev,
      confirmPassword:
        "Passwords do not match.",
    }));
    return;
  }

  setSaving(true);

try {
  /*
  const response = await fetch("/api/settings/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  */

  // Temporary success
  toast.success("Password updated successfully.");

  setForm({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

} catch (error) {

  setErrors((prev) => ({
    ...prev,
    currentPassword:
      error instanceof Error
        ? error.message
        : "Current password is incorrect.",
  }));

} finally {
  setSaving(false);
}
};

const canSubmit =
  form.currentPassword.trim() !== "" &&
  form.newPassword.trim() !== "" &&
  form.confirmPassword.trim() !== "";

return (
  <SettingsCard
    title="Change Password"
    description="Update your account password."
    icon={Lock}
  >
<div className="space-y-4">

<div className="relative">

<InputField
label="Current Password"
icon={Lock}
type={show.current ? "text" : "password"}
placeholder="Enter current password"
value={form.currentPassword}
error={errors.currentPassword}
onChange={(e) => {
  setForm((prev) => ({
    ...prev,
    currentPassword: e.target.value,
  }));

  setErrors((prev) => ({
    ...prev,
    currentPassword: "",
  }));
}}
/>

<button
type="button"
onClick={() =>
setShow(prev=>({
...prev,
current:!prev.current,
}))
}
className="
absolute
right-4
top-[43px]
text-muted-foreground
"
>
{show.current ? <EyeOff size={18}/> : <Eye size={18}/>}
</button>

</div>

<div className="relative">

<InputField
label="New Password"
icon={Lock}
type={show.new ? "text" : "password"}
placeholder="Enter new password"
value={form.newPassword}
error={errors.newPassword}
onChange={(e) => {
  setForm((prev) => ({
    ...prev,
    newPassword: e.target.value,
  }));

  setErrors((prev) => ({
    ...prev,
    newPassword: "",
    confirmPassword:"",
  }));
}}
/>

<button
type="button"
onClick={() =>
setShow(prev=>({
...prev,
new:!prev.new,
}))
}
className="
absolute
right-4
top-[43px]
text-muted-foreground
"
>
{show.new ? <EyeOff size={18}/> : <Eye size={18}/>}
</button>

</div>

<div className="relative">

<InputField
label="Confirm Password"
icon={Lock}
type={show.confirm ? "text" : "password"}
placeholder="Confirm new password"
value={form.confirmPassword}
error={errors.confirmPassword}
onChange={(e) => {
  setForm((prev) => ({
    ...prev,
    confirmPassword: e.target.value,
  }));

  setErrors((prev) => ({
    ...prev,
    confirmPassword: "",
  }));
}}
/>

<button
type="button"
onClick={() =>
setShow(prev=>({
...prev,
confirm:!prev.confirm,
}))
}
className="
absolute
right-4
top-[43px]
text-muted-foreground
"
>
{show.confirm ? <EyeOff size={18}/> : <Eye size={18}/>}
</button>

</div>

<div className="flex justify-end">

<button
onClick={handleSave}
disabled={!canSubmit || saving}
className="
rounded-xl
bg-violet-500
px-6
py-2.5
font-medium
text-white
transition
hover:bg-violet-400
disabled:opacity-50
disabled:cursor-not-allowed
"
>

{saving
? "Updating..."
: "Update Password"}

</button>

</div>
</div>

</SettingsCard>

);
}