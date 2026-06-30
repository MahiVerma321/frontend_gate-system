import { NextResponse } from "next/server";
import { connectDB } from "@/middleware/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}