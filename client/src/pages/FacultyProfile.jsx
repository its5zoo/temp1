import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFacultyProfile } from '../services/api';
import './FacultyProfile.css';

export default function FacultyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFacultyProfile(id)
      .then(res => {
        setProfile(res.data.profile);
        setDetails(res.data.details);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading faculty dossier...</div>;
  if (!profile) return <div className="loading">Profile not found.</div>;

  return (
    <div className="profile-page">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      <div className="profile-hero">
        <div className="avatar">{profile.name.charAt(0)}</div>
        <div className="profile-meta">
          <div className="profile-name-row">
            <h1>{profile.name}</h1>
            <span className="role-badge">{profile.role.replace('_', ' ')}</span>
          </div>
          <p className="profile-email">{profile.email}</p>
          {details?.departments && <p className="profile-dept">{details.departments.department_name}</p>}
        </div>
      </div>

      {details && (
        <div className="profile-grid">
          <div className="profile-main">
            <div className="card">
              <h3>Biography</h3>
              <p>{details.bio || 'No biography provided.'}</p>
            </div>
            <div className="card">
              <h3>Academic Qualifications</h3>
              {details.qualifications?.length > 0 ? (
                <ul className="qual-list">
                  {details.qualifications.map((q, i) => (
                    <li key={i}><span className="dot" />{q}</li>
                  ))}
                </ul>
              ) : <p>No qualifications listed.</p>}
            </div>
          </div>
          <div className="profile-side">
            <div className="card">
              <h3>Experience</h3>
              <div className="exp-years">{details.experience_years || 0} <span>years</span></div>
              <h4>Previous Institutions</h4>
              {details.previous_institutions?.map((inst, i) => (
                <div key={i} className="inst-item">{inst}</div>
              ))}
            </div>
            <div className="card">
              <h3>Live KPIs</h3>
              <div className="kpi-row"><span>Performance Score</span><strong>{details.performance_score ?? 'N/A'}</strong></div>
              <div className="kpi-row"><span>Status</span><span className="badge green">{details.employment_status || 'Active'}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
