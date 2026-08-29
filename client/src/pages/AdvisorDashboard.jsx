import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import KPICard from '../components/dashboard/KPICard';
import './Dashboard.css';

export default function AdvisorDashboard() {
  const { user } = useAuth();
  const [caseload, setCaseload] = useState([
    { id: '1', name: 'Alex Johnson', email: 'alex.student@univ.edu', cgpa: 6.8, attendance: 75, risk: 'medium', riskPoints: 2, status: 'At Risk' },
    { id: '2', name: 'Maya Patel', email: 'maya.student@univ.edu', cgpa: 8.4, attendance: 92, risk: 'low', riskPoints: 1, status: 'Good Standing' },
    { id: '3', name: 'Liam Wilson', email: 'liam.student@univ.edu', cgpa: 5.4, attendance: 58, risk: 'high', riskPoints: 3, status: 'Critical Risk' },
  ]);

  const totalPoints = caseload.reduce((acc, s) => acc + s.riskPoints, 0);
  const highRiskCount = caseload.filter(s => s.risk === 'high').length;

  const handleScheduleMeeting = (studentName) => {
    alert(`Meeting scheduled with ${studentName} for academic intervention.`);
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <div>
          <h1>Student Advisory & Caseload</h1>
          <p>Welcome back, {user?.name}. Smart Risk Balancing Active.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <KPICard title="Assigned Students" value={caseload.length} color="blue" />
        <KPICard title="Weighted Workload" value={`${totalPoints} pts`} color={totalPoints > 20 ? 'red' : 'green'} />
        <KPICard title="High Risk Students" value={highRiskCount} color="red" />
        <KPICard title="Capacity Balance" value="Healthy" color="green" />
      </div>

      <div className="card roster-card">
        <div className="roster-header">
          <h3>Assigned Student Caseload (Risk Weighted)</h3>
          <p>Prioritized by academic urgency</p>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>CGPA</th>
                <th>Attendance</th>
                <th>Risk Level</th>
                <th>Workload Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {caseload.map(s => (
                <tr key={s.id}>
                  <td className="name-cell">
                    {s.name}
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{s.email}</div>
                  </td>
                  <td><strong>{s.cgpa}</strong></td>
                  <td>{s.attendance}%</td>
                  <td>
                    <span className={`badge ${s.risk === 'high' ? 'role-admin' : s.risk === 'medium' ? 'role-student' : 'badge green'}`}>
                      {s.risk.toUpperCase()}
                    </span>
                  </td>
                  <td>+{s.riskPoints} pts</td>
                  <td>
                    <button className="view-btn" onClick={() => handleScheduleMeeting(s.name)}>
                      Schedule Meeting
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
