import { NextResponse } from "next/server";
import { getRandomAvatarTheme } from "@/lib/utils/employee";
import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const employeeId =
  body.employeeId?.trim();

const name =
  body.name?.trim();

const email =
  body.email?.trim().toLowerCase();

const videoUrl =
  body.videoUrl?.trim();

    if (!employeeId) {
  return NextResponse.json(
    {
      success: false,
      message: "Employee ID is required",
    },
    { status: 400 }
  );
}

if (!name) {
  return NextResponse.json(
    {
      success: false,
      message: "Name is required",
    },
    { status: 400 }
  );
}

if (!email) {
  return NextResponse.json(
    {
      success: false,
      message: "Email is required",
    },
    { status: 400 }
  );
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Invalid email address",
    },
    { status: 400 }
  );
}

if (!videoUrl) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Video URL is required",
    },
    { status: 400 }
  );
}

    const existingEmployeeId =
  await Employee.findOne({
    employeeId,
  });

if (existingEmployeeId) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Employee ID already exists",
    },
    {
      status: 409,
    }
  );
}

const existingEmail =
  await Employee.findOne({
    email,
  });

if (existingEmail) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Email already exists",
    },
    {
      status: 409,
    }
  );
}

let enrollData: any;

try {
  const enrollResponse =
    await fetch(
      `${process.env.FASTAPI_URL}/enroll_person`,
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

  enrollData =
    await enrollResponse.json();

  if (
    !enrollResponse.ok ||
    enrollData.status !== "success"
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
  enrollData.message ||
  "Enrollment failed",
enrollment:
  enrollData,
      },
      {
        status: 400,
      }
    );
  }
} catch (error) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Enrollment service unavailable",
    },
    {
      status: 503,
    }
  );
}

const avatarTheme = getRandomAvatarTheme();

const employee =
  await Employee.create({
    employeeId,
    name,
    email,
    videoUrl,

    avatarTheme,

    accountStatus:
      "active",

  });

    return NextResponse.json({
      success: true,
      employee,
      enrollment:
        enrollData,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
  error?.message ||
  "Failed to create employee",
      },
      {
        status: 500,
      }
    );
  }
}