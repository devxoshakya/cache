import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Retrieve the token if the user is signed in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the routes that should be protected when a user is signed in
  const protectedRoutes = ["/login"];

  // If there is a token (user is signed in) and they are accessing a protected route, redirect to /home
  if (token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If no token and user tries to access protected routes like /home, redirect to /login
  if (!token && req.nextUrl.pathname === "/home" || req.nextUrl.pathname === "/blocked") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If no conditions are met, continue the request as normal
  return NextResponse.next();
}

// Specify the paths the middleware should apply to
export const config = {
  matcher: ["/login", "/blocked", "/home", "/"],
};
