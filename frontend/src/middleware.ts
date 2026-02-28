import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/inventory", "/orders", "/leads", "/calls", "/settings", "/onboarding"];
const authRoutes = ["/login", "/signup"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.COOKIE_NAME as string)?.value;
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  // not logged in → trying to access protected page → send to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // already logged in → trying to access login/signup → send to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inventory/:path*",
    "/orders/:path*",
    "/leads/:path*",
    "/calls/:path*",
    "/settings/:path*",
    "/onboarding/:path*",
    "/login",
    "/signup",
  ],
};