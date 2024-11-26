import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Retrieve the token if the user is signed in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log(token);
  const url = req.nextUrl.clone();

  if (url.pathname === "/blocked") {
    return NextResponse.next();
  }

  // Define the routes that should be protected when a user is signed in
  const protectedRoutes = ["/blocked"];

  // If the user is signed in (there's a token)
  if (token) {
    // Check if the user is blocked
    if (token.isBlocked) {
      // Redirect blocked users to /blocked
      return NextResponse.redirect(new URL("/blocked", req.url));
    }

    // If the user is signed in and accessing a protected route, allow access
    if (protectedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }
  }

  // If no token (user not signed in) and trying to access protected routes, redirect to /login
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue the request as normal if none of the conditions are met
  return NextResponse.next();
}

// Specify the paths the middleware should apply to
export const config = {
  matcher: ["/login", "/blocked", "/"],
};
