import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Error as MongooseError } from "mongoose";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import crypto from "crypto";

// Define a schema for input validation
const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse and validate input
    const body = await req.json();
    const result = ForgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      // We don't want to reveal if the email exists or not for security reasons
      return NextResponse.json(
        {
          message:
            "If a user with that email exists, a password reset link has been sent.",
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await user.save();

    // Send password reset email
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id.toString(),
      token: resetToken,
    });

    return NextResponse.json(
      {
        message:
          "If a user with that email exists, a password reset link has been sent.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);

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
