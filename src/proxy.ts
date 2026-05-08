import { NextRequest, NextResponse } from "next/server";
import { decrypt, AUTH_COOKIE_NAME } from "@/lib/auth";

// Public routes that don't require authentication
const publicRoutes = ["/landing", "/login", "/register", "/docs"];
// Routes that should NOT redirect to dashboard if authenticated (e.g., shared pages)
const sharedRoutes = ["/docs"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
  const isSharedRoute = sharedRoutes.some(route => path.startsWith(route));

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  let session = null;
  
  if (cookie) {
    try {
      session = await decrypt(cookie);
    } catch (e) {
      // Invalidate invalid session cookies
      console.error("Error decrypting session cookie:", e);
    }
  }

  // 1. Redirect to landing if accessing a protected route without a session
  if (!isPublicRoute && !session && path !== "/") {
    return NextResponse.redirect(new URL("/landing", request.nextUrl));
  }

  // 2. Redirect to dashboard if accessing a public route WITH a session
  // UNLESS it's a shared route like /docs
  if (isPublicRoute && session && !isSharedRoute) {
    return NextResponse.redirect(new URL("/planner", request.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
};


