import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  if (
    !request.cookies.get("token") &&
    request?.nextUrl?.pathname.includes("mindmate") &&
    !request?.nextUrl?.pathname.includes("mindmate/login")
  ) {
    return NextResponse.redirect(new URL("/mindmate/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/mindmate/:path*"],
};
