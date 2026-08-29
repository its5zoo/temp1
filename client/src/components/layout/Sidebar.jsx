import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const NAV_ITEMS = {
  hod: [{ label: 'Dashboard', path: '/dashboard' }, { label: 'Faculty', path: '/dashboard/users' }],
  adjunct_faculty: [{ label: 'Dashboard', path: '/dashboard' }],
  advisor: [{ label: 'Dashboard', path: '/dashboard' }],
  student: [{ label: 'My Learning', path: '/dashboard' }],
  admin: [{ label: 'Admin', path: '/dashboard' }],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = NAV_ITEMS[user?.role] || [];

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
          <button key={item.path} className="nav-item" onClick={() => navigate(item.path)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0)}</div>
        <div className="user-info">
          <p className="user-name">{user?.name}</p>
          <p className="user-role">{user?.role?.replace('_', ' ')}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">⏻</button>
      </div>
    </aside>
  );
}
