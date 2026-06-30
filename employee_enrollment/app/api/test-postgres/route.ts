import { NextResponse } from "next/server";
import { pgPool } from "@/lib/postgresql";

export async function GET() {
  try {
    const result = await pgPool.query(
      `
      SELECT
        NOW() AS server_time,
        current_database() AS database_name,
        current_user AS database_user
      `
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Successfully connected to PostgreSQL.",
        data: result.rows[0],
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error(
      "PostgreSQL Connection Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to connect to PostgreSQL.",
        error:
          error.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}