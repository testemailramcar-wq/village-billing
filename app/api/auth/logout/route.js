import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "pagsibol-village-secret-key-change-in-production"
);

// ─────────────────────────────────────────────
// DEMO USERS — replace with your MongoDB lookup
// ─────────────────────────────────────────────
const DEMO_USERS = {
  admin: {
    username: "admin",
    password: "admin",
    role: "admin",
    name: "Administrator",
    unit: null,
  },
  resident: {
    username: "resident",
    password: "1234",
    role: "resident",
    name: "Juan Dela Cruz",
    unit: "Block 3 Lot 12",
  },
};

export async function POST(request) {
  try {
    const { username, password, role } = await request.json();

    if (!username || !password || !role) {
      return NextResponse.json(
        { error: "Username, password, and role are required." },
        { status: 400 }
      );
    }

    // ── Find user (swap this with your MongoDB query) ──
    // Example MongoDB query you'd use instead of DEMO_USERS:
    //
    // import { connectDB } from "@/lib/db";
    // import User from "@/models/User";
    // await connectDB();
    // const user = await User.findOne({ username, role }).select("+password");
    // if (!user || !(await bcrypt.compare(password, user.password))) { ... }

    const user = Object.values(DEMO_USERS).find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials. Please check your username and password." },
        { status: 401 }
      );
    }

    // ── Sign JWT ──
    const token = await new SignJWT({
      id: user.username,
      role: user.role,
      name: user.name,
      unit: user.unit,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    // ── Set httpOnly cookie ──
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return NextResponse.json({
      success: true,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
