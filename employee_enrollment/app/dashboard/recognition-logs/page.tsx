import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RecognitionLogsTable } from "@/components/recognition-logs/recognition-logs-table";

export default function RecognitionLogsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Recognition Logs
          </h1>

          <p className="mt-2 text-muted-foreground">
            View all face recognition events across the organization.
          </p>
        </div>

        <RecognitionLogsTable />

      </div>
    </DashboardShell>
  );
}