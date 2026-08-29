import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('alan.hod@univ.edu');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoAccounts } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email);
      navigate('/dashboard');
    } catch {
      setError('No account found for this email. Try a demo account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
      <div className="login-card">
        <div className="login-header">
          <h1>Acad<span className="highlight">Core</span></h1>
          <p>Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" defaultValue="demo123" placeholder="••••••••" required />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {demoAccounts.length > 0 && (
          <div className="demo-accounts">
            <p className="demo-label">Quick Login — Demo Accounts</p>
            {demoAccounts.map(acc => (
              <button key={acc.id} className="demo-item" onClick={() => setEmail(acc.email)}>
                <span className="demo-email">{acc.email}</span>
                <span className={`demo-role role-${acc.role}`}>{acc.role.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
