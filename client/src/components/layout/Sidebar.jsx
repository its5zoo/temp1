import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const NAV_ITEMS = {
  hod: [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Staff & Roster', path: '/dashboard/users' },
  ],
  adjunct_faculty: [
    { label: 'Teaching Portal', path: '/dashboard' },
    { label: 'Directory', path: '/dashboard/users' },
  ],
  advisor: [
    { label: 'Student Caseload', path: '/dashboard' },
    { label: 'Directory', path: '/dashboard/users' },
  ],
  student: [
    { label: 'My Learning', path: '/dashboard' },
    { label: 'Faculty Directory', path: '/dashboard/users' },
  ],
  admin: [
    { label: 'Admin Controls', path: '/dashboard' },
    { label: 'User Directory', path: '/dashboard/users' },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = NAV_ITEMS[user?.role] || [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Directory', path: '/dashboard/users' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        Acad<span>Core</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
        <div className="user-info">
          <p className="user-name">{user?.name || 'User'}</p>
          <p className="user-role">{user?.role?.replace('_', ' ') || 'Role'}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">⏻</button>
      </div>
    </aside>
  );
}
