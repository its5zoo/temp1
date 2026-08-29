import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  CheckCircle2, 
  Sparkles,
  Clock,
  User
} from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [selectedDoubtId, setSelectedDoubtId] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [toast, setToast] = useState(null);

  const [doubts, setDoubts] = useState([
    { 
      id: 1, 
      studentName: 'Aarav Sharma',
      studentAvatar: 'AS',
      subject: 'CS301', 
      topic: 'Time Complexity of DFS Traversal', 
      status: 'answered', 
      aiResolved: true,
      timestamp: '2 hours ago',
      query: "I don't understand why DFS is O(V + E) when represented as an adjacency list, but O(V^2) for an adjacency matrix. Can someone explain the loop execution?",
      aiResponse: "In an Adjacency List, we only iterate over the actual edges connected to each vertex, summing to 2E across all V vertices -> O(V + E). In an Adjacency Matrix, for each vertex we must check all V possible array columns regardless of edge existence -> O(V * V) = O(V^2)."
    },
    { 
      id: 2, 
      studentName: 'Priya Patel',
      studentAvatar: 'PP',
      subject: 'CS201', 
      topic: 'Red-Black Tree Balance Invariants', 
      status: 'open', 
      aiResolved: false,
      timestamp: '4 hours ago',
      query: "Why do red nodes require both children to be black? Does violating this break the black-height property?",
      aiResponse: null
    },
    { 
      id: 3, 
      studentName: 'Rohan Gupta',
      studentAvatar: 'RG',
      subject: 'CS402', 
      topic: 'Backpropagation Vectorization in Batch Norm', 
      status: 'answered', 
      aiResolved: false,
      timestamp: 'Yesterday',
      query: "How do we compute the gradient w.r.t mini-batch variance without computing redundant outer products in PyTorch?",
      aiResponse: "Batch normalization gradients can be vectorized by factoring out the mean subtraction term, reducing the calculation to two element-wise matrix multiplications."
    }
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const selectedDoubt = doubts.find(d => d.id === selectedDoubtId) || doubts[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setDoubts(prev => prev.map(d => {
      if (d.id === selectedDoubt.id) {
        return {
          ...d,
          status: 'answered',
          facultyReply: replyText
        };
      }
      return d;
    }));

    setReplyText('');
    showToast('Reply submitted and sent to student.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-2.5 animate-in slide-in-from-bottom-5 text-sm font-semibold">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
              <MessageSquare size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Academic Inquiries & Doubts Hub
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Student academic doubt resolution queue with automated AI Copilot suggestions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800">
            {doubts.filter(d => d.status === 'open').length} Open Doubts Pending
          </div>
        </div>
      </div>

      {/* Main Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
        {/* Left Queries List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">Student Doubts Queue</span>
            <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
              {doubts.length} Total
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {doubts.map((d) => {
              const isSelected = selectedDoubt.id === d.id;
              const isOpen = d.status === 'open';

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDoubtId(d.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-50 border-l-4 border-slate-900' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                      {d.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${
                      isOpen ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      {isOpen ? 'Open' : 'Answered'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{d.topic}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{d.query}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-600">{d.studentName}</span>
                    <span>{d.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Query Detail & Reply Pane */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-mono">
                    {selectedDoubt.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">• Submitted by <strong className="text-slate-800">{selectedDoubt.studentName}</strong></span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mt-1.5 leading-snug">{selectedDoubt.topic}</h3>
              </div>

              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">{selectedDoubt.timestamp}</span>
            </div>

            {/* Student Query Box */}
            <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                  {selectedDoubt.studentAvatar}
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 block">{selectedDoubt.studentName}</span>
                  <span className="text-xs text-slate-400">Student Question</span>
                </div>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">{selectedDoubt.query}</p>
            </div>

            {/* AI Copilot Suggestion */}
            {selectedDoubt.aiResponse && (
              <div className="p-4.5 rounded-xl bg-slate-50/80 border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-900">
                  <Sparkles size={16} className="text-slate-700" />
                  <span>AI Copilot Verified Solution</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedDoubt.aiResponse}</p>
              </div>
            )}

            {/* Faculty Reply if exists */}
            {selectedDoubt.facultyReply && (
              <div className="p-4.5 rounded-xl bg-slate-100 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Faculty Official Response</span>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">{selectedDoubt.facultyReply}</p>
              </div>
            )}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="mt-8 pt-5 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Send Response to Student
            </label>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your explanation or review notes..."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send size={15} />
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
