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
  ArrowLeft,
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
      showToast('Status Updated', `Moved ${applicant.name} to: ${newStage}`);
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

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5 text-sm">
          <Mail className="text-emerald-400" size={18} />
          <div>
            <p className="font-bold">{toast.title}</p>
            <p className="text-xs text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header & Open Requisitions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                <UserPlus size={20} />
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Faculty Recruitment ATS Pipeline</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Applicant tracking with qualification scoring, candidate dossiers, and automated status triggers.
            </p>
          </div>

          <button
            onClick={() => setNewReqModalOpen(true)}
            className="px-5 py-2.5 text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={16} />
            Create Job Requisition
          </button>
        </div>

        {/* Requisitions List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {requisitions.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedReq(selectedReq === req.id ? 'all' : req.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedReq === req.id 
                  ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900' 
                  : 'bg-white hover:bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono">
                  {req.id}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  req.urgency === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {req.urgency} Urgency
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-1.5 truncate">{req.title}</h4>
              <div className="flex justify-between items-center text-xs text-slate-500 font-medium mt-2.5">
                <span>{req.hourlyRate}</span>
                <span className="font-semibold text-slate-700">{req.positions} Open Position</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search candidates, credentials, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>Filter: <strong className="text-slate-800">{selectedReq === 'all' ? 'All Requisitions' : selectedReq}</strong></span>
          {selectedReq !== 'all' && (
            <button 
              onClick={() => setSelectedReq('all')}
              className="text-slate-900 font-bold hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
          <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            {filteredApplicants.length} Candidates
          </span>
        </div>
      </div>

      {/* Kanban ATS Grid - Spacious & Clean Modern */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-5 min-w-[1200px] items-start">
          {STAGES.map((stage) => {
            const stageCandidates = filteredApplicants.filter(a => a.status === stage);

            return (
              <div
                key={stage}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
                className="flex-1 bg-slate-50/60 rounded-2xl border border-slate-200 flex flex-col min-w-[240px]"
              >
                {/* Clean Column Header */}
                <div className="p-4 rounded-t-2xl border-b border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">{stage}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                      {stageCandidates.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-3.5 overflow-y-auto flex-1 space-y-3.5">
                  {stageCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, cand.id)}
                      onClick={() => setCandidateModal(cand)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-slate-700 transition-colors leading-snug">
                              {cand.name}
                            </h4>
                            <span className="text-xs text-slate-400 font-mono">{cand.jobId}</span>
                          </div>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {cand.matchScore}% Match
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-semibold mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 leading-relaxed">
                          {cand.degree}
                        </p>

                        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span>{cand.experienceYears} Years Exp</span>
                          <span className="font-extrabold text-slate-900 text-sm">{cand.expectedHourlyRate}/hr</span>
                        </div>
                      </div>

                      {/* Quick stage advance buttons */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs text-slate-400 font-medium">Stage:</span>
                        <div className="flex items-center gap-1.5">
                          {STAGES.indexOf(stage) > 0 && (
                            <button
                              onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) - 1])}
                              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                              title="Move back"
                            >
                              ←
                            </button>
                          )}
                          {STAGES.indexOf(stage) < STAGES.length - 1 && (
                            <button
                              onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) + 1])}
                              className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 shadow-2xs transition-colors"
                            >
                              Advance →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageCandidates.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-300 rounded-2xl bg-white/50">
                      No candidates in {stage}
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
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                  {candidateModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{candidateModal.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{candidateModal.degree}</p>
                </div>
              </div>
              <button 
                onClick={() => setCandidateModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Requisition</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.jobId}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Match Score</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">{candidateModal.matchScore}% Match</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Experience</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.experienceYears} Years</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Expected Rate</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.expectedHourlyRate} / hr</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Contact Details</span>
                <div className="flex items-center gap-4 text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-medium">
                  <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-500" /> {candidateModal.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-500" /> {candidateModal.phone}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Committee Assessment</span>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
                  {candidateModal.notes || 'Candidate profile vetted by department search committee.'}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Direct Stage Transition</span>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        handleStageChange(candidateModal, s);
                        setCandidateModal({ ...candidateModal, status: s });
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        candidateModal.status === s 
                          ? 'bg-slate-900 text-white shadow-2xs' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 mt-5 border-t border-slate-100">
              <button
                onClick={() => setCandidateModal(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
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
              <div className="flex items-center gap-2.5">
                <Briefcase className="text-slate-900" size={20} />
                <h3 className="font-extrabold text-slate-900 text-base">Create Job Requisition</h3>
              </div>
              <button 
                onClick={() => setNewReqModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReqSubmit} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Position Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adjunct Professor - Distributed Systems"
                  value={reqForm.title}
                  onChange={(e) => setReqForm({ ...reqForm, title: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Department</label>
                <select
                  value={reqForm.department}
                  onChange={(e) => setReqForm({ ...reqForm, department: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Open Positions</label>
                  <input
                    type="number"
                    min="1"
                    value={reqForm.positions}
                    onChange={(e) => setReqForm({ ...reqForm, positions: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Urgency</label>
                  <select
                    value={reqForm.urgency}
                    onChange={(e) => setReqForm({ ...reqForm, urgency: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Hourly Compensation Range</label>
                <input
                  type="text"
                  value={reqForm.hourlyRate}
                  onChange={(e) => setReqForm({ ...reqForm, hourlyRate: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewReqModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-all cursor-pointer text-sm"
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
