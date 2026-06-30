"use client";

import { toast } from "sonner";

export function logout() {
  // Later:
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");

  toast.success("Logged out successfully.");

  window.location.href = "/login";
}