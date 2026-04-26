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
