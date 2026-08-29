import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/courses/CourseCard';
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
  Sparkles,
  MapPin,
  FileText
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
    title: 'Data Structures & Algorithmic Analysis',
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
            <span className="p-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              01
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Academic <span className="text-rose-600">Courses</span> & Catalog
            </h1>
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
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-slate-900"
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

      {/* Course Cards Grid - Modern Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c, idx) => (
          <CourseCard
            key={c.id}
            course={c}
            index={idx}
            onSelect={(course) => setSelectedCourse(course)}
          />
        ))}
      </div>

      {/* Course Detail Modal / Dossier */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 relative overflow-hidden">
            {/* Top Coral Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600" />

            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{selectedCourse.credits} Credits • {selectedCourse.term}</span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{selectedCourse.title}</h3>
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
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Lead Instructor</span>
                  <span className="font-bold text-slate-900">{selectedCourse.instructor}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Department</span>
                  <span className="font-bold text-slate-900">{selectedCourse.department}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Schedule & Room</span>
                  <span className="font-bold text-slate-900">{selectedCourse.schedule} ({selectedCourse.room})</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Capacity Status</span>
                  <span className="font-bold text-slate-900">{selectedCourse.enrolled} / {selectedCourse.maxCapacity} Students</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 uppercase text-[10px] block mb-1">Curriculum & Syllabus</span>
                <p className="text-slate-600 leading-relaxed">
                  Comprehensive study covering advanced core algorithms, data processing pipeline architecture, weekly laboratory assignments, and capstone team projects.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-2xs"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
