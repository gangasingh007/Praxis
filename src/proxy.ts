import { NextRequest, NextResponse } from "next/server";
import { decrypt, AUTH_COOKIE_NAME } from "@/lib/auth";
import { clerkMiddleware } from '@clerk/nextjs/server';
// Public routes that don't require authentication
const publicRoutes = ["/landing", "/login", "/register","/docs"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  let session = null;
  
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (e) {
      console.error("Error decrypting session cookie:", e);
    }
  }

  // Redirect to login if accessing a protected route without a session
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/landing", request.nextUrl));
  }

  // Redirect to dashboard if accessing a public route with a session
  if (isPublicRoute && session && path !== "/") {
    return NextResponse.redirect(new URL("/planner", request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

