"use client";

import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAction} style={{ display: "inline-block", margin: 0 }}>
      <button
        type="submit"
        style={{
          fontSize: "12px",
          color: "#6b7280",
          background: "none",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "7px 16px",
          cursor: "pointer",
          fontFamily: "inherit",
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#fef2f2";
          e.currentTarget.style.color = "#b91c1c";
          e.currentTarget.style.borderColor = "#fecaca";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.color = "#6b7280";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      >
        Sign out
      </button>
    </form>
  );
}
