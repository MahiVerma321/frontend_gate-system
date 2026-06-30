import { NextResponse, NextRequest } from 'next/server';
import Users from "@/models/Users"; 
import {connectDB} from "@/middleware/mongodb";

export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token');

    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
}