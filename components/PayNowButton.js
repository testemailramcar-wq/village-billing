"use client";

import { useState } from "react";

export default function PayNowButton({ amount, month, year, tier }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState("gcash");

  function openModal() {
    setPaid(false);
    setMethod("gcash");
    setOpen(true);
  }

  function closeModal() {
    if (!loading) setOpen(false);
  }

  async function handlePay(e) {
    e.preventDefault();
    setLoading(true);
    // Connect to your API:
    // await fetch("/api/payments", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount, month, year, method }),
    // });
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setPaid(true);
    setTimeout(() => setOpen(false), 2500);
  }

  const methods = [
    { id: "gcash", label: "GCash",        icon: "💙" },
    { id: "maya",  label: "Maya",          icon: "💚" },
    { id: "cash",  label: "Cash (Office)", icon: "💵" },
    { id: "bank",  label: "Bank Transfer", icon: "🏦" },
  ];

  return (
    <>
      <button
        onClick={openModal}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg,#378ADD,#185FA5)",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          boxShadow: "0 4px 14px rgba(55,138,221,0.35)",
        }}
      >
        Pay ₱{amount} Now →
      </button>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, backdropFilter: "blur(3px)",
          }}
        >
          <div style={{
            background: "#fff", borderRadius: "16px", padding: "28px",
            width: "100%", maxWidth: "400px", margin: "16px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}>
            {paid ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "52px", marginBottom: "12px" }}>✅</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0F6E56" }}>Payment submitted!</div>
                <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px" }}>Your payment is being processed.</div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: 0 }}>Pay monthly dues</h3>
                  <button
                    onClick={closeModal}
                    style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#9CA3AF", lineHeight: 1 }}
                  >×</button>
                </div>

                {/* Bill summary */}
                <div style={{ background: "#F8FAFC", borderRadius: "10px", padding: "14px 16px", marginBottom: "18px", border: "1px solid #F1F5F9" }}>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "4px" }}>{month} {year} · {tier}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>Total due</span>
                    <span style={{ fontSize: "24px", fontWeight: 700, color: "#0f2744" }}>₱{amount}</span>
                  </div>
                </div>

                <form onSubmit={handlePay}>
                  <div style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", marginBottom: "10px" }}>Select payment method</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
                    {methods.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        style={{
                          padding: "12px 8px",
                          borderRadius: "8px",
                          border: method === m.id ? "2px solid #0f2744" : "1px solid #e5e7eb",
                          background: method === m.id ? "#EFF6FF" : "#f9fafb",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>{m.icon}</span>
                        <span style={{ fontSize: "12px", fontWeight: method === m.id ? 600 : 400, color: method === m.id ? "#0f2744" : "#6B7280" }}>{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loading}
                      style={{ flex: 1, padding: "11px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#f9fafb", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", color: "#6b7280" }}
                    >Cancel</button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{ flex: 2, padding: "11px", borderRadius: "8px", border: "none", background: loading ? "#9CA3AF" : "#0f2744", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", color: "#fff" }}
                    >{loading ? "Processing..." : `Confirm ₱${amount}`}</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
