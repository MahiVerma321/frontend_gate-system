import { EmployeeListItem } from "@/types/employee";

export type EmployeeStatistics = {
  recognitionRate: number;
  attendanceRate: number;
  totalAlerts: number;
  averageConfidence: number;
  totalRecognitions: number;

  confidenceHistory: number[];
};

export function getEmployeeStatistics(
  employee: EmployeeListItem
): EmployeeStatistics {

  const recognitions =
    employee.recognitionHistory.length;

  const alerts =
    employee.alertHistory.length;

  const attendanceDays =
    employee.attendanceHistory.length;

  const confidenceHistory =
  employee.recognitionHistory
    .slice(0, 5)
    .map(item => item.confidence);

  const confidenceAverage =
    employee.recognitionHistory.reduce(
      (sum, item) => sum + item.confidence,
      0
    ) / recognitions;

  return {
    recognitionRate:
      confidenceAverage,

    attendanceRate:
      attendanceDays > 0
        ? 100
        : 0,

    totalAlerts: alerts,
    confidenceHistory,

    averageConfidence:
      confidenceAverage,

    totalRecognitions:
      recognitions,
  };
}