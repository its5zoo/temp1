import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudentData, submitFeedback } from '../services/api';
import AttendanceMeter from '../components/dashboard/AttendanceMeter';
import FeedbackForm from '../components/dashboard/FeedbackForm';
import './Dashboard.css';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Find student by profile_id via all users, simplified: use mock fallback for demo
    setStudent({ attendance: 75, cgpa: 6.8 });
    setLoading(false);
  }, [user]);

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  const attendance = student?.attendance || 75;
  const TOTAL_CLASSES = 40;
  const attended = (attendance / 100) * TOTAL_CLASSES;
  const classesNeeded = attendance < 80 ? Math.ceil((0.8 * TOTAL_CLASSES - attended) / 0.2) : 0;

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>My Learning</h1>
        <p>Welcome back, {user?.name}. Here is your academic progress.</p>
      </div>

      <AttendanceMeter attendance={attendance} classesNeeded={classesNeeded} />

      <div className="two-col-grid">
        <div className="card">
          <h3>Enrolled Courses</h3>
          <div className="course-item">
            <span>Advanced Python Programming</span>
            <span className="badge purple">In Progress</span>
          </div>
          <div className="course-item">
            <span>Data Structures</span>
            <span className="badge purple">In Progress</span>
          </div>
        </div>
        <FeedbackForm onSubmit={submitFeedback} />
      </div>
    </div>
  );
}
