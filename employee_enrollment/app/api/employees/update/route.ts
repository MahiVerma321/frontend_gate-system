import { NextResponse } from "next/server";

import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

export async function PUT(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const {
      employeeId,
      name,
      email,
      videoUrl,
    } = body;

    if (!employeeId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Employee ID required",
        },
        {
          status: 400,
        }
      );
    }

    const existingEmail =
  await Employee.findOne({
    email,
    employeeId: { $ne: employeeId },
  });

if (existingEmail) {
  return NextResponse.json(
    {
      success: false,
      message: "Email already exists",
    },
    {
      status: 409,
    }
  );
}

const existingEmployee =
  await Employee.findOne({
    employeeId,
  });

if (!existingEmployee) {
  return NextResponse.json(
    {
      success: false,
      message: "Employee not found",
    },
    {
      status: 404,
    }
  );
}

const shouldReEnroll =
  videoUrl &&
  videoUrl !== existingEmployee.videoUrl;

if (shouldReEnroll) {
  const enrollResponse =
    await fetch(
      "http://localhost:8000/enroll_person",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          employeeId,
          videoUrl,
        }),
      }
    );

  const enrollData =
    await enrollResponse.json();

  if (
    !enrollResponse.ok ||
    enrollData.status !== "success"
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Re-enrollment failed",
        enrollment:
          enrollData,
      },
      {
        status: 400,
      }
    );
  }
}

    const employee =
      await Employee.findOneAndUpdate(
        {
          employeeId,
        },
        {
          name,
          email,
          videoUrl,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update employee",
      },
      {
        status: 500,
      }
    );
  }
}