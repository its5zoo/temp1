import { useAuth } from '../context/AuthContext';
import KPICard from '../components/dashboard/KPICard';
import './Dashboard.css';

export default function AdjunctDashboard() {
  const { user } = useAuth();

  const sessions = [
    { id: 1, course: 'CS-301: Advanced Cloud Computing', time: 'Monday, 10:00 AM - 12:00 PM', room: 'Hall 4B', students: 42 },
    { id: 2, course: 'CS-204: Distributed Systems', time: 'Wednesday, 02:00 PM - 04:00 PM', room: 'Lab 201', students: 38 },
  ];

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Faculty Teaching Portal</h1>
          <p>Welcome back, {user?.name}. Your teaching workload and courses.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <KPICard title="Active Courses" value="2" color="blue" />
        <KPICard title="Teaching Rating" value="4.8 / 5.0" color="green" />
        <KPICard title="Total Students" value="80" color="amber" />
        <KPICard title="Contract Status" value="Active" color="green" />
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>Upcoming Lecture Schedule</h3>
          {sessions.map(s => (
            <div key={s.id} className="course-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <strong style={{ color: '#0f172a' }}>{s.course}</strong>
                <span className="badge purple">{s.room}</span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b' }}>⏰ {s.time} • 👥 {s.students} Enrolled</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Recent Student Feedback</h3>
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 10 }}>
            <div style={{ color: '#f59e0b', fontSize: 18, marginBottom: 4 }}>★★★★★</div>
            <p style={{ fontSize: 14, color: '#334155', fontStyle: 'italic' }}>
              "Excellent explanation of distributed consensus algorithms. The real-world examples made it super intuitive."
            </p>
            <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, display: 'block' }}>— Anonymous Student (2 days ago)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
