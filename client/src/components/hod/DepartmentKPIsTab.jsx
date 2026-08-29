import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Star, 
  AlertTriangle, 
  DollarSign, 
  ChevronRight,
  RefreshCw,
  Building2
} from 'lucide-react';

export default function DepartmentKPIsTab({ overviewData, setActiveTab, onRefresh }) {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2026');
  const [selectedDept, setSelectedDept] = useState('all');

  const { department, kpis, alerts } = overviewData || {};
  const budget = kpis?.budget || { 
    allocated: 120000, 
    spent: 84500, 
    currency: 'USD', 
    adjunctHourlyRateAvg: 75, 
    hoursLoggedThisMonth: 1126, 
    hoursAllocatedCap: 1600 
  };
  
  const budgetPercent = Math.round((budget.spent / budget.allocated) * 100);
  const hoursPercent = Math.round((budget.hoursLoggedThisMonth / budget.hoursAllocatedCap) * 100);

  return (
    <div className="space-y-5">
      {/* Top Academic Unit Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              <Building2 size={16} />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {department?.name || 'Department of Computer Science & Engineering'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Chair: <strong className="text-slate-800">{department?.hodName || 'Dr. Alan Smith'}</strong> • Academic Period: <strong className="text-slate-800">{selectedSemester}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-slate-800"
          >
            <option value="Fall 2026">Fall 2026 (Active)</option>
            <option value="Spring 2026">Spring 2026</option>
            <option value="Fall 2025">Fall 2025</option>
          </select>

          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-slate-800"
          >
            <option value="all">All Specializations</option>
            <option value="cs">Core Computer Science</option>
            <option value="ai">AI & Data Science</option>
            <option value="sec">Cybersecurity & Cloud</option>
          </select>
        </div>
      </div>

      {/* 4-Column Primary KPI Grid - High Contrast Black & White */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Faculty */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Faculty Roster</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{kpis?.totalFaculty || 18}</span>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded">+2 this term</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
              <span><strong>{kpis?.fullTimeCount || 12}</strong> Full-Time</span>
              <span><strong>{kpis?.adjunctCount || 6}</strong> Adjunct</span>
            </div>
          </div>
        </div>

        {/* Student Faculty Ratio */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Student:Faculty</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{kpis?.studentFacultyRatio || '26.6:1'}</span>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded">480 Students</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
              <span>Benchmark: &lt; 30:1</span>
              <span className="font-semibold text-slate-900">Balanced</span>
            </div>
          </div>
        </div>

        {/* Teaching Satisfaction */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg Faculty Rating</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{kpis?.avgTeachingRating || 4.72}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded ml-auto">94.2% Positive</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
              <span>842 Student Reviews</span>
              <span className="font-semibold text-slate-900">98.2% SLA</span>
            </div>
          </div>
        </div>

        {/* Attention Flags */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Attention Flags</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">
                {(kpis?.overloadedFacultyCount || 0) + (kpis?.overloadedAdvisorsCount || 0)}
              </span>
              <span className="text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">Action Required</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
              <span><strong>{kpis?.overloadedFacultyCount || 2}</strong> Faculty Overload</span>
              <span><strong>{kpis?.overloadedAdvisorsCount || 1}</strong> Advisor Overload</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Budget & Spend / Priorities Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Adjunct Budget & Capacity Burn Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <DollarSign size={15} className="text-slate-800" />
                  Adjunct Budget & Capacity Burn
                </h3>
                <p className="text-[11px] text-slate-400">Term financial spend against cap</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {budgetPercent}%
              </span>
            </div>

            {/* Financial Meter */}
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-600">Fiscal Spend</span>
                  <span className="text-slate-900 font-bold">${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Remaining: ${(budget.allocated - budget.spent).toLocaleString()}</span>
                  <span>Avg Rate: ${budget.adjunctHourlyRateAvg}/hr</span>
                </div>
              </div>

              {/* Hours Logged */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-600">Teaching Hours Logged</span>
                  <span className="text-slate-900 font-bold">{budget.hoursLoggedThisMonth} / {budget.hoursAllocatedCap} hrs</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-700 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(hoursPercent, 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Cap Buffer: {budget.hoursAllocatedCap - budget.hoursLoggedThisMonth} hrs</span>
                  <span>{hoursPercent}% of term cap</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">In Onboarding</span>
              <span className="text-sm font-bold text-slate-900">{kpis?.pendingOnboardingCount || 2}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="block text-[10px] text-slate-400 uppercase font-semibold">Job Requisitions</span>
              <span className="text-sm font-bold text-slate-900">{kpis?.openJobRequisitionsCount || 3}</span>
            </div>
          </div>
        </div>

        {/* Priority Department Action Items */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xs">
                  Department Priority Decisions
                </h3>
                <p className="text-[11px] text-slate-400">Action items requiring chair authorization</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {alerts?.length || 0} Items
              </span>
            </div>

            <div className="mt-3.5 space-y-2">
              {(alerts || []).map((alert) => (
                <div 
                  key={alert.id}
                  className="p-3 rounded-lg bg-slate-50/70 border border-slate-200 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{alert.title}</h4>
                        <span className="text-[10px] text-slate-400">({alert.timestamp})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{alert.message}</p>
                      {alert.suggestedAction && (
                        <p className="text-[11px] text-slate-800 font-semibold mt-1">
                          Suggested: {alert.suggestedAction}
                        </p>
                      )}
                    </div>
                  </div>

                  {alert.category === 'workload' && (
                    <button 
                      onClick={() => setActiveTab('workload')}
                      className="shrink-0 px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Rebalance <ChevronRight size={12} />
                    </button>
                  )}
                  {alert.category === 'advisory' && (
                    <button 
                      onClick={() => setActiveTab('advisors')}
                      className="shrink-0 px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Caseload <ChevronRight size={12} />
                    </button>
                  )}
                  {alert.category === 'outcomes' && (
                    <button 
                      onClick={() => setActiveTab('outcomes')}
                      className="shrink-0 px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Review <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Real-time anomaly monitoring enabled</span>
            <span className="text-slate-800 font-semibold cursor-pointer hover:underline flex items-center gap-1" onClick={onRefresh}>
              <RefreshCw size={11} /> Sync Feed
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Specialization Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              CS
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Core Computer Science</h4>
              <p className="text-[11px] text-slate-500">280 Enrolled • 10 Faculty</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            Balanced
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">AI & Data Science</h4>
              <p className="text-[11px] text-slate-500">120 Enrolled • 5 Faculty</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            Balanced
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              CY
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Cybersecurity & Cloud</h4>
              <p className="text-[11px] text-slate-500">80 Enrolled • 3 Faculty</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Recruiting
          </span>
        </div>
      </div>
    </div>
  );
}
