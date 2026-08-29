import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function AdvisorReportsTab({ reportsData, students = [] }) {
  const { reports, cohortSummary } = reportsData || {};

  const handleExportSummaryCSV = () => {
    const headers = ["Metric", "Value", "Benchmark Goal", "Status"];
    const rows = [
      ["Term", reports?.term || "Fall 2026", "Current Academic Year", "Active"],
      ["Total Assigned Advisees", cohortSummary?.totalAdvisees || 65, "60 Target", "Healthy"],
      ["Average Cohort CGPA", cohortSummary?.avgCGPA || 7.42, "7.00 Min Target", "Exceeded"],
      ["Average Attendance Rate", `${cohortSummary?.avgAttendance || 86.4}%`, "80% Minimum", "Compliant"],
      ["Intervention Success Rate", `${reports?.interventionSuccessRate || 82.5}%`, "75% Target", "High Performing"],
      ["Probation Clearance Rate", `${reports?.probationClearanceRate || 75.0}%`, "70% Target", "Compliant"],
      ["Total Counseling Sessions", reports?.totalMeetingsConducted || 42, "30 Minimum", "Complete"],
      ["Advisory Compliance Rate", `${reports?.complianceRate || 98.4}%`, "95% Mandatory", "Verified"]
    ];

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(cell => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Advisor_Compliance_Report_Fall_2026.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <FileText size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Advisory Portfolio & Compliance Reports
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official accreditation logs, intervention recovery rates & dean audit exports
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer size={14} />
            <span>Print Audit</span>
          </button>
          <button
            onClick={handleExportSummaryCSV}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} />
            <span>Export Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* 4 Performance Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Compliance Score</span>
            <ShieldCheck size={18} className="text-sky-700" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">{reports?.complianceRate || 98.4}%</span>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>Goal: 95.0%</span>
              <span className="text-emerald-700 font-bold">Accredited</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Intervention Recovery</span>
            <TrendingUp size={18} className="text-emerald-700" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">{reports?.interventionSuccessRate || 82.5}%</span>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>GPA Improved: <strong>+0.65 Avg</strong></span>
              <span className="text-emerald-700 font-bold">Effective</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Probation Clearance</span>
            <Award size={18} className="text-sky-700" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">{reports?.probationClearanceRate || 75.0}%</span>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>3 of 4 Restored</span>
              <span className="text-slate-900 font-bold">75% Rate</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Sessions Logged</span>
            <Calendar size={18} className="text-sky-700" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">{reports?.totalMeetingsConducted || 42}</span>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>100% Notes Logged</span>
              <span className="text-emerald-700 font-bold">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Executive Statement Card */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Building2 size={16} className="text-sky-700" />
              Department Chair & Dean's Official Audit Dossier
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Formal semester summary for UGC / NAAC academic accreditation</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
            Audit Ready
          </span>
        </div>

        <div className="p-4 rounded-xl bg-sky-50/40 border border-sky-100 text-xs text-slate-800 leading-relaxed font-medium">
          <p className="font-bold text-slate-900 mb-2">Executive Summary Statement:</p>
          "{reports?.deanSummary || 'Dr. Ramesh Iyer has managed 65 student portfolios with 42 recorded counseling interventions. 12 at-risk students are enrolled in structured peer tutoring. Recommended load rebalancing to bring caseload score from 138 to optimal 100.'}"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-xs text-slate-900">Key Accreditations & Milestones</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• 18 Advisees qualified for Institutional Dean's Honors List</li>
              <li>• 96.8% First-to-Second Year Student Retention Rate</li>
              <li>• Zero unaddressed grievance escalation cases</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <h4 className="font-bold text-xs text-slate-900">Action Items for Next Term (Spring 2027)</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Request HOD load rebalancing to reassign 4 low-risk students to Prof. Sneha Deshmukh</li>
              <li>• Implement early mid-term algebra workshops for Semester 2 students</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
