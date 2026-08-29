import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../services/api';
import './Dashboard.css';

export default function UsersDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then(res => setUsers(res.data.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  return (
    <div className="dashboard-content">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1>Directory & Staff Roster</h1>
          <p>Complete directory of department members, advisors, and students.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all', 'adjunct_faculty', 'advisor', 'student', 'hod'].map(role => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: filter === role ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                background: filter === role ? '#7c3aed' : 'white',
                color: filter === role ? 'white' : '#64748b',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {role.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="card roster-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: 32, color: '#94a3b8' }}>Loading directory...</td></tr>
              ) : filtered.map(u => (
                <tr key={u.id}>
                  <td className="name-cell">{u.name}</td>
                  <td className="email-cell">{u.email}</td>
                  <td>
                    <span className={`role-badge role-${u.role}`}>{u.role.replace('_', ' ')}</span>
                  </td>
                  <td>
                    <button className="view-btn" onClick={() => navigate(`/dashboard/users/${u.id}`)}>
                      View Dossier
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
