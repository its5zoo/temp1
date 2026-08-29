import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  CreditCard, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function StudentOverviewTab({ overviewData, setActiveTab }) {
  const { profile, coursesSummary, feesSummary, upcomingLectures } = overviewData || {};

  const isAttendanceAtRisk = (profile?.overallAttendance || 0) < 80;

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-xl shadow-xs">
            {profile?.name?.split(' ').map(n => n[0]).join('') || 'AS'}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {profile?.name || 'Aarav Sharma'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                {profile?.academicStanding || "Dean's List"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Roll No: <strong className="text-slate-800 font-mono">{profile?.rollNo || '2024CS101'}</strong> • {profile?.department} • Semester {profile?.currentSemester} (Sec {profile?.section})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('results')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <TrendingUp size={14} />
            <span>View Gradebook</span>
          </button>
        </div>
      </div>

      {/* 4 Academic KPI Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CGPA */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cumulative GPA</span>
            <Award size={18} className="text-slate-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{profile?.cgpa || '8.74'}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 10.0</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 pt-2 border-t border-slate-100">
            Latest SGPA: <strong className="text-slate-900">{profile?.sgpa || '8.90'}</strong> (Sem 5)
          </p>
        </div>

        {/* Earned Credits */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Degree Credits</span>
            <GraduationCap size={18} className="text-slate-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{profile?.earnedCredits || '118'}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {profile?.totalCreditsRequired || '160'}</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: '73.7%' }} />
          </div>
        </div>

        {/* 80% Attendance Criteria Metric */}
        <div className={`rounded-2xl p-5 border shadow-2xs flex flex-col justify-between ${
          isAttendanceAtRisk 
            ? 'bg-amber-50/40 border-amber-200 text-slate-900' 
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Term Attendance</span>
            {isAttendanceAtRisk ? (
              <AlertTriangle size={18} className="text-amber-600" />
            ) : (
              <CheckCircle2 size={18} className="text-emerald-600" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-black ${isAttendanceAtRisk ? 'text-amber-700' : 'text-slate-900'}`}>
              {profile?.overallAttendance || '78.2'}%
            </span>
            <span className="text-xs text-slate-500 font-semibold">Target: 80.0%</span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium mt-2 pt-2 border-t border-slate-200/60">
            {isAttendanceAtRisk ? (
              <strong className="text-amber-800">⚠️ Below 80% threshold</strong>
            ) : (
              <strong className="text-emerald-700">✓ Exam Eligible</strong>
            )}
          </p>
        </div>

        {/* Active Semester Subjects */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Subjects</span>
            <BookOpen size={18} className="text-slate-800" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{coursesSummary?.totalCourses || 6}</span>
            <span className="text-xs text-slate-400 font-semibold">Subjects (22 Credits)</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2 pt-2 border-t border-slate-100">
            Assignments Pending: <strong className="text-slate-900">{coursesSummary?.assignmentsDue || 2} Due</strong>
          </p>
        </div>
      </div>

      {/* 80% Mandatory Attendance Calculator Alert Box */}
      {isAttendanceAtRisk && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-black uppercase">
                Action Required
              </span>
              <h3 className="text-base font-extrabold text-white">
                University 80% Attendance Criteria Deficit
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-2xl">
              Your overall attendance is currently <strong>{profile?.overallAttendance}%</strong>. You must attend the next <strong>{coursesSummary?.totalClassesToAttend || 15} upcoming lectures</strong> across your enrolled subjects to restore exam hall ticket eligibility.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <span>Open Attendance Planner</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* 2-Column Split: Today's Schedule & Fee/Feedback Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Today's Teaching Schedule */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Today's Class Schedule</h3>
              <p className="text-xs text-slate-400 mt-0.5">Live timetable & classroom allocations</p>
            </div>
            <button
              onClick={() => setActiveTab('timetable')}
              className="text-xs font-bold text-slate-900 hover:underline cursor-pointer flex items-center gap-1"
            >
              Full Timetable →
            </button>
          </div>

          <div className="space-y-3">
            {(upcomingLectures || []).map((slot, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shrink-0">
                    {slot.time.split(' ')[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{slot.course}</h4>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      📍 {slot.room} • Instructor: <strong className="text-slate-800">{slot.instructor}</strong>
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 ${
                  slot.type === 'Lab' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-slate-900 border-slate-300'
                }`}>
                  {slot.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Quick Fee Status & Adjunct Feedback Banner */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Overdue Fee Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tuition Account</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                {feesSummary?.status || 'Pending'}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-medium">Outstanding Balance</span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                ₹{feesSummary?.balanceDue?.toLocaleString('en-IN') || '25,000'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Due Date: {feesSummary?.dueDate || 'Sep 15, 2026'}</p>
            </div>

            <button
              onClick={() => setActiveTab('fees')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <CreditCard size={14} />
              <span>Review & Pay Tuition Fee →</span>
            </button>
          </div>

          {/* Rate Adjunct Faculty Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty Quality Audit</span>
              <SmartIcon size={16} className="text-slate-800" />
            </div>

            <h4 className="text-xs font-extrabold text-slate-900">
              Submit Feedback for Prof. Priya Sharma (Adjunct Faculty)
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Rate lecture clarity, industry practical labs & doubt assistance for CS301.
            </p>

            <button
              onClick={() => setActiveTab('feedback')}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-bold text-xs transition-all cursor-pointer"
            >
              Give Anonymous Feedback
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
