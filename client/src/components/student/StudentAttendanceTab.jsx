import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Calculator,
  ArrowRight
} from 'lucide-react';

export default function StudentAttendanceTab({ attendanceData }) {
  const { overallAttendance = 78.2, criteria = 80.0, courseAttendance = [], daywiseLog = [] } = attendanceData || {};

  const [simSubject, setSimSubject] = useState(courseAttendance[0]?.code || 'CS301');
  const [simAttendedUpcoming, setSimAttendedUpcoming] = useState(5);

  const selectedCourseObj = courseAttendance.find(c => c.code === simSubject) || courseAttendance[0];

  // What-if simulator calculation
  const simTotal = (selectedCourseObj?.total || 30) + simAttendedUpcoming;
  const simAttended = (selectedCourseObj?.attended || 23) + simAttendedUpcoming;
  const simProjectedPercent = ((simAttended / simTotal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <ClipboardCheck size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Mandatory 80% Attendance Criteria Register
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                University regulation requires minimum 80.0% attendance in each course for final exam hall ticket eligibility
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
            overallAttendance < 80 
              ? 'bg-amber-50 text-amber-900 border-amber-300' 
              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
          }`}>
            Overall: {overallAttendance}% (Criteria: {criteria}%)
          </span>
        </div>
      </div>

      {/* Subject-Wise 80% Criteria Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Subject-wise Attendance & Classes Needed for 80% Threshold
          </h3>
          <span className="text-xs text-slate-400 font-medium">Semester 5 Roster</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Subject Code & Name</th>
                <th className="py-3.5 px-4">Attended / Total</th>
                <th className="py-3.5 px-4">Current %</th>
                <th className="py-3.5 px-4">80% Threshold Status</th>
                <th className="py-3.5 px-4 text-right">Classes to Attend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courseAttendance.map((c, idx) => {
                const isSafe = c.attendance >= 80;
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">{c.code}: {c.title}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {c.attended} / {c.total} Classes
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-black w-10 ${isSafe ? 'text-slate-900' : 'text-amber-700'}`}>
                          {c.attendance}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isSafe ? 'bg-slate-900' : 'bg-amber-500'}`}
                            style={{ width: `${Math.min(c.attendance, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border inline-flex items-center gap-1 ${
                        isSafe 
                          ? 'bg-white text-slate-900 border-slate-300' 
                          : 'bg-amber-50 text-amber-900 border-amber-200'
                      }`}>
                        {isSafe ? <CheckCircle2 size={11} className="text-emerald-600" /> : <AlertTriangle size={11} className="text-amber-600" />}
                        <span>{isSafe ? 'Exam Eligible (≥80%)' : 'Shortage Warning (<80%)'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {c.neededFor80 > 0 ? (
                        <span className="font-extrabold text-amber-900 bg-amber-100/70 border border-amber-300 px-2.5 py-1 rounded-lg">
                          Attend next {c.neededFor80} classes
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold">Criteria Fulfilled</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column Split: Interactive Simulator & Day-wise Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Interactive 80% Target Simulator */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator size={18} className="text-slate-800" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Attendance Target Simulator</h3>
              <p className="text-[11px] text-slate-400">Calculate how attending upcoming classes changes your %</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Select Course to Simulate
              </label>
              <select
                value={simSubject}
                onChange={(e) => setSimSubject(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold outline-none focus:border-slate-900"
              >
                {courseAttendance.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code}: {c.title} (Current: {c.attendance}%)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Consecutive Classes to Attend:
                </label>
                <span className="font-black text-slate-900 text-sm bg-slate-100 px-2 py-0.5 rounded">
                  +{simAttendedUpcoming} Classes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={simAttendedUpcoming}
                onChange={(e) => setSimAttendedUpcoming(Number(e.target.value))}
                className="w-full cursor-pointer accent-slate-900"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 mt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Projected Attendance Outcome
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white">{simProjectedPercent}%</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  Number(simProjectedPercent) >= 80 ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950'
                }`}>
                  {Number(simProjectedPercent) >= 80 ? 'Target Reached (≥80%)' : 'Still Short (<80%)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Formula: ({selectedCourseObj?.attended || 23} + {simAttendedUpcoming}) / ({selectedCourseObj?.total || 30} + {simAttendedUpcoming}) = {simProjectedPercent}%
              </p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Day-wise Attendance Ledger (Last 14 Sessions) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Day-wise Attendance History</h3>
              <p className="text-[11px] text-slate-400">Official verified biometric & RFID lecture logs</p>
            </div>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {daywiseLog.map((log, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {log.course}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{log.date} ({log.day})</span>
                    <span className="text-[11px] text-slate-400 font-medium">{log.time} • {log.room}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full font-black text-[11px] border ${
                  log.status === 'Present' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-rose-50 text-rose-900 border-rose-200'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
