"use client";

import { useState } from "react";
import { logout } from "@/lib/logout";
import {
  LogOut,
  TriangleAlert,
} from "lucide-react";

import { SettingsCard } from "./settings-card";

export function LogoutCard() {
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
  setLoggingOut(true);

  try {

    /*
      Later:

      localStorage.removeItem("token");

      router.push("/login");
    */
   logout();

  } finally {
    setLoggingOut(false);
  }
};

return (
  <SettingsCard
    title="Logout"
    description="End your current SecureVision session."
    icon={LogOut}
  >
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">

  <div className="flex items-start gap-4">

    <div className="rounded-xl bg-amber-500/10 p-2.5">

      <TriangleAlert className="h-6 w-6 text-amber-400" />

    </div>

    <div>

      <h4 className="font-medium text-white">
        Ready to leave?
      </h4>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Logging out will end your current session.
        You'll need to sign in again to access the dashboard.
      </p>

    </div>

  </div>

</div>

<div className="mt-4 flex justify-end">

  <button
    onClick={handleLogout}
    disabled={loggingOut}
    className="
      rounded-xl
      bg-red-500
      px-6
      py-2.5
      font-medium
      text-white
      transition
      hover:bg-red-400
      hover:shadow-[0_0_24px_rgba(239,68,68,0.35)]
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    {loggingOut
      ? "Logging Out..."
      : "Logout"}
  </button>

</div>

  </SettingsCard>
);
}
