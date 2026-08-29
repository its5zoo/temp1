export default function AlertBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null;
  return (
    <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
      <p style={{ fontWeight: 700, color: '#be123c', marginBottom: 8 }}>⚠ System Alerts ({alerts.length})</p>
      {alerts.map((a, i) => (
        <div key={i} style={{ fontSize: 13, color: '#9f1239', marginBottom: 4 }}>• {a.message}</div>
      ))}
    </div>
  );
}
