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

  let token;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.redirect(`${origin}/login`); // Redirect to absolute URL
  }

  const isLoggedIn = !!token;

  // Allow access to public routes like home page
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If logged in and trying to access login, signup, etc., redirect to dashboard
  if (isLoggedIn && noAuthRoutes.includes(pathname)) {
    return NextResponse.redirect(`${origin}/dashboard`); // Redirect logged-in users
  }

  // If not logged in and trying to access protected routes like dashboard, redirect to login
  if (!isLoggedIn && authRequiredRoutes.includes(pathname)) {
    return NextResponse.redirect(`${origin}/login`); // Redirect unauthenticated users
  }

  // Allow access to API authentication routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Catch-all: If the user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return NextResponse.redirect(`${origin}/login`); // Redirect to login
  }

  return NextResponse.next(); // Allow access to all other pages
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
