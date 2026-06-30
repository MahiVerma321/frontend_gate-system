import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Users from "@/models/Users";
import {connectDB} from "@/middleware/mongodb";

export async function POST(req: NextRequest) {
    await connectDB();
    const { token, password } = await req.json()

    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid or expire token" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return Response.json({
        message: "Password reset successful"
    });
}