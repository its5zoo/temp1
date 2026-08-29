'use client';

import { useAuth } from '@/lib/auth-context';
import MySubjects from '@/components/student/MySubjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function CoursesPage() {
  const { user } = useAuth();

  // If it's a student, we can reuse the excellent MySubjects component we already built!
  if (user?.role === 'Student') {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <MySubjects isEmpty={false} />
      </div>
    );
  }

  // Placeholder for Faculty
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Courses Management</h1>
        <p className="text-slate-500 mt-1">Manage your assigned courses, syllabus, and grading.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Faculty Course Cards */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-indigo-600 mb-1 tracking-wider">CS301</div>
            <CardTitle className="text-lg leading-tight">Advanced Data Structures</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Enrolled Students:</span>
              <span className="font-medium text-slate-900">45</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Pending Assignments:</span>
              <span className="font-medium text-amber-600">12 to grade</span>
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors">
              Manage Course
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
