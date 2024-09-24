import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clear the session cookie
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    response.cookies.set({
      name: "next-auth.session-token",
      value: "",
      expires: new Date(0),
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
