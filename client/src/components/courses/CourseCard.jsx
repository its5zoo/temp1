import React from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function CourseCard({ course, index, onSelect }) {
  const indexStr = String(index + 1).padStart(2, '0');
  const fillPercentage = Math.round((course.enrolled / course.maxCapacity) * 100);
  const isFull = fillPercentage >= 95;

  // Split title to style with editorial emphasis
  const titleWords = course.title.split(' ');
  const firstWord = titleWords[0];
  const restWords = titleWords.slice(1).join(' ');

  return (
    <div 
      onClick={() => onSelect && onSelect(course)}
      className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900 group-hover:bg-rose-600 transition-colors" />

      <div>
        {/* Header Micro-Typography */}
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-slate-400">
              {indexStr}.
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {course.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {course.credits} Credits
            </span>
            <span className={`w-2 h-2 rounded-full ${
              course.syllabusStatus === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
            }`} title={`Syllabus: ${course.syllabusStatus}`} />
          </div>
        </div>

        {/* Editorial Course Title */}
        <div className="mt-4">
          <h3 className="text-base font-extrabold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors">
            <span className="text-rose-600">{firstWord}</span> {restWords}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">{course.department}</p>
        </div>

        {/* Instructor & Section Compartment */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
              {course.instructorAvatar || 'IN'}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{course.instructor}</p>
              <p className="text-[10px] text-slate-500">{course.level || 'Undergraduate'}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-900 block">{course.sections} Sec</span>
            <span className="text-[10px] text-slate-400">{course.term}</span>
          </div>
        </div>

        {/* Circular Metric Indicators Grid (Editorial Style) */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-1">
              <Clock size={12} />
            </div>
            <span className="text-[10px] font-semibold text-slate-800 truncate w-full px-1">{course.schedule.split(' ')[0]}</span>
            <span className="text-[9px] text-slate-400">Time</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-1">
              <MapPin size={12} />
            </div>
            <span className="text-[10px] font-semibold text-slate-800 truncate w-full px-1">{course.room}</span>
            <span className="text-[9px] text-slate-400">Room</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
              isFull ? 'bg-rose-100 text-rose-700' : 'bg-slate-900 text-white'
            }`}>
              <Users size={12} />
            </div>
            <span className="text-[10px] font-bold text-slate-800">{fillPercentage}%</span>
            <span className="text-[9px] text-slate-400">Capacity</span>
          </div>
        </div>

        {/* Enrollment Progress Bar */}
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Enrolled Students</span>
            <span className="font-bold text-slate-900">{course.enrolled} / {course.maxCapacity}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                isFull ? 'bg-rose-600' : 'bg-slate-900'
              }`}
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-medium text-slate-400">
          Status: <strong className="text-slate-800">{course.syllabusStatus}</strong>
        </span>
        <button className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-2xs group-hover:bg-rose-600">
          <span>Dossier</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
