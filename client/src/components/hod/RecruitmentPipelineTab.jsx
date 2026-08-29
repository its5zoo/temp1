import React, { useState } from 'react';
import { 
  UserPlus, 
  Briefcase, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  X, 
  Sparkles,
  ChevronRight,
  Send,
  Building
} from 'lucide-react';
import { updateApplicantStatus, createJobRequisition } from '../../services/api';

const STAGES = ['Applied', 'Screening', 'Interview', 'Selected', 'Onboarding'];

export default function RecruitmentPipelineTab({ recruitmentData, onRefresh }) {
  const { requisitions = [], applicants = [] } = recruitmentData || {};
  const [search, setSearch] = useState('');
  const [selectedReq, setSelectedReq] = useState('all');
  const [candidateModal, setCandidateModal] = useState(null);
  const [newReqModalOpen, setNewReqModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [updating, setUpdating] = useState(false);

  // New Requisition Form State
  const [reqForm, setReqForm] = useState({
    title: '',
    department: 'Computer Science',
    positions: 1,
    hourlyRate: '$75 - $95 / hr',
    urgency: 'High'
  });

  const showToast = (title, msg) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleStageChange = async (applicant, newStage) => {
    if (applicant.status === newStage) return;
    setUpdating(true);
    try {
      await updateApplicantStatus({
        applicantId: applicant.id,
        newStatus: newStage
      });
      showToast('Candidate Notification Sent', `Updated ${applicant.name} status to: ${newStage}`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to update candidate stage');
    } finally {
      setUpdating(false);
    }
  };

  const handleDragStart = (e, applicantId) => {
    e.dataTransfer.setData('applicantId', applicantId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const applicantId = e.dataTransfer.getData('applicantId');
    const applicant = applicants.find(a => a.id === applicantId);
    if (applicant && applicant.status !== targetStage) {
      handleStageChange(applicant, targetStage);
    }
  };

  const handleCreateReqSubmit = async (e) => {
    e.preventDefault();
    if (!reqForm.title) return;
    try {
      await createJobRequisition(reqForm);
      showToast('Requisition Published', `Opened requisition for "${reqForm.title}".`);
      setNewReqModalOpen(false);
      setReqForm({
        title: '',
        department: 'Computer Science',
        positions: 1,
        hourlyRate: '$75 - $95 / hr',
        urgency: 'High'
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to create job requisition');
    }
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                          app.email.toLowerCase().includes(search.toLowerCase()) ||
                          app.degree?.toLowerCase().includes(search.toLowerCase());
    const matchesReq = selectedReq === 'all' || app.jobId === selectedReq;
    return matchesSearch && matchesReq;
  });

  const getStageHeaderStyle = (stage) => {
    switch (stage) {
      case 'Applied': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Screening': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Interview': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Selected': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Onboarding': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <Mail className="text-emerald-400" size={18} />
          <div>
            <p className="font-bold text-xs">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header & Open Requisitions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <UserPlus size={18} />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Faculty Recruitment ATS Pipeline</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Applicant tracking with qualification scoring, candidate dossiers, and automated status triggers.
            </p>
          </div>

          <button
            onClick={() => setNewReqModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus size={15} />
            Create Job Requisition
          </button>
        </div>

        {/* Requisitions List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {requisitions.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedReq(selectedReq === req.id ? 'all' : req.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedReq === req.id 
                  ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-200' 
                  : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {req.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  req.urgency === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {req.urgency} Urgency
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900 mt-1 truncate">{req.title}</h4>
              <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                <span>{req.hourlyRate}</span>
                <span>{req.positions} open pos</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search candidates, credentials, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Filter: <strong>{selectedReq === 'all' ? 'All Requisitions' : selectedReq}</strong></span>
          {selectedReq !== 'all' && (
            <button 
              onClick={() => setSelectedReq('all')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Clear Filter
            </button>
          )}
          <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
            {filteredApplicants.length} Candidates
          </span>
        </div>
      </div>

      {/* Kanban ATS Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1100px] items-start">
          {STAGES.map((stage) => {
            const stageCandidates = filteredApplicants.filter(a => a.status === stage);

            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="flex-1 bg-slate-50/70 rounded-2xl border border-slate-200 flex flex-col max-h-[680px] min-w-[210px]"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-t-2xl border-b flex items-center justify-between ${getStageHeaderStyle(stage)}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider">{stage}</span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-800 text-[10px] font-bold flex items-center justify-center border border-slate-200">
                      {stageCandidates.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-2.5 overflow-y-auto flex-1 space-y-2.5">
                  {stageCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, cand.id)}
                      onClick={() => setCandidateModal(cand)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {cand.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono">{cand.jobId}</span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {cand.matchScore}% Match
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 font-medium mt-2 line-clamp-2">
                        {cand.degree}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{cand.experienceYears} yrs exp</span>
                        <span className="font-semibold text-slate-700">{cand.expectedHourlyRate}/hr</span>
                      </div>

                      {/* Quick stage advance buttons */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[9px] text-slate-400">Move:</span>
                        <div className="flex items-center gap-1">
                          {STAGES.indexOf(stage) > 0 && (
                            <button
                              onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) - 1])}
                              className="px-1.5 py-0.5 text-[9px] rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Move back"
                            >
                              ←
                            </button>
                          )}
                          {STAGES.indexOf(stage) < STAGES.length - 1 && (
                            <button
                              onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) + 1])}
                              className="px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center gap-0.5"
                            >
                              Next →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="p-5 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      Drop candidate here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Details Dossier Modal */}
      {candidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center">
                  {candidateModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{candidateModal.name}</h3>
                  <p className="text-xs text-slate-500">{candidateModal.degree}</p>
                </div>
              </div>
              <button 
                onClick={() => setCandidateModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Requisition</span>
                  <span className="font-bold text-slate-900">{candidateModal.jobId}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Match Score</span>
                  <span className="font-bold text-emerald-700">{candidateModal.matchScore}% Match</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Experience</span>
                  <span className="font-bold text-slate-900">{candidateModal.experienceYears} Years</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-semibold uppercase">Expected Rate</span>
                  <span className="font-bold text-slate-900">{candidateModal.expectedHourlyRate} / hr</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-600 uppercase text-[10px] block mb-1">Contact Details</span>
                <div className="flex items-center gap-4 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1"><Mail size={13} className="text-slate-400" /> {candidateModal.email}</span>
                  <span className="flex items-center gap-1"><Phone size={13} className="text-slate-400" /> {candidateModal.phone}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-600 uppercase text-[10px] block mb-1">Committee Notes</span>
                <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                  {candidateModal.notes || 'Candidate profile vetted by department search committee.'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-600 uppercase text-[10px] block mb-1">Update Status</span>
                <div className="flex flex-wrap gap-1.5">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        handleStageChange(candidateModal, s);
                        setCandidateModal({ ...candidateModal, status: s });
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        candidateModal.status === s 
                          ? 'bg-slate-900 text-white font-semibold' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 mt-5 border-t border-slate-100">
              <button
                onClick={() => setCandidateModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Requisition Modal */}
      {newReqModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="text-slate-700" size={18} />
                <h3 className="font-bold text-slate-900 text-sm">Create Job Requisition</h3>
              </div>
              <button 
                onClick={() => setNewReqModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateReqSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 uppercase mb-1">Position Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adjunct Professor - Distributed Systems"
                  value={reqForm.title}
                  onChange={(e) => setReqForm({ ...reqForm, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-600 uppercase mb-1">Department</label>
                <select
                  value={reqForm.department}
                  onChange={(e) => setReqForm({ ...reqForm, department: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-600 uppercase mb-1">Open Positions</label>
                  <input
                    type="number"
                    min="1"
                    value={reqForm.positions}
                    onChange={(e) => setReqForm({ ...reqForm, positions: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 uppercase mb-1">Urgency</label>
                  <select
                    value={reqForm.urgency}
                    onChange={(e) => setReqForm({ ...reqForm, urgency: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-600 uppercase mb-1">Hourly Compensation Range</label>
                <input
                  type="text"
                  value={reqForm.hourlyRate}
                  onChange={(e) => setReqForm({ ...reqForm, hourlyRate: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewReqModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Publish Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
