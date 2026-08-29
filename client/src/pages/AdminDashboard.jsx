import { useAuth } from '../context/AuthContext';
import KPICard from '../components/dashboard/KPICard';
import './Dashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Platform Administration</h1>
          <p>Welcome back, {user?.name}. System governance & provisioning.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <KPICard title="Total Users" value="1,204" color="blue" />
        <KPICard title="Database Health" value="Healthy" color="green" />
        <KPICard title="Storage Used" value="42% (210GB)" color="amber" />
        <KPICard title="RLS Auth Mode" value="MVP Demo" color="purple" />
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>User Provisioning</h3>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Invite and assign roles to new academic staff</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input type="email" placeholder="Faculty/Advisor Email" style={{ padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }} />
            <select style={{ padding: 10, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}>
              <option>HOD (Head of Department)</option>
              <option>Adjunct Faculty</option>
              <option>Student Advisor</option>
              <option>Administrator</option>
            </select>
            <button style={{ padding: 12, background: '#0f172a', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
              Send Invitation Link
            </button>
          </div>
        </div>

        <div className="card">
          <h3>System Audit Logs</h3>
          <div style={{ fontSize: 13, color: '#334155', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
              <strong>System Admin</strong> created role <span className="badge purple">Adjunct Faculty</span> for jane.adjunct@univ.edu
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>2 hours ago</div>
            </div>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
              <strong>Postgres Trigger</strong> executed <code>detect_advisor_overload()</code>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>6 hours ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
