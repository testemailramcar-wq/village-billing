import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import styles from "./admin.module.css";

export default async function AdminDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard/resident");

  const metrics = {
    collected: "₱38,400", collectedCount: 96,
    pending: "₱18,400", pendingCount: 46,
    overdue: 8, totalUnits: 142,
  };

  const recentPayments = [
    { unit: "Block 1 Lot 4", name: "Maria Santos", amount: 360, status: "paid" },
    { unit: "Block 2 Lot 7", name: "Rodrigo Lim", amount: 400, status: "paid" },
    { unit: "Block 3 Lot 12", name: "Juan Dela Cruz", amount: 400, status: "unpaid" },
    { unit: "Block 4 Lot 1", name: "Ana Padilla", amount: 330, status: "paid" },
    { unit: "Block 5 Lot 9", name: "Eduardo Cruz", amount: 400, status: "overdue" },
  ];

  const residents = [
    { name: "Juan Dela Cruz", unit: "B3 L12", status: "unpaid" },
    { name: "Maria Santos", unit: "B1 L4", status: "paid" },
    { name: "Rodrigo Lim", unit: "B2 L7", status: "paid" },
    { name: "Ana Padilla", unit: "B4 L1", status: "paid" },
    { name: "Eduardo Cruz", unit: "B5 L9", status: "overdue" },
  ];

  const statusClass = {
    paid: styles.statusPaid,
    unpaid: styles.statusUnpaid,
    overdue: styles.statusOverdue,
  };

  function initials(name) {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topLeft}>
          <span className={styles.logo}>Pagsibol</span>
          <span className={`${styles.badge} ${styles.badgeAdmin}`}>ADMIN PANEL</span>
        </div>
        <div className={styles.topRight}>
          <div className={styles.userChip}>
            <div className={`${styles.avatar} ${styles.avatarAdmin}`}>AD</div>
            <span className={styles.userName}>Administrator</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className={styles.body}>
        <div className={styles.welcomeRow}>
          <h1 className={styles.welcomeTitle}>Admin overview</h1>
          <p className={styles.welcomeSub}>April 2026 — billing cycle in progress</p>
        </div>

        <div className={styles.metricsRow}>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Collected</div>
            <div className={`${styles.metricValue} ${styles.green}`}>{metrics.collected}</div>
            <div className={styles.metricSub}>{metrics.collectedCount} households</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Pending</div>
            <div className={`${styles.metricValue} ${styles.amber}`}>{metrics.pending}</div>
            <div className={styles.metricSub}>{metrics.pendingCount} unpaid</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Overdue</div>
            <div className={`${styles.metricValue} ${styles.red}`}>{metrics.overdue}</div>
            <div className={styles.metricSub}>households</div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricLabel}>Total units</div>
            <div className={`${styles.metricValue} ${styles.blue}`}>{metrics.totalUnits}</div>
            <div className={styles.metricSub}>Phase 1</div>
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Recent payments</div>
            {recentPayments.map((p) => (
              <div key={p.unit} className={styles.payRow}>
                <div className={styles.payInfo}>
                  <span className={styles.payUnit}>{p.unit}</span>
                  <span className={styles.payName}>{p.name}</span>
                </div>
                <span className={styles.payAmount}>₱{p.amount}</span>
                <span className={`${styles.statusBadge} ${statusClass[p.status]}`}>
                  {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>Residents</div>
            {residents.map((r) => (
              <div key={r.unit} className={styles.resRow}>
                <div className={styles.resAvatar}>{initials(r.name)}</div>
                <div className={styles.resInfo}>
                  <span className={styles.resName}>{r.name}</span>
                  <span className={styles.resUnit}>{r.unit}</span>
                </div>
                <span className={`${styles.statusBadge} ${statusClass[r.status]}`}>
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
