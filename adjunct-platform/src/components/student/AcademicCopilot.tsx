'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Send, Bot, User, ShieldAlert, BookOpen } from 'lucide-react';

export default function AcademicCopilot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'ai'|'user'|'system', content: string}[]>([
    { 
      role: 'ai', 
      content: 'Hello! I am your Academic Copilot. I have context on your current subjects: Advanced Data Structures, Technical Writing, and Linear Algebra. How can I help you study today?' 
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Simulate Integrity Boundary Check
    // If the student asks something that looks like the "Graph Theory Project" prompt
    const isAssignmentPrompt = userMsg.toLowerCase().includes('graph') && userMsg.toLowerCase().includes('code') || userMsg.toLowerCase().includes('write a script');

    setTimeout(() => {
      if (isAssignmentPrompt) {
        setMessages(prev => [...prev, { 
          role: 'system', 
          content: 'Integrity Boundary: The query closely matches an active assignment prompt (Graph Theory Project).' 
        }, {
          role: 'ai',
          content: 'I noticed you are asking about implementing graph algorithms, which overlaps with your active CS301 project. While I cannot write the code for your assignment, I can explain how Depth-First Search (DFS) or Dijkstra\'s algorithm works conceptually. Would you like me to walk through a generic example?'
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: `That's a great question about ${userMsg}. To understand this, let's break it down into fundamental principles... (Simulated AI Response)` 
        }]);
      }
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Academic Copilot</h1>
        <p className="text-slate-500 mt-1 flex items-center gap-2">
          <ShieldAlert size={16} className="text-emerald-500" />
          Integrity Boundary Active: Answers are shaped to guide, not solve graded work.
        </p>
      </div>

      <Card className="flex-1 flex flex-col bg-white shadow-sm border-slate-200 overflow-hidden min-h-[600px]">
        <CardHeader className="bg-indigo-950 text-white py-4 border-b border-indigo-900">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot size={20} className="text-lime-400" /> Copilot Session (Context: B.Tech CS, Sem 6)
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              {msg.role !== 'system' && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'ai' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'
                }`}>
                  {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none' 
                  : msg.role === 'system'
                  ? 'bg-rose-50 border border-rose-100 text-rose-800 text-xs font-mono rounded-lg w-full text-center py-2'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.content}
                
                {/* Simulated practice problem attachment if integrity boundary triggered */}
                {msg.role === 'ai' && msg.content.includes('generic example') && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-indigo-600" />
                      <span className="text-sm font-medium text-slate-700">Practice: Conceptual DFS</span>
                    </div>
                    <button className="text-xs text-indigo-600 font-semibold hover:underline">Start Practice</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="p-4 border-t border-slate-100 bg-slate-50">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <input 
              type="text" 
              className="flex-1 h-12 px-4 rounded-full border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="Ask about a concept, e.g. 'How do I write a script for a graph?'"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button 
              type="submit" 
              className="h-12 w-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              disabled={!input.trim()}
            >
              <Send size={18} className="ml-1" />
            </button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
