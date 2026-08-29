'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, Send, Bot, CheckCircle, Search, HelpCircle, User } from 'lucide-react';

export default function MessagesAndDoubts() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'doubts'>('doubts');

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 h-[calc(100vh-4rem)] flex flex-col">
      
      <div className="shrink-0">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Messages & Doubts</h1>
        <p className="text-slate-500 mt-1">Communicate with faculty and resolve academic queries.</p>
      </div>

      <div className="flex gap-4 shrink-0 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('doubts')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'doubts' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500'}`}
        >
          <div className="flex items-center gap-2"><HelpCircle size={16} /> Doubts Center</div>
        </button>
        <button 
          onClick={() => setActiveTab('inbox')}
          className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'inbox' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500'}`}
        >
          <div className="flex items-center gap-2"><MessageSquare size={16} /> Direct Inbox</div>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'doubts' && <DoubtsCenter />}
        {activeTab === 'inbox' && <div className="text-center py-20 text-slate-500">Inbox UI stubbed. Switch to Doubts Center to see the AI integration.</div>}
      </div>

    </div>
  );
}

function DoubtsCenter() {
  const doubts = [
    { id: 1, subject: 'CS301', topic: 'Time Complexity of DFS', status: 'answered', aiResolved: true },
    { id: 2, subject: 'MATH104', topic: 'Eigenvector proofs', status: 'open', aiResolved: false },
  ];

  return (
    <div className="h-full flex gap-6">
      
      {/* Left List */}
      <div className="w-1/3 border border-slate-200 bg-white rounded-xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            Raise New Doubt
          </button>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {doubts.map(d => (
            <div key={d.id} className="p-4 hover:bg-slate-50 cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-slate-500">{d.subject}</span>
                {d.status === 'open' 
                  ? <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] uppercase font-bold rounded">Open</span>
                  : <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded">Answered</span>
                }
              </div>
              <h4 className="text-sm font-semibold text-slate-900">{d.topic}</h4>
              {d.aiResolved && (
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-indigo-600">
                  <Bot size={12} /> Resolved by AI Copilot
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Detail Pane */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50">
          <CardTitle className="text-lg">Time Complexity of DFS</CardTitle>
          <CardDescription>CS301 • Submitted 2 days ago</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0"><User size={16}/></div>
            <div className="flex-1">
              <p className="text-sm text-slate-800 bg-slate-100 p-4 rounded-xl rounded-tl-none">
                I don't understand why DFS is O(V + E) when represented as an adjacency list, but O(V^2) for an adjacency matrix. Can someone explain the loop execution?
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0"><Bot size={16}/></div>
            <div className="flex-1">
              <div className="text-sm text-slate-800 bg-indigo-50 border border-indigo-100 p-4 rounded-xl rounded-tl-none">
                <div className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">AI Instant Suggestion</div>
                <p className="mb-2">Great question! It comes down to how we look for a node's neighbors:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Adjacency List:</strong> You only iterate over actual edges (E). So across all V vertices, you only perform E checks. Total = O(V + E).</li>
                  <li><strong>Adjacency Matrix:</strong> For every vertex V, you must check all V possible connections to see if an edge exists, even if it doesn't. Total = O(V * V) = O(V^2).</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-indigo-200 flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-800">Did this resolve your doubt?</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 transition-colors shadow-sm">Yes, Close Ticket</button>
                    <button className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300 transition-colors shadow-sm">No, Wait for Faculty</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
