import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHODStats, getFacultyRoster } from '../services/api';
import KPICard from '../components/dashboard/KPICard';
import FacultyRosterTable from '../components/dashboard/FacultyRosterTable';
import AlertBanner from '../components/dashboard/AlertBanner';
import './Dashboard.css';

export default function HODDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ facultyCount: 0, alerts: [] });
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHODStats(), getFacultyRoster()])
      .then(([statsRes, rosterRes]) => {
        setStats(statsRes.data);
        setRoster(rosterRes.data.roster || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading department data...</div>;

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Department Overview</h1>
          <p>Welcome back, {user?.name}. Real-time department health.</p>
        </div>
      </div>

      <AlertBanner alerts={stats.alerts} />

      <div className="kpi-grid">
        <KPICard title="Total Faculty" value={stats.facultyCount} color="blue" />
        <KPICard title="Pending Onboarding" value="1" color="amber" />
        <KPICard title="Avg Rating" value="4.6" color="green" />
        <KPICard title="Overloaded Staff" value={stats.alerts.length} color="red" />
      </div>

      <FacultyRosterTable roster={roster} />
    </div>
  );
}
