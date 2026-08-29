import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  ArrowRightLeft, 
  Clock, 
  BookOpen, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X
} from 'lucide-react';
import { rebalanceFacultyWorkload } from '../../services/api';

export default function FacultyWorkloadTab({ workloadData, onRefresh }) {
  const { faculty = [], recommendations = [] } = workloadData || {};
  const [filter, setFilter] = useState('all');
  const [rebalancing, setRebalancing] = useState(false);
  const [toast, setToast] = useState(null);

  // Manual reassign modal state
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedSourceFaculty, setSelectedSourceFaculty] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedTargetFacultyId, setSelectedTargetFacultyId] = useState('');

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleExecuteRecommendation = async (rec) => {
    setRebalancing(true);
    try {
      await rebalanceFacultyWorkload({
        fromFacultyId: rec.fromFacultyId,
        toFacultyId: rec.toFacultyId,
        courseId: rec.courseId
      });
      showToast('Workload Rebalanced', `Reassigned ${rec.courseCode} (${rec.courseSection}) to ${rec.toFacultyName}.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to execute rebalance', 'error');
    } finally {
      setRebalancing(false);
    }
  };

  const handleManualReassign = async (e) => {
    e.preventDefault();
    if (!selectedSourceFaculty || !selectedCourseId || !selectedTargetFacultyId) return;

    setRebalancing(true);
    try {
      const targetFaculty = faculty.find(f => f.id === selectedTargetFacultyId);
      const course = selectedSourceFaculty.assignedCourses.find(c => c.id === selectedCourseId);
      
      await rebalanceFacultyWorkload({
        fromFacultyId: selectedSourceFaculty.id,
        toFacultyId: selectedTargetFacultyId,
        courseId: selectedCourseId
      });

      showToast('Course Reassigned', `Transferred ${course?.code} to ${targetFaculty?.name}.`);
      setReassignModalOpen(false);
      setSelectedSourceFaculty(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to reassign course', 'error');
    } finally {
      setRebalancing(false);
    }
  };

  const openModalForFaculty = (f) => {
    setSelectedSourceFaculty(f);
    setSelectedCourseId(f.assignedCourses[0]?.id || '');
    const defaultTarget = faculty.find(fac => fac.id !== f.id && fac.status === 'Available') || faculty.find(fac => fac.id !== f.id);
    setSelectedTargetFacultyId(defaultTarget?.id || '');
    setReassignModalOpen(true);
  };

  const filteredFaculty = filter === 'all' 
    ? faculty 
    : faculty.filter(f => f.status.toLowerCase() === filter.toLowerCase() || f.type.toLowerCase() === filter.toLowerCase());

  const overloadedCount = faculty.filter(f => f.status === 'Overloaded').length;
  const availableCount = faculty.filter(f => f.status === 'Available').length;
  const optimalCount = faculty.filter(f => f.status === 'Optimal').length;

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-lg shadow-md text-white flex items-center gap-3 animate-in slide-in-from-bottom-5 border ${
          toast.type === 'error' ? 'bg-slate-900 border-rose-600' : 'bg-slate-900 border-slate-700'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="text-rose-400" size={16} /> : <CheckCircle2 className="text-emerald-400" size={16} />}
          <div>
            <p className="font-semibold text-xs">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Faculty Workload Balancing</h2>
          <p className="text-xs text-slate-500">Live distribution of lecture credits and laboratory sessions.</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({faculty.length})
          </button>
          <button
            onClick={() => setFilter('overloaded')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'overloaded' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Overloaded ({overloadedCount})
          </button>
          <button
            onClick={() => setFilter('optimal')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'optimal' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Optimal ({optimalCount})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'available' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            Available ({availableCount})
          </button>
        </div>
      </div>

      {/* AI Smart Rebalance Suggestion Card - Strict Clean White */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 uppercase tracking-wider">
                    Smart Rebalance Suggestion
                  </span>
                  <span className="text-xs text-slate-400">Automated Optimizer</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  Reallocate {recommendations[0].courseCode} ({recommendations[0].courseSection})
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                  {recommendations[0].reason}
                </p>

                {/* Score Projection Visual */}
                <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].fromFacultyName}:</span>
                    <span className="text-rose-600 font-semibold line-through">92%</span>
                    <span>→</span>
                    <span className="text-slate-900 font-semibold">{recommendations[0].expectedFromScore}% (Optimal)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].toFacultyName}:</span>
                    <span className="text-slate-500 font-semibold">50%</span>
                    <span>→</span>
                    <span className="text-slate-900 font-semibold">{recommendations[0].expectedToScore}% (Optimal)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExecuteRecommendation(recommendations[0])}
              disabled={rebalancing}
              className="shrink-0 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <ArrowRightLeft size={14} />
              {rebalancing ? 'Applying...' : 'Execute 1-Click Rebalance'}
            </button>
          </div>
        </div>
      )}

      {/* Faculty Cards Grid - Strict Clean White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((f) => {
          const isOverloaded = f.status === 'Overloaded';
          const isAvailable = f.status === 'Available';
          const isOptimal = f.status === 'Optimal';
          const percent = Math.min(Math.round((f.currentWeeklyHours / f.maxWeeklyHours) * 100), 125);

          return (
            <div 
              key={f.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Faculty Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center justify-center">
                      {f.avatar || f.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-xs leading-snug">{f.name}</h4>
                      <p className="text-[11px] text-slate-500">{f.department}</p>
                    </div>
                  </div>

                  {/* Clean Status Badge with Semantic Dot */}
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isOverloaded ? 'bg-rose-500' : isOptimal ? 'bg-emerald-500' : 'bg-slate-400'
                    }`} />
                    {f.status}
                  </span>
                </div>

                {/* Badges & Meta */}
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium text-[10px] border border-slate-200">
                    {f.type}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Rating: <strong className="text-slate-800">{f.rating || 4.7}★</strong>
                  </span>
                  <span className="text-slate-500 text-[11px] ml-auto">
                    SLA: <strong className="text-slate-800">{f.doubtSlaPercent || 95}%</strong>
                  </span>
                </div>

                {/* Workload Progress Bar */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Clock size={12} className="text-slate-400" />
                      Weekly Load
                    </span>
                    <span className={`font-semibold ${isOverloaded ? 'text-rose-600' : 'text-slate-900'}`}>
                      {f.currentWeeklyHours}h / {f.maxWeeklyHours}h ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOverloaded ? 'bg-rose-600' : 'bg-slate-800'
                      }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                    <span>Score: {f.workloadScore} pts</span>
                    <span>{f.assignedCourses.length} Sections</span>
                  </div>
                </div>

                {/* Assigned Courses List */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Current Course Allocation
                  </span>
                  {f.assignedCourses.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">No courses allocated currently.</p>
                  ) : (
                    f.assignedCourses.map((c) => (
                      <div 
                        key={c.id}
                        className="p-2 rounded-lg bg-slate-50/70 border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs text-slate-900">{c.code}</span>
                            <span className="text-[10px] text-slate-600 bg-white border border-slate-200 px-1.5 py-0.2 rounded">
                              {c.section}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{c.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-semibold text-slate-900 block">{c.weeklyHours}h/wk</span>
                          <span className="text-[10px] text-slate-400">{c.students} students</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {isOverloaded ? 'Over limit' : isAvailable ? 'Can accept load' : 'Balanced'}
                </span>
                {f.assignedCourses.length > 0 && (
                  <button
                    onClick={() => openModalForFaculty(f)}
                    className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowRightLeft size={12} />
                    Reassign Section
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Reassignment Modal */}
      {reassignModalOpen && selectedSourceFaculty && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-lg border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="text-slate-800" size={16} />
                <h3 className="font-bold text-slate-900 text-xs">Reassign Course Section</h3>
              </div>
              <button 
                onClick={() => setReassignModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleManualReassign} className="mt-3 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Source Faculty</label>
                <input 
                  type="text" 
                  disabled 
                  value={`${selectedSourceFaculty.name} (${selectedSourceFaculty.status} - ${selectedSourceFaculty.currentWeeklyHours}h load)`}
                  className="w-full bg-slate-50 text-slate-700 text-xs rounded-lg p-2.5 border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Select Course to Transfer</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-white text-slate-900 text-xs rounded-lg p-2.5 border border-slate-300 font-medium outline-none focus:border-slate-800"
                  required
                >
                  {selectedSourceFaculty.assignedCourses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code} {c.section} - {c.title} ({c.weeklyHours}h/wk, {c.students} students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Faculty (Recipient)</label>
                <select
                  value={selectedTargetFacultyId}
                  onChange={(e) => setSelectedTargetFacultyId(e.target.value)}
                  className="w-full bg-white text-slate-900 text-xs rounded-lg p-2.5 border border-slate-300 font-medium outline-none focus:border-slate-800"
                  required
                >
                  {faculty.filter(f => f.id !== selectedSourceFaculty.id).map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.status} • {f.currentWeeklyHours}h / {f.maxWeeklyHours}h • {f.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <Info size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <span>
                  The rebalance will immediately adjust teaching hours, recalculate capacity scores, and sync with the faculty roster.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReassignModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rebalancing}
                  className="px-4 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {rebalancing ? 'Processing...' : 'Confirm Reassignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
