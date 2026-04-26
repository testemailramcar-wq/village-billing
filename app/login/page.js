"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("resident");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid credentials."); setLoading(false); return; }
      router.push(data.role === "admin" ? "/dashboard/admin" : "/dashboard/resident");
    } catch { setError("Something went wrong."); setLoading(false); }
  }

  return (
    <div style={{ display:"flex", minHeight:"100vh", fontFamily:"sans-serif" }}>
      <div style={{ width:"42%", background:"#0f2744", padding:"56px 48px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:"10px", fontWeight:500, letterSpacing:"2px", color:"#378ADD", textTransform:"uppercase", marginBottom:"20px" }}>Pagsibol Village · Phase 1</div>
          <h1 style={{ fontSize:"36px", color:"#fff", lineHeight:1.15, marginBottom:"16px", fontWeight:400 }}>Your community,<br /><em style={{color:"#85B7EB"}}>organized.</em></h1>
          <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>Manage your dues, view announcements, and stay connected with your community.</p>
        </div>
        <div style={{ display:"flex", gap:"28px", paddingTop:"32px", borderTop:"0.5px solid rgba(255,255,255,0.1)" }}>
          <div><div style={{ fontSize:"24px", color:"#fff" }}>142</div><div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>Households</div></div>
          <div><div style={{ fontSize:"24px", color:"#fff" }}>₱330</div><div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>Lowest tier</div></div>
          <div><div style={{ fontSize:"24px", color:"#fff" }}>Phase 1</div><div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)" }}>Active area</div></div>
        </div>
      </div>

      <div style={{ flex:1, padding:"56px 48px", display:"flex", flexDirection:"column", justifyContent:"center", background:"#fff" }}>
        <h2 style={{ fontSize:"28px", color:"#111", fontWeight:400, marginBottom:"4px" }}>Welcome back</h2>
        <p style={{ fontSize:"14px", color:"#888", marginBottom:"32px" }}>Sign in to access your portal</p>

        <div style={{ display:"flex", gap:"8px", marginBottom:"28px" }}>
          {["resident","admin"].map(r => (
            <button key={r} onClick={() => { setRole(r); setUsername(""); setPassword(""); setError(""); }}
              style={{ flex:1, padding:"11px", borderRadius:"8px", border: role===r ? "none" : "1px solid #e5e7eb",
                background: role===r ? "#0f2744" : "#f9fafb", color: role===r ? "#fff" : "#6b7280",
                fontWeight: role===r ? 500 : 400, cursor:"pointer", fontSize:"14px" }}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom:"18px" }}>
            <label style={{ display:"block", fontSize:"12px", fontWeight:500, color:"#6b7280", marginBottom:"7px" }}>
              {role === "admin" ? "Username" : "Unit / Block"}
            </label>
            <input value={username} onChange={e => setUsername(e.target.value)} required
              placeholder={role === "admin" ? "admin" : "e.g. Block 3 Lot 12"}
              style={{ width:"100%", padding:"11px 14px", borderRadius:"8px", border:"1px solid #e5e7eb",
                background:"#f9fafb", fontSize:"14px", outline:"none", fontFamily:"sans-serif" }} />
          </div>
          <div style={{ marginBottom:"18px" }}>
            <label style={{ display:"block", fontSize:"12px", fontWeight:500, color:"#6b7280", marginBottom:"7px" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
              style={{ width:"100%", padding:"11px 14px", borderRadius:"8px", border:"1px solid #e5e7eb",
                background:"#f9fafb", fontSize:"14px", outline:"none", fontFamily:"sans-serif" }} />
          </div>

          {error && <div style={{ fontSize:"13px", color:"#b91c1c", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:"8px", padding:"10px 14px", marginBottom:"14px" }}>{error}</div>}

          <button type="submit" disabled={loading}
            style={{ width:"100%", padding:"13px", background:"#0f2744", color:"#fff", border:"none",
              borderRadius:"8px", fontSize:"15px", fontWeight:500, cursor:"pointer", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div style={{ fontSize:"12px", color:"#9ca3af", marginTop:"24px", paddingTop:"20px", borderTop:"1px solid #f3f4f6", lineHeight:1.8 }}>
          <strong style={{color:"#6b7280"}}>Demo credentials</strong><br />
          Resident: <strong>resident</strong> / <strong>1234</strong><br />
          Admin: <strong>admin</strong> / <strong>admin</strong>
        </div>
      </div>
    </div>
  );
}
