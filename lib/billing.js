export function calculateMonthlyDue() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();

  let amount, tier;

  if (day <= 7) {
    amount = 330;
    tier = 'Week 1 (₱330)';
  } else if (day <= 14) {
    amount = 350;
    tier = 'Week 2 (₱350)';
  } else {
    amount = 370;
    tier = 'Week 3–4 (₱370)';
  }

  const environmental = 30;

  return {
    amount,
    environmental,
    total: amount + environmental,
    tier,
    month,
    year,
  };
}
