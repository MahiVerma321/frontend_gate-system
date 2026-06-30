import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/middleware/mongodb";
import User from "@/models/Users";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const validatedData = loginSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input data",
        },
        { status: 400 }
      );
    }

    const { email, password } = validatedData.data;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid password",
        },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          error: "JWT_SECRET is not defined",
        },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        userName: user.name,
        email: user.email,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          userId: user._id,
          userName: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error during login:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}