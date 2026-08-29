import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  BarChart2, 
  Layers
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';

export default function StudentResultsTab({ resultsData }) {
  const { results = [], trends = {}, cgpa = 8.74, sgpa = 8.90 } = resultsData || {};

  const [activeGraph, setActiveGraph] = useState('monthly'); // 'monthly' | 'semester' | 'subjects'

  const handleExportCSV = () => {
    const headers = ["Subject Code", "Subject Name", "Instructor", "Credits", "Class Test 1 (20M)", "Cycle Test 2 (30M)", "Midterm (30M)", "Internals (20M)", "Total (100M)", "Grade", "Standing"];
    const rows = results.map(r => [
      r.courseCode,
      `"${r.courseTitle}"`,
      `"${r.instructor}"`,
      r.credits,
      r.classTest1,
      r.cycleTest2,
      r.midterm,
      r.internals,
      r.totalMarks,
      r.grade,
      `"${r.status}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Student_Academic_Transcript_Sem5.csv`;
    link.click();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1">
          <p className="font-black text-sky-300">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center text-[11px] gap-3">
              <span className="text-slate-300">{entry.name}:</span>
              <span className="font-bold text-white">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <TrendingUp size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Academic Performance, Marks Ledger & CGPA
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current Semester 5 SGPA: <strong className="text-slate-900">{sgpa}</strong> • Cumulative CGPA: <strong className="text-slate-900">{cgpa} / 10.0</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} className="text-slate-700" />
            <span>Export Official Transcript</span>
          </button>
        </div>
      </div>

      {/* Multi-Tier Performance Progression Graph */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              {activeGraph === 'monthly' && 'Monthly Class Test vs Cycle Test Progression'}
              {activeGraph === 'semester' && 'Semester-wise SGPA vs CGPA Growth Curve (Sem 1 - 5)'}
              {activeGraph === 'subjects' && 'Subject Scores vs Department Batch Averages'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Continuous evaluation analytics & competency metrics</p>
          </div>

          {/* Graph Selector Pills */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveGraph('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeGraph === 'monthly' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Monthly Tests
            </button>
            <button
              onClick={() => setActiveGraph('semester')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeGraph === 'semester' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Semester SGPA
            </button>
            <button
              onClick={() => setActiveGraph('subjects')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${activeGraph === 'subjects' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Subject Mastery
            </button>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeGraph === 'monthly' ? (
              <LineChart data={trends.monthlyTests} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[60, 100]} ticks={[60, 70, 80, 90, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Benchmark 75%', fill: '#f43f5e', fontSize: 10 }} />
                <Line type="monotone" dataKey="classTestAvg" name="Class Tests Avg (%)" stroke="#0f172a" strokeWidth={2.5} dot={{ r: 4, fill: '#0f172a' }} />
                <Line type="monotone" dataKey="cycleTestAvg" name="Cycle Tests Avg (%)" stroke="#64748b" strokeWidth={2.5} dot={{ r: 4, fill: '#64748b' }} />
              </LineChart>
            ) : activeGraph === 'semester' ? (
              <BarChart data={trends.semesterProgression} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="semester" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[0, 10]} ticks={[0, 2.5, 5, 7.5, 10]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sgpa" name="SGPA" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="cgpa" name="CGPA" fill="#64748b" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            ) : (
              <BarChart data={trends.subjectComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="subject" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" name="My Score" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={26} />
                <Bar dataKey="classAvg" name="Batch Average" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6 Subjects Detailed Marks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="font-extrabold text-sm text-slate-900">
            Semester 5 Examination Evaluation & Marks Ledger (6 Subjects Max)
          </span>
          <span className="text-xs text-slate-500 font-semibold">22 Credits Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Subject & Instructor</th>
                <th className="py-3.5 px-4">Credits</th>
                <th className="py-3.5 px-4">Class Test 1 (20M)</th>
                <th className="py-3.5 px-4">Cycle Test 2 (30M)</th>
                <th className="py-3.5 px-4">Midterm (30M)</th>
                <th className="py-3.5 px-4">Internals (20M)</th>
                <th className="py-3.5 px-4 font-black">Total (100M)</th>
                <th className="py-3.5 px-4">Grade</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-extrabold text-slate-900 text-xs block">
                        {r.courseCode}: {r.courseTitle}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">Instructor: {r.instructor}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    {r.credits}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {r.classTest1} <span className="text-[10px] text-slate-400 font-normal">/ 20</span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {r.cycleTest2} <span className="text-[10px] text-slate-400 font-normal">/ 30</span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {r.midterm} <span className="text-[10px] text-slate-400 font-normal">/ 30</span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {r.internals} <span className="text-[10px] text-slate-400 font-normal">/ 20</span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-sm text-slate-900">
                    {r.totalMarks} <span className="text-[11px] text-slate-400 font-medium">/ 100</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-black border ${
                      r.grade === 'A' 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-900 border-slate-300'
                    }`}>
                      Grade {r.grade}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-bold text-slate-600">
                      {r.status}
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
