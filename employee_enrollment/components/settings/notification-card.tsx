"use client";

import { useState} from "react";

import { BellRing } from "lucide-react";

import { toast } from "sonner";

import { SettingsCard } from "./settings-card";

export function NotificationPreferencesCard() {
    const [enabled, setEnabled] = useState(true);

  const [originalEnabled, setOriginalEnabled] =
    useState(true);

  const [saving, setSaving] = useState(false);

    const handleSave = async () => {
    setSaving(true);

    try {
      /*
        Later:

        await fetch("/api/settings/notifications", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enabled,
          }),
        });
      */

      setOriginalEnabled(enabled);

      toast.success(
        "Notification preferences updated."
      );

    } finally {
      setSaving(false);
    }
  };

    const hasChanges =
    enabled !== originalEnabled;

return (
  <SettingsCard
    title="Notification Preferences"
    description="Control how SecureVision notifies you."
    icon={BellRing}
  >
    <div className="space-y-4">

      {/* Toggle Section */}
      <div className="flex items-start justify-between gap-4">

        <div>

          <div className="flex items-center gap-2">

            <h4 className="px-11 font-medium text-white">
              Enable Dashboard Notifications
            </h4>

          </div>

        </div>

        {/* Toggle */}

        <button
          type="button"
          onClick={() => setEnabled(prev => !prev)}
          className={`
            relative
            h-6
            w-14
            rounded-full
            transition-all
            duration-300
            ${enabled
              ? "bg-violet-500"
              : "bg-white/10"}
          `}
        >
          <span
            className={`
              absolute
              top-1
              h-4
              w-4
              rounded-full
              bg-white
              transition-all
              duration-300
              ${enabled
                ? "left-9"
                : "left-1"}
            `}
          />
        </button>

      </div>

      {/* Divider */}

      <div className="border-t border-white/10" />

      {/* Save Button */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="
            rounded-xl
            bg-violet-500
            px-6
            py-2.5
            font-medium
            text-white
            transition
            hover:bg-violet-400
            hover:shadow-[0_0_24px_rgba(139,92,246,0.35)]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {saving
            ? "Saving..."
            : "Save Preferences"}
        </button>

      </div>

    </div>
  </SettingsCard>
);
}