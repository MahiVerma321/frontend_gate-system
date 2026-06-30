import { NextRequest, NextResponse } from "next/server";

const PYTHON_API =
  process.env.PYTHON_API_URL ??
  "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(
      `${PYTHON_API}/status`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        status: "Unavailable",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const action = body.action;

    let endpoint = "";

    switch (action) {
      case "start":
        endpoint = "/start_monitoring";
        break;

      case "stop":
        endpoint = "/stop_monitoring";
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid action",
          },
          {
            status: 400,
          }
        );
    }

    const response = await fetch(
      `${PYTHON_API}${endpoint}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Python service unavailable",
      },
      {
        status: 500,
      }
    );
  }
}