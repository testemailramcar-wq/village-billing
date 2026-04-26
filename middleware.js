import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "pagsibol-village-secret-key-change-in-production"
);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // ── Public routes — always allow ──
  const isPublic =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth");

  if (isPublic) {
    // If already logged in and hitting /login, redirect to dashboard
    if (token && pathname.startsWith("/login")) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const dest =
          payload.role === "admin"
            ? "/dashboard/admin"
            : "/dashboard/resident";
        return NextResponse.redirect(new URL(dest, request.url));
      } catch {
        // Bad token — let them through to login
      }
    }
    return NextResponse.next();
  }

  // ── Protected routes — require valid token ──
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Role-based route guard
    if (
      pathname.startsWith("/dashboard/admin") &&
      payload.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard/resident", request.url));
    }

    if (
      pathname.startsWith("/dashboard/resident") &&
      payload.role !== "resident"
    ) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    // Pass user info to page via header (readable in Server Components)
    const response = NextResponse.next();
    response.headers.set("x-user-role", payload.role);
    response.headers.set("x-user-name", payload.name || "");
    response.headers.set("x-user-unit", payload.unit || "");
    return response;
  } catch {
    // Expired or invalid token — clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth_token");
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/((?!_next/static|_next/image|favicon.ico|api/auth).*)",
  ],
};
