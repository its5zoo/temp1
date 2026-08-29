import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  ShieldAlert, 
  ArrowRightLeft, 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  X
} from 'lucide-react';
import { redistributeAdvisorCaseload } from '../../services/api';

export default function AdvisorCaseloadTab({ advisorData, onRefresh }) {
  const { advisors = [], recommendations = [] } = advisorData || {};
  const [expandedAdvisorId, setExpandedAdvisorId] = useState(null);
  const [redistributing, setRedistributing] = useState(false);
  const [toast, setToast] = useState(null);

  // Manual Transfer Modal State
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [sourceAdvisor, setSourceAdvisor] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [targetAdvisorId, setTargetAdvisorId] = useState('');

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleExecuteRecommendation = async (rec) => {
    setRedistributing(true);
    try {
      await redistributeAdvisorCaseload({
        fromAdvisorId: rec.fromAdvisorId,
        toAdvisorId: rec.toAdvisorId,
        studentIds: rec.students.map(s => s.id)
      });
      showToast('Caseload Rebalanced', `Transferred ${rec.studentCount} low-risk students to ${rec.toAdvisorName}.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to redistribute caseload', 'error');
    } finally {
      setRedistributing(false);
    }
  };

  const handleManualTransfer = async (e) => {
    e.preventDefault();
    if (!sourceAdvisor || selectedStudentIds.length === 0 || !targetAdvisorId) return;

    setRedistributing(true);
    try {
      const targetAdvisor = advisors.find(a => a.id === targetAdvisorId);
      await redistributeAdvisorCaseload({
        fromAdvisorId: sourceAdvisor.id,
        toAdvisorId: targetAdvisorId,
        studentIds: selectedStudentIds
      });

      showToast('Students Transferred', `Moved ${selectedStudentIds.length} students to ${targetAdvisor?.name}.`);
      setTransferModalOpen(false);
      setSelectedStudentIds([]);
      setSourceAdvisor(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to transfer students', 'error');
    } finally {
      setRedistributing(false);
    }
  };

  const openTransferModal = (advisor) => {
    setSourceAdvisor(advisor);
    setSelectedStudentIds([]);
    const defaultTarget = advisors.find(a => a.id !== advisor.id && a.status === 'Available') || advisors.find(a => a.id !== advisor.id);
    setTargetAdvisorId(defaultTarget?.id || '');
    setTransferModalOpen(true);
  };

  const toggleStudentSelection = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
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

      {/* Header Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Advisor Caseload Balancing</h2>
          <p className="text-xs text-slate-500">
            Risk-weighted caseload model: High Risk (3 pts), Medium Risk (2 pts), Low Risk (1 pt). Max safe limit: 120 points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
            {advisors.length} Active Advisors
          </span>
        </div>
      </div>

      {/* Smart Redistribution Recommendation Banner - Strict Clean White */}
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
                    AI Caseload Redistribution
                  </span>
                  <span className="text-xs text-slate-400">Risk-Balanced Routing</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  Redistribute {recommendations[0].studentCount} Low-Risk Students from {recommendations[0].fromAdvisorName}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                  {recommendations[0].reason}
                </p>

                <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].fromAdvisorName}:</span>
                    <span className="text-rose-600 font-semibold line-through">138 pts</span>
                    <span>→</span>
                    <span className="text-slate-900 font-semibold">{recommendations[0].expectedFromScore} pts (Optimal)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].toAdvisorName}:</span>
                    <span className="text-slate-500 font-semibold">72 pts</span>
                    <span>→</span>
                    <span className="text-slate-900 font-semibold">{recommendations[0].expectedToScore} pts (Optimal)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExecuteRecommendation(recommendations[0])}
              disabled={redistributing}
              className="shrink-0 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <ArrowRightLeft size={14} />
              {redistributing ? 'Applying...' : 'Apply Smart Redistribution'}
            </button>
          </div>
        </div>
      )}

      {/* Advisor Cards Grid - Strict Clean White */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {advisors.map((adv) => {
          const isOverloaded = adv.status === 'Overloaded';
          const isAvailable = adv.status === 'Available';
          const isOptimal = adv.status === 'Optimal';
          const capacityPercent = Math.min(Math.round((adv.caseloadScore / adv.maxCapacityPoints) * 100), 130);
          const isExpanded = expandedAdvisorId === adv.id;

          const highRiskCount = adv.assignedStudents.filter(s => s.risk === 'high').length;
          const medRiskCount = adv.assignedStudents.filter(s => s.risk === 'medium').length;
          const lowRiskCount = adv.assignedStudents.filter(s => s.risk === 'low').length;

          return (
            <div 
              key={adv.id}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Advisor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs flex items-center justify-center">
                      {adv.avatar || adv.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-xs leading-snug">{adv.name}</h4>
                      <p className="text-[11px] text-slate-500">{adv.department}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isOverloaded ? 'bg-rose-500' : isOptimal ? 'bg-emerald-500' : 'bg-slate-400'
                    }`} />
                    {adv.status}
                  </span>
                </div>

                {/* Score Progress Bar */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-600 flex items-center gap-1">
                      <ShieldAlert size={12} className="text-slate-400" />
                      Weighted Score
                    </span>
                    <span className={`font-semibold ${isOverloaded ? 'text-rose-600' : 'text-slate-900'}`}>
                      {adv.caseloadScore} / {adv.maxCapacityPoints} pts ({capacityPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOverloaded ? 'bg-rose-600' : 'bg-slate-800'
                      }`}
                      style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                    <span>{adv.totalStudentsCount} Students</span>
                    <span>Max Safe: 120 pts</span>
                  </div>
                </div>

                {/* Risk Distribution Breakdown */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-medium text-slate-500 block">High (3pt)</span>
                    <span className="text-xs font-bold text-slate-900">{highRiskCount}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-medium text-slate-500 block">Med (2pt)</span>
                    <span className="text-xs font-bold text-slate-900">{medRiskCount}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-medium text-slate-500 block">Low (1pt)</span>
                    <span className="text-xs font-bold text-slate-900">{lowRiskCount}</span>
                  </div>
                </div>

                {/* Toggle View Students Button */}
                <button
                  onClick={() => setExpandedAdvisorId(isExpanded ? null : adv.id)}
                  className="w-full mt-3 py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[11px] font-medium text-slate-700 flex items-center justify-between transition-colors cursor-pointer border border-slate-200"
                >
                  <span>Student Breakdown ({adv.assignedStudents.length})</span>
                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>

                {/* Expanded Student List */}
                {isExpanded && (
                  <div className="mt-2.5 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {adv.assignedStudents.map((s) => (
                      <div 
                        key={s.id}
                        className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-slate-800 text-[11px]">{s.name}</p>
                          <p className="text-[10px] text-slate-400">CGPA: {s.cgpa} • Att: {s.attendance}%</p>
                        </div>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-700">
                          +{s.riskPoints} pt
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {isOverloaded ? 'Over safe limit' : isAvailable ? 'Can accept load' : 'Balanced'}
                </span>
                <button
                  onClick={() => openTransferModal(adv)}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRightLeft size={12} />
                  Transfer Students
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Transfer Modal */}
      {transferModalOpen && sourceAdvisor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-lg border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="text-slate-800" size={16} />
                <h3 className="font-bold text-slate-900 text-xs">Transfer Students from {sourceAdvisor.name}</h3>
              </div>
              <button 
                onClick={() => setTransferModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleManualTransfer} className="mt-3 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Target Advisor (Recipient)</label>
                <select
                  value={targetAdvisorId}
                  onChange={(e) => setTargetAdvisorId(e.target.value)}
                  className="w-full bg-white text-slate-900 text-xs rounded-lg p-2.5 border border-slate-300 font-medium outline-none focus:border-slate-800"
                  required
                >
                  {advisors.filter(a => a.id !== sourceAdvisor.id).map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.status} • {a.caseloadScore} pts • {a.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                  Select Students to Move ({selectedStudentIds.length} selected)
                </label>
                <div className="border border-slate-200 rounded-lg p-1.5 max-h-52 overflow-y-auto space-y-1">
                  {sourceAdvisor.assignedStudents.map((s) => {
                    const isSelected = selectedStudentIds.includes(s.id);
                    return (
                      <div 
                        key={s.id}
                        onClick={() => toggleStudentSelection(s.id)}
                        className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isSelected ? 'bg-slate-100 border border-slate-300 font-semibold' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={isSelected} 
                            onChange={() => {}} 
                            className="rounded text-slate-900"
                          />
                          <div>
                            <span className="text-slate-900">{s.name}</span>
                            <span className="text-[10px] text-slate-400 ml-2">CGPA {s.cgpa}</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-white border border-slate-200 text-slate-700">
                          {s.risk.toUpperCase()} (+{s.riskPoints} pt)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <Info size={14} className="text-slate-500 shrink-0 mt-0.5" />
                <span>
                  Reallocating lower-risk students avoids disrupting interventions for high-risk students.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={redistributing || selectedStudentIds.length === 0}
                  className="px-4 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {redistributing ? 'Transferring...' : `Transfer ${selectedStudentIds.length} Students`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
