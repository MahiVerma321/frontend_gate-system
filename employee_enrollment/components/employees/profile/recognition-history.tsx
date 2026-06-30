"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { EmployeeListItem } from "@/types/employee";
import { ConfidenceBadge } from "../utils/confidence-badge";
import { RecognitionResult } from "../utils/recognition-result";

type Props = {
  employee: EmployeeListItem;
};

export function RecognitionHistory({
  employee,
}: Props) {
  return (
    <GlassCard
      tint="cyan"
      className="overflow-hidden p-0"
    >
      {/* Header */}

      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-xl font-semibold">
          Recognition History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Recent successful face recognitions
        </p>
      </div>

      {/* Table */}

      <table className="w-full">
        <thead className="bg-white/5">
          <tr className="text-left text-sm text-muted-foreground">
            <th className="px-6 py-4">
              Time
            </th>

            <th>
              Confidence
            </th>

            <th>
              Result
            </th>
          </tr>
        </thead>

        <tbody>
          {employee.recognitionHistory.map(
            (record, index) => (
              <tr
                key={index}
                className="
                  border-t
                  border-white/5
                  transition
                  hover:bg-white/5
                "
              >
                <td className="px-6 py-4 font-medium">
                  {record.time}
                </td>

                <td>
  <ConfidenceBadge
    confidence={record.confidence}
  />
</td>

                <td>
                  <RecognitionResult
    result={record.result}
/>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </GlassCard>
  );
}