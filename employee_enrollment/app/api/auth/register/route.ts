import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/middleware/mongodb";
import User from "@/models/Users";

const registerSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});

export async function POST(req: NextRequest) {
    await connectDB();
    console.log("MONGODB_URI type:", typeof process.env.MONGODB_URI);
    console.log("MONGODB_URI boolean:", !!process.env.MONGODB_URI);
    const body = await req.json();
    const validatedData = registerSchema.safeParse(body); 

    if (!validatedData.success) {
        console.error("Validation errors:", validatedData.error.flatten());
    return NextResponse.json(
    {
      success: false,
      message:
        validatedData.error.issues[0]?.message ??
        "Invalid input.",
    },
    {
      status: 400,
    }
  );
}

    const { name, email, password} = validatedData.data;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
  name: name,
  email: email.toLowerCase(),
  password: hashedPassword,
});
        await newUser.save();

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return NextResponse.json({ error: "JWT secret is not defined" }, { status: 500 });
        }   

        const token = jwt.sign(
  {
    userId: newUser._id.toString(),
    userName: newUser.name,
    email: newUser.email,
  },
  secret,
  { expiresIn: "1h" }
);

        return NextResponse.json({ message: "Registration successful", 
            token, 
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
            } },

            { status: 201 }
        );

    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }   
}   