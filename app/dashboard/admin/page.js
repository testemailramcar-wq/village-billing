import styles from './page.module.css'

export default function AdminPage() {
  return (
    <div className={styles.page}>
      <h1>Admin Dashboard</h1>
    </div>
  )
}

/* ── TOPBAR ── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: #fff;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topLeft { display: flex; align-items: center; gap: 12px; }

.logo {
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  color: #0f2744;
  font-weight: 400;
}

.badge {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.2px;
  padding: 3px 10px;
  border-radius: 20px;
}

.badgeAdmin { background: #E6F1FB; color: #0C447C; }

.topRight { display: flex; align-items: center; gap: 12px; }
.userChip { display: flex; align-items: center; gap: 8px; }

.avatar {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600;
}

.avatarAdmin { background: #E6F1FB; color: #0C447C; }

.userName { font-size: 13px; color: #6b7280; }

/* ── BODY ── */
.body { flex: 1; padding: 28px; max-width: 960px; margin: 0 auto; width: 100%; }

.welcomeRow { margin-bottom: 24px; }

.welcomeTitle {
  font-family: 'DM Serif Display', serif;
  font-size: 24px;
  color: #111;
  font-weight: 400;
  margin-bottom: 4px;
}

.welcomeSub { font-size: 14px; color: #9ca3af; }

/* ── METRICS ── */
.metricsRow {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .metricsRow { grid-template-columns: repeat(2, 1fr); }
}

.metricCard {
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 18px;
}

.metricLabel {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.metricValue {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 4px;
}

.metricSub { font-size: 11px; color: #9ca3af; }

.green { color: #0F6E56; }
.amber { color: #854F0B; }
.red { color: #A32D2D; }
.blue { color: #185FA5; }

/* ── TWO COL ── */
.twoCol {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 680px) {
  .twoCol { grid-template-columns: 1fr; }
}

/* ── PANEL ── */
.panel {
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 18px 20px;
}

.panelTitle {
  font-size: 13px;
  font-weight: 500;
  color: #111;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

/* Payment rows */
.payRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid #f8fafc;
  font-size: 13px;
}
.payRow:last-child { border-bottom: none; }

.payInfo { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.payUnit { font-size: 13px; color: #111; }
.payName { font-size: 11px; color: #9ca3af; }
.payAmount { font-weight: 500; color: #111; white-space: nowrap; }

/* Resident rows */
.resRow {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid #f8fafc;
}
.resRow:last-child { border-bottom: none; }

.resAvatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: #E6F1FB;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 600;
  color: #0C447C;
  flex-shrink: 0;
}

.resInfo { flex: 1; display: flex; flex-direction: column; gap: 1px; }
.resName { font-size: 13px; color: #111; }
.resUnit { font-size: 11px; color: #9ca3af; }

/* Status badges */
.statusBadge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  white-space: nowrap;
  letter-spacing: 0.2px;
}
.statusPaid { background: #E1F5EE; color: #0F6E56; }
.statusUnpaid { background: #FAECE7; color: #993C1D; }
.statusOverdue { background: #FCEBEB; color: #A32D2D; }
