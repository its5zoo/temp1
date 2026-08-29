import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Search, 
  Users, 
  Clock, 
  GraduationCap, 
  Filter, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const INITIAL_COURSES = [
  {
    id: 'CS101',
    code: 'CS101',
    title: 'Introduction to Computer Science & Python',
    department: 'Computer Science',
    credits: 4,
    instructor: 'Dr. Michael Chang',
    instructorAvatar: 'MC',
    sections: 3,
    enrolled: 180,
    maxCapacity: 200,
    syllabusStatus: 'Approved',
    term: 'Fall 2026',
    schedule: 'Mon, Wed 09:00 - 10:30 AM',
    room: 'Hall B-104',
    level: 'Undergraduate'
  },
  {
    id: 'CS201',
    code: 'CS201',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science',
    credits: 4,
    instructor: 'Dr. Alex Rivera',
    instructorAvatar: 'AR',
    sections: 2,
    enrolled: 90,
    maxCapacity: 100,
    syllabusStatus: 'Approved',
    term: 'Fall 2026',
    schedule: 'Tue, Thu 11:00 - 12:30 PM',
    room: 'Lab CS-201',
    level: 'Undergraduate'
  },
  {
    id: 'CS301',
    code: 'CS301',
    title: 'Advanced Python & Software Architecture',
    department: 'Computer Science',
    credits: 4,
    instructor: 'Prof. Jane Doe',
    instructorAvatar: 'JD',
    sections: 2,
    enrolled: 125,
    maxCapacity: 130,
    syllabusStatus: 'Approved',
    term: 'Fall 2026',
    schedule: 'Mon, Wed 02:00 - 03:30 PM',
    room: 'Tech Hub 302',
    level: 'Undergraduate'
  },
  {
    id: 'CS402',
    code: 'CS402',
    title: 'Machine Learning & Neural Architectures',
    department: 'AI & Data Science',
    credits: 4,
    instructor: 'Prof. Jane Doe',
    instructorAvatar: 'JD',
    sections: 1,
    enrolled: 58,
    maxCapacity: 60,
    syllabusStatus: 'Approved',
    term: 'Fall 2026',
    schedule: 'Tue, Thu 03:00 - 04:30 PM',
    room: 'AI Studio 1',
    level: 'Advanced'
  },
  {
    id: 'DS301',
    code: 'DS301',
    title: 'Big Data Processing & Distributed Systems',
    department: 'AI & Data Science',
    credits: 4,
    instructor: 'Dr. Sarah Jenkins',
    instructorAvatar: 'SJ',
    sections: 1,
    enrolled: 52,
    maxCapacity: 60,
    syllabusStatus: 'Approved',
    term: 'Fall 2026',
    schedule: 'Fri 09:00 - 12:00 PM',
    room: 'Data Center Lab',
    level: 'Undergraduate'
  },
  {
    id: 'SEC301',
    code: 'SEC301',
    title: 'Cloud Infrastructure & Cyber Defense',
    department: 'Cybersecurity',
    credits: 3,
    instructor: 'Adj. Marcus Vance',
    instructorAvatar: 'MV',
    sections: 1,
    enrolled: 40,
    maxCapacity: 45,
    syllabusStatus: 'Under Review',
    term: 'Fall 2026',
    schedule: 'Wed, Fri 04:00 - 05:30 PM',
    room: 'Cyber Lab 4',
    level: 'Undergraduate'
  }
];

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase()) || 
                          c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || c.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const totalEnrollment = courses.reduce((sum, c) => sum + c.enrolled, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
              <BookOpen size={18} />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Academic Courses & Catalog</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Departmental curriculum catalog, section capacity metrics, and syllabus compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Active Courses</span>
            <span className="text-sm font-bold text-slate-900">{courses.length} Courses • {totalEnrollment} Enrolled</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by code, title, instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-800 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 text-slate-800 text-xs font-medium border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-slate-800"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <span className="text-xs text-slate-500 ml-2">
            Showing <strong>{filteredCourses.length}</strong> courses
          </span>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => {
          const fillPercentage = Math.round((c.enrolled / c.maxCapacity) * 100);
          const isFull = fillPercentage >= 95;

          return (
            <div
              key={c.id}
              onClick={() => setSelectedCourse(c)}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Code & Department */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span className="text-[11px] text-slate-500">{c.credits} Credits</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.syllabusStatus === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {c.syllabusStatus}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="font-bold text-sm text-slate-900 mt-2.5 leading-snug">
                  {c.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{c.department}</p>

                {/* Instructor Info */}
                <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center">
                      {c.instructorAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{c.instructor}</p>
                      <p className="text-[10px] text-slate-400">{c.schedule}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-1.5 py-0.2 rounded font-mono">
                    {c.room}
                  </span>
                </div>

                {/* Enrollment Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users size={12} className="text-slate-400" /> Enrollment
                    </span>
                    <span className="font-semibold text-slate-800">
                      {c.enrolled} / {c.maxCapacity} ({fillPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isFull ? 'bg-rose-500' : 'bg-slate-800'}`}
                      style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{c.sections} Active Sections</span>
                <span className="text-slate-700 font-medium hover:text-slate-900 flex items-center gap-1">
                  View Syllabus <ChevronRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs text-slate-500">{selectedCourse.credits} Credits • {selectedCourse.term}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{selectedCourse.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Instructor</span>
                  <span className="font-bold text-slate-900">{selectedCourse.instructor}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Department</span>
                  <span className="font-bold text-slate-900">{selectedCourse.department}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Schedule & Room</span>
                  <span className="font-bold text-slate-900">{selectedCourse.schedule} ({selectedCourse.room})</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Capacity Status</span>
                  <span className="font-bold text-slate-900">{selectedCourse.enrolled} / {selectedCourse.maxCapacity} Students</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">Curriculum & Learning Outcomes</span>
                <p className="text-slate-600 leading-relaxed">
                  Comprehensive study covering advanced core algorithms, data processing pipeline architecture, weekly laboratory assignments, and capstone team projects.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
