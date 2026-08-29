import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentHome from '../components/student/StudentHome';
import MySubjects from '../components/student/MySubjects';
import CareerPath from '../components/student/CareerPath';
import AcademicCopilot from '../components/student/AcademicCopilot';
import CampusHub from '../components/student/CampusHub';
import StudentServices from '../components/student/StudentServices';
import AttendanceMeter from '../components/dashboard/AttendanceMeter';
import FeedbackForm from '../components/dashboard/FeedbackForm';
import { submitFeedback } from '../services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const attendance = 75;
  const TOTAL_CLASSES = 40;
  const attended = (attendance / 100) * TOTAL_CLASSES;
  const classesNeeded = attendance < 80 ? Math.ceil((0.8 * TOTAL_CLASSES - attended) / 0.2) : 0;

  const tabs = [
    { id: 'home', label: 'Home Overview' },
    { id: 'attendance', label: 'Attendance & Standing' },
    { id: 'feedback', label: 'Rate Faculty' },
    { id: 'subjects', label: 'My Subjects' },
    { id: 'hub', label: 'Campus Hub' },
    { id: 'career', label: 'Career & Skills' },
    { id: 'copilot', label: 'AI Copilot' },
    { id: 'services', label: 'Student Services' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 flex gap-6 shrink-0 overflow-x-auto whitespace-nowrap sticky top-0 z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-indigo-600 text-indigo-700 font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {activeTab === 'home' && <StudentHome isEmpty={false} userName={user?.name || 'Alex'} />}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <AttendanceMeter attendance={attendance} classesNeeded={classesNeeded} />
            </div>
          )}
          {activeTab === 'feedback' && (
            <div className="max-w-2xl mx-auto">
              <FeedbackForm onSubmit={submitFeedback} />
            </div>
          )}
          {activeTab === 'subjects' && <MySubjects isEmpty={false} />}
          {activeTab === 'hub' && <CampusHub />}
          {activeTab === 'career' && <CareerPath isEmpty={false} />}
          {activeTab === 'copilot' && <AcademicCopilot />}
          {activeTab === 'services' && <StudentServices />}
        </div>
      </div>
    </div>
  );
}
