"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // even if fetch fails, clear client side and redirect
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      style={{
        fontSize: "12px",
        color: "#6b7280",
        background: "none",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "7px 16px",
        cursor: "pointer",
        fontFamily: "sans-serif",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => {
        e.target.style.background = "#fef2f2";
        e.target.style.color = "#b91c1c";
        e.target.style.borderColor = "#fecaca";
      }}
      onMouseLeave={e => {
        e.target.style.background = "none";
        e.target.style.color = "#6b7280";
        e.target.style.borderColor = "#e5e7eb";
      }}
    >
      Sign out
    </button>
  );
}
