import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { calculateMonthlyDue } from "@/lib/billing";
import PayNowButton from "@/components/PayNowButton";

export default async function ResidentDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role !== "resident") redirect("/dashboard/admin");

  const billing = calculateMonthlyDue();

  const history = [
    { month: "April 2026",    amount: billing.total, status: "unpaid", date: "Due Apr 30"   },
    { month: "March 2026",    amount: 360,           status: "paid",   date: "Mar 8, 2026"  },
    { month: "February 2026", amount: 330,           status: "paid",   date: "Feb 5, 2026"  },
    { month: "January 2026",  amount: 360,           status: "paid",   date: "Jan 9, 2026"  },
    { month: "December 2025", amount: 400,           status: "late",   date: "Dec 28, 2025" },
    { month: "November 2025", amount: 360,           status: "paid",   date: "Nov 6, 2025"  },
  ];

  const notices = [
    { icon: "💧", title: "Water schedule",       detail: "Mon, Wed, Fri · 5am–8am",     tag: "Utility"  },
    { icon: "🏛️", title: "HOA General Assembly",  detail: "May 3 · 6pm · Covered court", tag: "Meeting"  },
    { icon: "🗑️", title: "Garbage collection",   detail: "Tuesdays & Saturdays · 6am",  tag: "Schedule" },
    { icon: "🚗", title: "Visitor parking",      detail: "Maximum 2 vehicles per unit", tag: "Rules"    },
    { icon: "🔒", title: "Gate curfew",          detail: "No visitor entry after 10pm", tag: "Security" },
  ];

  const hotlines = [
    { label: "HOA Office",  number: "0917-123-4567", color: "#0f2744", bg: "#EFF6FF" },
    { label: "Security",    number: "0918-234-5678", color: "#1D4ED8", bg: "#DBEAFE" },
    { label: "Maintenance", number: "0919-345-6789", color: "#065F46", bg: "#D1FAE5" },
    { label: "Emergency",   number: "911",            color: "#A32D2D", bg: "#FEE2E2" },
  ];

  const statusStyle = {
    paid:   { background: "#E1F5EE", color: "#0F6E56" },
    unpaid: { background: "#FEF3C7", color: "#854F0B" },
    late:   { background: "#FEE2E2", color: "#A32D2D" },
  };
  const statusIcon  = { paid: "✓", unpaid: "○", late: "!" };
  const statusIconBg    = { paid: "#E1F5EE", unpaid: "#FEF3C7", late: "#FEE2E2" };
  const statusIconColor = { paid: "#0F6E56",  unpaid: "#854F0B", late: "#A32D2D" };

  const totalPaid  = history.filter((h) => h.status === "paid").reduce((s, h) => s + h.amount, 0);
  const paidMonths = history.filter((h) => h.status === "paid").length;
  const lateMonths = history.filter((h) => h.status === "late").length;
  const initials   = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const signOutStyle = {
    fontSize: "12px",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "7px 16px",
    textDecoration: "none",
    display: "inline-block",
    fontFamily: "inherit",
    lineHeight: 1,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "system-ui,sans-serif" }}>

      {/* TOPBAR */}
      <header style={{ background: "#fff", borderBottom: "1px solid #F1F5F9", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#0f2744", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>P</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: "16px", color: "#0f2744" }}>Pagsibol Village</span>
          </div>
          <span style={{ background: "#D1FAE5", color: "#065F46", fontSize: "10px", fontWeight: 600, letterSpacing: "1px", padding: "3px 10px", borderRadius: "20px" }}>RESIDENT</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{user.name}</div>
            <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{user.unit || "Phase 1"}</div>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, color: "#065F46" }}>
            {initials}
          </div>
          <a href="/api/auth/logout" style={signOutStyle}>Sign out</a>
        </div>
      </header>

      <main style={{ padding: "28px 32px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* WELCOME */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 600, color: "#0f2744", margin: 0 }}>Good day, {user.name.split(" ")[0]} 👋</h1>
          <p style={{ fontSize: "13px", color: "#9CA3AF", marginTop: "4px" }}>{billing.month} {billing.year} · {user.unit || "Phase 1"} · Billing cycle active</p>
        </div>

        {/* TOP 3 CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>

          {/* Current Due */}
          <div style={{ background: "#0f2744", borderRadius: "12px", padding: "22px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "-20px", top: "-20px", width: "90px", height: "90px", borderRadius: "50%", background: "rgba(55,138,221,0.15)" }}></div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "10px" }}>Current balance due</div>
            <div style={{ fontSize: "38px", fontWeight: 700, color: "#fff", marginBottom: "4px", lineHeight: 1 }}>₱{billing.total}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>{billing.month} {billing.year} · Due end of month</div>
            <div style={{ display: "inline-block", background: "rgba(55,138,221,0.2)", color: "#85B7EB", fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px" }}>{billing.tier}</div>
          </div>

          {/* Payment Standing */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "22px" }}>
            <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Payment standing</div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#0F6E56", marginBottom: "4px", lineHeight: 1 }}>Good</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "14px" }}>{paidMonths} months on time · {lateMonths} late</div>
            <div style={{ height: "5px", background: "#F1F5F9", borderRadius: "99px", marginBottom: "4px" }}>
              <div style={{ width: `${Math.round((paidMonths / history.length) * 100)}%`, height: "100%", background: "#10B981", borderRadius: "99px" }}></div>
            </div>
            <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{Math.round((paidMonths / history.length) * 100)}% on-time rate</div>
          </div>

          {/* Total Paid */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "22px" }}>
            <div style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Total paid (2026)</div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#1D4ED8", marginBottom: "4px", lineHeight: 1 }}>₱{totalPaid}</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "14px" }}>Across {paidMonths} billing months</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {history.map((h, i) => (
                <div key={i} style={{ flex: 1, height: "5px", borderRadius: "99px", background: h.status === "paid" ? "#3B82F6" : h.status === "late" ? "#EF4444" : "#F1F5F9" }}></div>
              ))}
            </div>
            <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "4px" }}>Last 6 months</div>
          </div>
        </div>

        {/* TWO COL */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

          {/* Payment History */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>Payment history</div>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>Last 6 months</div>
            </div>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 20px", borderBottom: i < history.length - 1 ? "1px solid #F8FAFC" : "none", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: statusIconBg[h.status], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "15px", fontWeight: 700, color: statusIconColor[h.status] }}>
                  {statusIcon[h.status]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{h.month}</div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>{h.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "3px" }}>₱{h.amount}</div>
                  <span style={{ ...statusStyle[h.status], fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "20px" }}>
                    {h.status === "paid" ? "Paid" : h.status === "late" ? "Late" : "Due"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Pay Now Card */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>April 2026 billing</div>
              <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "16px" }}>Breakdown of your current bill</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "10px 14px", background: "#F8FAFC", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7280" }}>Monthly due</span>
                  <span style={{ fontWeight: 600, color: "#111" }}>₱{billing.amount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "10px 14px", background: "#F8FAFC", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7280" }}>Environmental fee</span>
                  <span style={{ fontWeight: 600, color: "#111" }}>₱{billing.environmental}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "12px 14px", background: "#0f2744", borderRadius: "8px" }}>
                  <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Total</span>
                  <span style={{ fontWeight: 700, color: "#fff" }}>₱{billing.total}</span>
                </div>
              </div>
              <PayNowButton amount={billing.total} month={billing.month} year={billing.year} tier={billing.tier} />
            </div>

            {/* Tier Guide */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "14px" }}>Payment tier guide</div>
              {[
                { label: "Week 1", days: "Days 1–7",   rate: "₱330 + ₱30", color: "#10B981", bg: "#D1FAE5", active: billing.tier.startsWith("Week 1") },
                { label: "Week 2", days: "Days 8–14",  rate: "₱350 + ₱30", color: "#3B82F6", bg: "#DBEAFE", active: billing.tier.startsWith("Week 2") },
                { label: "Week 3–4", days: "Days 15–31", rate: "₱370 + ₱30", color: "#F59E0B", bg: "#FEF3C7", active: billing.tier.startsWith("Week 3") },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderRadius: "8px", marginBottom: "6px", background: t.active ? t.bg : "transparent", border: t.active ? `1px solid ${t.color}40` : "1px solid transparent" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.color, flexShrink: 0 }}></div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "12px", fontWeight: t.active ? 600 : 400, color: t.active ? t.color : "#374151" }}>{t.label} </span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>({t.days})</span>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: t.active ? t.color : "#111" }}>{t.rate}</span>
                  {t.active && <span style={{ fontSize: "10px", background: t.color, color: "#fff", padding: "1px 6px", borderRadius: "20px", fontWeight: 600 }}>NOW</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMMUNITY NOTICES */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "#111" }}>Community notices</div>
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>From your HOA</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {notices.map((n, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", padding: "14px 20px", borderBottom: i < notices.length - 2 ? "1px solid #F8FAFC" : "none", borderRight: i % 2 === 0 ? "1px solid #F8FAFC" : "none", alignItems: "flex-start" }}>
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>{n.title}</span>
                    <span style={{ fontSize: "10px", color: "#6B7280", background: "#F8FAFC", border: "1px solid #F1F5F9", padding: "1px 7px", borderRadius: "20px", flexShrink: 0 }}>{n.tag}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "3px" }}>{n.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HOTLINES */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #F1F5F9", padding: "20px 24px" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "14px" }}>Emergency hotlines</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
            {hotlines.map((h) => (
              <div key={h.label} style={{ background: h.bg, borderRadius: "10px", padding: "14px", border: `1px solid ${h.color}20` }}>
                <div style={{ fontSize: "11px", color: h.color, fontWeight: 500, marginBottom: "6px", opacity: 0.75 }}>{h.label}</div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: h.color }}>{h.number}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
