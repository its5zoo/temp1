import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  Scale, 
  Calendar, 
  Clock, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Sparkles,
  PhoneCall,
  Video
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function AdvisorOverviewTab({ overviewData, setActiveTab, onRefresh }) {
  const { profile, kpis, alerts, todaySessions } = overviewData || {};

  const caseloadScore = kpis?.caseloadScore || 138;
  const maxCapacity = kpis?.maxCapacity || 120;
  const caseloadPercent = Math.min(Math.round((caseloadScore / maxCapacity) * 100), 100);

  return (
    <div className="space-y-6">
      {/* Header Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <GraduationCap size={20} />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Academic Advisor Command Center
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Advisor: <strong className="text-slate-900">{profile?.name || 'Dr. Ramesh Iyer'}</strong> • Department: <strong className="text-slate-900">{profile?.department || 'Computer Science & Engineering'}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            Caseload: {profile?.status || 'Overloaded'} ({caseloadScore} pts)
          </span>
          <button
            onClick={() => setActiveTab('meetings')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar size={14} />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Assigned Students */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Advisees</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.totalStudents || 65}</span>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">B.Tech CSE</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Low Risk: <strong>{kpis?.lowRiskCount || 53}</strong></span>
              <span>At Risk: <strong className="text-rose-600">{kpis?.atRiskTotal || 12}</strong></span>
            </div>
          </div>
        </div>

        {/* Caseload Weight Score */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caseload Weight</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 flex items-center justify-center">
              <Scale size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{caseloadScore}</span>
              <span className="text-xs text-slate-400 font-medium">/ {maxCapacity} Max</span>
              <span className="text-xs font-bold text-rose-900 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md ml-auto">+18 Over</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>HOD Auto-Balance: <strong>Pending</strong></span>
              <span className="text-rose-600 font-bold">115% Load</span>
            </div>
          </div>
        </div>

        {/* Critical Interventions Required */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgent Interventions</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.highRiskCount || 4}</span>
              <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">Probation</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Moderate Risk: <strong>{kpis?.mediumRiskCount || 8}</strong></span>
              <span className="text-slate-900 font-bold">Action Needed</span>
            </div>
          </div>
        </div>

        {/* Cohort Health Indicator */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg CGPA & Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.avgCGPA || '7.42'}</span>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">
                {kpis?.avgAttendance || 86.4}% Att.
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Dean's List: <strong>18 Students</strong></span>
              <span className="font-bold text-emerald-700">Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: AI Action Alerts & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Early Warning AI Alerts (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <SmartIcon size={16} className="text-sky-700" />
                  Early Warning & Intervention Alerts
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated algorithmic detection of at-risk students</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                {(alerts || []).length} Active Alerts
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(alerts || []).map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-xl bg-sky-50/40 border border-sky-100 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                      alert.severity === 'high' ? 'bg-rose-600' : alert.severity === 'medium' ? 'bg-amber-500' : 'bg-sky-600'
                    }`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 truncate">{alert.title}</h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                      {alert.action && (
                        <p className="text-xs text-sky-950 font-bold mt-1.5">
                          Action: {alert.action}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (alert.studentId) setActiveTab('students');
                      else setActiveTab('meetings');
                    }}
                    className="shrink-0 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-sky-50 border border-sky-200 text-slate-900 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>Resolve</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Automated risk scoring runs every 6 hours</span>
            <span className="text-slate-900 font-bold cursor-pointer hover:underline flex items-center gap-1" onClick={onRefresh}>
              <RefreshCw size={12} /> Refresh
            </span>
          </div>
        </div>

        {/* Right Column: Today's Scheduled Advisory Sessions (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Clock size={16} className="text-sky-700" />
                  Today's Advisory Sessions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Scheduled 1-on-1 student counseling</p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {(todaySessions || []).length} Sessions
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(todaySessions || []).map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">{s.time}</span>
                      <span className="text-xs font-bold text-slate-800 truncate">{s.studentName}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{s.type}</p>
                    <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 mt-1.5 inline-block">
                      {s.mode}
                    </span>
                  </div>

                  <button 
                    onClick={() => setActiveTab('meetings')}
                    className="shrink-0 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-bold hover:bg-slate-100 transition-all cursor-pointer shadow-2xs"
                  >
                    View
                  </button>
                </div>
              ))}

              {(!todaySessions || todaySessions.length === 0) && (
                <p className="text-xs text-slate-400 py-6 text-center">No more sessions scheduled for today.</p>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('meetings')}
              className="w-full py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-200 text-xs font-bold transition-all text-center block"
            >
              Open Full Advisory Calendar →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
