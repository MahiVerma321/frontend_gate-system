import { NextResponse } from "next/server";

import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

import { getRecentRecognitions } from "@/lib/repositories/recognition.repository";

export async function GET() {
  try {
    await connectDB();

    const recognitions =
      await getRecentRecognitions();

    const mongoEmployees = await Employee.find(
  {},
  {
    employeeId: 1,
    name: 1,
    avatarTheme: 1,
    _id: 0,
  }
).lean();

const employeeMap = new Map(
  mongoEmployees.map(employee => [
    employee.employeeId,
    employee,
  ])
);

const activity = recognitions.map(
  (recognition) => {

    const employee =
      employeeMap.get(
        recognition.employee_id
      );

    return {

      employeeId:
        recognition.employee_id,

      name:
        employee?.name ??
        "Unknown Employee",

      avatarTheme:
        employee?.avatarTheme ??
        "cyan",

      confidence:
        recognition.confidence,

      result:
        recognition.result,

      cameraType:
        recognition.camera_type,

      createdAt:
        recognition.created_at,

    };
  }
);

return NextResponse.json({
  success: true,
  activity,
});

} catch (error: any) {

  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message:
        error?.message ??
        "Failed to fetch activity",
    },
    {
      status: 500,
    }
  );
}
}