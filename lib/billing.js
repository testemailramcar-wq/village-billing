export const calculateMonthlyDue = () => {
  if (typeof window === "undefined") return null; // Server-side safety
  
  const now = new Date();
  const day = now.getDate();
  const haulerFee = 30;
  let baseDue = 370; // Default Week 3/4
  let tierName = "Week 3/4 (Late)";

  if (day >= 1 && day <= 7) {
    baseDue = 330;
    tierName = "Week 1 (Early Bird)";
  } else if (day >= 8 && day <= 14) {
    baseDue = 350;
    tierName = "Week 2 (Standard)";
  }

  return {
    base: baseDue,
    hauler: haulerFee,
    total: baseDue + haulerFee,
    tier: tierName,
    month: now.toLocaleString('default', { month: 'long' }),
    year: now.getFullYear()
  };
};