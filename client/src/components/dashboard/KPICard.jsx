export default function KPICard({ title, value, color }) {
  const colorMap = {
    blue: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    amber: { bg: '#fffbeb', text: '#b45309', border: '#fde68a' },
    green: { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    red: { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
  };
  const c = colorMap[color] || colorMap.blue;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '20px 24px' }}>
      <p style={{ fontSize: 13, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 28, fontWeight: 800, color: c.text }}>{value}</p>
    </div>
  );
}
