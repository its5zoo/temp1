import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  User, 
  Send, 
  X, 
  BookOpen
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function StudentDoubtsTab({ doubts = [], onCreateDoubt }) {
  const [selectedDoubt, setSelectedDoubt] = useState(doubts[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: 'CS301',
    subject: '',
    question: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const filteredDoubts = doubts.filter(d => {
    return d.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
           d.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           d.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !onCreateDoubt) return;
    setSubmitting(true);
    await onCreateDoubt(formData);
    setSubmitting(false);
    setShowModal(false);
    setFormData({ courseCode: 'CS301', subject: '', question: '' });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <MessageSquare size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Academic Doubts & 24/7 AI Teaching Assistant
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit questions directly to course professors & get instant AI Copilot code/theory breakdowns
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus size={15} />
          <span>Ask New Question</span>
        </button>
      </div>

      {/* 2-Column Split: Doubts List (Left 5) & Thread (Right 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 font-medium"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredDoubts.map((d) => {
              const isSelected = selectedDoubt?.id === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDoubt(d)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded">
                      {d.courseCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isSelected 
                        ? 'bg-slate-800 text-white border-slate-700' 
                        : d.status === 'Pending' 
                        ? 'bg-slate-100 text-slate-900 border-slate-300' 
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold mt-2 truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>{d.subject}</h4>
                  <p className={`text-[11px] line-clamp-2 mt-0.5 font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {d.question}
                  </p>

                  <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] font-medium ${
                    isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                  }`}>
                    <span>{d.instructor}</span>
                    <span>{d.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 Cols) */}
        {selectedDoubt ? (
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono font-bold">
                    {selectedDoubt.courseCode}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedDoubt.timestamp}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedDoubt.subject}</h3>
                <p className="text-xs text-slate-500 font-medium">Addressed to: <strong className="text-slate-800">{selectedDoubt.instructor}</strong></p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${
                selectedDoubt.status === 'Pending' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white text-slate-600 border-slate-200'
              }`}>
                {selectedDoubt.status}
              </span>
            </div>

            {/* Student's Question */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Question:</span>
              "{selectedDoubt.question}"
            </div>

            {/* AI Copilot Instant Assistance */}
            {selectedDoubt.aiAssistance && (
              <div className="p-4 rounded-xl bg-sky-950 text-white border border-sky-900 space-y-2">
                <div className="flex items-center gap-2">
                  <SmartIcon size={16} className="text-sky-300" />
                  <span className="text-xs font-extrabold text-white">AI Academic Copilot Instant Insight</span>
                </div>
                <p className="text-xs text-sky-100 leading-relaxed font-medium">
                  {selectedDoubt.aiAssistance}
                </p>
              </div>
            )}

            {/* Official Faculty Reply */}
            {selectedDoubt.reply ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Official Instructor Resolution:</span>
                  <span className="text-slate-500 text-[11px]">✓ Verified</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedDoubt.reply}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500 font-medium">
                ⏳ Instructor review in progress. You will receive an alert once {selectedDoubt.instructor} responds.
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            Select a doubt ticket from the left or click "Ask New Question".
          </div>
        )}

      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-slate-800" />
                Submit Academic Doubt Ticket
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Course
                </label>
                <select
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                >
                  <option value="CS301">CS301: Cloud Computing (Prof. Priya Sharma)</option>
                  <option value="CS204">CS204: Distributed Systems (Prof. Priya Sharma)</option>
                  <option value="CS402">CS402: High Performance Computing (Dr. Rajesh Sharma)</option>
                  <option value="CS305">CS305: Database Engineering (Dr. Suresh Verma)</option>
                  <option value="MA201">MA201: Discrete Mathematics (Prof. Ananya Roy)</option>
                  <option value="HU102">HU102: Technical Ethics (Dr. Vikram Malhotra)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Topic / Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ingress Controller Helm Deployment Error"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Question or Code Snippet
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Describe your doubt, what error you received, or the specific slide reference..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-slate-900 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  {submitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
