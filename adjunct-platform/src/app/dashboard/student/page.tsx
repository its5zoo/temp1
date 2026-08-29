'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import StudentHome from '@/components/student/StudentHome';
import MySubjects from '@/components/student/MySubjects';
import CareerPath from '@/components/student/CareerPath';
import AcademicCopilot from '@/components/student/AcademicCopilot';
import CampusHub from '@/components/student/CampusHub';
import StudentServices from '@/components/student/StudentServices';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'subjects' | 'career' | 'copilot' | 'hub' | 'services'>('home');

  if (!user || user.role !== 'Student') {
    return <div className="p-8 text-rose-600">Unauthorized. Student role required.</div>;
  }

  // To test the "empty state" requirement, we could toggle a boolean here
  const isEmptyState = false; // Set to true to test a first-semester student with no data

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      
      {/* Tab Navigation */}
      <div className="bg-white border-b px-6 flex gap-8 shrink-0 overflow-x-auto custom-scrollbar whitespace-nowrap">
        <TabButton id="home" label="Home Overview" current={activeTab} onClick={setActiveTab} />
        <TabButton id="subjects" label="My Subjects" current={activeTab} onClick={setActiveTab} />
        <TabButton id="hub" label="Campus Hub" current={activeTab} onClick={setActiveTab} />
        <TabButton id="career" label="Career & Skills" current={activeTab} onClick={setActiveTab} />
        <TabButton id="copilot" label="AI Copilot" current={activeTab} onClick={setActiveTab} />
        <TabButton id="services" label="Student Services" current={activeTab} onClick={setActiveTab} />
      </div>

      {/* Tab Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'home' && <StudentHome isEmpty={isEmptyState} userName={user.name} />}
          {activeTab === 'subjects' && <MySubjects isEmpty={isEmptyState} />}
          {activeTab === 'hub' && <CampusHub />}
          {activeTab === 'career' && <CareerPath isEmpty={isEmptyState} />}
          {activeTab === 'copilot' && <AcademicCopilot />}
          {activeTab === 'services' && <StudentServices />}
        </div>
      </div>

    </div>
  );
}

function TabButton({ id, label, current, onClick }: { id: any, label: string, current: any, onClick: any }) {
  const isActive = current === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
        isActive 
          ? 'border-indigo-600 text-indigo-700' 
          : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  );
}
