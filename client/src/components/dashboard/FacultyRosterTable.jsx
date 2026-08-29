import { useNavigate } from 'react-router-dom';
import './FacultyRosterTable.css';

export default function FacultyRosterTable({ roster }) {
  const navigate = useNavigate();
  return (
    <div className="card roster-card">
      <div className="roster-header">
        <h3>Department Faculty Roster</h3>
        <p>Live view of all teaching staff</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roster.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', color: '#9ca3af', padding: 32 }}>Loading...</td></tr>
            ) : roster.map(f => (
              <tr key={f.id}>
                <td className="name-cell">{f.name}</td>
                <td className="email-cell">{f.email}</td>
                <td><span className={`role-badge role-${f.role}`}>{f.role.replace('_', ' ')}</span></td>
                <td>
                  <button className="view-btn" onClick={() => navigate(`/dashboard/users/${f.id}`)}>
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
