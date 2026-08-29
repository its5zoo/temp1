import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  Filter, 
  ChevronRight, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  X, 
  Edit3, 
  Save, 
  BookOpen,
  MessageSquare
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function AdvisorStudentsTab({ students = [], onUpdateNotes, onScheduleClick, onMessageClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'all' || s.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleOpenDrawer = (student) => {
    setSelectedStudent(student);
    setEditingNotes(student.advisorNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedStudent || !onUpdateNotes) return;
    setIsSavingNotes(true);
    await onUpdateNotes(selectedStudent.id, editingNotes);
    setSelectedStudent(prev => ({ ...prev, advisorNotes: editingNotes }));
    setIsSavingNotes(false);
  };

  const handleExportExcel = () => {
    const headers = ["Roll No", "Student Name", "Email", "Semester", "CGPA", "Attendance %", "Risk Level", "Academic Standing", "Last Meeting", "Advisor Notes"];
    const rows = filteredStudents.map(s => [
      s.rollNo,
      `"${s.name}"`,
      s.email,
      `Semester ${s.semester}`,
      s.cgpa,
      `${s.attendance}%`,
      s.risk.toUpperCase(),
      `"${s.standing}"`,
      s.lastMeetingDate || 'N/A',
      `"${(s.advisorNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Advisor_Caseload_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <Users size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Student Caseload Directory
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring {students.length} assigned advisees across B.Tech Computer Science
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search name, roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-sky-50/40 border border-sky-200/80 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 transition-all font-medium"
            />
          </div>

          {/* Risk Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {['all', 'high', 'medium', 'low'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setRiskFilter(filterKey)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer capitalize ${
                  riskFilter === filterKey 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filterKey === 'all' ? 'All' : `${filterKey} Risk`}
              </button>
            ))}
          </div>

          {/* Export to Excel */}
          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 bg-white hover:bg-sky-50 border border-sky-200 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} className="text-sky-700" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Caseload Table */}
      <div className="bg-white rounded-2xl border border-sky-100 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sky-50/60 border-b border-sky-100 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Student Name & Roll No</th>
                <th className="py-3.5 px-4">Semester</th>
                <th className="py-3.5 px-4">CGPA</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Risk Status</th>
                <th className="py-3.5 px-4">Academic Standing</th>
                <th className="py-3.5 px-4">Last Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr 
                  key={s.id}
                  className="hover:bg-sky-50/30 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                        {s.avatar}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">{s.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{s.rollNo} • {s.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    Semester {s.semester}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`font-black ${s.cgpa < 6.0 ? 'text-rose-600' : s.cgpa >= 8.5 ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {s.cgpa}
                    </span>
                    <span className="text-[10px] text-slate-400"> / 10.0</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${s.attendance < 65 ? 'text-rose-600 font-black' : 'text-slate-800'}`}>
                        {s.attendance}%
                      </span>
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${s.attendance < 65 ? 'bg-rose-600' : s.attendance >= 85 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                          style={{ width: `${s.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border inline-block ${
                      s.risk === 'high' 
                        ? 'bg-rose-50 text-rose-900 border-rose-200' 
                        : s.risk === 'medium'
                        ? 'bg-amber-50 text-amber-900 border-amber-200'
                        : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {s.standing}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {s.lastMeetingDate || 'No record'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenDrawer(s)}
                      className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-200 font-bold text-xs transition-all cursor-pointer"
                    >
                      View Profile →
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-400">
                    No advisees found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Profile Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-xs">
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{selectedStudent.name}</h3>
                    <p className="text-xs text-slate-500">{selectedStudent.rollNo} • {selectedStudent.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Academic Snapshot */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">CGPA</span>
                  <span className="text-xl font-black text-slate-900 mt-0.5 block">{selectedStudent.cgpa}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
                  <span className="text-xl font-black text-slate-900 mt-0.5 block">{selectedStudent.attendance}%</span>
                </div>
                <div className="p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Credits</span>
                  <span className="text-xl font-black text-slate-900 mt-0.5 block">{selectedStudent.creditsEarned} / {selectedStudent.totalCreditsReq}</span>
                </div>
              </div>

              {/* Current Registered Courses & Grades */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-sky-700" />
                  Current Semester Enrolled Courses
                </h4>
                <div className="space-y-2">
                  {(selectedStudent.coursesThisTerm || []).map((c, i) => (
                    <div key={i} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-slate-900 block">{c.code} • {c.title}</span>
                        <span className="text-slate-500 font-medium text-[11px]">Attendance: {c.attendance}%</span>
                      </div>
                      <span className="font-black px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-900">
                        {c.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Backlogs */}
              {(selectedStudent.courseBacklogs || []).length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                  <span className="font-extrabold text-rose-900 block mb-1 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-rose-600" />
                    Outstanding Course Backlogs ({selectedStudent.courseBacklogs.length})
                  </span>
                  <ul className="list-disc list-inside text-rose-800 space-y-0.5">
                    {selectedStudent.courseBacklogs.map((b, i) => (
                      <li key={i} className="font-medium">{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Advisor Notes Editor */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Edit3 size={14} className="text-sky-700" />
                    Confidential Advisor Notes
                  </span>
                  <span className="text-[10px] text-slate-400">Last updated: {selectedStudent.lastMeetingDate}</span>
                </h4>
                <textarea
                  rows={4}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record intervention notes, action plans, or recommendations..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium resize-none leading-relaxed"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Save size={13} />
                    <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  if (onScheduleClick) onScheduleClick(selectedStudent);
                }}
                className="flex-1 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-950 border border-sky-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Calendar size={14} />
                <span>Schedule Session</span>
              </button>
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  if (onMessageClick) onMessageClick(selectedStudent);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageSquare size={14} />
                <span>Send Query</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
