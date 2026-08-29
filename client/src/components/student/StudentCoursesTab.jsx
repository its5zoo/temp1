import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  User, 
  X,
  ChevronRight,
  Layers
} from 'lucide-react';

export default function StudentCoursesTab({ courses = [] }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <BookOpen size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Enrolled Academic Courses & Subjects
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Semester 5 curriculum • 6 Enrolled Subjects • 22 Total Credits
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold text-xs">
            {courses.length} / 6 Subjects Max
          </span>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => {
          const isAtRisk = c.attendance < 80;
          return (
            <div 
              key={c.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded">
                    {c.code}
                  </span>
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                    {c.credits} Credits • {c.type}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mt-3 line-clamp-1">{c.title}</h3>
                
                <p className="text-xs text-slate-600 font-medium mt-1">
                  👨‍🏫 Instructor: <strong className="text-slate-900">{c.instructor}</strong>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  📍 {c.room} • {c.schedule}
                </p>

                {/* Syllabus Coverage Meter */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="text-slate-500 font-medium">Syllabus Covered:</span>
                    <span>Week {c.completedWeeks} / {c.totalWeeks} ({c.syllabusPercent}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 rounded-full transition-all duration-300"
                      style={{ width: `${c.syllabusPercent}%` }}
                    />
                  </div>
                </div>

                {/* Attendance Criteria Pill */}
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-medium text-slate-500">Attendance:</span>
                  <span className={`font-black ${isAtRisk ? 'text-amber-700' : 'text-slate-900'}`}>
                    {c.attendance}% {isAtRisk ? `(⚠️ Need ${c.classesNeededFor80} classes)` : '(✓ Safe)'}
                  </span>
                </div>

                {/* Next Assignment */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50/80 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Task</span>
                    <span className="text-[10px] font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                      {c.assignmentsDue} Due
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 truncate">{c.nextAssignment}</p>
                  <p className="text-[11px] text-slate-500">Due: {c.dueDate}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedCourse(c)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 font-bold transition-all text-center cursor-pointer"
                >
                  View Subject Syllabus →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Course Drawer */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="font-mono text-xs font-black bg-slate-900 text-white px-2 py-0.5 rounded">
                    {selectedCourse.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-2">{selectedCourse.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Course Specifications</span>
                <p className="text-slate-600">Instructor: <strong>{selectedCourse.instructor}</strong></p>
                <p className="text-slate-600">Credits: <strong>{selectedCourse.credits} Credits</strong></p>
                <p className="text-slate-600">Venue: <strong>{selectedCourse.room}</strong></p>
                <p className="text-slate-600">Schedule: <strong>{selectedCourse.schedule}</strong></p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 text-xs block">Attendance Breakdown</span>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Classes Attended:</span>
                  <strong className="text-slate-900">{selectedCourse.attendedClasses} / {selectedCourse.totalClasses} Sessions</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Current Percentage:</span>
                  <strong className="text-slate-900">{selectedCourse.attendance}%</strong>
                </div>
                {selectedCourse.classesNeededFor80 > 0 && (
                  <p className="text-xs text-amber-800 font-semibold bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                    ⚠️ You must attend {selectedCourse.classesNeededFor80} more consecutive lectures to cross 80.0% criteria.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
