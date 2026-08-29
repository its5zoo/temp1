import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  RefreshCw, 
  GraduationCap 
} from 'lucide-react';
import StudentOverviewTab from '../components/student/StudentOverviewTab';
import StudentCoursesTab from '../components/student/StudentCoursesTab';
import StudentResultsTab from '../components/student/StudentResultsTab';
import StudentTimetableTab from '../components/student/StudentTimetableTab';
import StudentAttendanceTab from '../components/student/StudentAttendanceTab';
import StudentFeesTab from '../components/student/StudentFeesTab';
import StudentFeedbackTab from '../components/student/StudentFeedbackTab';
import StudentDoubtsTab from '../components/student/StudentDoubtsTab';
import { 
  getStudentPortalOverview, 
  getStudentPortalCourses, 
  getStudentPortalResults, 
  getStudentPortalTimetable, 
  getStudentPortalAttendance, 
  getStudentPortalFees, 
  payStudentPortalFee, 
  submitStudentFacultyFeedback, 
  getStudentPortalDoubts, 
  createStudentPortalDoubt 
} from '../services/api';

export default function StudentDashboard({ initialTab = 'dashboard' }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || initialTab || 'dashboard');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overviewData, setOverviewData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [resultsData, setResultsData] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [feesData, setFeesData] = useState(null);
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/dashboard?tab=${tabId}`);
  };

  const fetchStudentData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const [overRes, crsRes, resRes, timeRes, attRes, feeRes, dbtRes] = await Promise.allSettled([
        getStudentPortalOverview(),
        getStudentPortalCourses(),
        getStudentPortalResults(),
        getStudentPortalTimetable(),
        getStudentPortalAttendance(),
        getStudentPortalFees(),
        getStudentPortalDoubts()
      ]);

      if (overRes.status === 'fulfilled') setOverviewData(overRes.value.data);
      if (crsRes.status === 'fulfilled') setCourses(crsRes.value.data.courses || []);
      if (resRes.status === 'fulfilled') setResultsData(resRes.value.data);
      if (timeRes.status === 'fulfilled') setTimetable(timeRes.value.data.timetable || []);
      if (attRes.status === 'fulfilled') setAttendanceData(attRes.value.data);
      if (feeRes.status === 'fulfilled') setFeesData(feeRes.value.data.fees);
      if (dbtRes.status === 'fulfilled') setDoubts(dbtRes.value.data.doubts || []);
    } catch (err) {
      console.error('Error fetching student portal data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handlePayFee = async (amount) => {
    try {
      const res = await payStudentPortalFee({ amount });
      if (res.data?.fees) {
        setFeesData(res.data.fees);
      }
      fetchStudentData(true);
    } catch (err) {
      console.error('Error paying fee:', err);
    }
  };

  const handleSubmitFeedback = async (payload) => {
    try {
      await submitStudentFacultyFeedback(payload);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  const handleCreateDoubt = async (payload) => {
    try {
      const res = await createStudentPortalDoubt(payload);
      if (res.data?.doubt) {
        setDoubts(prev => [res.data.doubt, ...prev]);
      }
    } catch (err) {
      console.error('Error creating doubt:', err);
    }
  };

  return (
    <div className="dashboard-content max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="print-hide flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Academic Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-900 border border-slate-300">
              Semester 5 B.Tech CSE
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <strong className="text-slate-900">{user?.name || 'Aarav Sharma'}</strong> (Roll No: 2024CS101). Monitor academic marks, CGPA, 80% attendance criteria, timetable, fees & faculty feedback.
          </p>
        </div>

        <button
          onClick={() => fetchStudentData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin text-slate-700' : 'text-slate-600'} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Academic Feed'}</span>
        </button>
      </div>

      {/* Main Tab Rendering */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <RefreshCw size={24} className="animate-spin text-slate-700 mb-3" />
          <p className="text-xs text-slate-500 font-semibold">Loading Student Academic Records...</p>
        </div>
      ) : (
        <div>
          {activeTab === 'dashboard' && (
            <StudentOverviewTab 
              overviewData={overviewData} 
              setActiveTab={handleTabChange} 
            />
          )}

          {activeTab === 'courses' && (
            <StudentCoursesTab 
              courses={courses} 
            />
          )}

          {activeTab === 'results' && (
            <StudentResultsTab 
              resultsData={resultsData} 
            />
          )}

          {activeTab === 'timetable' && (
            <StudentTimetableTab 
              timetable={timetable} 
            />
          )}

          {activeTab === 'attendance' && (
            <StudentAttendanceTab 
              attendanceData={attendanceData} 
            />
          )}

          {activeTab === 'fees' && (
            <StudentFeesTab 
              feesData={feesData} 
              onPayFee={handlePayFee} 
            />
          )}

          {activeTab === 'feedback' && (
            <StudentFeedbackTab 
              onSubmitFeedback={handleSubmitFeedback} 
            />
          )}

          {activeTab === 'support' && (
            <StudentDoubtsTab 
              doubts={doubts} 
              onCreateDoubt={handleCreateDoubt} 
            />
          )}
        </div>
      )}
    </div>
  );
}
