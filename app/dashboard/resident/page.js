import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { calculateMonthlyDue } from "@/lib/billing";
import LogoutButton from "@/components/LogoutButton";
import styles from "./resident.module.css";

export default async function ResidentDashboard() {
  const user = await getUser();
  if (!user) redirect("/login");
  if (user.role !== "resident") redirect("/dashboard/admin");

  const billing = calculateMonthlyDue();

  const history = [
    { month: "March 2026", amount: 360, status: "paid" },
    { month: "February 2026", amount: 330, status: "paid" },
    { month: "January 2026", amount: 360, status: "paid" },
    { month: "December 2025", amount: 400, status: "late" },
  ];

  const notices = [
    { title: "Water schedule", detail: "Mon, Wed, Fri · 5am–8am" },
    { title: "HOA meeting", detail: "May 3 · 6pm · Covered court" },
    { title: "Garbage collection", detail: "Tues & Sat · 6am" },
    { title: "Visitor curfew", detail: "No entry after 10pm" },
  ];

  const statusClass = {
    paid: styles.statusPaid,
    late: styles.statusLate,
    unpaid: styles.statusUnpaid,
  };

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topLeft}>
          <span className={styles.logo}>Pagsibol</span>
          <span className={`${styles.badge} ${styles.badgeResident}`}>RESIDENT PORTAL</span>
        </div>
        <div className={styles.topRight}>
          <div className={styles.userChip}>
            <div className={`${styles.avatar} ${styles.avatarResident}`}>{initials}</div>
            <span className={styles.userName}>{user.unit || user.name}</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className={styles.body}>
        <div className={styles.welcomeRow}>
          <h1 className={styles.welcomeTitle}>Good day, {user.name}</h1>
          <p className={styles.welcomeSub}>{billing.month} {billing.year} — {billing.tier} billing period active</p>
        </div>

        <div className={styles.billCard}>
          <div className={styles.billLabel}>Current balance due</div>
          <div className={styles.billAmount}>₱{billing.t
