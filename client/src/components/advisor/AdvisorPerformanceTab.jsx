import React from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Layers, 
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell
} from 'recharts';

export default function AdvisorPerformanceTab({ performanceData }) {
  const { cohortSummary, gpaDistribution, attendanceCorrelation, subjectBottlenecks } = performanceData || {};

  const GPA_COLORS = ['#0284c7', '#38bdf8', '#0ea5e9', '#94a3b8', '#e11d48'];

  return (
    <div className="space-y-6">
      {/* Top Academic Standing Summary */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <TrendingUp size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Cohort Academic Analytics & Trends
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                GPA distributions, attendance correlation & subject bottlenecks across 65 advisees
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-950 border border-sky-200">
            Average CGPA: <strong className="text-slate-900">{cohortSummary?.avgCGPA || 7.42}</strong>
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
            Retention Rate: <strong className="text-slate-900">{cohortSummary?.retentionRate || 96.8}%</strong>
          </span>
        </div>
      </div>

      {/* 4 Standing Breakdown Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Dean's List</span>
            <Award size={16} className="text-sky-700" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.deansListCount || 18}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 8.5+ with no backlogs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Good Standing</span>
            <CheckCircle2 size={16} className="text-emerald-700" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.goodStandingCount || 35}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 6.5 - 8.4 Normal Track</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Academic Warning</span>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.academicWarningCount || 8}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 6.0 - 6.4 Intervention</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Academic Probation</span>
            <AlertTriangle size={16} className="text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-600 mt-2 block">{cohortSummary?.probationCount || 4}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA &lt; 6.0 Action Required</span>
        </div>
      </div>

      {/* 2 Recharts Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GPA Distribution Bell Curve */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <BarChart2 size={16} className="text-sky-700" />
                CGPA Distribution (Advisee Cohort)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of 65 students across grade brackets</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gpaDistribution || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0f2fe', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                  {(gpaDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GPA_COLORS[index % GPA_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance vs GPA Correlation */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Layers size={16} className="text-sky-700" />
                Attendance vs CGPA Correlation
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Correlation showing attendance impact on academic results</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceCorrelation || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="attendanceTier" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e0f2fe', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="avgCGPA" fill="#0284c7" radius={[6, 6, 0, 0]} name="Avg CGPA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Subject Bottlenecks Table */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen size={16} className="text-rose-600" />
              Identified Course Bottlenecks & High Failure Rates
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Courses where assigned advisees have highest concentration of struggle</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-sky-50/60 border-b border-sky-100 text-slate-600 font-bold uppercase">
                <th className="py-3 px-4">Course Code & Title</th>
                <th className="py-3 px-4">Advisees At Risk</th>
                <th className="py-3 px-4">Cohort Failure Rate</th>
                <th className="py-3 px-4">Instructor In-Charge</th>
                <th className="py-3 px-4 text-right">Intervention Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(subjectBottlenecks || []).map((b, i) => (
                <tr key={i} className="hover:bg-sky-50/30">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {b.code} • {b.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      {b.atRiskCount} Students
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {b.failureRate}%
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {b.faculty}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
                      Peer Tutor Deployed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
