"use client";

import { useEffect, useState } from "react";

import {
  UserCircle2,
  User,
  Mail,
} from "lucide-react";

import { SettingsCard } from "./settings-card";
import { InputField } from "@/components/ui/input-field";
import { toast } from "sonner";

export function AdminProfileCard() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [saving, setSaving] = useState(false);
const [originalProfile, setOriginalProfile] = useState({
  name: "",
  email: "",
});

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const nameRegex =
/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
  // temporary until backend

  const stored =
  localStorage.getItem("securevision-user");

if (stored) {

  const user = JSON.parse(stored);
  const fullName = user.fullName ?? "";
    const email = user.email ?? "";

  setName(fullName);

  setEmail(email);

  setOriginalProfile({
      name: fullName,
      email: email,
    });
  }
  /*
  Later:

  const fetchProfile = async () => {
      const res = await fetch("/api/settings/profile");
      const data = await res.json();

      setName(data.userName);
      setEmail(data.email);

      setOriginalProfile({
          name: data.userName,
          email: data.email,
      });
  }

  fetchProfile();
  */

}, []);

  const handleSave = async () => {
  setErrors({
    name: "",
    email: "",
  });

  if (!name.trim()) {
    setErrors(prev => ({
      ...prev,
      name: "Name is required.",
    }));
    return;
  }

  if (!nameRegex.test(name.trim())) {
    setErrors(prev => ({
      ...prev,
      name: "Only letters and spaces are allowed.",
    }));
    return;
  }

  if (!email.trim()) {
    setErrors(prev => ({
      ...prev,
      email: "Email is required.",
    }));
    return;
  }

  if (!emailRegex.test(email.trim())) {
    setErrors(prev => ({
      ...prev,
      email: "Enter a valid email.",
    }));
    return;
  }

  const cleanedName = name.trim();
  const cleanedEmail = email.trim();

  setSaving(true);

  try {
    // later:
    // await fetch("/api/settings/profile", {...})

    setOriginalProfile({
      name: cleanedName,
      email: cleanedEmail,
    });

    setName(cleanedName);
    setEmail(cleanedEmail);

    toast.success("Profile updated successfully.");
  } finally {
    setSaving(false);
  }
};

  const hasChanges =
  (name ?? "").trim() !== originalProfile.name ||
  (email ?? "").trim() !== originalProfile.email;

  return (
    <SettingsCard
      title="Administrator Profile"
      description="Manage your account details."
      icon={UserCircle2}
    >
      <div className="space-y-4">

        <InputField
          label="Name"
          icon={User}
          value={name}
          error={errors.name}
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

            if (!nameRegex.test(value.trim())) {
              setErrors(prev => ({
                ...prev,
                name:
                  "Only letters and spaces are allowed.",
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
          value={email}
          error={errors.email}
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

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={
  saving ||
  !hasChanges ||
  !!errors.name ||
  !!errors.email
}
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
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </div>

      </div>
    </SettingsCard>
  );
}