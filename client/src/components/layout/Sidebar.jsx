import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, UserPlus, BookOpen, MessageSquare, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = {
  hod: [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Faculty Roster', path: '/dashboard/users', icon: Users },
    { label: 'Recruitment', path: '/dashboard/recruitment', icon: UserPlus },
    { label: 'Courses', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  adjunct_faculty: [
    { label: 'Teaching Portal', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Doubts & Inbox', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Staff Directory', path: '/dashboard/users', icon: Users },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  advisor: [
    { label: 'Student Caseload', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Student Directory', path: '/dashboard/users', icon: Users },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  student: [
    { label: 'My Learning', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses & Subjects', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Doubts Center', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Faculty Directory', path: '/dashboard/users', icon: Users },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  admin: [
    { label: 'Admin Controls', path: '/dashboard', icon: LayoutDashboard },
    { label: 'User Directory', path: '/dashboard/users', icon: Users },
    { label: 'Recruitment', path: '/dashboard/recruitment', icon: UserPlus },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = (user?.role || '').toLowerCase();
  const navItems = NAV_ITEMS[userRole] || [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Directory', path: '/dashboard/users', icon: Users },
    { label: 'Courses', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
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
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`nav-item flex items-center gap-3 ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {Icon && <Icon size={18} className="shrink-0" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
        <div className="user-info">
          <p className="user-name">{user?.name || 'User'}</p>
          <p className="user-role">{user?.role?.replace('_', ' ') || 'Role'}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
