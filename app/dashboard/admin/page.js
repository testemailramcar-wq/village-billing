import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard/resident");

  const metrics = [
    { label: "Total Collected", value: "₱38,400", sub: "96 households paid", color: "#0F6E56", bg: "#E1F5EE" },
    { label: "Pending", value: "₱18,400", sub: "46 households unpaid", color: "#854F0B", bg: "#FEF3C7" },
    { label: "Overdue", value: "8", sub: "households past due", color: "#A32D2D", bg: "#FEE2E2" },
    { label: "Total Units", value: "142", sub: "Phase 1 registered", color: "#1D4ED8", bg: "#DBEAFE" },
  ];

  const payments = [
    { unit: "Block 1 Lot 4", name: "Maria Santos", amount: 360, date: "Apr 5", status: "paid" },
    { unit: "Block 2 Lot 7", name: "Rodrigo Lim", amount: 400, date: "Apr 12", status: "paid" },
    { unit: "Block 3 Lot 12", name: "Juan Dela Cruz", amount: 400, date: "—", status: "unpaid" },
    { unit: "Block 4 Lot 1", name: "Ana Padilla", amount: 330, date: "Apr 3", status: "paid" },
    { unit: "Block 5 Lot 9", name: "Eduardo Cruz", amount: 400, date: "Mar 30", status: "overdue" },
    { unit: "Block 1 Lot 8", name: "Rosa Reyes", amount: 350, date: "Apr 10", status: "paid" },
  ];

  const statusStyle = {
    paid:    { background: "#E1F5EE", color: "#0F6E56" },
    unpaid:  { background: "#FEF3C7", color: "#854F0B" },
    overdue: { background: "#FEE2E2", color: "#A32D2D" },
  };

  function initials(name) {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  }

  const avatarColors = ["#DBEAFE","#E1F5EE","#FEF3C7","#F3E8FF","#FFE4E6","#ECFDF5"];
  const textColors   = ["#1D4ED8","#0F6E56","#854F0B","#7C3AED","#BE123C","#065F46"];

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
          <span style={{ background:"#EFF6FF", color:"#1D4ED8", fontSize:"10px", fontWeight:600, letterSpacing:"1px", padding:"3px 10px", borderRadius:"20px" }}>ADMIN</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"13px", fontWeight:500, color:"#111" }}>Administrator</div>
            <div style={{ fontSize:"11px", color:"#9CA3AF" }}>Full access</div>
          </div>
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:600, color:"#1D4ED8" }}>AD</div>
          <LogoutButton />
        </div>
      </header>

      <main style={{ padding:"28px 32px", maxWidth:"1100px", margin:"0 auto" }}>

        {/* ── PAGE TITLE ── */}
        <div style={{ marginBottom:"24px" }}>
          <h1 style={{ fontSize:"22px", fontWeight:600, color:"#0f2744", margin:0 }}>Admin Dashboard</h1>
          <p style={{ fontSize:"13px", color:"#9CA3AF", marginTop:"4px" }}>April 2026 · Billing cycle in progress</p>
        </div>

        {/* ── METRICS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", marginBottom:"24px" }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"12px" }}>
                <div style={{ width:"16px", height:"16px", borderRadius:"3px", background:m.color, opacity:0.7 }}></div>
              </div>
              <div style={{ fontSize:"24px", fontWeight:700, color:m.color, marginBottom:"2px" }}>{m.value}</div>
              <div style={{ fontSize:"11px", color:"#6B7280", fontWeight:500 }}>{m.label}</div>
              <div style={{ fontSize:"11px", color:"#9CA3AF", marginTop:"2px" }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ── COLLECTION PROGRESS ── */}
        <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px", marginBottom:"24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
            <div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>Collection progress — April 2026</div>
              <div style={{ fontSize:"12px", color:"#9CA3AF", marginTop:"2px" }}>96 of 142 households paid</div>
            </div>
            <div style={{ fontSize:"20px", fontWeight:700, color:"#0F6E56" }}>67.6%</div>
          </div>
          <div style={{ height:"8px", background:"#F1F5F9", borderRadius:"99px", overflow:"hidden" }}>
            <div style={{ width:"67.6%", height:"100%", background:"linear-gradient(90deg,#0F6E56,#10B981)", borderRadius:"99px" }}></div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"8px" }}>
            <span style={{ fontSize:"11px", color:"#9CA3AF" }}>₱0</span>
            <span style={{ fontSize:"11px", color:"#9CA3AF" }}>Target: ₱56,800</span>
          </div>
        </div>

        {/* ── TWO COL ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:"16px" }}>

          {/* Payments Table */}
          <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #F1F5F9", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>Recent payments</div>
              <span style={{ fontSize:"11px", color:"#6B7280", background:"#F8FAFC", border:"1px solid #F1F5F9", borderRadius:"20px", padding:"2px 10px" }}>April 2026</span>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#F8FAFC" }}>
                  {["Unit","Resident","Amount","Date","Status"].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:"11px", fontWeight:600, color:"#9CA3AF", letterSpacing:"0.5px", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={i} style={{ borderTop:"1px solid #F8FAFC" }}>
                    <td style={{ padding:"12px 16px", fontSize:"13px", fontWeight:500, color:"#111" }}>{p.unit}</td>
                    <td style={{ padding:"12px 16px", fontSize:"13px", color:"#6B7280" }}>{p.name}</td>
                    <td style={{ padding:"12px 16px", fontSize:"13px", fontWeight:600, color:"#111" }}>₱{p.amount}</td>
                    <td style={{ padding:"12px 16px", fontSize:"12px", color:"#9CA3AF" }}>{p.date}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ ...statusStyle[p.status], fontSize:"10px", fontWeight:600, padding:"3px 8px", borderRadius:"20px" }}>
                        {p.status.charAt(0).toUpperCase()+p.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

            {/* Tier Breakdown */}
            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px" }}>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111", marginBottom:"16px" }}>Tier breakdown</div>
              {[
                { label:"Week 1 (₱330+₱30)", count:38, pct:40, color:"#10B981" },
                { label:"Week 2 (₱350+₱30)", count:34, pct:36, color:"#3B82F6" },
                { label:"Week 3–4 (₱370+₱30)", count:24, pct:25, color:"#F59E0B" },
              ].map(t => (
                <div key={t.label} style={{ marginBottom:"12px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", color:"#6B7280", marginBottom:"5px" }}>
                    <span>{t.label}</span>
                    <span style={{ fontWeight:600, color:"#111" }}>{t.count} units</span>
                  </div>
                  <div style={{ height:"6px", background:"#F1F5F9", borderRadius:"99px" }}>
                    <div style={{ width:`${t.pct}%`, height:"100%", background:t.color, borderRadius:"99px" }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overdue List */}
            <div style={{ background:"#fff", borderRadius:"12px", border:"1px solid #F1F5F9", padding:"20px", flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                <div style={{ fontSize:"14px", fontWeight:600, color:"#111" }}>Overdue households</div>
                <span style={{ background:"#FEE2E2", color:"#A32D2D", fontSize:"11px", fontWeight:600, padding:"2px 8px", borderRadius:"20px" }}>8 units</span>
              </div>
              {[
                { name:"Eduardo Cruz", unit:"B5 L9", months:2 },
                { name:"Felix Torres", unit:"B2 L3", months:1 },
                { name:"Gloria Mendez", unit:"B4 L6", months:3 },
              ].map((r, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"8px 0", borderBottom: i<2 ? "1px solid #F8FAFC" : "none" }}>
                  <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:avatarColors[i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:600, color:textColors[i], flexShrink:0 }}>
                    {initials(r.name)}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:500, color:"#111" }}>{r.name}</div>
                    <div style={{ fontSize:"11px", color:"#9CA3AF" }}>{r.unit}</div>
                  </div>
                  <span style={{ fontSize:"11px", color:"#A32D2D", fontWeight:600 }}>{r.months} mo.</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ANNOUNCEMENTS ── */}
        <div style={{ background:"#0f2744", borderRadius:"12px", padding:"20px 24px", marginTop:"16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:"14px", fontWeight:600, color:"#fff", marginBottom:"4px" }}>📢 Post an announcement</div>
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>Notify all residents about community updates</div>
          </div>
          <button style={{ background:"#378ADD", color:"#fff", border:"none", borderRadius:"8px", padding:"10px 20px", fontSize:"13px", fontWeight:500, cursor:"pointer" }}>
            Create announcement →
          </button>
        </div>

      </main>
    </div>
  );
}
