import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-logo">Acad<span>Core</span></div>
        <div className="nav-actions">
          <button className="login-link-btn" onClick={() => navigate('/login')}>Sign In</button>
          <button className="primary-cta-btn" onClick={() => navigate('/login')}>Get Started →</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-badge">Next-Gen Academic Operations Engine</div>
        <h1 className="hero-title">
          Smart Faculty Operations & <span className="gradient-text">Predictive Student Advisory</span>
        </h1>
        <p className="hero-subtitle">
          Automate adjunct faculty onboarding, balance advisor workloads via real-time risk scoring, and streamline department operations with mathematical precision.
        </p>
        <div className="hero-cta-row">
          <button className="hero-primary-btn" onClick={() => navigate('/login')}>Launch Demo Environment</button>
          <button className="hero-secondary-btn" onClick={() => navigate('/login')}>Explore Demo Logins</button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Autonomous Risk Scoring</h3>
          <p>Real-time PL/pgSQL algorithms continuously evaluate attendance and GPA to assign predictive risk points.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚖️</div>
          <h3>Smart Caseload Balancing</h3>
          <p>Advisor workloads are calculated by weighted student risk points, not just headcount, eliminating advisor burnout.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎓</div>
          <h3>Comprehensive Dossiers</h3>
          <p>Deep profiles detailing faculty qualifications, previous academic institutions, and live performance metrics.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2026 AcadCore Platform. Built with Express, Node.js, React, and Supabase PostgreSQL.</p>
      </footer>
    </div>
  );
}
