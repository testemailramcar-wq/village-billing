"use client";

import { useState } from "react";

export default function AnnouncementButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function openModal() {
    setOpen(true);
    setSent(false);
    setTitle("");
    setBody("");
  }

  function closeModal() {
    if (loading) return;
    setOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with real API call to your MongoDB route:
    // await fetch("/api/announcements", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title, body }),
    // });
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={openModal}
        style={{
          background: "#378ADD",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Create announcement →
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(3px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "28px",
              width: "100%",
              maxWidth: "480px",
              margin: "16px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
            }}
          >
            {sent ? (
              /* Success state */
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "14px" }}>✅</div>
                <div style={{ fontSize: "17px", fontWeight: 600, color: "#111" }}>
                  Announcement posted!
                </div>
                <div style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "6px" }}>
                  All residents have been notified.
                </div>
              </div>
            ) : (
              /* Form state */
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "22px",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#111", margin: 0 }}>
                    📢 New Announcement
                  </h3>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "22px",
                      cursor: "pointer",
                      color: "#9CA3AF",
                      lineHeight: 1,
                      padding: "0 4px",
                    }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#6b7280",
                        marginBottom: "6px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Water interruption notice"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        outline: "none",
                        boxSizing: "border-box",
                        color: "#111",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "22px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#6b7280",
                        marginBottom: "6px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      required
                      rows={4}
                      placeholder="Write your message to residents here..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        color: "#111",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loading}
                      style={{
                        flex: 1,
                        padding: "11px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        background: "#f9fafb",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        color: "#6b7280",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        flex: 2,
                        padding: "11px",
                        borderRadius: "8px",
                        border: "none",
                        background: loading ? "#6b7280" : "#0f2744",
                        fontSize: "14px",
                        fontWeight: 500,
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        color: "#fff",
                        transition: "background 0.15s",
                      }}
                    >
                      {loading ? "Posting..." : "Post to all residents"}
                    </button>
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
