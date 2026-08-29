import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/courses/CourseCard';
import { 
  BookOpen, 
  Search, 
  Users, 
  X,
  MapPin,
  Clock,
  GraduationCap
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
    level: 'Undergraduate',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
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
    level: 'Undergraduate',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'CS301',
    code: 'CS301',
    title: 'Advanced Python & Architecture',
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
    level: 'Undergraduate',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'CS402',
    code: 'CS402',
    title: 'Machine Learning & Neural Nets',
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
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'DS301',
    code: 'DS301',
    title: 'Big Data Processing Systems',
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
    level: 'Undergraduate',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80'
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
    level: 'Undergraduate',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80'
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
    <div className="max-w-7xl mx-auto space-y-5 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-bold text-slate-900">Courses & Catalog</h1>
          <p className="text-xs text-slate-500">Department curriculum and enrollment overview.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            <strong>{courses.length}</strong> Courses • <strong>{totalEnrollment}</strong> Enrolled
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-800 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-slate-800"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <span className="text-xs text-slate-500 ml-1">
            {filteredCourses.length} results
          </span>
        </div>
      </div>

      {/* Course Cards Grid - Simple Picture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            onSelect={(course) => setSelectedCourse(course)}
          />
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 overflow-hidden">
            {/* Header Image */}
            <div className="h-32 -mx-5 -mt-5 mb-4 relative bg-slate-100 overflow-hidden">
              <img 
                src={selectedCourse.image} 
                alt={selectedCourse.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                  {selectedCourse.code} • {selectedCourse.credits} Credits
                </span>
                <h3 className="font-bold text-sm mt-1 leading-snug">{selectedCourse.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Instructor</span>
                  <span className="font-semibold text-slate-900">{selectedCourse.instructor}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department</span>
                  <span className="font-semibold text-slate-900">{selectedCourse.department}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Schedule</span>
                  <span className="font-semibold text-slate-900">{selectedCourse.schedule}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Room & Level</span>
                  <span className="font-semibold text-slate-900">{selectedCourse.room} ({selectedCourse.level})</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">Description</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Core departmental course covering theory, practical lab sessions, and hands-on project implementations.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 mt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-3.5 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg"
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
