import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HODDashboard from './pages/HODDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import AdjunctDashboard from './pages/AdjunctDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UsersDirectory from './pages/UsersDirectory';
import FacultyProfile from './pages/FacultyProfile';
import DashboardLayout from './components/layout/DashboardLayout';
import './index.css';

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'hod') return <HODDashboard />;
  if (user.role === 'advisor') return <AdvisorDashboard />;
  if (user.role === 'adjunct_faculty') return <AdjunctDashboard />;
  if (user.role === 'student') return <StudentDashboard />;
  if (user.role === 'admin') return <AdminDashboard />;
  return <HODDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/dashboard/users" element={<UsersDirectory />} />
            <Route path="/dashboard/users/:id" element={<FacultyProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
