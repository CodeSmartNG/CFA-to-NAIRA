export default function Currency({ amount, currency }) {
  const n = Number(amount || 0);
  const formatted = n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return <span className="font-medium">{formatted} {currency}</span>;
}
