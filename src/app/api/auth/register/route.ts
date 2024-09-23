import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import { Error as MongooseError } from "mongoose";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import crypto from "crypto";

// Define the number of salt rounds for hashing
const SALT_ROUNDS = 10;
// Define a schema for input validation
const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse and validate input
    const body = await req.json();
    const result = UserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Generate verify token
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      isAdmin: false,
      provider: "credentials",
    });

    const verifyToken = crypto.randomBytes(32).toString("hex");
    newUser.verifyToken = verifyToken;
    newUser.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await newUser.save();

    // Send verification email
    await sendEmail({
      email: newUser.email,
      emailType: "VERIFY",
      userId: newUser._id.toString(),
      token: verifyToken,
    });

    return NextResponse.json(
      {
        message:
          "User created successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

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
