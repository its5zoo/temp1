import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  CheckCircle, 
  Search, 
  HelpCircle, 
  User, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('doubts');
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
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-lg shadow-md bg-slate-900 border border-slate-700 text-white flex items-center gap-2 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200">
              <MessageSquare size={18} />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Academic Inquiries & Doubts Hub</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Student academic doubt resolution queue with automated AI Copilot suggestions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
            {doubts.filter(d => d.status === 'open').length} Open Doubts Pending
          </span>
        </div>
      </div>

      {/* Main Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 min-h-[560px]">
        {/* Left Queries List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Student Doubts Queue</span>
            <span className="text-[11px] text-slate-500">{doubts.length} Total</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {doubts.map((d) => {
              const isSelected = selectedDoubt.id === d.id;
              const isOpen = d.status === 'open';

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDoubtId(d.id)}
                  className={`p-3.5 cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-50 border-l-2 border-slate-900' : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 py-0.2 rounded font-mono">
                      {d.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-medium ${
                      isOpen ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      {isOpen ? 'Open' : 'Answered'}
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-slate-900 line-clamp-1">{d.topic}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{d.query}</p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{d.studentName}</span>
                    <span>{d.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Query Detail & Reply Pane */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                    {selectedDoubt.subject}
                  </span>
                  <span className="text-xs text-slate-400">• Submitted by {selectedDoubt.studentName}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mt-1">{selectedDoubt.topic}</h3>
              </div>

              <span className="text-[11px] text-slate-400">{selectedDoubt.timestamp}</span>
            </div>

            {/* Student Query Box */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-semibold text-[10px] flex items-center justify-center">
                  {selectedDoubt.studentAvatar}
                </div>
                <span className="text-xs font-semibold text-slate-800">{selectedDoubt.studentName}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedDoubt.query}</p>
            </div>

            {/* AI Copilot Suggestion */}
            {selectedDoubt.aiResponse && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-800">
                  <Sparkles size={14} className="text-slate-700" />
                  <span>AI Copilot Instant Answer</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedDoubt.aiResponse}</p>
              </div>
            )}

            {/* Faculty Reply if exists */}
            {selectedDoubt.facultyReply && (
              <div className="mt-4 p-4 rounded-xl bg-slate-100/70 border border-slate-200">
                <span className="text-xs font-bold text-slate-900 block mb-1">Faculty Official Response</span>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedDoubt.facultyReply}</p>
              </div>
            )}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="mt-6 pt-4 border-t border-slate-100">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-2">
              Send Response to Student
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your explanation or review notes..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-800 focus:bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send size={13} />
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
