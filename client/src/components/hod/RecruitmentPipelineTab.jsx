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
  LayoutList,
  Kanban,
  ExternalLink
} from 'lucide-react';
import { updateApplicantStatus, createJobRequisition } from '../../services/api';

const STAGES = ['Applied', 'Screening', 'Interview', 'Selected', 'Onboarding'];

export default function RecruitmentPipelineTab({ recruitmentData, onRefresh }) {
  const { requisitions = [], applicants = [] } = recruitmentData || {};
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'kanban'
  const [search, setSearch] = useState('');
  const [selectedReq, setSelectedReq] = useState('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
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
    const matchesStage = selectedStageFilter === 'all' || app.status === selectedStageFilter;
    return matchesSearch && matchesReq && matchesStage;
  });

  return (
    <div className="space-y-6 w-full max-w-full">
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
              Candidate tracking with qualification scoring, candidate dossiers, and direct stage management.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
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

      {/* Toolbar with Table/Kanban Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>

          {/* Stage Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="bg-slate-50 text-slate-900 text-sm font-semibold border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-slate-900"
          >
            <option value="all">All Stages</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* View Mode Toggle & Stats */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutList size={15} />
              Table View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban size={15} />
              Kanban Board
            </button>
          </div>

          <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            {filteredApplicants.length} Candidates
          </span>
        </div>
      </div>

      {/* TABLE VIEW (Default - No Screen Overflow) */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-5">Candidate</th>
                  <th className="py-4 px-5">Degree & University</th>
                  <th className="py-4 px-5">Req / Rate</th>
                  <th className="py-4 px-5">Match Score</th>
                  <th className="py-4 px-5">Pipeline Stage</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredApplicants.map((cand) => (
                  <tr 
                    key={cand.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Candidate */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0">
                          {cand.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 
                            onClick={() => setCandidateModal(cand)}
                            className="font-bold text-slate-900 hover:underline cursor-pointer"
                          >
                            {cand.name}
                          </h4>
                          <span className="text-xs text-slate-400 font-medium">{cand.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Degree */}
                    <td className="py-4 px-5 font-medium text-slate-700">
                      <span className="line-clamp-1">{cand.degree}</span>
                      <span className="text-xs text-slate-400 font-normal">{cand.experienceYears} Years Exp</span>
                    </td>

                    {/* Requisition & Rate */}
                    <td className="py-4 px-5">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {cand.jobId}
                      </span>
                      <p className="text-xs text-slate-900 font-bold mt-1">{cand.expectedHourlyRate}/hr</p>
                    </td>

                    {/* Match Score */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {cand.matchScore}% Match
                      </span>
                    </td>

                    {/* Stage Selector */}
                    <td className="py-4 px-5">
                      <select
                        value={cand.status}
                        onChange={(e) => handleStageChange(cand, e.target.value)}
                        className="bg-slate-50 text-slate-900 text-xs font-bold border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-slate-900 cursor-pointer"
                      >
                        {STAGES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setCandidateModal(cand)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Dossier</span>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredApplicants.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                      No candidates match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KANBAN BOARD VIEW (With Smooth Scrolling) */}
      {viewMode === 'kanban' && (
        <div className="overflow-x-auto pb-6">
          <div className="flex gap-4 min-w-[1000px] items-start">
            {STAGES.map((stage) => {
              const stageCandidates = filteredApplicants.filter(a => a.status === stage);

              return (
                <div
                  key={stage}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage)}
                  className="flex-1 bg-slate-50/60 rounded-2xl border border-slate-200 flex flex-col min-w-[190px]"
                >
                  {/* Clean Column Header */}
                  <div className="p-3.5 rounded-t-2xl border-b border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs uppercase tracking-wider text-slate-900">{stage}</span>
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                        {stageCandidates.length}
                      </span>
                    </div>
                  </div>

                  {/* Cards Container */}
                  <div className="p-3 overflow-y-auto flex-1 space-y-3">
                    {stageCandidates.map((cand) => (
                      <div
                        key={cand.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, cand.id)}
                        onClick={() => setCandidateModal(cand)}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1.5">
                            <div>
                              <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-slate-700 transition-colors leading-snug">
                                {cand.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-mono">{cand.jobId}</span>
                            </div>
                            <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {cand.matchScore}%
                            </span>
                          </div>

                          <p className="text-xs text-slate-700 font-semibold mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/70 line-clamp-2">
                            {cand.degree}
                          </p>

                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                            <span>{cand.experienceYears} Yrs</span>
                            <span className="font-extrabold text-slate-900">{cand.expectedHourlyRate}/hr</span>
                          </div>
                        </div>

                        {/* Quick stage advance buttons */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1" onClick={(e) => e.stopPropagation()}>
                          <span className="text-xs text-slate-400 font-medium">Stage:</span>
                          <div className="flex items-center gap-1">
                            {STAGES.indexOf(stage) > 0 && (
                              <button
                                onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) - 1])}
                                className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                                title="Move back"
                              >
                                ←
                              </button>
                            )}
                            {STAGES.indexOf(stage) < STAGES.length - 1 && (
                              <button
                                onClick={() => handleStageChange(cand, STAGES[STAGES.indexOf(stage) + 1])}
                                className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1 shadow-2xs transition-colors"
                              >
                                Next →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="p-5 text-center text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50">
                        Drop candidate here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
