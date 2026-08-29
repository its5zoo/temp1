import React from 'react';
import KanbanBoard from '../components/recruitment/KanbanBoard';

export default function RecruitmentPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Faculty Recruitment Pipeline</h1>
        <p className="text-slate-500 mt-1">Interactive drag-and-drop applicant tracking system with automatic email triggers.</p>
      </div>
      <KanbanBoard />
    </div>
  );
}
