import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import HODDashboard from './pages/HODDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyProfile from './pages/FacultyProfile';
import DashboardLayout from './components/layout/DashboardLayout';
import './index.css';

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'hod') return <HODDashboard />;
  if (user.role === 'student') return <StudentDashboard />;
  // Default fallback for advisor / adjunct_faculty / admin
  return <HODDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/dashboard/users/:id" element={<FacultyProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
