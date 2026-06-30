import { NextResponse } from "next/server";
import { connectDB } from "@/middleware/mongodb";
import Employee from "@/models/Employee";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id?.trim()) {
  return NextResponse.json(
    {
      success: false,
      message: "Employee ID is required",
    },
    { status: 400 }
  );
}

    const employee = await Employee.findOne(
      { employeeId: id },
      { __v: 0 }
    ).lean();

    if (!employee) {
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

    return NextResponse.json({
      success: true,
      employee,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message || "Failed to fetch employee",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    if (!id?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee ID is required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await request.json();

    const {
  employeeId,
  name,
  email,
  accountStatus,
} = await request.json();

const trimmedName = name?.trim();
const trimmedEmail = email?.trim().toLowerCase();

if (employeeId !== undefined) {
  return NextResponse.json(
    {
      success: false,
      message: "Employee ID cannot be updated.",
    },
    {
      status: 400,
    }
  );
}

    if (!trimmedName) {
  return NextResponse.json(
    {
      success: false,
      message: "Name is required",
    },
    { status: 400 }
  );
}

if (!trimmedEmail) {
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

if (!emailRegex.test(trimmedEmail)) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Invalid email address",
    },
    { status: 400 }
  );
}

if (
  accountStatus &&
  !["active", "inactive"].includes(accountStatus)
) {
  return NextResponse.json(
    {
      success: false,
      message: "Invalid account status",
    },
    {
      status: 400,
    }
  );
}

const employee = await Employee.findOne({
    employeeId: id,
});

if (!employee) {
    return NextResponse.json(
        {
            success:false,
            message:"Employee not found",
        },
        {
            status:404,
        }
    );
}

const existingEmail = await Employee.findOne({
    trimmedEmail,
});

if (
    existingEmail &&
    existingEmail.employeeId !== id
) {
    return NextResponse.json(
        {
            success:false,
            message:"Email already exists",
        },
        {
            status:409,
        }
    );
}

const updatedEmployee = await Employee.findOneAndUpdate(
  {
    employeeId: id,
  },
  {
    trimmedName,
    trimmedEmail,
    ...(accountStatus && { accountStatus }),
  },
  {
    new: true,
    runValidators: true,
    projection: {
      __v: 0,
    },
  }
);

if (!updatedEmployee) {
  return NextResponse.json(
    {
      success: false,
      message: "Failed to update employee",
    },
    {
      status: 500,
    }
  );
}

return NextResponse.json({
    success: true,
    employee: updatedEmployee,
});

} catch (error: any) {
    console.error(error);

    return NextResponse.json(
        {
            success:false,
            message:
                error?.message ??
                "Failed to update employee",
        },
        {
            status:500,
        }
    );
}}