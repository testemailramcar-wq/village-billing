import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "pagsibol-village-secret-key-change-in-production"
);

/**
 * Call from Server Components or Route Handlers.
 * Returns the decoded user payload or null if not authenticated.
 */
export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id,
      role: payload.role,
      name: payload.name,
      unit: payload.unit,
    };
  } catch {
    return null;
  }
}

/**
 * Use in Server Components that require auth.
 * Throws if user is not authenticated.
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) throw new Error("Unauthenticated");
  return user;
}

/**
 * Use in Server Components that require admin role.
 */
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("Forbidden");
  return user;
}
