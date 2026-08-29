import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

export default function CourseCard({ course, onSelect }) {
  const fillPercentage = Math.round((course.enrolled / course.maxCapacity) * 100);

  return (
    <div 
      onClick={() => onSelect && onSelect(course)}
      className="group bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Banner */}
      <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {course.code}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5">
          <span className="bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
            {course.credits} Credits
          </span>
        </div>
      </div>

      {/* Card Content - Compact & Minimal */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xs text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            {course.instructor} • {course.department}
          </p>
        </div>

        {/* Minimal Progress Line & Footer */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Users size={11} className="text-slate-400" />
              {course.enrolled} / {course.maxCapacity} Enrolled
            </span>
            <span className="font-semibold text-slate-700">{fillPercentage}%</span>
          </div>

          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-800 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
