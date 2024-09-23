import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define the routes that should be accessible without authentication
const publicRoutes = ["/"];

// Define the routes that should only be accessible when not logged in
const noAuthRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

// Define the routes that should only be accessible when logged in
const authRequiredRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the NextAuth token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Determine if the user is logged in (either via NextAuth or manual login)
  const isLoggedIn = !!token;

  // Allow access to public routes for all users
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from no-auth routes (including login page)
  if (isLoggedIn && noAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect non-logged-in users away from auth-required routes
  if (
    !isLoggedIn &&
    authRequiredRoutes.some((route) => pathname.startsWith(route))
  ) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // For API routes, allow access to auth endpoints without a token
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!isLoggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If all checks pass, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
