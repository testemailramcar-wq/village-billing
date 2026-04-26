import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { calculateMonthlyDue } from "@/lib/billing";
import LogoutButton from "@/components/LogoutButton";

export default async function ResidentDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role !== "resident") redirect("/dashboard/admin");

  const billing = calculateMonthlyDue();

  const history = [
    { month: "April 2026",    amount: billing.total, status: "unpaid", date: "Due Apr 30" },
    { month: "March 2026",    amount: 360, status: "paid",   date: "Mar 8" },
    { month: "February 2026", amount: 330, status: "paid",   date: "Feb 5" },
    { month: "January 2026",  amount: 360, status: "paid",   date: "Jan 9" },
    { month: "December 2025", amount: 400, status: "late",   date: "Dec 28" },
  ];

  const notices = [
    { icon:"💧", title:"Water schedule", detail:"Mon, Wed, Fri · 5am–8am", tag:"Utility" },
    { icon:"🏛️", title:"HOA General Assembly", detail:"May 3 · 6pm · Covered court", tag:"Meeting" },
    { icon:"🗑️", title:"Garbage collection", detail:"Tuesdays & Saturdays · 6am", tag:"Schedule" },
    { icon:"🚗", title:"Visitor parking", detail:"Maximum 2 vehicles per unit", tag:"Rules" },
    { icon:"🔒", title:"Gate curfew", detail:"No visitor entry after 10pm", tag:"Security" },
  ];

  const statusStyle = {
    paid:   { background:"#E1F5EE", color:"#0F6E56" },
    unpaid: { background:"#FEF3C7", color:"#854F0B" },
    late:   { background:"#FEE2E2", color:"#A32D2D" },
  };

  const tierColors = {
    "Week 1": "#10B981",
    "Week 2": "#3B82F6",
  };
  const tierColor = Object.entries(tierColors).find(([k]) => billing.tier.startsWith(k))?.[1] || "#F59E0B";

  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  const totalPaid2026 = history.filter(h => h.status === "paid").reduce((s, h) => s + h.amount, 0);

  return (
    <div style={{ minHeight:"100vh", background:"#F8FAFC", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      {/* ── TOPBAR ── */}
      <header style={{ background:"#fff", borderBottom:"1px solid #F1F5F9", padding:"0 32px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"#0f2744", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"#fff", fontSize:"14px", fontWeight:700 }}>P</span>
            </div>
            <span style={{ fontWeight:600, fontSize:"16px", color:"#0f2744" }}>Pagsibol Village</span>
          </div>
          <span style={{ background:"#E1F5EE", color:"#065F46", fontSize:"10px", fontWeight:600, letterSpacing:"1px", padding:"3px 10px", borderRadius:"20px" }}>RESIDENT</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"13px", fontWeight:500, color:"#111" }}>{user.name}</div>
            <div style={{ fontSize:"11px", color:"#9CA3AF" }}>{user.unit || "Phase 1"}</div>
          </div>
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#E1F5EE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:600, color:"#065F46" }}>{initials}</div>
          <LogoutButton />
        </div>
      </header>

      <main style={{ padding:"28px 32px", maxWidth:"1000px", margin:"0 auto" }}>

        {/* ── WELCOME ── */}
        <div style={{ marginBottom:"24px" }}>
          <h1 style={{ fontSize:"22px", fontWeight:600, color:"#0f2744", margin:0 }}>Good day, {user.name.split(" ")[0]} 👋</h1>
          <p style={{ fontSize:"13px", color:"#9CA3AF", marginTop:"4px" }}>{billing.month} {billing.year} · {user.unit || "Phase 1"}</p>
        </div>

        {/* ── SUMMARY CARDS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"24px" }}>
          <div style={{ background:"#0f2744", borderRadius:"12px", padding:"20px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", right:"-20px", top:"-20px", width:"80px", height:"80px", borderRadius:"50%", background:"rgba(55,138,221,0.15)" }}></div>
            <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", letterSpacing:"1px", textTransform:"uppercase", marginBottom:"10px" }}>Current due</div>
            <div style={{ fontSize:"32px", fontWeight:700, color:"#fff", marginBottom:"4px" }}>₱{billing.total}</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", marginBottom:"12px" }}>{billing.month} {billing.year} · Due end of month</div>
            <div style={{ background:"rgba(55,138,221,0.2)", display:"inline-block", color:"#85B7EB", fontSize:"11px", fontWeight:500, padding:"3px 10px", borderRadius:"20px" }}>
              {billing.tier}
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px" }}>
            <div style={{ fontSize:"11px", color:"#9CA3AF", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"10px" }}>Total paid 2026</div>
            <div style={{ fontSize:"32px", fontWeight:700, color:"#0F6E56", marginBottom:"4px" }}>₱{totalPaid2026}</div>
            <div style={{ fontSize:"12px", color:"#9CA3AF" }}>{history.filter(h=>h.status==="paid").length} months on time</div>
            <div style={{ marginTop:"12px", height:"4px", background:"#F1F5F9", borderRadius:"99px" }}>
              <div style={{ width:"75%", height:"100%", background:"#10B981", borderRadius:"99px" }}></div>
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px" }}>
            <div style={{ fontSize:"11px", color:"#9CA3AF", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:"10px" }}>Payment tier guide</div>
            {[
              { label:"Week 1 (days 1–7)", rate:"₱330 + ₱30", color:"#10B981" },
              { label:"Week 2 (days 8–14)", rate:"₱350 + ₱30", color:"#3B82F6" },
              { label:"Week 3–4 (days 15–31)", rate:"₱370 + ₱30", color:"#F59E0B" },
            ].map(t => (
              <div key={t.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                  <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:t.color, flexShrink:0 }}></div>
                  <span style={{ fontSize:"11px", color:"#6B7280" }}>{t.label}</span>
                </div>
                <span style={{ fontSize:"11px", fontWeight:600, color:"#111" }}>{t.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TWO COL ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>

          {/* Payment History */}
          <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>Payment history</div>
              <div style={{ fontSize:"12px", color:"#9CA3AF", marginTop:"2px" }}>Last 5 months</div>
            </div>
            {history.map((h, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", padding:"12px 20px", borderBottom: i<history.length-1 ? "1px solid #F8FAFC" : "none", gap:"12px" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"8px", background: h.status==="paid" ? "#E1F5EE" : h.status==="late" ? "#FEE2E2" : "#FEF3C7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:"16px" }}>{h.status==="paid" ? "✓" : h.status==="late" ? "!" : "○"}</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"13px", fontWeight:500, color:"#111" }}>{h.month}</div>
                  <div style={{ fontSize:"11px", color:"#9CA3AF" }}>{h.date}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>₱{h.amount}</div>
                  <span style={{ ...statusStyle[h.status], fontSize:"10px", fontWeight:600, padding:"2px 7px", borderRadius:"20px" }}>
                    {h.status === "paid" ? "Paid" : h.status === "late" ? "Late" : "Due"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right col */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Pay Now CTA */}
            <div style={{ background:"linear-gradient(135deg,#0f2744 0%,#185FA5 100%)", borderRadius:"12px", padding:"20px" }}>
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", marginBottom:"4px" }}>Outstanding balance</div>
              <div style={{ fontSize:"28px", fontWeight:700, color:"#fff", marginBottom:"4px" }}>₱{billing.total}.00</div>
              <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.45)", marginBottom:"16px" }}>Due {billing.month} {billing.year}</div>
              <div style={{ display:"flex", gap:"8px" }}>
                <div style={{ flex:1, background:"rgba(255,255,255,0.1)", borderRadius:"8px", padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Monthly due</div>
                  <div style={{ fontSize:"16px", fontWeight:700, color:"#fff" }}>₱{billing.amount}</div>
                </div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.1)", borderRadius:"8px", padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Env. fee</div>
                  <div style={{ fontSize:"16px", fontWeight:700, color:"#fff" }}>₱{billing.environmental}</div>
                </div>
              </div>
            </div>

            {/* Community Notices */}
            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", flex:1 }}>
              <div style={{ padding:"16px 20px", borderBottom:"1px solid #F1F5F9" }}>
                <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>Community notices</div>
              </div>
              {notices.map((n, i) => (
                <div key={i} style={{ display:"flex", gap:"12px", padding:"12px 20px", borderBottom: i<notices.length-1 ? "1px solid #F8FAFC":"none", alignItems:"flex-start" }}>
                  <span style={{ fontSize:"18px", flexShrink:0 }}>{n.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:"13px", fontWeight:500, color:"#111" }}>{n.title}</span>
                      <span style={{ fontSize:"10px", color:"#6B7280", background:"#F8FAFC", border:"1px solid #F1F5F9", padding:"1px 6px", borderRadius:"20px" }}>{n.tag}</span>
                    </div>
                    <div style={{ fontSize:"11px", color:"#9CA3AF", marginTop:"2px" }}>{n.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOTLINES ── */}
        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px 24px", marginTop:"16px" }}>
          <div style={{ fontSize:"14px", fontWeight:600, color:"#111", marginBottom:"16px" }}>Emergency hotlines</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px" }}>
            {[
              { label:"HOA Office", number:"0917-123-4567", color:"#0f2744" },
              { label:"Security", number:"0918-234-5678", color:"#1D4ED8" },
              { label:"Maintenance", number:"0919-345-6789", color:"#0F6E56" },
              { label:"Emergency", number:"911", color:"#A32D2D" },
            ].map(h => (
              <div key={h.label} style={{ background:"#F8FAFC", borderRadius:"8px", padding:"12px", border:"1px solid #F1F5F9" }}>
                <div style={{ fontSize:"11px", color:"#9CA3AF", marginBottom:"4px" }}>{h.label}</div>
                <div style={{ fontSize:"14px", fontWeight:700, color:h.color }}>{h.number}</div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
