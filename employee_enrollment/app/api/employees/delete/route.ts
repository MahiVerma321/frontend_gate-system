import { NextResponse } from "next/server";

import Employee from "@/models/Employee";
import { connectDB } from "@/middleware/mongodb";

export async function DELETE(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const { employeeId } =
      body;

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

    const employee =
      await Employee.findOne({
        employeeId,
      });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Employee not found",
        },
        {
          status: 404,
        }
      );
    }

    const response =
      await fetch(
        `http://localhost:8000/employee/${employeeId}`,
        {
          method: "DELETE",
        }
      );

    const deleteData =
      await response.json();

    if (
      !response.ok ||
      deleteData.status !==
        "success"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Failed to delete embeddings",
          deleteData,
        },
        {
          status: 500,
        }
      );
    }

    await Employee.findOneAndDelete({
      employeeId,
    });

    return NextResponse.json({
      success: true,
      message:
        "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete employee",
      },
      {
        status: 500,
      }
    );
  }
}