import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/"];
const noAuthRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];
const authRequiredRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Allow access to API authentication routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  let token;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    console.error("Error fetching token:", error);
    // Only redirect to login if not already on a noAuthRoute
    if (!noAuthRoutes.includes(pathname)) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  const isLoggedIn = !!token;

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If logged in and trying to access login, signup, etc., redirect to dashboard
  if (isLoggedIn && noAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  // If not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && authRequiredRoutes.includes(pathname)) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Allow access to all other pages
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
