import { NextRequest, NextResponse } from "next/server";

import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

export async function PUT(
  request: NextRequest
) {
  try {
    await connectDB();

    const body = await request.json();

    const employeeId =
      body.employeeId?.trim();

    const name =
      body.name?.trim();

    const email =
      body.email?.trim().toLowerCase();

    const accountStatus =
      body.accountStatus;

    /*
     * Required fields
     */

    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee ID is required.",
        },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Validation
     */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    const nameRegex =
      /^[A-Za-z\s'-]+$/;

    if (!nameRegex.test(name)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name contains invalid characters.",
        },
        { status: 400 }
      );
    }

    if (
      accountStatus !== "active" &&
      accountStatus !== "inactive"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid account status.",
        },
        { status: 400 }
      );
    }

    /*
     * Find employee
     */

    const employee =
      await Employee.findOne({
        employeeId,
      });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Check duplicate email
     */

    const existingEmail =
      await Employee.findOne({
        email,
        employeeId: {
          $ne: employeeId,
        },
      });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already exists.",
        },
        { status: 409 }
      );
    }

    /*
     * Update
     */

    employee.name = name;

    employee.email = email;

    employee.accountStatus =
      accountStatus;

    await employee.save();

    return NextResponse.json({
      success: true,
      message:
        "Employee updated successfully.",
      employee: {
        id: employee.employeeId,
        name: employee.name,
        email: employee.email,
        accountStatus:
          employee.accountStatus,
        avatarTheme:
          employee.avatarTheme,
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Failed to update employee.",
      },
      {
        status: 500,
      }
    );
  }
}