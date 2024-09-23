import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { Error as MongooseError } from "mongoose";
import User from "@/models/User";
import { connect } from "@/lib/db";
import jwt from "jsonwebtoken";

// Define a schema for input validation
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    await connect();

    // Parse and validate input
    const body = await req.json();
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find the user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the user is using credentials provider
    if (user.provider !== "credentials") {
      return NextResponse.json(
        { error: `Please sign in with ${user.provider}` },
        { status: 400 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 403 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      isVerified: user.isVerified,
    };

    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
      throw new Error("TOKEN_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(tokenData, tokenSecret, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      email: user.email,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

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
