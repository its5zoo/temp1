'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export default function MySubjects({ isEmpty }: { isEmpty: boolean }) {
  
  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <div className="bg-slate-100 p-4 rounded-full inline-block text-slate-400 mb-4">
          <BookOpen size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No active subjects</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          You are not currently enrolled in any subjects for this semester. Once registration closes, your courses will appear here.
        </p>
      </div>
    );
  }

  const subjects = [
    { code: 'CS301', name: 'Advanced Data Structures', teacher: 'Dr. Alan Turing', progress: 85, grade: 'A-', alerts: 1 },
    { code: 'ENG202', name: 'Technical Writing', teacher: 'Prof. Mary Shelley', progress: 100, grade: 'A', alerts: 0 },
    { code: 'MATH104', name: 'Linear Algebra', teacher: 'Dr. Emmy Noether', progress: 60, grade: 'C+', alerts: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Subjects</h1>
        <p className="text-slate-500 mt-1">Year 3, Semester 6</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(sub => (
          <Card key={sub.code} className="hover:shadow-md transition-shadow cursor-pointer group border-slate-200">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-bold text-indigo-600 mb-1 tracking-wider">{sub.code}</div>
                  <CardTitle className="text-lg leading-tight group-hover:text-indigo-700 transition-colors">{sub.name}</CardTitle>
                </div>
                {sub.alerts > 0 && (
                  <div className="bg-rose-100 text-rose-700 p-1.5 rounded-full" title={`${sub.alerts} Alerts`}>
                    <AlertCircle size={16} />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-medium text-slate-900">{sub.teacher}</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Course Progress</span>
                  <span className="font-semibold text-slate-700">{sub.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${sub.progress < 75 ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <div className="text-sm font-medium">
                  Current Grade: <span className={sub.grade.includes('C') ? 'text-amber-600' : 'text-emerald-600'}>{sub.grade}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><FileText size={18} className="text-slate-500"/> Mid-Semester Feedback (N=5 Rule Active)</h3>
        <p className="text-sm text-slate-600 mb-4">
          Provide anonymous feedback for your instructors. Your identity is strictly protected. Feedback is only released to the instructor in aggregate once a minimum of 5 students have submitted, to prevent re-identification.
        </p>
        <button className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          View Pending Surveys
        </button>
      </div>

    </div>
  );
}
