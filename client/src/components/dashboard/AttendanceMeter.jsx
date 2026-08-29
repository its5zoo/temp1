export default function AttendanceMeter({ attendance, classesNeeded }) {
  const isAtRisk = attendance < 80;
  return (
    <div className={`card attendance-card ${isAtRisk ? 'at-risk' : 'good'}`}>
      <h3>Academic Standing (Attendance)</h3>
      <div className="meter-row">
        <div className="meter-bar">
          <div
            className={`meter-fill ${isAtRisk ? 'fill-red' : 'fill-green'}`}
            style={{ width: `${Math.min(attendance, 100)}%` }}
          />
        </div>
        <span className="meter-pct">{attendance}%</span>
      </div>
      {isAtRisk ? (
        <div className="risk-alert">
          <strong>⚠ You are At Risk</strong>
          <p>You must attend <strong>{classesNeeded} consecutive upcoming classes</strong> to reach the 80% minimum requirement.</p>
        </div>
      ) : (
        <div className="safe-alert">
          <strong>✓ You are in good standing.</strong>
          <p>Keep up the great work and maintain this attendance!</p>
        </div>
      )}
    </div>
  );
}
