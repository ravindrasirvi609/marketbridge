import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Error as MongooseError } from "mongoose";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { hash } from "bcryptjs";

// Define a schema for input validation
const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse and validate input
    const body = await req.json();
    const result = ResetPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // Find user by reset token and check if it's expired
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired password reset token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 12);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);

    if (error instanceof MongooseError) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
