import { Settings } from "lucide-react";

export function SettingsHeader() {
  return (
    <div className="mb-1 flex items-center gap-4">
      <div className="rounded-xl bg-violet-500/10 p-2.5">
        <Settings className="h-6 w-6 text-violet-400" />
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your administrator account and application preferences.
        </p>
      </div>
    </div>
  );
}