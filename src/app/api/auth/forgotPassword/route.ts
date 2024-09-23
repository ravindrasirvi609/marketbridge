import { connect } from "@/lib/db";
import { sendEmail } from "@/lib/mailer";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  console.log("request", request);

  try {
    console.log("request", request);

    const reqBody = await request.json();
    const { email } = reqBody;
    console.log("email", email);

    if (!email) {
      return NextResponse.json(
        { error: "Please provide a valid email" },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: "User with the provided email not found" },
        { status: 400 }
      );
    }

    await sendPasswordResetEmail(user);
    return NextResponse.json({
      message: "Password reset email sent successfully",
      sendEmail: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function findUserByEmail(email: string) {
  return await User.findOne({ email: email });
}

async function sendPasswordResetEmail(user: any) {
  await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });
}
