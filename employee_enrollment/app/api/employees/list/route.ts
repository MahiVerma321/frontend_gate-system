import { NextResponse } from "next/server";

import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

import {
  getEmployeeVisitSummary,
} from "@/lib/postgres/employees";

export async function GET() {
  try {
    await connectDB();

    // MongoDB (static employee information)
    const mongoEmployees = await Employee.find(
      {},
      {
        __v: 0,
      }
    )
      .sort({
        createdAt: -1,
      })
      .lean();

    // PostgreSQL (dynamic recognition data)
    const postgresEmployees =
      await getEmployeeVisitSummary();

    const postgresMap = new Map(
      postgresEmployees.map((employee: any) => [
        employee.employee_id,
        employee,
      ])
    );

    const employees = mongoEmployees.map(
      (employee: any) => {
        const pg =
          postgresMap.get(employee.employeeId);

        return {
          id: employee.employeeId,

          name: employee.name,

          email: employee.email,

          avatarTheme:
            employee.avatarTheme,

          accountStatus:
            employee.accountStatus,

          videoUrl:
            employee.videoUrl,

          registeredOn:
            employee.createdAt,

          status:
            pg?.status ?? "outside",

          lastEvent:
            pg?.status === "inside"
              ? "entered"
              : "registered",

          lastSeen:
            pg?.last_seen
              ? new Date(
                  pg.last_seen
                ).toISOString()
              : null,

          attendanceToday:
            pg?.status === "inside"
              ? "Present"
              : "Not Marked",

          totalRecognitions:
            pg?.total_recognitions ?? 0,

          alertsGenerated:
            employee.alertsGenerated ?? 0,

          // Keep these so the frontend doesn't break
          recognitionHistory: [],

          attendanceHistory: [],

          alertHistory: [],
        };
      }
    );

    return NextResponse.json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Failed to fetch employees",
      },
      {
        status: 500,
      }
    );
  }
}