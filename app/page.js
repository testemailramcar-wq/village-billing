"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

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

      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      if (data.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/resident");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  function switchRole(r) {
    setRole(r);
    setUsername("");
    setPassword("");
    setError("");
  }

  return (
    <div className={styles.page}>
      {/* Left Panel */}
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.tag}>Pagsibol Village · Phase 1</div>
          <h1 className={styles.title}>
            Your community,<br />
            <em>organized.</em>
          </h1>
          <p className={styles.desc}>
            Manage your dues, view announcements, and stay connected
            with your community — all in one place.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>142</span>
            <span className={styles.statLbl}>Households</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>₱330</span>
            <span className={styles.statLbl}>Lowest tier</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>Phase 1</span>
            <span className={styles.statLbl}>Active area</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.right}>
        <h2 className={styles.formTitle}>Welcome back</h2>
        <p className={styles.formSub}>Sign in to access your portal</p>

        {/* Role Tabs */}
        <div className={styles.roleTabs}>
          <button
            className={`${styles.roleTab} ${role === "resident" ? styles.roleTabActive : ""}`}
            onClick={() => switchRole("resident")}
            type="button"
          >
            Resident
          </button>
          <button
            className={`${styles.roleTab} ${role === "admin" ? styles.roleTabActive : ""}`}
            onClick={() => switchRole("admin")}
            type="button"
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              {role === "admin" ? "Username" : "Unit / Block"}
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder={role === "admin" ? "admin" : "e.g. Block 3 Lot 12"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className={styles.hint}>
          <strong>Demo credentials</strong><br />
          Resident: <strong>resident</strong> / <strong>1234</strong><br />
          Admin: <strong>admin</strong> / <strong>admin</strong>
        </div>
      </div>
    </div>
  );
}
